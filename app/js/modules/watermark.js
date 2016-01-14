// Заполнение рабочей зоны копиями водяного знака
var wtClone = function(){
  $('.mode__link_tile').on('click', function (e) {
    e.preventDefault();

    var wtImg = $('.workspace__watermark-img'),
        imgWidth = $('.workspace__img').outerWidth(),
        imgHeight = $('.workspace__img').outerHeight(),
        w = screen.width/wtImg.outerWidth(),
        h = screen.height/wtImg.outerHeight();

    // Создает новый элемент для заполнения его копиями водяного знака
    $('<div id="workspaceTile"></div>')
      .prependTo('#workspaceWt')
      .css({"width": screen.width*2, "height": screen.width*2, "font-size": 0 })
      .offset({top: 0, left: 0});

    // Устанавливает число копий водяного знака и помещает их в нужный элемент
    for (var i = 1; i < (w*h)*8 ; i++) {
      wtImg
        .prependTo('#workspaceTile')
        .clone()
        .insertAfter(wtImg);
    }

    // Подготовка элементов рабочего пространства
    $('#workspaceWt')
      .css({"width": imgWidth, "height": imgHeight, "overflow": "hidden"})
      .draggable('destroy');
    $('.workspace__watermark-img')
      .css({"max-width": imgWidth, "max-height": imgHeight, "display": "inline-block" })
      .attr('id', 'start');
    centerWt();
    $('.mode__link_tile').addClass('active');
    $('.grid__padding').show();

    // Делает перетаскиваемой группу водяных знаков
    var selectedClass = 'workspace__watermark-img';
    var $draggableElems = $(".workspace__watermark-img").draggable({
      scroll: false,
      start: function(e, ui) {
        if (e.target.id == "start") $draggableElems.addClass(selectedClass);
        else return false;
      },
      drag: function(e, ui) {
        if (e.target.id == "start") {
          $('.' + selectedClass).css({
            top: ui.position.top,
            left: ui.position.left
          });
        }
      }
    });

    // Обнуление значений спиннеров
    $("#spinner-1").spinner( "value", 0 );
    $("#spinner-2").spinner( "value", 0 );

    // Задает новую логику работы спиннеров
    $("#spinner-1").spinner({
      min: 0,
      max: 100,
      spin: function(event, ui) {
        $(this).change();
        var x = $(this).spinner('value');
        $('.workspace__watermark-img').css({ "margin-right": x });
        $('.grid__padding-x').css({ "height": 10 + x/3.3 + "px" });
      }
    });

    $("#spinner-2").spinner({
      min: 0,
      max: 100,
      spin: function(event, ui) {
        $(this).change();
        var y = $(this).spinner('value');
        $('.workspace__watermark-img').css({ "margin-bottom": y });
        $('.grid__padding-y').css({ "width": 10 + y/3.3 + "px" });
      }
    });

    // Убирает возможность клика по элементам
    if($('.mode__link_tile').hasClass('active')) {
      $('.mode__link_tile').css({ "pointer-events": "none" });
    }

  })
}

// Центрирование фоновой картинки в рабочей зоне
var centerImg = function(){
  $(".workspace__img").position({
    of: $("#workspace"),
    my: "center center",
    at: "center center"
  });
}

// Центрирование вотермарка по отношению к фоновой картинке
var centerWt = function(){
  $("#workspaceWt").position({
    of: $(".workspace__img"),
    my: "center center",
    at: "center center"
  });
}

// Позиционирование мышью
var drag = function(){
  $("#workspaceWt").draggable({
    containment:".workspace__img",
    snap:".workspace__img",
    scroll: false,
    drag: function(){
      var position = $(this).position(),
          imgMarginTop = $(".workspace__img").position().top, // shows distance from workspace__img to workspace
          imgMarginLeft = $(".workspace__img").position().left,
          xPos = position.left,
          yPos = position.top;

      $("#workspaceWt").attr('data-x', xPos - imgMarginLeft);
      $("#workspaceWt").attr('data-y', yPos - imgMarginTop);
      $("#spinner-1").spinner( "value", xPos - imgMarginLeft);
      $("#spinner-2").spinner( "value", yPos - imgMarginTop);
    }
  });
};

// Позиционирование спиннерами
var spinX = function(){
  var imgWidth = $(".workspace__img").outerWidth(),
      watermarkWidth = $("#workspaceWt").outerWidth(true);

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
};
var spinY = function(){
  var imgHeight = $(".workspace__img").outerHeight(),
      watermarkHeight = $("#workspaceWt").outerHeight(true);

  $("#spinner-2").spinner({
      min: 0,
      max: imgHeight - watermarkHeight,
      spin: function(event, ui) {
        var y = $(this).spinner('value');
        $("#workspaceWt").attr('data-y', (y + $(".workspace__img").position().top));
        $("#workspaceWt").css({top: (y + $(".workspace__img").position().top)});
      }
  });
};

// Позиционирование сеткой
var grid = function(value){

  var $workspaceWt = $("#workspaceWt"),
    	$spinnerX = $("#spinner-1"),
    	$spinnerY = $("#spinner-2"),
      imgMarginTop = $('.workspace__img').position().top,
      imgMarginLeft = $('.workspace__img').position().left,
      imgHeight = $('.workspace__img').outerHeight(),
      imgWidth = $('.workspace__img').outerWidth(),
      watermarkHeight = $("#workspaceWt").outerHeight(true),
      watermarkWidth = $("#workspaceWt").outerWidth(true);

      // Для позиционирование в центре каждой ячейки сетки
  var gridPaddingHeight = ((imgHeight/3 - watermarkHeight)/2) + imgMarginTop,
      gridPaddingWidth = ((imgWidth/3 - watermarkWidth)/2) + imgMarginLeft;

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
};

module.exports = {
  init: function() {
    wtClone();
    centerImg();
    centerWt();
    drag();
    spinX();
    spinY();
    grid();
  }
};
