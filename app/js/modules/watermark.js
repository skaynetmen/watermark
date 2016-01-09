// Центрирование фоновой картинки в рабочей зоне
var centerImg = function(){
  $("#workspaceImg").position({
    of: $("#workspace"),
    my: "center center",
    at: "center center"
  });
}
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
    drag: function(){
      var position = $(this).position();
      var xPos = position.left;
      var yPos = position.top;

      $("#workspaceWt").attr('data-x', xPos);
      $("#workspaceWt").attr('data-y', yPos);
      $("#spinner-1").spinner( "value", xPos );
      $("#spinner-2").spinner( "value", yPos );
  }
  });
};

// Позиционирование спиннером
var spinX = function(){
  var imgWidth = $("#workspaceImg").outerWidth(),
      watermarkWidth = $("#workspaceWt").outerWidth(true);

  $("#spinner-1").spinner({
      min: 0,
      max: imgWidth - watermarkWidth,
      spin: function(event, ui) {
        $(this).change();
        var x = $(this).spinner('value');
        $("#workspaceWt").attr('data-x', x);
        $("#workspaceWt").css({left: x});
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
        $("#workspaceWt").attr('data-y', y);
        $("#workspaceWt").css({top: y});
      }
  });
};

// Позиционирование сеткой
var grid = function(value){

  var imgHeight = $("#workspace").outerHeight(),
      watermarkHeight = $("#workspaceWt").outerHeight(true),
      imgWidth = $("#workspace").outerWidth(),
      watermarkWidth = $("#workspaceWt").outerWidth(true),
      gridPaddingHeight = (imgHeight/3 - watermarkHeight)/2,
      gridDaddingWidth = (imgWidth/3 - watermarkWidth)/2 ;


  // $(".grid__link").on('click', function(e) {
  //   e.preventDefault();
  //
  //   if ($(this).data('value', 1 )) {
  //   var x = gridDaddingWidth,
  //       y = gridPaddingHeight;
  //   }
  //
  //   if ($(this).data('value', 2 )) {
  //   var x = imgWidth/3 + gridDaddingWidth,
  //       y = gridPaddingHeight;
  //   }
  //
  //   $("#workspaceWt").css({top: y, left: x});
  //   $("#workspaceWt").attr( 'data-y', y );
  //   $("#workspaceWt").attr( 'data-x', x );
  //   $("#spinner-1").spinner( "value", x );
  //   $("#spinner-2").spinner( "value", y );
  //
  // })

  $(".grid__link_1").on('click', function(e) {
    e.preventDefault();

    var x = gridDaddingWidth,
        y = gridPaddingHeight;

    if (x < 0) x = 0;
    if (y < 0) y = 0;

    $("#workspaceWt").css({top: y, left: x});
    $("#workspaceWt").attr( 'data-y', y );
    $("#workspaceWt").attr( 'data-x', x );
    $("#spinner-1").spinner( "value", x );
    $("#spinner-2").spinner( "value", y );
  })

  $(".grid__link_2").on('click', function(e) {
    e.preventDefault();

    var x = imgWidth/3 + gridDaddingWidth,
        y = gridPaddingHeight;

    if (x < 0) x = 0;
    if (y < 0) y = 0;

    $("#workspaceWt").css({top: y, left: x});
    $("#workspaceWt").attr( 'data-y', y );
    $("#workspaceWt").attr( 'data-x', x );
    $("#spinner-1").spinner( "value", x );
    $("#spinner-2").spinner( "value", y );
  })

  $(".grid__link_3").on('click', function(e) {
    e.preventDefault();

    var x = (imgWidth - imgWidth/3) + gridDaddingWidth,
        y = gridPaddingHeight;

    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (watermarkWidth > imgWidth/3) x = imgWidth - watermarkWidth;

    $("#workspaceWt").css({top: y, left: x});
    $("#workspaceWt").attr( 'data-y', y );
    $("#workspaceWt").attr( 'data-x', x );
    $("#spinner-1").spinner( "value", x );
    $("#spinner-2").spinner( "value", y );
  })

  $(".grid__link_4").on('click', function(e) {
    e.preventDefault();

    var x = gridDaddingWidth,
        y = imgHeight/3 + gridPaddingHeight;

    if (x < 0) x = 0;
    if (y < 0) y = 0;

    $("#workspaceWt").css({top: y, left: x});
    $("#workspaceWt").attr( 'data-y', y );
    $("#workspaceWt").attr( 'data-x', x );
    $("#spinner-1").spinner( "value", x );
    $("#spinner-2").spinner( "value", y );
  })

  $(".grid__link_5").on('click', function(e) {
    e.preventDefault();

    var x = imgWidth/3 + gridDaddingWidth,
        y = imgHeight/3 + gridPaddingHeight;

    if (x < 0) x = 0;
    if (y < 0) y = 0;

    $("#workspaceWt").css({top: y, left: x});
    $("#workspaceWt").attr( 'data-y', y );
    $("#workspaceWt").attr( 'data-x', x );
    $("#spinner-1").spinner( "value", x );
    $("#spinner-2").spinner( "value", y );
  })

  $(".grid__link_6").on('click', function(e) {
    e.preventDefault();

    var x = (imgWidth - imgWidth/3) + gridDaddingWidth,
        y = imgHeight/3 + gridPaddingHeight;

    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (watermarkWidth > imgWidth/3) x = imgWidth - watermarkWidth;

    $("#workspaceWt").css({top: y, left: x});
    $("#workspaceWt").attr( 'data-y', y );
    $("#workspaceWt").attr( 'data-x', x );
    $("#spinner-1").spinner( "value", x );
    $("#spinner-2").spinner( "value", y );
  })

  $(".grid__link_7").on('click', function(e) {
    e.preventDefault();

    var x = gridDaddingWidth,
        y = (imgHeight - imgHeight/3) + gridPaddingHeight;

    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (watermarkHeight > imgHeight/3) y = imgHeight - watermarkHeight;

    $("#workspaceWt").css({top: y, left: x});
    $("#workspaceWt").attr( 'data-y', y );
    $("#workspaceWt").attr( 'data-x', x );
    $("#spinner-1").spinner( "value", x );
    $("#spinner-2").spinner( "value", y );
  })

  $(".grid__link_8").on('click', function(e) {
    e.preventDefault();

    var x = imgWidth/3 + gridDaddingWidth,
        y = (imgHeight - imgHeight/3) + gridPaddingHeight;

    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (watermarkHeight > imgHeight/3) y = imgHeight - watermarkHeight;

    $("#workspaceWt").css({top: y, left: x});
    $("#workspaceWt").attr( 'data-y', y );
    $("#workspaceWt").attr( 'data-x', x );
    $("#spinner-1").spinner( "value", x );
    $("#spinner-2").spinner( "value", y );
  })

  $(".grid__link_9").on('click', function(e) {
    e.preventDefault();

    var x = (imgWidth - imgWidth/3) + gridDaddingWidth,
        y = (imgHeight - imgHeight/3) + gridPaddingHeight;

    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (watermarkWidth > imgWidth/3) x = imgWidth - watermarkWidth;
    if (watermarkHeight > imgHeight/3) y = imgHeight - watermarkHeight;

    $("#workspaceWt").css({top: y, left: x});
    $("#workspaceWt").attr( 'data-y', y );
    $("#workspaceWt").attr( 'data-x', x );
    $("#spinner-1").spinner( "value", x );
    $("#spinner-2").spinner( "value", y );
  })
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
