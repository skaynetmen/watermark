//инициализация модуля
var socials = function () {
    sharing();
};
//работа с элементами
var sharing = function () {
    var elem = document.getElementById('share');
    var share = Ya.share2(elem, {
        content: {
            url: 'http://wt.alskr.ru',
            title: 'Генератор водяных знаков',
            description: 'Сервис добавления водяного знака на фотографию',
            image: 'http://wt.alskr.ru/apple-touch-icon-152x152.png'
        },
        theme: {
            services: 'facebook,twitter,vkontakte'
        }
    });
};
//возврат объекта. публичные методы
module.exports = {
    init: socials
};