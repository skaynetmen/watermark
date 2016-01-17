var 
	ruEng = require('./modules/language.js'),
	socialSharing = require ('./modules/socialShare.js'),
	fileUpload = require('./modules/fileUpload.js'),
	slider = require('./modules/slider.js'),
	watermark = require('./modules/watermark.js'),
	reset = require('./modules/reset.js'),
	download = require('./modules/download.js'),
	preloader = require('./modules/preloader.js'),
	alert = require('./modules/alert.js');

$(document).ready(function(){
	//Запускаем модуль локализации
	ruEng.init();

	var $disabler = $('#disabler');

	//Запускаем модуль загрузки файлов
	fileUpload.init(alert, preloader);

	//После успешной загрузки изображения разблокируем загрузку водяного знака
	fileUpload.setSuccessUploadImg(function () {
		$disabler.removeClass('disable-watermark');
	});

	//После успешной загрузки водяного знака разблокируем настройки
	//и запускаем модуль положения, слайдера, загрузки и сброса
	fileUpload.setSuccessUploadWatermark(function () {
		$disabler.fadeOut();
		watermark.init(fileUpload);
		slider.init();
		download.init(fileUpload, watermark, slider, alert);
		reset.init(slider, watermark);
	});

	//Запускаем модуль шаринга в соц сетях
	socialSharing.init();

	//Запускаем модуль алертов
	alert.init();

	//Просто для видимости объектов
	$('#spinner-1').spinner();
	$('#spinner-2').spinner();
	$('#slider').slider({range: 'min'});
});
