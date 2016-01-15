var  ruEng = require('./modules/language.js'),
	 watermark = require('./modules/watermark.js'),
	 slider = require('./modules/slider.js');

$(document).ready(function(){
  ruEng.init();
  watermark.init();
  slider.init();
});
