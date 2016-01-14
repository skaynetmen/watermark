// ------------ Функция работы кнопок смены языков ----------------

var lang = function () {
    var langInit = function () {
        _setupListners();
    };
    var _setupListners = function(){
        // В зависимости от того, какая кнопка нажата,
        // запускается функция с параметрами rus или eng
        $('#en').on('click', function(){
            $('.sidebar__link').removeClass('active');
            $('#en').addClass('active');
            _ajaxChange('eng');
        });
        $('#ru').on('click', function(){
            $('#en').removeClass('active');
            $('#ru').addClass('active');
            _ajaxChange('rus');
        });
    };

    // Функция смены языков
    var _ajaxChange = function (lang) {
        // Делаем AJAX запрос данных на сервер
        $.ajax({
                // Адрес обрабатывающего скрипты
                url: 'api/langChange.php',
                // Метод, которым отправляем данные
                type:'POST',
                // Тип отправляемых данных
                dataType: 'json',
                // Сами данные, которые преобразовываем в JSON строку
                data:'jsonLang=' + JSON.stringify(lang)
            })

            // При ошибке на сервере, выполняется данная функция
            .fail(function(langObj) {
                console.log('Проблемы в PHP');
            })

            // При успешном выполнении скрипта
            // выводим данные в блоки с текстом
            .done(function(langObj) {
                $('.desktop__title').text(langObj.titleContent);
                $('.settings__title').text(langObj.settings);
                $('label[for="uploadImg"]').text(langObj.inputMain);
                $('#fake').text(langObj.inputMainPlace);
                $('label[for="uploadWatermark"]').text(langObj.inputWater);
                $('#fakeWat').text(langObj.inputWaterPlace);
                $('.settings__label').text(langObj.position);
                $(".settings__label:contains('Прозрачность')").text(langObj.opacity);
                $('#reset').text(langObj.butClear);
                $('#submit').text(langObj.butDownload);
            });
    };
    return {
        init: langInit
    }
}();

lang.init();