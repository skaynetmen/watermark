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
      // gridPaddingHeight = ((imgHeight/3 - watermarkHeight)/2) + imgMarginTop,
      // gridPaddingWidth = ((imgWidth/3 - watermarkWidth)/2) + imgMarginLeft;

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

    // Позиционирование в центре каждой ячейки сетки
    // switch(gridNumber) {
    //   case 1:
    //     var x = gridPaddingWidth,
    //         y = gridPaddingHeight;
    //     break;
    //
    //   case 2:
    //     var x = imgWidth/3 + gridPaddingWidth,
    //         y = gridPaddingHeight;
    //     break;
    //
    //   case 3:
    //     var x = (imgWidth - imgWidth/3) + gridPaddingWidth,
    //         y = gridPaddingHeight;
    //
    //     if (watermarkWidth > imgWidth/3) x = imgWidth - watermarkWidth + imgMarginLeft;
    //     break;
    //
    //   case 4:
    //     var x = gridPaddingWidth,
    //         y = imgHeight/3 + gridPaddingHeight;
    //     break;
    //
    //   case 5:
    //     var x = imgWidth/3 + gridPaddingWidth,
    //         y = imgHeight/3 + gridPaddingHeight;
    //     break;
    //
    //   case 6:
    //     var x = (imgWidth - imgWidth/3) + gridPaddingWidth,
    //         y = imgHeight/3 + gridPaddingHeight;
    //
    //     if (watermarkWidth > imgWidth/3) x = imgWidth - watermarkWidth + imgMarginLeft;
    //     break;
    //
    //   case 7:
    //     var x = gridPaddingWidth,
    //         y = (imgHeight - imgHeight/3) + gridPaddingHeight;
    //
    //     if (watermarkHeight > imgHeight/3) y = imgHeight - watermarkHeight + imgMarginTop;
    //     break;
    //
    //   case 8:
    //     var x = imgWidth/3 + gridPaddingWidth,
    //         y = (imgHeight - imgHeight/3) + gridPaddingHeight;
    //
    //     if (watermarkHeight > imgHeight/3) y = imgHeight - watermarkHeight + imgMarginTop;
    //     break;
    //
    //   case 9:
    //     var x = (imgWidth - imgWidth/3) + gridPaddingWidth,
    //         y = (imgHeight - imgHeight/3) + gridPaddingHeight;
    //
    //     if (watermarkWidth > imgWidth/3) x = imgWidth - watermarkWidth + imgMarginLeft;
    //     if (watermarkHeight > imgHeight/3) y = imgHeight - watermarkHeight + imgMarginTop;
    //     break;
    // }

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
    centerImg();
    centerWt();
    drag();
    spinX();
    spinY();
    grid();
  }
};
