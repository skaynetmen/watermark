$(document).ready(function () {
    $("#spinner-1").spinner({
        min: 0,
        max: 100
    });

    $("#spinner-2").spinner({
        min: 0,
        max: 100
    });

    $('#slider').slider();


    (function () {
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
    })();

    (function () {
        var $strings = $('[data-localize]');

        $('.language').on('click', '.sidebar__link', function (e) {
            e.preventDefault();

            $strings.localize('language', {language: $(this).data('lang')});
        });
    })();
});