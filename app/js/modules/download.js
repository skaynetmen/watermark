"use strict";

var
    moduleUpload,
    moduleWatermark,
    moduleSlider,
    $submit = $('#submit'),
    data = {
        tiling: false,
        img: null,
        watermark: null,
        x: 0,
        y: 0,
        factor: 1,
        opacity: 100,
        marginX: 0,
        marginY: 0
    },
    result;

/**
 * Обработка ответа от сервера,
 * если все нормально редиректим пользователя на картинку
 * @param data
 */
var success = function (data) {
    if (!data.error) {
        result = data.result;

        window.location.replace(data.result)
    } else {
        alert(data.msg);
    }
};

/**
 * Обрабатываем неудачное подключение к серверу
 */
var error = function () {
    alert('Не удалось подключиться к серверу!');
};

/**
 * Параметры для jQuery ajax
 * @type {{method: string, url: string, dataType: string, data: {singleMode: boolean, img: null, watermark: null, x: number, y: number, factor: number, opacity: number, marginX: number, marginY: number}, success: success, error: error}}
 */
var options = {
    method: 'post',
    url: '/api/download.php',
    dataType: 'json',
    data: data,
    success: success,
    error: error
};

/**
 * Выполняем ajax запрос
 */
function ajax() {
    $.ajax(options);
}

/**
 * Получаем данные из модулей для отправки на сервер
 */
function getData() {
    data.img = moduleUpload.getImgPath() || null;
    data.watermark = moduleUpload.getWatermarkPath() || null;
    data.factor = moduleUpload.getFactor() || 1;

    data.tiling = moduleWatermark.getMode();
    data.x = moduleWatermark.getX();
    data.y = moduleWatermark.getY();
    data.marginX = moduleWatermark.getMarginX();
    data.marginY = moduleWatermark.getMarginY();

    data.opacity = moduleSlider.getOpacity();

    ajax();
}

/**
 * Обрабатываем клик по кнопке скачать
 */
var init = function () {
    $submit.on('click', function () {
        if (moduleUpload && moduleUpload.getImgPath() &&
            moduleWatermark && moduleWatermark.getX() &&
            moduleSlider && moduleSlider.getOpacity()
        ) {
            getData();
        }
    });
};

module.exports = {
    init: function (upload, watermark, slider) {
        moduleUpload = upload;
        moduleWatermark = watermark;
        moduleSlider = slider;

        init();
    },
    getResult: function () {
        return result;
    }
};
