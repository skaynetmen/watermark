var 
	ruEng = require('./modules/language.js'),
	socialSharing = require ('./modules/socialShare.js'),
	fileUpload = require('./modules/fileUpload.js'),
	slider = require('./modules/slider.js'),
	watermark = require('./modules/watermark.js'),
	reset = require('./modules/reset.js'),
	download = require('./modules/download.js');

$(document).ready(function(){
	//Запускаем модуль загрузки файлов
	fileUpload.init();

	//После успешной загрузки изображения разблокируем загрузку водяного знака
	fileUpload.setSuccessUploadImg(function () {
	    $('.disable-watermark').fadeOut();
	});

	//После успешной загрузки водяного знака разблокируем настройки
	//и запускаем модуль положения, слайдера, загрузки и сброса
	fileUpload.setSuccessUploadWatermark(function () {
	    $('.disable-settings').fadeOut();
		watermark.init(fileUpload);
		slider.init();
		download.init(fileUpload, watermark, slider);
		reset.init(slider, watermark);
	});

	//Запускаем модуль локализации
	ruEng.init();

	//Запускаем модуль шаринга в соц сетях
	socialSharing.init();

	//Просто для видимости объектов
	$('#spinner-1').spinner();
	$('#spinner-2').spinner();
	$('#slider').slider();
});
