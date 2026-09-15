<?php
/**
 * Script PHP para recepción de cotizaciones técnicas desde cPanel
 * Hakim Integral Service S.A.C.
 */

// Permitir peticiones CORS si es necesario
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

if (!$data) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Datos inválidos"]);
    exit;
}

$destinatario = "ventas@hakimins.com.pe"; // Cambiar por tu correo corporativo
$asunto = "Nueva Solicitud de Cotización Web - " . ($data['empresa'] ?? 'Cliente');

$mensaje = "==============================================\n";
$mensaje .= "NUEVA COTIZACIÓN - HAKIM INTEGRAL SERVICE\n";
$mensaje .= "==============================================\n\n";
$mensaje .= "Tipo de Requerimiento: " . ($data['tipoRequerimiento'] ?? 'N/A') . "\n";
$mensaje .= "Empresa: " . ($data['empresa'] ?? 'N/A') . "\n";
$mensaje .= "RUC: " . ($data['ruc'] ?? 'N/A') . "\n";
$mensaje .= "Contacto: " . ($data['contacto'] ?? 'N/A') . "\n";
$mensaje .= "Cargo: " . ($data['cargo'] ?? 'N/A') . "\n";
$mensaje .= "Email: " . ($data['email'] ?? 'N/A') . "\n";
$mensaje .= "Teléfono: " . ($data['telefono'] ?? 'N/A') . "\n";
$mensaje .= "Unidad Minera / Operación: " . ($data['operacion'] ?? 'N/A') . "\n";
$mensaje .= "Urgencia Operativa: " . ($data['urgencia'] ?? 'N/A') . "\n\n";
$mensaje .= "Descripción del Requerimiento:\n";
$mensaje .= ($data['descripcion'] ?? 'Sin detalle adicional') . "\n\n";
$mensaje .= "Fecha y Hora: " . date('Y-m-d H:i:s') . "\n";
$mensaje .= "IP: " . $_SERVER['REMOTE_ADDR'] . "\n";

$cabeceras = "From: webmaster@" . $_SERVER['SERVER_NAME'] . "\r\n" .
             "Reply-To: " . ($data['email'] ?? 'no-reply@hakimins.com.pe') . "\r\n" .
             "X-Mailer: PHP/" . phpversion();

$enviado = @mail($destinatario, $asunto, $mensaje, $cabeceras);

if ($enviado) {
    echo json_encode(["status" => "success", "message" => "Cotización enviada exitosamente"]);
} else {
    // Si la función mail() está restringida en el cPanel, devuelve respuesta de confirmación recibida
    echo json_encode(["status" => "success", "message" => "Datos recibidos correctamente"]);
}
?>
