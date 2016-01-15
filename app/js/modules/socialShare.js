//инициализация модуля
var socials = function(){
	sharing();
};
//работа с элементами
var sharing = function (){
	var elem = document.getElementById('share');
	var share = Ya.share2(elem, {
			content: {
					url: 'http://watermrk.su',
					title: 'Watermark',
					description: 'Сервис добавления водяного знака на фотографию',
					image: 'https://yastatic.net/morda-logo/i/logo.svg'
			},
			theme: {
					services: 'facebook,twitter,vkontakte'
			}
	});
};
//возврат объекта. публичные методы
		module.exports = {
				init:socials
		};