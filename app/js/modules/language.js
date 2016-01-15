
//инициализация модуля
var languageChange = function(){
	setupListeners();
};
//прослушиваемые события
var setupListeners = function (){
	$('.language').on('click', '.sidebar__link', localization);
};
//работа с элементами
var localization = function (e){
	var $strings = $('[data-localize]');
	e.preventDefault();
	$strings.localize('language', {language: $(this).data('lang')});
};
//возврат объекта. публичные методы
    module.exports = {
        init:languageChange
    };
