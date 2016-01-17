var
    $msg = $('#msg'),
    duration = 300,
    autoCloseDelay = 5000,
    $alert;

/**
 * По закрытию алерта, красиво прячем его и стираем
 */
var init = function () {
    $msg.on('click', '.alert__close', function () {
        var $that = $(this);

        $that.closest('.alert').slideUp(duration, function () {
            $msg.html('');
        });
    });
};

/**
 * Добавляет алерт в разметку
 * @param msg
 * @param autoClose
 */
var show = function (msg) {
    var html = '<div class="alert" style="display: none;">' +
        '<div class="container">' +
        '<button class="alert__close">&times;</button> ' + msg + '</div>' +
        '</div>';

    $msg.html(html);
};

var animation = function (autoClose) {
    if ($alert.length) {
        $alert.slideDown(duration, function () {
            if (autoClose) {
                $alert
                    .delay(autoCloseDelay)
                    .slideUp(duration, function () {
                        $msg.html('');
                    });
            }
        });
    }
};

/**
 * Выводит красный алерт
 * @param msg
 * @param autoClose
 */
var danger = function (msg, autoClose) {
    show(msg);

    $alert = $msg.find('.alert');

    $alert.addClass('alert_danger');

    animation(autoClose);
};

/**
 * Выводит зеленый алерт
 * @param msg
 * @param autoClose
 */
var success = function (msg, autoClose) {
    show(msg, autoClose);

    $alert = $msg.find('.alert');

    $alert.addClass('alert_success');

    animation(autoClose);
};

module.exports = {
    init: init,
    danger: danger,
    success: success
};