"use strict";

var
    moduleSlider,
    moduleWatermark,
    $reset = $('#reset');
//$grid = $('.grid__link[data-value="1"]');

/**
 * Делаем эмитацию клика по сетке (1ой ячейке)
 * и сбрасываем прозрачность
 */
function reset() {
    if (moduleWatermark && typeof moduleWatermark.resetPosition == 'function') {
        moduleWatermark.resetPosition();
    }

    if (moduleSlider && typeof moduleSlider.setOpacity == 'function') {
        moduleSlider.setOpacity(100);
    }

    $(window).trigger('resize');
}

/**
 * Обрабатываем клик по кнопке сброса
 */
var init = function () {
    $reset.on('click', reset);
};

module.exports = {
    init: function (slider, watermark) {
        moduleSlider = slider;
        moduleWatermark = watermark;

        init();
    }
};