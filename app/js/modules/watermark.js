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

// Переключает в режим замощения
$('.mode__link_tile').on('click', function (e) {
  e.preventDefault();

  wtMode.toggle = false;

  wtPosition();
  wtDrag();
  wtSpin();
  wtGrid();

  $('.mode__link_tile').addClass('active');
  $('.mode__link_single').removeClass('active');
});


// Переключает в режим одной картинки
$('.mode__link_single').on('click', function (e) {
  e.preventDefault();

  wtMode.toggle = true;

  wtPosition();
  wtDrag();
  wtSpin();
  wtGrid();

  $('.mode__link_single').addClass('active');
  $('.mode__link_tile').removeClass('active');
});


// Позиционирование водяного знака при загрузке страницы и переключениях режимов работы
var wtPosition = function(){

  if (!wtMode.toggle) {

          var wtImg = $('.workspace__watermark-img'),
              imgWidth = $('.workspace__img').outerWidth(),
              imgHeight = $('.workspace__img').outerHeight(),
              w = screen.width/wtImg.outerWidth(),
              h = screen.height/wtImg.outerHeight();

          // Создает новый элемент-обертку для элемента, содержащего водяные знаки
          $('<div id="workspaceTileWrapper"></div>')
              .prependTo('#workspace')
              .css({"width": imgWidth, "height": imgHeight, "position": "absolute", "overflow": "hidden", "z-index": "1" })
              .position({top: 0, left: 0});

          // Создает новый элемент для заполнения его копиями водяного знака
          $('<div id="workspaceTile"></div>')
              .prependTo('#workspaceTileWrapper')
              .css({"width": screen.width*2, "height": screen.width*2, "font-size": 0 })
              .offset({top: 0-screen.width/2, left: 0-screen.width/2});

          // Подготовка элементов рабочего пространства
          $('.workspace__watermark').hide();
          $('.workspace__watermark-img').css({"display": "inline-block"});

          // Устанавливает число копий водяного знака и помещает их в нужный элемент
          for (var i = 1; i < (w*h)*4 ; i++) {
            $('#workspaceWt')
              .clone()
              .prependTo('#workspaceTile')
              .css({ "position": "relative", "display": "inline-block" })
              .insertAfter($('#workspaceWt'));
          }



  } else if (wtMode.toggle) {

          // Сохранение значений
          $(".workspace__img").position({top: imgSinglePos.imgY, left: imgSinglePos.imgX })

          // Подготовка элементов рабочего пространства
          $('.workspace__watermark').show().css({"display": "block"});
          $('#workspaceTileWrapper').remove();

          // Центрирование фоновой картинки в рабочей зоне
          $(".workspace__img").position({
            of: $("#workspace"),
            my: "center center",
            at: "center center"
          });
  }
};

// Позиционирование водяного знака мышью
var wtDrag = function(){
  if (!wtMode.toggle) {

          // Сохранение значений
          $(".workspace__watermark").position({top: imgTilePos.imgY, left: imgTilePos.imgX })

          var selectedClass = 'workspace__watermark';
          var $draggableElems = $(".workspace__watermark").draggable({
            scroll: false,
            start: function(e, ui) {
              if (e.target.id == "workspaceWt") $draggableElems.addClass(selectedClass);
              else return false;
            },
            drag: function(e, ui) {
              if (e.target.id == "workspaceWt") {
                $('.' + selectedClass).css({
                  top: ui.position.top,
                  left: ui.position.left
                });
              }
            }
          });

  } else if (wtMode.toggle) {

          $(".workspace__watermark").position({top: imgSinglePos.imgY, left: imgSinglePos.imgX })

          $("#workspaceWt").draggable({
            containment:".workspace__img",
            snap:".workspace__img",
            scroll: false,
            drag: function(){
              var position = $(this).position(),
                  imgMarginTop = $(".workspace__img").position().top,
                  imgMarginLeft = $(".workspace__img").position().left,
                  xPos = position.left,
                  yPos = position.top;
                  imgSinglePos.imgX = xPos;
                  imgSinglePos.imgY = yPos;

              $("#workspaceWt").attr('data-x', xPos - imgMarginLeft);
              $("#workspaceWt").attr('data-y', yPos - imgMarginTop);
              $("#spinner-1").spinner( "value", xPos - imgMarginLeft);
              $("#spinner-2").spinner( "value", yPos - imgMarginTop);
            }
          });
  }
};

