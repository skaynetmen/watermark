<?php

define('DOWNLOADS_DIR', __DIR__.'/../downloads');
define('DOWNLOADS_PATH', '/downloads/');

require_once __DIR__.'/../../vendor/autoload.php';


function post($key, $isRequired = true)
{
    if (array_key_exists($key, $_POST)) {
        return $_POST[$key];
    } elseif ($isRequired) {
        throw new \InvalidArgumentException("Input parameter $key is not set");
    }

    return null;
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // путь к картинке
        $imagePath = post('imagePath');

        // путь к вотермарку
        $watermarkPath = post('watermarkPath');

        // Во сколько раз были уменьшены изборажения
        $scaleFactor = (float) post('scaleFactor');

        // позиция watermark по оси X
        $watermarkPosX = (int) post('watermarkPosX');

        // позиция watermark по оси У
        $watermarkPosY = (int) post('watermarkPosY');

        // прозрачность watermark
        $watermarkOpacity = (float) post('watermarkOpacity');

        // необходимо ли повторять вотермарк
        $watermarkRepeat = (bool) post('watermarkRepeat');

        if ($watermarkRepeat === true) {

            // Количество вотермарков по оси X
            $watermarkRepeatXNumber = (int) post('watermarkRepeatXNumber');

            // Количество вотермарков по оси X
            $watermarkRepeatYNumber = (int) post('watermarkRepeatYNumber');

            // Отступ у вотермарка слева
            $watermarkMarginLeft = (int) post('watermarkMarginLeft');

            // Отступ у вотермарка снизу
            $watermarkMarginBottom = (int) post('watermarkMarginBottom');
        }

        // Создаём класс imagine
        $imagine = new Imagine\Imagick\Imagine();

        // Открываем основную картинку
        $image = $imagine->open(__DIR__.'/..'.$imagePath);

        $imageSize = $image->getSize();

        // Открываем картинку Watermark
        $watermarkImage = $imagine->open(__DIR__.'/..'.$watermarkPath);

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

                    $watermarkImageLayer->paste($watermarkImage, $watermarkPosition);
                }
            }

        } else {
            $watermarkImageLayer = $watermarkImage;
        }

        // Позиция на основной картинке
        $watermarkPosition = new Imagine\Image\Point($watermarkPosX * $scaleFactor, $watermarkPosY * $scaleFactor);

        // Обрезаем слой вотермарка до размеров изображения на которое будет накладывать
        $boundingBox = new \Imagine\Image\Box($imageSize->getWidth() - $watermarkPosition->getX(), $imageSize->getHeight() - $watermarkPosition->getY());
        $watermarkImageLayer->crop(new \Imagine\Image\Point(0, 0), $boundingBox);

        // Вставляем вотермарк на основную картинку
        $image->paste($watermarkImageLayer, $watermarkPosition);


        // Сохранить изображение
        $imageFileName = uniqid().'.png';
        $imagePath = DOWNLOADS_DIR.'/'.$imageFileName;

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
    }
}