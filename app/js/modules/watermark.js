// Индикатор режима работа
// var toggle = true;

// Публичные переменные
var wtMode = {
        toggle: true
    },
    imgSinglePos = {
        imgX: 0,
        imgY: 0
    },
    imgTilePos = {
        imgX: 0,
        imgY: 0
    },
    margin = {
        MarginX: 0,
        MarginY: 0
    };


var
    moduleUpload,
    countX = 0,
    countY = 0,
    $workspaceWt = $('#workspaceWt'),
    widthWt = 0,
    heightWt = 0,
    x1 = 0,
    x2 = 0,
    y1 = 0,
    y2 = 0,
    positionX = 0,
    positionY = 0,
    $spinner1 = $('#spinner-1'),
    $spinner2 = $('#spinner-2'),
    spinnerIsInnit = false,
    workspaceWtWidth = 0,
    $gridItem = $('.grid__item'),
    $checkCenter = $('#checkCenter');

// Переключает в режим замощения
$('.mode__link_tile').on('click', function (e) {
    e.preventDefault();

    $workspaceWt.addClass('workspace__watermark_tile');

    if (wtMode.toggle) {
        wtMode.toggle = false;

        wtPosition();
        //wtDrag();
        wtSpin();
        wtGrid();

        $('.mode__link_tile').parent().addClass('mode__item_active').siblings().removeClass('mode__item_active');

        $gridItem.removeClass('grid__item_active');

        $checkCenter.prop('disabled', true);
    }
});


// Переключает в режим одной картинки
$('.mode__link_single').on('click', function (e) {
    e.preventDefault();

    $workspaceWt.removeClass('workspace__watermark_tile');

    if (!wtMode.toggle) {
        wtMode.toggle = true;

        wtPosition();
        //wtDrag();
        wtSpin();
        wtGrid();

        $('#workspaceWt').draggable("option", "containment", "parent");

        $('.mode__link_single').parent().addClass('mode__item_active').siblings().removeClass('mode__item_active');

        $checkCenter.prop('disabled', false);
    }
});

function workspaceWidth() {
    $workspaceWt.css({
        'width': widthWt,
        'height': heightWt
    });
}

function draggableContainment() {
    $workspaceWt.draggable("option", "containment", [x1, y1, x2, y2]);
}

function resetPosition() {
    $workspaceWt.css({'left': 0, 'top': 0});

    positionX = 0;
    positionY = 0;

    margin.MarginX = 0;
    margin.MarginY = 0;

    if (spinnerIsInnit) {
        $spinner1.spinner("value", 0);
        $spinner2.spinner("value", 0);
    }

    if (!wtMode.toggle) {
        $('.workspace__watermark-img').css({'margin-bottom': 0, 'margin-right': 0});

        widthWt = workspaceWtWidth;

        workspaceWidth();

        $('.grid__padding-y').css({"width": 10 + "px"});
        $('.grid__padding-x').css({"height": 10 + "px"});
    } else {
        $gridItem.removeClass('grid__item_active');
    }
}


// Позиционирование водяного знака при загрузке страницы и переключениях режимов работы
var wtPosition = function () {

    $workspaceWt.css({'left': 0, 'top': 0});

    //var factor = $workspace.height() / $('.workspace__img').outerHeight();

    var wtImg = $('.workspace__watermark-img'),
        h = Math.ceil(moduleUpload.getWatermarkHeight() / moduleUpload.getFactor());

    if (!wtMode.toggle) {
        var imgWidth = Math.ceil(moduleUpload.getImgWidth() / moduleUpload.getFactor()),
            imgHeight = Math.ceil(moduleUpload.getImgHeight() / moduleUpload.getFactor()),
            w = Math.ceil(moduleUpload.getWatermarkWidth() / moduleUpload.getFactor());


        //// Создает новый элемент-обертку для элемента, содержащего водяные знаки
        //$('<div id="workspaceTileWrapper"></div>')
        //    .prependTo('#workspace')
        //    .css({"width": imgWidth, "height": imgHeight, "position": "absolute", "overflow": "hidden", "z-index": "1" })
        //    .position({top: 0, left: 0});
        //
        //// Создает новый элемент для заполнения его копиями водяного знака
        //$('<div id="workspaceTile"></div>')
        //    .prependTo('#workspaceTileWrapper')
        //    .css({"width": screen.width*2, "height": screen.width*2, "font-size": 0 })
        //    .offset({top: 0-screen.width/2, left: 0-screen.width/2});
        //
        //// Подготовка элементов рабочего пространства
        //$('.workspace__watermark').hide();
        wtImg.css({"display": "inline-block", 'width': w, 'height': 'auto', 'vertical-align': 'top'});
        //
        //// Устанавливает число копий водяного знака и помещает их в нужный элемент


        countX = Math.ceil(imgWidth / w) * 2;
        countY = Math.ceil(imgHeight / h) * 2;


        widthWt = countX * w;
        heightWt = countY * h;

        workspaceWtWidth = widthWt;

        for (var i = 1; i < countX * countY; i++) {
            wtImg
                .clone()
                .appendTo('#workspaceWt');
            //.css({ "position": "relative", "display": "inline-block" })
            //.insertAfter($('#workspaceWt'));
        }

        workspaceWidth();

        var offset = $workspaceWt.offset();

        x1 = offset.left - (widthWt - imgWidth);

        y1 = offset.top - (heightWt - imgHeight);

        x2 = offset.left;
        y2 = offset.top;

        draggableContainment();

    } else if (wtMode.toggle) {
        wtImg.eq(0).removeAttr('style').siblings().remove();
        $workspaceWt.removeAttr('style').css('height', h);

        // Сохранение значений
        //$(".workspace__img").position({top: imgSinglePos.imgY, left: imgSinglePos.imgX });

        // Подготовка элементов рабочего пространства
        //$('.workspace__watermark').show().css({"display": "block"});
        //$('#workspaceTileWrapper').remove();

        // Центрирование фоновой картинки в рабочей зоне
        //$(".workspace__img").position({
        //  of: $("#workspace"),
        //  my: "center center",
        //  at: "center center"
        //});
    }
};

