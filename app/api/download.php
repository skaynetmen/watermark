<?php

define('DOWNLOADS_DIR', __DIR__.'/../downloads');
define('DOWNLOADS_PATH', '/downloads/');

require_once __DIR__.'/../../vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // путь к картинке
    $imagePath = $_POST['imagePath'];

    // путь к вотермарку
    $watermarkPath = $_POST['watermarkPath'];

    // Во сколько раз были уменьшены изборажения
    $scaleFactor = $_POST['scaleFactor'];

    // позиция watermark по оси X
    $watermarkPosX = $_POST['watermarkPosX'];

    // позиция watermark по оси У
    $watermarkPosY = $_POST['watermarkPosY'];

    // прозрачность watermark
    $watermarkOpacity = $_POST['watermarkOpacity'];

    // необходимо ли повторять вотермарк
    $watermarkRepeat = $_POST['watermarkRepeat'];

    // Количество вотермарков по оси X
    $watermarkRepeatXNumber = $_POST['watermarkRepeatXNumber'];

    // Количество вотермарков по оси X
    $watermarkRepeatYNumber = $_POST['watermarkRepeatYNumber'];

    // Отступ у вотермарка слева
    $watermarkMarginLeft = $_POST['watermarkMarginLeft'];

    // Отступ у вотермарка снизу
    $watermarkMarginBottom = $_POST['watermarkMarginBottom'];

    // Создаём класс imagine
    $imagine = new Imagine\Imagick\Imagine();

    // Открываем основную картинку
    try {
        $image = $imagine->open(__DIR__.'/..'.$imagePath);

    } catch (\Exception $e) {
        echo json_encode([
            'error' => true,
            'errorMsg' => $e->getMessage(),
            'errorTrace' => $e->getTrace()
        ]);
        die;
    }

    $imageSize = $image->getSize();

    // Открываем картинку Watermark
    try {
        $watermarkImage = $imagine->open(__DIR__.'/..'.$watermarkPath);

    } catch (\Exception $e) {
        echo json_encode([
            'error' => true,
            'errorMsg' => $e->getMessage(),
            'errorTrace' => $e->getTrace()
        ]);
        die;
    }


    // Устанавливаем уровень прозрачности
    $watermarkImage->getImagick()->setImageOpacity($watermarkOpacity);

    // Размер вотермарка
    $watermarkSize = $watermarkImage->getSize();


    // Если необходимо замощение вотермарка
    if ($watermarkRepeat) {
        // Считаем длину и высоту холста для вотермарков
        $watermarkLayerWidth = ($watermarkMarginLeft + $watermarkSize->getWidth()) * $watermarkRepeatXNumber;
        $watermarkLayerHeight = ($watermarkMarginBottom + $watermarkSize->getHeight()) * $watermarkRepeatYNumber;

        // Создаём холст из вотермарков
        $palette = new Imagine\Image\Palette\RGB();
        $color = $palette->color('#fff', 0);
        $boundingBox = new \Imagine\Image\Box($watermarkLayerWidth * $scaleFactor, $watermarkLayerHeight * $scaleFactor);
        $watermarkImageLayer = $imagine->create($boundingBox, $color);

        // Заполняем холст вотермарками
        for ($i = 0; $i < $watermarkRepeatXNumber; $i++) {
            for ($j = 0; $j < $watermarkRepeatYNumber; $j++) {
                $posX = ($watermarkMarginLeft + $watermarkSize->getWidth()) * $i;
                $posY = ($watermarkMarginBottom + $watermarkSize->getHeight()) * $j;

                $watermarkPosition = new Imagine\Image\Point($posX * $scaleFactor, $posY * $scaleFactor);

                try {
                    $watermarkImageLayer->paste($watermarkImage, $watermarkPosition);
                } catch (\Exception $e) {
                    echo json_encode([
                        'error' => true,
                        'errorMsg' => $e->getMessage(),
                        'errorTrace' => $e->getTrace()
                    ]);
                    die;
                }

            }
        }

    } else {
        $watermarkImageLayer = $watermarkImage;
    }

    // Позиция на основной картинке
    $watermarkPosition = new Imagine\Image\Point($watermarkPosX * $scaleFactor, $watermarkPosY * $scaleFactor);

    try {
        // Обрезаем слой вотермарка до размеров изображения на которое будет накладывать
        $boundingBox = new \Imagine\Image\Box($imageSize->getWidth() - $watermarkPosition->getX(), $imageSize->getHeight() - $watermarkPosition->getY());
        $watermarkImageLayer->crop(new \Imagine\Image\Point(0, 0), $boundingBox);

        // Вставляем вотермарк на основную картинку
        $image->paste($watermarkImageLayer, $watermarkPosition);

    } catch (\Exception $e) {
        echo json_encode([
            'error' => true,
            'errorMsg' => $e->getMessage(),
            'errorTrace' => $e->getTrace()
        ]);
        die;
    }


    // Сохранить изображение
    $imageFileName = uniqid().'.png';
    $imagePath = DOWNLOADS_DIR.'/'.$imageFileName;

    try {
        $image->save($imagePath);

        echo json_encode([
            'error' => false,
            'imagePath' => DOWNLOADS_PATH.$imageFileName
        ]);

    } catch (\Exception $e) {
        echo json_encode([
            'error' => true,
            'errorMsg' => $e->getMessage(),
            'errorTrace' => $e->getTrace()
        ]);
        die;
    }
}