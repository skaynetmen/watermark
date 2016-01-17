var share;

//инициализация модуля
var init = function () {
    sharing();

    //Если пользователь скачал свою картинку, то при шаринге в соц сети, подгружаем туда картинку
    $('#share').on('click', '.ya-share2__link', function () {
        var resultImg = Cookies.get('resultImage');

        if (resultImg) {
            share.updateContent({
                image: 'http://wt.alskr.ru' + resultImg
            });
        }
    });
};

//работа с элементами
var sharing = function () {
    var elem = document.getElementById('share');
    share = Ya.share2(elem, {
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
    init: init
};