// Позиционирование водяного знака спиннерами и изменение отступов между копиями водяного знака
var wtSpin = function(){

  if (!wtMode.toggle) {

          // Сохранение значений
          $("#spinner-1").spinner( "value", margin.MarginX );
          $("#spinner-2").spinner( "value", margin.MarginY );
          $('.workspace__watermark-img').css({ "margin-right": margin.MarginX, "margin-bottom": margin.MarginY });
          $('.grid__padding-y').css({ "width": 10 + "px" });
          $('.grid__padding-x').css({ "height": 10 + "px" });


          // Задает новую логику работы спиннеров
          $("#spinner-1").spinner({
            min: 0,
            max: 100,
            spin: function(event, ui) {
              $(this).change();
              var x = $(this).spinner('value');
              margin.MarginX = x;

              $('.workspace__watermark-img').css({ "margin-right": x });
              $('.grid__padding-y').css({ "width": 10 + x/3.3 + "px" });
            }
          });

          $("#spinner-2").spinner({
            min: 0,
            max: 100,
            spin: function(event, ui) {
              $(this).change();
              var y = $(this).spinner('value');
              margin.MarginY = y;

              $('.workspace__watermark-img').css({ "margin-bottom": y });
              $('.grid__padding-x').css({ "height": 10 + y/3.3 + "px" });
            }
          });

  } else if (wtMode.toggle) {

          var imgWidth = $(".workspace__img").outerWidth(),
              watermarkWidth = $("#workspaceWt").outerWidth(true),
              imgHeight = $(".workspace__img").outerHeight(),
              watermarkHeight = $("#workspaceWt").outerHeight(true);


          $("#spinner-1").spinner({
              min: 0,
              max: imgWidth - watermarkWidth,
              spin: function(event, ui) {
                $(this).change();
                var x = $(this).spinner('value');
                $("#workspaceWt").attr('data-x', (x + $(".workspace__img").position().left));
                $("#workspaceWt").css({left: (x + $(".workspace__img").position().left)});
              }
          });

          $("#spinner-2").spinner({
              min: 0,
              max: imgHeight - watermarkHeight,
              spin: function(event, ui) {
                var y = $(this).spinner('value');
                $("#workspaceWt").attr('data-y', (y + $(".workspace__img").position().top));
                $("#workspaceWt").css({top: (y + $(".workspace__img").position().top)});
              }
          });


          // Обнуление значений
          $( "#spinner-1" ).spinner( "value", 0 );
          $( "#spinner-2" ).spinner( "value", 0 );
          $('.workspace__watermark-img').css({ "margin-right": 0, "margin-bottom": 0 });
  }
};

