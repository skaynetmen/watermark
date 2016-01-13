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
			inputImgContainer = inputImg.closest('.form__label'),
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
            add: function(e, data) {
                data.submit();
}
});
}
//возврат объекта. публичные методы
return {
	init:init
};

})();
//вызываем модуль
fileUpload.init();