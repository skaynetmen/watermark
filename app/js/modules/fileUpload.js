//Объявление модуля
var fileUpload = (function (){

//инициализация модуля
var init = function(){
	_setupListeners();
};
//прослушиваемые события
var _setupListeners = function (){
	$('#id').on('click', _doSomething);
};
//работа с элементами
var _doSomething = function (){
	e.preventDefault();
};
//возврат объекта. публичные методы
return {
	init:init
};

})();
//вызываем модуль
fileUpload.init();