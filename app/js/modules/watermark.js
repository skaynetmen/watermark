// Заполнение рабочей зоны копиями водяного знака
var wtClone = function(){
  $('#buttonTile').on('click', function (e) {
    e.preventDefault();

    var wtImg = $('.workspace__watermark-img'),
        imgWidth = $("#workspaceImg").outerWidth(),
        imgHeight = $("#workspaceImg").outerHeight(),
        w = screen.width/wtImg.outerWidth(),
        h = screen.height/wtImg.outerHeight();

    // Создает новый элемент для заполнения его копиями водяного знака
    $('<div id="workspaceTile"></div>')
      .prependTo('#workspaceWt')
      .css({"width": screen.width*2, "height": "100%", "font-size": 0 })
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
      .css({"max-width": imgWidth, "max-height": imgHeight})
      .attr('id', 'start');
    centerWt();
    $('#buttonTile').addClass('active');
    $('.watermark__stripe').show();

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
        $('.watermark__stripe_width').css({ "width": x/3.33 + "%", "left": 50 - x/6.66 + "%" });
      }
    });

    $("#spinner-2").spinner({
      min: 0,
      max: 100,
      spin: function(event, ui) {
        $(this).change();
        var y = $(this).spinner('value');
        $('.workspace__watermark-img').css({ "margin-bottom": y });
        $('.watermark__stripe_height').css({ "height": y/3.33 + "%", "top": 50 - y/6.66 + "%"  });
      }
    });

    // Убирает возможность клика по элементам
    if($('#buttonTile').hasClass('active')) {
      $('.grid__link').css({ "pointer-events": "none" });
      $('#buttonTile').css({ "pointer-events": "none" });
    }

  })
}

// Центрирование фоновой картинки в рабочей зоне
var centerImg = function(){
  $("#workspaceImg").position({
    of: $("#workspace"),
    my: "center center",
    at: "center center"
  });
}

// Центрирование вотермарка по отношению к фоновой картинке
var centerWt = function(){
  $("#workspaceWt").position({
    of: $("#workspaceImg"),
    my: "center center",
    at: "center center"
  });
}

// Позиционирование мышью
var drag = function(){
  $("#workspaceWt").draggable({
    containment:"#workspaceImg",
    snap:"#workspaceImg",
    scroll: false,
    drag: function(){
      var position = $(this).position(),
          imgMarginTop = $('#workspaceImg').position().top, // shows distance from workspaceImg to workspace
          imgMarginLeft = $('#workspaceImg').position().left,
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
  var imgWidth = $("#workspaceImg").outerWidth(),
      watermarkWidth = $("#workspaceWt").outerWidth(true);

  $("#spinner-1").spinner({
      min: 0,
      max: imgWidth - watermarkWidth,
      spin: function(event, ui) {
        $(this).change();
        var x = $(this).spinner('value');
        $("#workspaceWt").attr('data-x', (x + $('#workspaceImg').position().left));
        $("#workspaceWt").css({left: (x + $('#workspaceImg').position().left)});
      }
  });
};
var spinY = function(){
  var imgHeight = $("#workspaceImg").outerHeight(),
      watermarkHeight = $("#workspaceWt").outerHeight(true);

  $("#spinner-2").spinner({
      min: 0,
      max: imgHeight - watermarkHeight,
      spin: function(event, ui) {
        var y = $(this).spinner('value');
        $("#workspaceWt").attr('data-y', (y + $('#workspaceImg').position().top));
        $("#workspaceWt").css({top: (y + $('#workspaceImg').position().top)});
      }
  });
};

// Позиционирование сеткой
var grid = function(value){

  var $workspaceWt = $("#workspaceWt"),
    	$spinnerX = $("#spinner-1"),
    	$spinnerY = $("#spinner-2"),
      imgMarginTop = $('#workspaceImg').position().top,
      imgMarginLeft = $('#workspaceImg').position().left,
      imgHeight = $("#workspaceImg").outerHeight(),
      imgWidth = $("#workspaceImg").outerWidth(),
      watermarkHeight = $("#workspaceWt").outerHeight(true),
      watermarkWidth = $("#workspaceWt").outerWidth(true);

      // Для позиционирование в центре каждой ячейки сетки
  var gridPaddingHeight = ((imgHeight/3 - watermarkHeight)/2) + imgMarginTop,
      gridPaddingWidth = ((imgWidth/3 - watermarkWidth)/2) + imgMarginLeft;

    $( "#checkCenter" ).change(function() {
      if ($('#checkCenter').prop('checked')) {

        // Позиционирование в центре каждой ячейки сетки
        $(".grid__link").on('click', function(e) {
          e.preventDefault();

          var $that = $(this),
              gridNumber = parseInt($that.data('value')),
              x = 0,
              y = 0;

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

          if (x < imgMarginLeft) x = imgMarginLeft;
          if (y < imgMarginTop) y = imgMarginTop;

          $workspaceWt
            .css({top: y, left: x})
            .attr( 'data-y', y )
            .attr( 'data-x', x );

          $spinnerX.spinner( "value", (x - imgMarginLeft) );
          $spinnerY.spinner( "value", (y - imgMarginTop) );
        });

      } else {

        // Позиционирование в ячейках по краям фонового изображения

        $(".grid__link").on('click', function(e) {
          e.preventDefault();

          var $that = $(this),
              gridNumber = parseInt($that.data('value')),
              x = 0,
              y = 0;

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

    }).change();
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