// Позиционирование водяного знака мышью
var wtDrag = function () {
    //if (!wtMode.toggle) {

    // Сохранение значений
    $(".workspace__watermark").position({top: imgTilePos.imgY, left: imgTilePos.imgX})

    //var selectedClass = 'workspace__watermark';
    var $draggableElems = $draggeble = $("#workspaceWt").draggable({
        containment: '#workspace',
        cursor: 'move',
        scroll: false,
        //start: function (e, ui) {
        //    if (e.target.id == "workspaceWt") $draggableElems.addClass(selectedClass);
        //    else return false;
        //},
        drag: function (e, ui) {
            positionX = ui.position.left;
            positionY = ui.position.top;

            $workspaceWt.css({
                top: ui.position.top,
                left: ui.position.left
            });

            //$workspaceWt
            //    .attr('data-x', positionX)
            //    .attr('data-y', positionY);

            if (wtMode.toggle) {
                $spinner1.spinner("value", positionX);
                $spinner2.spinner("value", positionY);
            }

            $gridItem.removeClass('grid__item_active');
        }
    });

    //} else if (wtMode.toggle) {
    //
    //        $(".workspace__watermark").position({top: imgSinglePos.imgY, left: imgSinglePos.imgX })
    //
    //        $("#workspaceWt").draggable({
    //          containment:".workspace__img",
    //          snap:".workspace__img",
    //          scroll: false,
    //          drag: function(){
    //            var position = $(this).position(),
    //                imgMarginTop = $(".workspace__img").position().top,
    //                imgMarginLeft = $(".workspace__img").position().left,
    //                xPos = position.left,
    //                yPos = position.top;
    //                imgSinglePos.imgX = xPos;
    //                imgSinglePos.imgY = yPos;
    //
    //            $("#workspaceWt").attr('data-x', xPos - imgMarginLeft);
    //            $("#workspaceWt").attr('data-y', yPos - imgMarginTop);
    //            $("#spinner-1").spinner( "value", xPos - imgMarginLeft);
    //            $("#spinner-2").spinner( "value", yPos - imgMarginTop);
    //          }
    //        });
    //}
};

