var  ruEng = require('./modules/language.js'),
	 slider = require('./modules/slider.js'),
	 watermark = require('./modules/watermark.js');

$(document).ready(function(){
  ruEng.init();
  slider.init();
  watermark.init();
});
