<?php

define('ENVIRONMENT', 'prod');

if (ENVIRONMENT == 'dev') {
    error_reporting(1);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

require_once __DIR__ . '/../../vendor/autoload.php';

$uh = new \Websafe\Blueimp\JqueryFileUploadHandler([
    'upload_dir' => '../uploads/',
    'upload_url' => '/uploads/',
    'accept_file_types' => '/\.(jpe?g|png)$/i'
//    'image_versions' => array(
//        'thumbnail' => array(
//            'max_width' => 80,
//            'max_height' => 80
//        )
//    ),
]);