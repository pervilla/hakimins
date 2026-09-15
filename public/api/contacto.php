<?php
/**
 * Recepción de solicitudes de cotización desde el sitio web
 * Hakim Integral Service S.A.C.
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
    exit;
}

// Leer datos JSON entrantes
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !is_array($data)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Datos inválidos"]);
    exit;
}

$clean = function ($value) {
    return trim(strip_tags((string) ($value ?? '')));
};

$nombre = $clean($data['nombre'] ?? '');
$empresa = $clean($data['empresa'] ?? '');
$ruc = $clean($data['ruc'] ?? '');
$cargo = $clean($data['cargo'] ?? '');
$email = $clean($data['email'] ?? '');
$telefono = $clean($data['telefono'] ?? '');
$tipoRequerimiento = $clean($data['tipoRequerimiento'] ?? '');
$equipoOservicio = $clean($data['equipoOservicio'] ?? '');
$unidadMinera = $clean($data['unidadMinera'] ?? '');
$comentarios = $clean($data['comentarios'] ?? '');

if ($nombre === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(["status" => "error", "message" => "Nombre y correo válidos son obligatorios"]);
    exit;
}

// Configuración SMTP (config.local.php NO se sube al repositorio)
$configFile = __DIR__ . '/config.local.php';
$config = is_file($configFile) ? require $configFile : null;

$destinatario = (is_array($config) && !empty($config['to_email']))
    ? $config['to_email']
    : 'ventas@hakimins.com.pe';

$asunto = "Nueva Cotización Web - " . ($empresa !== '' ? $empresa : $nombre);

$mensaje = "==============================================\n";
$mensaje .= "NUEVA SOLICITUD DE COTIZACION - HAKIM INTEGRAL SERVICE\n";
$mensaje .= "==============================================\n\n";
$mensaje .= "Tipo de Requerimiento: " . ($tipoRequerimiento !== '' ? $tipoRequerimiento : 'N/A') . "\n";
$mensaje .= "Equipo / Servicio: " . ($equipoOservicio !== '' ? $equipoOservicio : 'N/A') . "\n";
$mensaje .= "Empresa: " . ($empresa !== '' ? $empresa : 'N/A') . "\n";
$mensaje .= "RUC: " . ($ruc !== '' ? $ruc : 'N/A') . "\n";
$mensaje .= "Contacto: " . $nombre . "\n";
$mensaje .= "Cargo: " . ($cargo !== '' ? $cargo : 'N/A') . "\n";
$mensaje .= "Email: " . $email . "\n";
$mensaje .= "Telefono: " . ($telefono !== '' ? $telefono : 'N/A') . "\n";
$mensaje .= "Unidad Minera / Ubicacion: " . ($unidadMinera !== '' ? $unidadMinera : 'N/A') . "\n\n";
$mensaje .= "Detalles del Requerimiento:\n";
$mensaje .= ($comentarios !== '' ? $comentarios : 'Sin detalle adicional') . "\n\n";
$mensaje .= "Fecha y Hora: " . date('Y-m-d H:i:s') . "\n";
$mensaje .= "IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'N/A') . "\n";

$cabeceras = "From: webmaster@" . ($_SERVER['SERVER_NAME'] ?? 'hakimins.com.pe') . "\r\n" .
             "Reply-To: " . $email . "\r\n" .
             "X-Mailer: PHP/" . phpversion();

$enviado = false;

if (is_array($config) && !empty($config['smtp_host'])) {
    // Envío por SMTP autenticado
    require_once __DIR__ . '/mailer.php';
    $enviado = smtp_send($config, $destinatario, $asunto, $mensaje, $email);
    if (!$enviado) {
        $enviado = @mail($destinatario, $asunto, $mensaje, $cabeceras);
    }

    if ($enviado) {
        echo json_encode(["status" => "success", "message" => "Solicitud enviada exitosamente"]);
    } else {
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "No se pudo enviar la solicitud. Intente nuevamente o escríbanos por WhatsApp."
        ]);
    }
} else {
    // Sin SMTP configurado: intento por mail()
    $enviado = @mail($destinatario, $asunto, $mensaje, $cabeceras);
    echo json_encode([
        "status" => "success",
        "message" => $enviado ? "Solicitud enviada exitosamente" : "Datos recibidos correctamente"
    ]);
}
?>
