//private area
var
		$watermark = $('#workspaceWt'),
		$slider = $('#slider'),
		sliderValue = 100,
		defaultValue = 0;

function resetOpasity() {
	$watermark.css("opacity", defaultValue);
};

function changeOpasity(event, ui) {
  	var sliderValue = ui.value,
  		valueCSS = sliderValue/100;

	$watermark.css("opacity", valueCSS);
};

var slider = function() {

	$slider.slider({
	  	min: 0,
	  	max: 100,
	  	step: 1,
	  	value: defaultValue,
	  	create: resetOpasity,
	  	slide: changeOpasity
	});
};

var setOpacity = function (value) {
    var value = parseInt(value);
        opacity = value;

    $watermark.css('opacity', opacity / 100);
    $slider.slider('value', value);
};


module.exports = {
    init: function () {
    	slider();
    },
    getOpacity: function() {
    	return sliderValue;
    },
    setOpacity: function(value) {
    	if(!isNaN(value)) {
    		setOpacity(value);
    	}
    }
};