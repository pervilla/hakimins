<?php
/**
 * Plantilla de configuración SMTP.
 *
 * Cómo usarla:
 *   1. Copie este archivo como  config.local.php  (en la misma carpeta api/).
 *   2. Complete los datos de su cuenta de correo.
 *   3. NO suba config.local.php al repositorio (ya está en .gitignore).
 *
 * Servidor (cPanel - SSL/TLS):
 *   Servidor: mail.hakimins.com.pe
 *   Puerto:   465  (SSL)  o  587 (TLS)
 */
return [
    'smtp_host'   => 'mail.hakimins.com.pe',
    'smtp_port'   => 465,
    'smtp_secure' => 'ssl', // 'ssl' para 465, 'tls' para 587

    'smtp_user'   => 'web@hakimins.com.pe',
    'smtp_pass'   => 'CONTRASENA_DE_LA_CUENTA',

    'from_email'  => 'web@hakimins.com.pe',
    'from_name'   => 'Sitio Web Hakim Integral Service',
    'to_email'    => 'ventas@hakimins.com.pe',

    // Poner en true solo si el servidor usa un certificado autofirmado.
    'smtp_allow_self_signed' => false,
];
