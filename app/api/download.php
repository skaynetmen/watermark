<?php

define('ENVIRONMENT', 'prod');

if (ENVIRONMENT == 'dev') {
    error_reporting(1);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

require_once '../../vendor/autoload.php';

class Watermark
{
    /**
     * @var \Imagine\Imagick\Imagine
     */
    private $imageine;

    /**
     * Каталог куда будут сохраняться результаты
     * @var string
     */
    private $resultsDir;

    /**
     * Режим замощения
     * @var bool
     */
    private $tiling = false;

    /**
     * Изображение
     * @var array
     */
    private $image = [];

    /**
     * Водяной знак
     * @var array
     */
    private $watermark = [];

    /**
     * Координаты
     * @var array
     */
    private $coordinates = [
        'x' => 0,
        'y' => 0
    ];

    /**
     * Множитель координат
     * @var int
     */
    private $factor = 1;

    /**
     * Прозрачность
     * @var int
     */
    private $opacity = 100;

    /**
     * Отуступы между водяными знаками в режиме замощения
     * @var array
     */
    private $margins = [
        'x' => 0,
        'y' => 0
    ];

    /**
     * Кол-во водяных знаков в режиме замощения по оси Х и по оси У
     * @var array
     */
    private $count = [
        'x' => 0,
        'y' => 0
    ];

    /**
     * Watermark constructor.
     * @param array $params
     * @param string $resultsDir
     * @throws \Exception
     */
    public function __construct(array $params, $resultsDir = './../uploads/results/')
    {
        $this->imageine = new \Imagine\Imagick\Imagine();

        $this->image['src'] = $this->imageine->open("./..{$params['img']}");
        $this->image['size'] = $this->image['src']->getSize();

        $this->watermark['src'] = $this->imageine->open("./..{$params['watermark']}");
        $this->watermark['size'] = $this->watermark['src']->getSize();

        $this->coordinates['x'] = $params['x'];
        $this->coordinates['y'] = $params['y'];

        $this->opacity = $params['opacity'];

        $this->watermark['src']->getImagick()->setImageOpacity($this->opacity / 100);

        $this->factor = $params['factor'];

        $this->tiling = isset($params['tiling']) && $params['tiling'];

        if ($this->tiling && isset($params['marginX']) && isset($params['marginY'])) {
            $this->margins['x'] = $params['marginX'] > 0 ? $this->factor * $params['marginX'] : 0;
            $this->margins['y'] = $params['marginY'] > 0 ? $this->factor * $params['marginY'] : 0;

            $this->count['x'] = $params['countX'];
            $this->count['y'] = $params['countY'];
        }

        if (file_exists($resultsDir)) {
            $this->resultsDir = $resultsDir;
        } else {
            throw new \Exception('Каталога в который будут сохраняться изображения, не существует!');
        }
    }

    /**
     * Генерация изображения
     * @return bool|string|static
     */
    public function generate()
    {
        $resultFileName = md5(rand(1, 9999999) . 'fileName' . rand(1, 9999999)) . '.jpg';

        if ($this->tiling) {
            $result = $this->tilingMode();
        } else {
            $result = $this->singleMode();
        }

        if (ENVIRONMENT !== 'dev') {
            return $result->save($this->resultsDir . $resultFileName) ? $resultFileName : false;
        } else {
            return $result->show('jpg');
        }
    }

    /**
     * Режим замощения
     * @return \Imagine\Image\ImageInterface|static
     */
    private function tilingMode()
    {
        $count = $this->count['x'] * $this->count['y'];

        $marginsX = $this->margins['x'] > 0 ? $this->count['x'] * $this->margins['x'] : 0;
        $marginsY = $this->margins['y'] > 0 ? $this->count['y'] * $this->margins['y'] : 0;

        $width = ($this->count['x'] * $this->watermark['size']->getWidth()) + $marginsX;
        $height = ($this->count['y'] * $this->watermark['size']->getHeight()) + $marginsY;

        //создаем большой слой для коллажа вотермарков
        $collage = $this->imageine->create(new Imagine\Image\Box($width, $height));

        $point = $this->getPoint();

        //вставляем в наше полотно исходное изображение
        $collage->paste($this->image['src'], $this->getPoint());

        $x = 0;
        $y = 0;

        //делаем коллаж вотермарков
        for ($i = 0; $i < $count; $i++) {
            $collage->paste($this->watermark['src'], new Imagine\Image\Point($x, $y));

            //смещаемся вправо на ширину картинки + отступ
            $x += $this->watermark['size']->getWidth() + $this->margins['x'];

            //Когда дошли до конца ряда, смещаемся по оси Y на высоту картинки и опять идем от левого края
            if ($x >= $width) {
                $y += $this->watermark['size']->getHeight() + $this->margins['y'];
                $x = 0;
            }
        }

        //делаем обрезку по ширине высоте исходного изображения
        return $collage->crop($point,
            new Imagine\Image\Box($this->image['size']->getWidth(), $this->image['size']->getHeight()));
    }

    /**
     * Возращает точку, где расположить изображение
     * @return \Imagine\Image\Point
     */
    private function getPoint()
    {
        $x = ($this->coordinates['x'] !== 0) ? ($this->coordinates['x'] * $this->factor) : 0;

        if (!$this->tiling) {
            if ($x < 0) {
                $x = 0;
            }

            if ($this->image['size']->getWidth() < ($x + $this->watermark['size']->getWidth())) {
                $x = $this->image['size']->getWidth() - $this->watermark['size']->getWidth();
            }
        } else {
            if ($x < 0) {
                $x = $x * -1;
            }
        }

        $y = ($this->coordinates['y'] !== 0) ? ($this->coordinates['y'] * $this->factor) : 0;

        if (!$this->tiling) {
            if ($y < 0) {
                $y = 0;
            }

            if ($this->image['size']->getHeight() < ($y + $this->watermark['size']->getHeight())) {
                $y = $this->image['size']->getHeight() - $this->watermark['size']->getHeight();
            }
        } else {
            if ($y < 0) {
                $y = $y * -1;
            }
        }

        return new Imagine\Image\Point($x, $y);
    }

    /**
     * Одиночный режим
     * @return mixed
     */
    private function singleMode()
    {
        return $this->image['src']->paste($this->watermark['src'], $this->getPoint());
    }
}

try {
    $json = [
        'error' => true
    ];


    if (isset($_POST['img']) && !empty($_POST['img']) && file_exists(urldecode("..{$_POST['img']}"))) {

        if (isset($_POST['watermark']) && !empty($_POST['watermark']) && file_exists(urldecode("..{$_POST['watermark']}"))) {

            if (isset($_POST['x']) &&
                isset($_POST['y']) &&
                isset($_POST['factor']) && !empty($_POST['factor']) &&
                isset($_POST['opacity']) && !empty($_POST['opacity'])
            ) {
                $data = [
                    'img' => urldecode($_POST['img']),
                    'watermark' => urldecode($_POST['watermark']),
                    'x' => (int)$_POST['x'],
                    'y' => (int)$_POST['y'],
                    'factor' => floatval($_POST['factor']),
                    'opacity' => (int)$_POST['opacity']
                ];

                //signleMode
                if (isset($_POST['tiling']) && !empty($_POST['tiling']) && $_POST['tiling'] == 'true') {
                    if (isset($_POST['marginX']) &&
                        isset($_POST['marginY']) &&
                        isset($_POST['countX']) && !empty($_POST['countX']) &&
                        isset($_POST['countY']) && !empty($_POST['countY'])
                    ) {
                        $data['tiling'] = true;
                        $data['marginX'] = (int)$_POST['marginX'];
                        $data['marginY'] = (int)$_POST['marginY'];
                        $data['countX'] = (int)$_POST['countX'];
                        $data['countY'] = (int)$_POST['countY'];
                    }
                }

                $watermark = new Watermark($data);

                if ($result = $watermark->generate()) {
                    $json['error'] = false;
                    $json['result'] = "/uploads/results/{$result}";
                }

            } else {
                $json['msg'] = 'Не заданы все параметры!';
            }
        } else {
            $json['msg'] = 'Не найден водяной знак!';
        }
    } else {
        $json['msg'] = 'Не найдено исходное изображение!';
    }

    header('Content-Type: application/json');
    echo json_encode($json);
} catch (\Exception $e) {
    echo $e->getMessage();
}

