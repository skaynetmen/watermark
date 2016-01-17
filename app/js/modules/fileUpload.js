"use strict";

var
    imagePath,
    watermarkPath,
    $uploadImg = $('#uploadImg'),
    $uploadWatermark = $('#uploadWatermark'),
    $fakeInputImg = $uploadImg.closest('.form__upload').find('.form__input'),
    $buttonUploadImg = $uploadImg.closest('.form__upload').find('.form__btn'),
    $fakeInputWatermark = $uploadWatermark.closest('.form__upload').find('.form__input'),
    $buttonUploadWatermark = $uploadWatermark.closest('.form__upload').find('.form__btn'),
    imgWidth,
    imgHeight,
    watermarkWidth,
    watermarkHeight,
    factor = 1,
    $workspace = $('#workspace'),
    $workspaceImg = $('.workspace__img'),
    $workspaceWatermark = $('.workspace__watermark-img'),
    successUploadImg,
    successUploadWatermark,
    firstUploadImg = true,
    firstUploadWatermark = true,
    moduleAlert,
    modulePreloader,
    moduleWatermark;


/**
 * После загрузки исходного изображения задаем высоту обертке и считаем во сколько раз уменьшилось изображение
 */
function afterUploadImg() {
    if (!firstUploadImg) {
        $workspace.removeAttr('style');
        moduleWatermark.reCalc();
    }

    var imgHeightOnWorkspace = $workspaceImg.outerHeight(true),
        imgWidthOnWorkspace = $workspaceImg.outerWidth(true);

    //если изображение на рабочей облости меньше чем на самом деле, считаем во сколько раз оно уменьшилось
    if (imgHeight > imgHeightOnWorkspace) {
        factor = Math.ceil(imgHeight / imgHeightOnWorkspace);
    }

    //для центрирования по вертикали задаем высоту рабочей облости
    $workspace.css({
        'width': imgWidth / factor,
        'height': imgHeight / factor
    });

    if (firstUploadImg && typeof successUploadImg == 'function') {
        successUploadImg.call();
    }

    firstUploadImg = false;

    modulePreloader.hide();
}

/**
 * Загружаем картинку на рабочую область
 */
function addImgToWorkspace() {
    var image = new Image();

    image.src = imagePath;

    image.onload = function () {
        imgWidth = image.width;
        imgHeight = image.height;

        $workspaceImg.attr('src', imagePath);

        afterUploadImg();
    };
}

/**
 * Колбек загрузки исходного изображения
 * @param e
 * @param data
 */
var doneImg = function (e, data) {
    $.each(data.result.files, function (index, file) {
        if (file.type == 'image/jpeg' || file.type == 'image/png') {
            imagePath = file.url;
            addImgToWorkspace();
        } else {
            //$.ajax({
            //    type: file.deleteType,
            //    url: file.deleteUrl
            //});
            moduleAlert.danger('Загруженный файл не является изображением!');
            modulePreloader.hide();
        }
    });
};

/**
 * Колбек прогрессбара
 * @param e
 * @param data
 */
var progressall = function (e, data) {
    var progress = parseInt(data.loaded / data.total * 100, 10);
};

var showPreloader = function () {
    modulePreloader.show();
};

/**
 * Настройки плагина fileupload для исходного изображения
 * @type {{url: string, dataType: string, done: doneImg, progressall: progressall}}
 */
var uploadImgOptions = {
    url: '/api/upload.php',
    dataType: 'json',
    done: doneImg,
    progressall: progressall,
    change: showPreloader
};

/**
 * Масшабируем водяной знак после загрузки
 */
function afterUploadWatermark() {
    var height = watermarkHeight / factor,
        width = watermarkWidth / factor;

    $('.workspace__watermark-img').css({
        'width': width,
        'height': height
    });

    if (!firstUploadWatermark) {
        moduleWatermark.reCalc();
    }

    if (firstUploadWatermark && typeof successUploadWatermark == 'function') {
        successUploadWatermark.call();
    }

    firstUploadWatermark = false;

    modulePreloader.hide();
}

/**
 * Загружаем картинку на рабочую область
 */
function addWatermarkToWorkspace() {
    var image = new Image();

    image.src = watermarkPath;

    image.onload = function () {
        watermarkWidth = image.width;
        watermarkHeight = image.height;

        $('.workspace__watermark-img').each(function () {
            $(this).attr('src', watermarkPath)
        });

        afterUploadWatermark();
    };
}

/**
 * Колбек загрузки водяного знака
 * @param e
 * @param data
 */
var doneWatermark = function (e, data) {
    $.each(data.result.files, function (index, file) {
        if (file.type == 'image/jpeg' || file.type == 'image/png') {
            watermarkPath = file.url;
            addWatermarkToWorkspace();
        } else {
            //$.ajax({
            //    type: file.deleteType,
            //    url: file.deleteUrl
            //});
            moduleAlert.danger('Загруженный файл не является изображением!');
            modulePreloader.hide();
        }
    });
};

/**
 * Настройки плагина fileupload для водяного знака
 * @type {{url: string, dataType: string, done: doneWatermark, progressall: progressall}}
 */
var uploadWatermarkOptions = {
    url: '/api/upload.php',
    dataType: 'json',
    done: doneWatermark,
    progressall: progressall,
    change: showPreloader
};

/**
 * Инициализация плагина на поля загрузки
 */
var init = function () {
    $uploadImg.fileupload(uploadImgOptions);
    $uploadWatermark.fileupload(uploadWatermarkOptions);
};

/**
 * Заставляем на нажатию на поле и кнопку открывать выбор файла
 * и выводим имя файла в фейковое поле
 */
var fakeFileInput = function () {
    var triggerImg = function () {
        $('#uploadImg').trigger('click');
    };

    $fakeInputImg.on('click', triggerImg);
    $buttonUploadImg.on('click', triggerImg);

    var updateValueImg = function () {
        $fakeInputImg.val($uploadImg.val());
    };

    $uploadImg.on('change', updateValueImg);

    //------------ watermark -------------
    var triggerWatermark = function () {
        $('#uploadWatermark').trigger('click');
    };

    $fakeInputWatermark.on('click', triggerWatermark);
    $buttonUploadWatermark.on('click', triggerWatermark);

    var updateValueWatermark = function () {
        $fakeInputWatermark.val($uploadWatermark.val());
    };

    $uploadWatermark.on('change', updateValueWatermark);
};


module.exports = {
    init: function (alert, preloader, watermark) {
        moduleAlert = alert;
        modulePreloader = preloader;
        moduleWatermark = watermark;

        fakeFileInput();
        init();
    },
    getImgPath: function () {
        return imagePath;
    },
    getWatermarkPath: function () {
        return watermarkPath;
    },
    getImgWidth: function () {
        return imgWidth;
    },
    getImgHeight: function () {
        return imgHeight;
    },
    getWatermarkWidth: function () {
        return watermarkWidth;
    },
    getWatermarkHeight: function () {
        return watermarkHeight;
    },
    getFactor: function () {
        return factor;
    },
    setSuccessUploadImg: function (callback) {
        if (typeof callback == 'function') {
            successUploadImg = callback;
        }
    },
    setSuccessUploadWatermark: function (callback) {
        if (typeof callback == 'function') {
            successUploadWatermark = callback;
        }
    }
};