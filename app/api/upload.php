<?php

require_once __DIR__.'/../../vendor/autoload.php';

use Websafe\Blueimp\JqueryFileUploadHandler;

$uh = new JqueryFileUploadHandler([
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