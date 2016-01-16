"use strict";

var
    moduleSlider,
    $reset = $('#reset'),
    $grid = $('.grid__link[data-value="1"]');

/**
 * Делаем эмитацию клика по сетке (1ой ячейке)
 * и сбрасываем прозрачность
 */
function reset() {
    $grid.trigger('click');

    if (moduleSlider && moduleSlider.setOpacity()) {
        moduleSlider.setOpacity(100);
    }
}

/**
 * Обрабатываем клик по кнопке сброса
 */
var init = function() {
    $reset.on('click', reset);
};

module.exports = {
    init: function (slider) {
        moduleSlider = slider;

        init();
    }
};