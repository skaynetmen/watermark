var ruEng = require('./modules/language.js'),
		socialSharing = require ('./modules/socialShare.js'),
		fileUpload = require('./modules/fileUpload.js'),
	  slider = require('./modules/slider.js'),
	  watermark = require('./modules/watermark.js');

$(document).ready(function(){
  ruEng.init();
  socialSharing.init();
  fileUpload.init();
  slider.init();
  watermark.init();
});