// Позиционирование водяного знака спиннерами и изменение отступов между копиями водяного знака
var wtSpin = function () {

    spinnerIsInnit = true;

    if (!wtMode.toggle) {

        // Сохранение значений
        $spinner1.spinner("value", margin.MarginX);
        $spinner2.spinner("value", margin.MarginY);
        $('.workspace__watermark-img').css({"margin-right": margin.MarginX, "margin-bottom": margin.MarginY});
        $('.grid__padding-y').css({"width": 10 + "px"});
        $('.grid__padding-x').css({"height": 10 + "px"});


        // Задает новую логику работы спиннеров
        $spinner1.spinner({
            min: 0,
            max: 100,
            spin: function (event, ui) {
                $(this).change();
                var x = ui.value;

                if (margin.MarginX !== x) {
                    if (margin.MarginX > x) {
                        widthWt = widthWt - countX;
                        x1 = x1 + countX;

                    } else {
                        widthWt = widthWt + countX;
                        x1 = x1 - countX;
                    }

                    margin.MarginX = x;

                    workspaceWidth();

                    draggableContainment();

                    $('.workspace__watermark-img').css({"margin-right": x});
                    $('.grid__padding-y').css({"width": 10 + x / 3.3 + "px"});
                }
            }
        });

        $spinner2.spinner({
            min: 0,
            max: 100,
            spin: function (event, ui) {
                $(this).change();
                var y = ui.value;

                if (margin.MarginY !== y) {
                    if (margin.MarginY > y) {
                        heightWt = heightWt - countY;
                        y1 = y1 + countY;
                    } else {
                        heightWt = heightWt + countY;
                        y1 = y1 - countY;
                    }

                    margin.MarginY = y;

                    workspaceWidth();

                    draggableContainment();

                    $('.workspace__watermark-img').css({"margin-bottom": y});
                    $('.grid__padding-x').css({"height": 10 + y / 3.3 + "px"});
                }
            }
        });

    } else if (wtMode.toggle) {

        var imgWidth = $(".workspace__img").outerWidth(),
            watermarkWidth = $("#workspaceWt").outerWidth(true),
            imgHeight = $(".workspace__img").outerHeight(),
            watermarkHeight = $("#workspaceWt").outerHeight(true);


        $spinner1.spinner({
            min: 0,
            max: imgWidth - watermarkWidth,
            spin: function (event, ui) {
                $(this).change();
                var x = $(this).spinner('value');
                $("#workspaceWt").attr('data-x', (x + $(".workspace__img").position().left));
                $("#workspaceWt").css({left: (x + $(".workspace__img").position().left)});
            }
        });

        $spinner2.spinner({
            min: 0,
            max: imgHeight - watermarkHeight,
            spin: function (event, ui) {
                var y = $(this).spinner('value');
                $("#workspaceWt").attr('data-y', (y + $(".workspace__img").position().top));
                $("#workspaceWt").css({top: (y + $(".workspace__img").position().top)});
            }
        });


        // Обнуление значений
        $("#spinner-1").spinner("value", 0);
        $("#spinner-2").spinner("value", 0);
        $('.workspace__watermark-img').css({"margin-right": 0, "margin-bottom": 0});
    }
};

