var
    $preloader = $('#preloader'),
    duration = 300;

/**
 * Вкл прелодаер
 */
var show = function () {
    $preloader.fadeIn(duration);
};

/**
 * Выкл прелоадер
 */
var hide = function () {
    $preloader.fadeOut(duration);
};

/**
 * Тугнуть прелоадер
 */
var toggle = function () {
    $preloader.fadeToggle(duration);
};

module.exports = {
    show: show,
    hide: hide,
    toggle: toggle
};