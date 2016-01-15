//private area
var slider = function() {

	var defaultValue = 0.5;

	function resetOpasity() {
		$('#workspaceWt').css("opacity", defaultValue);
	};

	function changeOpasity() {
	  	var sliderValue = $( "#slider" ).slider( "value" );

		$('#workspaceWt').css("opacity", sliderValue);
	};

	$('#slider').slider({
	  	min: 0,
	  	max: 1.01,
	  	step: 0.01,
	  	value: defaultValue,
	  	create: resetOpasity,
	  	slide: changeOpasity
	})

};

module.exports = {
    init: function () {
    	slider();
    }
};