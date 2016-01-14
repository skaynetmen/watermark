//Объявление модуля
var fileUpload = (function (){

//инициализация модуля
var init = function(){
	_setupListeners();
};
//прослушиваемые события
var _setupListeners = function (){
	_fileUploadFn('#uploadImg', '.workspace__img');
	_fileUploadFn('#uploadWatermark', '.workspace__watermark-img');
};
//Грузим файлы на сервер
var _fileUploadFn = function (inputFile, container) {

	//рабочие элементы
	var inputImg = $(inputFile),
			inputImgContainer = inputImg.closest('.form__label', '.form__upload'),
			fakeTextUrl = inputImgContainer.find('.form__input'),
			fileName = inputImgContainer.find('.form__upload-group-btn'),
			progressWrap = inputImgContainer.find('#progress'),
			progressBar = inputImgContainer.find('.progress-bar'),
			wrapContainer = $(container).closest('.workspace__img');

	 //Инициализируем FileUpload
				$(inputFile).fileupload({

						// Папка где располагается PHP скрипт jQuery File Upload 
						url: 'api/upload.php',

						// Функция, выполняющаяся при отправке данных на сервер
						add: function (e, data) {
							console.log('добавляем');
								data.submit();
								},
						//сервер === "OK"
						success: function (data) {
							var imgObj = $.parseJSON(data),
									imgUrl = 'api/' + imgObj.url;

						 //запись пути элемента в src
						 $(container).remove;
						 //если главная картинка, добавляем и меняем размеры
						 //+ блок под водяной знак
						 if (container == '.workspace__img') {
						 	$('<img src="' + imgUrl + '">').appendTo(wrapContainer);

								console.log('Выполнено');
						 }
			//главная картинка
		}
});
};
//возврат объекта. публичные методы
return {
	init:init
};

})();
//вызываем модуль
fileUpload.init();