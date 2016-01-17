"use strict";

var
    moduleUpload,
    moduleWatermark,
    moduleSlider,
    moduleAlert,
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
        marginY: 0,
        countX: 0,
        countY: 0
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

        Cookies.set('resultImg', data.result);

        window.location.replace(data.result)
    } else {
        moduleAlert.danger(data.msg);
    }
};

/**
 * Обрабатываем неудачное подключение к серверу
 */
var error = function () {
    moduleAlert.danger('Не удалось подключиться к серверу!');
};

/**
 * Параметры для jQuery ajax
 * @type {{method: string, url: string, dataType: string, data: {singleMode: boolean, img: null, watermark: null, x: number, y: number, factor: number, opacity: number, marginX: number, marginY: number}, success: success, error: error}}
 */
var options = {
    method: 'post',
    url: '/api/download.php',
    dataType: 'json',
    success: success,
    error: error
};

/**
 * Выполняем ajax запрос
 */
var ajax = function (value) {
    options.data = value;

    $.ajax(options);
};

/**
 * Получаем данные из модулей для отправки на сервер
 */
var getData = function () {
    data.img = moduleUpload.getImgPath() || null;
    data.watermark = moduleUpload.getWatermarkPath() || null;
    data.factor = moduleUpload.getFactor() || 1;

    data.tiling = !moduleWatermark.getMode();
    data.x = moduleWatermark.getX();
    data.y = moduleWatermark.getY();
    data.marginX = moduleWatermark.getMarginX();
    data.marginY = moduleWatermark.getMarginY();
    data.countX = moduleWatermark.getCountX();
    data.countY = moduleWatermark.getCountY();

    data.opacity = moduleSlider.getOpacity();

    ajax(data);
};

/**
 * Обрабатываем клик по кнопке скачать
 */
var init = function () {
    $submit.on('click', function () {
        if (moduleUpload && moduleWatermark && moduleSlider) {
            getData();
        }
    });
};

module.exports = {
    init: function (upload, watermark, slider, alert) {
        moduleUpload = upload;
        moduleWatermark = watermark;
        moduleSlider = slider;
        moduleAlert = alert;

        init();
    },
    getResult: function () {
        return result;
    }
};
