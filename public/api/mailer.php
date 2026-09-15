<?php
/**
 * Cliente SMTP mínimo (sin dependencias) para el envío de correo del sitio web.
 * Hakim Integral Service S.A.C.
 */

function smtp_encode_header(string $value): string
{
    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

/**
 * Envía un correo por SMTP autenticado.
 *
 * @param array  $cfg     Configuración SMTP (host, port, secure, user, pass, from_email, from_name)
 * @param string $to      Destinatario
 * @param string $subject Asunto
 * @param string $body    Cuerpo (texto plano UTF-8)
 * @param string $replyTo Dirección de respuesta
 */
function smtp_send(array $cfg, string $to, string $subject, string $body, string $replyTo): bool
{
    $host = $cfg['smtp_host'] ?? '';
    $port = (int) ($cfg['smtp_port'] ?? 465);
    $secure = strtolower($cfg['smtp_secure'] ?? 'ssl'); // 'ssl' (465) o 'tls' (587)
    $user = $cfg['smtp_user'] ?? '';
    $pass = $cfg['smtp_pass'] ?? '';
    $from = $cfg['from_email'] ?? $user;
    $fromName = $cfg['from_name'] ?? 'Sitio Web';
    $allowSelfSigned = !empty($cfg['smtp_allow_self_signed']);

    if ($host === '' || $user === '' || $pass === '') {
        return false;
    }

    $sslContext = stream_context_create([
        'ssl' => [
            'verify_peer' => !$allowSelfSigned,
            'verify_peer_name' => !$allowSelfSigned,
            'allow_self_signed' => $allowSelfSigned,
        ],
    ]);

    $transport = ($secure === 'tls') ? 'tcp' : 'ssl';
    $errno = 0;
    $errstr = '';
    $fp = @stream_socket_client(
        "$transport://$host:$port",
        $errno,
        $errstr,
        20,
        STREAM_CLIENT_CONNECT,
        $sslContext
    );

    if (!$fp) {
        return false;
    }

    stream_set_timeout($fp, 20);

    $read = function () use ($fp): string {
        $data = '';
        while (($line = fgets($fp, 515)) !== false) {
            $data .= $line;
            if (strlen($line) >= 4 && $line[3] === ' ') {
                break;
            }
        }
        return $data;
    };
    $write = function (string $command) use ($fp): void {
        fwrite($fp, $command . "\r\n");
    };
    $code = function (string $response): int {
        return (int) substr($response, 0, 3);
    };

    $hostname = $_SERVER['SERVER_NAME'] ?? 'localhost';

    if ($code($read()) !== 220) {
        fclose($fp);
        return false;
    }

    $write("EHLO $hostname");
    if ($code($read()) !== 250) {
        fclose($fp);
        return false;
    }

    if ($secure === 'tls') {
        $write('STARTTLS');
        if ($code($read()) !== 220) {
            fclose($fp);
            return false;
        }
        if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            fclose($fp);
            return false;
        }
        $write("EHLO $hostname");
        if ($code($read()) !== 250) {
            fclose($fp);
            return false;
        }
    }

    // Autenticación AUTH LOGIN
    $write('AUTH LOGIN');
    if ($code($read()) !== 334) {
        fclose($fp);
        return false;
    }
    $write(base64_encode($user));
    if ($code($read()) !== 334) {
        fclose($fp);
        return false;
    }
    $write(base64_encode($pass));
    if ($code($read()) !== 235) {
        fclose($fp);
        return false;
    }

    $write("MAIL FROM:<$from>");
    if ($code($read()) !== 250) {
        fclose($fp);
        return false;
    }

    $write("RCPT TO:<$to>");
    if ($code($read()) !== 250) {
        fclose($fp);
        return false;
    }

    $write('DATA');
    if ($code($read()) !== 354) {
        fclose($fp);
        return false;
    }

    $headers = 'From: ' . smtp_encode_header($fromName) . " <$from>\r\n";
    $headers .= "To: <$to>\r\n";
    $headers .= "Reply-To: <$replyTo>\r\n";
    $headers .= 'Subject: ' . smtp_encode_header($subject) . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "Content-Transfer-Encoding: 8bit\r\n";
    $headers .= 'Date: ' . date('r') . "\r\n";

    $normalized = str_replace("\r\n", "\n", $body);
    $normalized = str_replace("\n", "\r\n", $normalized);
    $normalized = preg_replace('/^\./m', '..', $normalized);

    fwrite($fp, $headers . "\r\n" . $normalized . "\r\n.\r\n");
    if ($code($read()) !== 250) {
        fclose($fp);
        return false;
    }

    $write('QUIT');
    fclose($fp);

    return true;
}