//  Позиционирование водяного знака сеткой
var wtGrid = function () {
    if (!wtMode.toggle) {

        // Показывает индикаторы отступа
        $('.grid__padding').show();

    } else if (wtMode.toggle) {

        var $workspaceWt = $("#workspaceWt"),
            $spinnerX = $("#spinner-1"),
            $spinnerY = $("#spinner-2"),
            imgMarginTop = $('.workspace__img').position().top,
            imgMarginLeft = $('.workspace__img').position().left,
            imgHeight = $('.workspace__img').outerHeight(),
            imgWidth = $('.workspace__img').outerWidth(),
            watermarkHeight = $("#workspaceWt").outerHeight(true),
            watermarkWidth = $("#workspaceWt").outerWidth(true),
            gridPaddingHeight = ((imgHeight / 3 - watermarkHeight) / 2) + imgMarginTop,
            gridPaddingWidth = ((imgWidth / 3 - watermarkWidth) / 2) + imgMarginLeft;

        // Скрывает индикаторы отступа
        $('.grid__padding').hide();

        // Позиционирование по сетке
        $(".grid__link").on('click', function (e) {
            e.preventDefault();

            if (wtMode.toggle) {

                var $that = $(this),
                    gridNumber = parseInt($that.data('value')),
                    x = 0,
                    y = 0;

                if ($checkCenter.prop('checked')) {
                    // Позиционирование в центре каждой ячейки сетки
                    switch (gridNumber) {
                        case 1:
                            var x = gridPaddingWidth,
                                y = gridPaddingHeight;
                            break;

                        case 2:
                            var x = imgWidth / 3 + gridPaddingWidth,
                                y = gridPaddingHeight;
                            break;

                        case 3:
                            var x = (imgWidth - imgWidth / 3) + gridPaddingWidth,
                                y = gridPaddingHeight;

                            if (watermarkWidth > imgWidth / 3) x = imgWidth - watermarkWidth + imgMarginLeft;
                            break;

                        case 4:
                            var x = gridPaddingWidth,
                                y = imgHeight / 3 + gridPaddingHeight;
                            break;

                        case 5:
                            var x = imgWidth / 3 + gridPaddingWidth,
                                y = imgHeight / 3 + gridPaddingHeight;
                            break;

                        case 6:
                            var x = (imgWidth - imgWidth / 3) + gridPaddingWidth,
                                y = imgHeight / 3 + gridPaddingHeight;

                            if (watermarkWidth > imgWidth / 3) x = imgWidth - watermarkWidth + imgMarginLeft;
                            break;

                        case 7:
                            var x = gridPaddingWidth,
                                y = (imgHeight - imgHeight / 3) + gridPaddingHeight;

                            if (watermarkHeight > imgHeight / 3) y = imgHeight - watermarkHeight + imgMarginTop;
                            break;

                        case 8:
                            var x = imgWidth / 3 + gridPaddingWidth,
                                y = (imgHeight - imgHeight / 3) + gridPaddingHeight;

                            if (watermarkHeight > imgHeight / 3) y = imgHeight - watermarkHeight + imgMarginTop;
                            break;

                        case 9:
                            var x = (imgWidth - imgWidth / 3) + gridPaddingWidth,
                                y = (imgHeight - imgHeight / 3) + gridPaddingHeight;

                            if (watermarkWidth > imgWidth / 3) x = imgWidth - watermarkWidth + imgMarginLeft;
                            if (watermarkHeight > imgHeight / 3) y = imgHeight - watermarkHeight + imgMarginTop;
                            break;
                    }
                } else {
                    // Позиционирование в ячейках по краям фонового изображения
                    switch (gridNumber) {
                        case 1:
                            var x = imgMarginLeft,
                                y = imgMarginTop;
                            break;

                        case 2:
                            var x = imgWidth / 2 - watermarkWidth / 2 + imgMarginLeft,
                                y = imgMarginTop;
                            break;

                        case 3:
                            var x = imgWidth - watermarkWidth + imgMarginLeft,
                                y = imgMarginTop;

                            if (watermarkWidth > imgWidth / 3) x = imgWidth - watermarkWidth + imgMarginLeft;
                            break;

                        case 4:
                            var x = imgMarginLeft,
                                y = imgHeight / 2 - watermarkHeight / 2 + imgMarginTop;
                            break;

                        case 5:
                            var x = imgWidth / 2 - watermarkWidth / 2 + imgMarginLeft,
                                y = imgHeight / 2 - watermarkHeight / 2 + imgMarginTop;
                            break;

                        case 6:
                            var x = imgWidth - watermarkWidth + imgMarginLeft,
                                y = imgHeight / 2 - watermarkHeight / 2 + imgMarginTop;

                            if (watermarkWidth > imgWidth / 3) x = imgWidth - watermarkWidth + imgMarginLeft;
                            break;

                        case 7:
                            var x = imgMarginLeft,
                                y = imgHeight - watermarkHeight + imgMarginTop;

                            if (watermarkHeight > imgHeight / 3) y = imgHeight - watermarkHeight + imgMarginTop;
                            break;

                        case 8:
                            var x = imgWidth / 2 - watermarkWidth / 2 + imgMarginLeft,
                                y = imgHeight - watermarkHeight + imgMarginTop;

                            if (watermarkHeight > imgHeight / 3) y = imgHeight - watermarkHeight + imgMarginTop;
                            break;

                        case 9:
                            var x = imgWidth - watermarkWidth + imgMarginLeft,
                                y = imgHeight - watermarkHeight + imgMarginTop;

                            if (watermarkWidth > imgWidth / 3) x = imgWidth - watermarkWidth + imgMarginLeft;
                            if (watermarkHeight > imgHeight / 3) y = imgHeight - watermarkHeight + imgMarginTop;
                            break;
                    }
                }

                if (x < imgMarginLeft) x = imgMarginLeft;
                if (y < imgMarginTop) y = imgMarginTop;

                $workspaceWt
                    .css({top: y, left: x})
                    .attr('data-y', y)
                    .attr('data-x', x);

                $spinnerX.spinner("value", (x - imgMarginLeft));
                $spinnerY.spinner("value", (y - imgMarginTop));

                positionX = x;
                positionY = y;

                $that.parent().addClass('grid__item_active').siblings().removeClass('grid__item_active');
            }
        });
    }
};


module.exports = {
    init: function (upload) {
        moduleUpload = upload;

        //wtPosition();
        wtDrag();
        wtSpin();
        wtGrid();
    },
    getX: function () {
        return positionX;
    },
    getY: function () {
        return positionY;
    },
    getMode: function () {
        return wtMode.toggle;
    },
    getMarginX: function () {
        return margin.MarginX;
    },
    getMarginY: function () {
        return margin.MarginY;
    },
    getCountX: function () {
        return countX;
    },
    getCountY: function () {
        return countY;
    },
    resetPosition: function () {
        resetPosition();
    }
};
