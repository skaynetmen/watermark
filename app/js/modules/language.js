var $strings = $('[data-localize]'),
    currentLang = 'ru',
    $language = $('.language');

//инициализация модуля
var languageChange = function () {
    setupListeners();
};

//смена языка
var setLang = function (value) {
    $strings.localize('language', {language: value});
};

//прослушиваемые события
var setupListeners = function () {
    var cookieLang = Cookies.get('lang');

    //если пользователь изменял язык и он отличается от текущего, переводим
    if (cookieLang && cookieLang !== currentLang) {
        currentLang = cookieLang;

        setLang(currentLang);
    }

    $language
        .find('.sidebar__link[data-lang="' + cookieLang + '"]')
        .closest('.sidebar__item')
        .addClass('sidebar__item_active')
        .siblings()
        .removeClass('sidebar__item_active');

    $language.on('click', '.sidebar__link', localization);
};

//работа с элементами
var localization = function (e) {
    e.preventDefault();

    var $that = $(this),
        lang = $that.data('lang');

    setLang(lang);

    currentLang = lang;

    Cookies.set('lang', lang);

    $that
        .closest('.sidebar__item')
        .addClass('sidebar__item_active')
        .siblings()
        .removeClass('sidebar__item_active');
};
//возврат объекта. публичные методы
module.exports = {
    init: languageChange
};
