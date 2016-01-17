//private area
var
	$watermark = $('#workspaceWt'),
	$slider = $('#slider'),
	sliderValue = 100,
	defaultValue = 0;

//function resetOpasity() {
//	$watermark.css("opacity", defaultValue);
//}

function changeOpasity(event, ui) {
	sliderValue = 100 - ui.value;

	var valueCSS = sliderValue / 100;

	$watermark.css("opacity", valueCSS);
}

var slider = function () {

	$slider.slider({
		range: 'min',
		min: 0,
		max: 100,
		step: 1,
		//create: resetOpasity,
		slide: changeOpasity
	});
};

var setOpacity = function (value) {
	var value = parseInt(value);
	sliderValue = value;

	$watermark.css('opacity', value / 100);
	$slider.slider('value', 100 - value);
};


module.exports = {
	init: function () {
		slider();
	},
	getOpacity: function () {
		return sliderValue;
	},
	setOpacity: function (value) {
		if (!isNaN(value)) {
			setOpacity(value);
		}
	}
};