//  Позиционирование водяного знака сеткой
var wtGrid = function(){
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
              gridPaddingHeight = ((imgHeight/3 - watermarkHeight)/2) + imgMarginTop,
              gridPaddingWidth = ((imgWidth/3 - watermarkWidth)/2) + imgMarginLeft;

          // Скрывает индикаторы отступа
          $('.grid__padding').hide();

          // Позиционирование по сетке
          $(".grid__link").on('click', function(e) {
          	e.preventDefault();

            var $that = $(this),
                gridNumber = parseInt($that.data('value')),
                x = 0,
                y = 0;

          	if ($('#checkCenter').prop('checked')) {
              // Позиционирование в центре каждой ячейки сетки
              switch(gridNumber) {
                case 1:
                  var x = gridPaddingWidth,
                      y = gridPaddingHeight;
                  break;

                case 2:
                  var x = imgWidth/3 + gridPaddingWidth,
                      y = gridPaddingHeight;
                  break;

                case 3:
                  var x = (imgWidth - imgWidth/3) + gridPaddingWidth,
                      y = gridPaddingHeight;

                  if (watermarkWidth > imgWidth/3) x = imgWidth - watermarkWidth + imgMarginLeft;
                  break;

                case 4:
                  var x = gridPaddingWidth,
                      y = imgHeight/3 + gridPaddingHeight;
                  break;

                case 5:
                  var x = imgWidth/3 + gridPaddingWidth,
                      y = imgHeight/3 + gridPaddingHeight;
                  break;

                case 6:
                  var x = (imgWidth - imgWidth/3) + gridPaddingWidth,
                      y = imgHeight/3 + gridPaddingHeight;

                  if (watermarkWidth > imgWidth/3) x = imgWidth - watermarkWidth + imgMarginLeft;
                  break;

                case 7:
                  var x = gridPaddingWidth,
                      y = (imgHeight - imgHeight/3) + gridPaddingHeight;

                  if (watermarkHeight > imgHeight/3) y = imgHeight - watermarkHeight + imgMarginTop;
                  break;

                case 8:
                  var x = imgWidth/3 + gridPaddingWidth,
                      y = (imgHeight - imgHeight/3) + gridPaddingHeight;

                  if (watermarkHeight > imgHeight/3) y = imgHeight - watermarkHeight + imgMarginTop;
                  break;

                case 9:
                  var x = (imgWidth - imgWidth/3) + gridPaddingWidth,
                      y = (imgHeight - imgHeight/3) + gridPaddingHeight;

                  if (watermarkWidth > imgWidth/3) x = imgWidth - watermarkWidth + imgMarginLeft;
                  if (watermarkHeight > imgHeight/3) y = imgHeight - watermarkHeight + imgMarginTop;
                  break;
              }
          	} else {
              // Позиционирование в ячейках по краям фонового изображения
              switch(gridNumber) {
                case 1:
                  var x = imgMarginLeft,
                      y = imgMarginTop;
                  break;

                case 2:
                  var x = imgWidth/2 - watermarkWidth/2 + imgMarginLeft,
                      y = imgMarginTop;
                  break;

                case 3:
                  var x = imgWidth - watermarkWidth + imgMarginLeft,
                      y = imgMarginTop;

                  if (watermarkWidth > imgWidth/3) x = imgWidth - watermarkWidth + imgMarginLeft;
                  break;

                case 4:
                  var x = imgMarginLeft,
                      y = imgHeight/2 - watermarkHeight/2 + imgMarginTop;
                  break;

                case 5:
                  var x = imgWidth/2 - watermarkWidth/2 + imgMarginLeft,
                      y = imgHeight/2 - watermarkHeight/2 + imgMarginTop;
                  break;

                case 6:
                  var x = imgWidth - watermarkWidth + imgMarginLeft,
                      y = imgHeight/2 - watermarkHeight/2 + imgMarginTop;

                  if (watermarkWidth > imgWidth/3) x = imgWidth - watermarkWidth + imgMarginLeft;
                  break;

                case 7:
                  var x = imgMarginLeft,
                      y = imgHeight - watermarkHeight + imgMarginTop;

                  if (watermarkHeight > imgHeight/3) y = imgHeight - watermarkHeight + imgMarginTop;
                  break;

                case 8:
                  var x = imgWidth/2 - watermarkWidth/2 + imgMarginLeft,
                      y = imgHeight - watermarkHeight + imgMarginTop;

                  if (watermarkHeight > imgHeight/3) y = imgHeight - watermarkHeight + imgMarginTop;
                  break;

                case 9:
                  var x = imgWidth - watermarkWidth + imgMarginLeft,
                      y = imgHeight - watermarkHeight + imgMarginTop;

                  if (watermarkWidth > imgWidth/3) x = imgWidth - watermarkWidth + imgMarginLeft;
                  if (watermarkHeight > imgHeight/3) y = imgHeight - watermarkHeight + imgMarginTop;
                  break;
              }
          	}

            if (x < imgMarginLeft) x = imgMarginLeft;
            if (y < imgMarginTop) y = imgMarginTop;

            $workspaceWt
              .css({top: y, left: x})
              .attr( 'data-y', y )
              .attr( 'data-x', x );

            $spinnerX.spinner( "value", (x - imgMarginLeft) );
            $spinnerY.spinner( "value", (y - imgMarginTop) );
          });
  }
};


module.exports = {
  init: function() {
    wtPosition();
    wtDrag();
    wtSpin();
    wtGrid();
  },
  getX: function () {
    return imgX;
  },
  getY: function () {
    return imgY;
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
};
