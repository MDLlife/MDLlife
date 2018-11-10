//--------------------------
// Validate & submit process
//--------------------------
(function ($) {
    var sib_prefix = 'sib';
    var sib_dateformat = 'mm-dd-yyyy';
    var dateFormat;
    if ($("input[name='hdn_new_format']").length) {
        dateFormat = sib_dateformat;
    }
    else {
        dateFormat = 'dd/mm/yyyy';
    }
    $('.tooltip').css({left: '101%'});

    // check if inputed sms value is valid
    function isValidSms(smsField, sms) {
        sms = sms.replace(/\b(0(?!\b))+/g, "");

        var tempSms = sms.replace(/( |\(|\)|\.|\-)/g, '');
        if (tempSms.length > 19 || tempSms.length < 6) {
            return false;
        }
        return true;
    }

    // check if inputed date value is valid
    function isValidDate(date) {
        var filter;
        if (dateFormat == 'dd/mm/yyyy') {
            filter = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
        }

        if (dateFormat == 'dd-mm-yyyy') {
            filter = /^(((0[1-9]|[12]\d|3[01])-(0[13578]|1[02])-((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)-(0[13456789]|1[012])-((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])-02-((19|[2-9]\d)\d{2}))|(29-02-((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
        }
        else if (dateFormat == 'mm-dd-yyyy') {
            filter = /^(((0[13578]|1[02])-(0[1-9]|[12]\d|3[01])-((19|[2-9]\d)\d{2}))|((0[13456789]|1[012])-(0[1-9]|[12]\d|30)-((19|[2-9]\d)\d{2}))|(02-(0[1-9]|1\d|2[0-8])-((19|[2-9]\d)\d{2}))|(02-29-((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
        }

        if (filter.test(date)) {
            return true;
        }
        return false;
    }

    // allow to input digit and + only for sms
    function validateInteger(smsLength, evt) {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);

        // 0-9, +/-, space, brackets
        var regex = /[ +0-9()-]/;
        if (smsLength == 'date') {
            regex = /[ 0-9-]/;
            smsLength = 0;
        }
        if (!regex.test(key) || smsLength > 19) {
            theEvent.returnValue = false;
            key = theEvent.keyCode;
            // ignore input for del,tab, back, left, right, home and end key
            if (theEvent.preventDefault && key != 9 && key != 8) theEvent.preventDefault();
        }
    }

    $('#' + sib_prefix + '_embed_signup .' + sib_prefix + '-container').find('.hidden-btns').remove();
    $('#' + sib_prefix + '_embed_signup .' + sib_prefix + '-container').find('.message_area').remove();

    $('body').on('submit', '#sib_embed_signup #theform', function () {
        var theForm = $(this);
        if (theForm.hasClass(sib_prefix + '_processing')) {
            return false;
        }

        var wrapper = theForm.closest('.forms-builder-wrapper');

        wrapper.find('#' + sib_prefix + '_loading_gif_area').width(theForm.width()).height(theForm.height());

        var reqField = theForm.find('#req_hid').val();

        var primaryType = wrapper.find('#primary_type').val() == 'undefined' ? 'email' : wrapper.find('#primary_type').val();
        if (primaryType == 'email') {
            reqField = 'email' + reqField;
        } else {
            reqField = 'SMS' + reqField;
        }
        var required = reqField.split("~");
        var sendinblueFormLang = wrapper.find('#' + sib_prefix + '_embed_signup_lang').val();
        var emptyError = "Please complete this field.";
        var emailError = wrapper.find('#' + sib_prefix + '_embed_invalid_email_message').val();
        var smsError = 'The SMS field must contain between 6 and 19 digits.';
        var dateError = "Invalid date format";

        if (sendinblueFormLang == "fr") {
            emptyError = "Merci de remplir ce champ.";
            smsError = 'Le champ SMS doit contenir entre 6 et 19 chiffres.';
            dateError = "Date de format invalide";
        }
        else if (sendinblueFormLang == "es") {
            emptyError = "Por favor, complete este campo";
            smsError = 'El campo SMS debe contener entre 6 y 19 cifras.';
            dateError = "Formato de fecha no válido";
        }
        else if (sendinblueFormLang == "pt") {
            emptyError = "Preencha este campo.";
            smsError = 'O campo SMS deve conter entre 6 e 19 dígitos.';
            dateError = "O formato da data é inválido";
        }
        else if (sendinblueFormLang == "it") {
            emptyError = "Compilare questo campo.";
            smsError = 'Il campo SMS deve contenere dai 6 ai 19 caratteri.';
            dateError = "Il formato della data non è valido";
        }
        else if (sendinblueFormLang == "de") {
            emptyError = "Bitte füllen Sie dieses Feld aus.";
            smsError = 'Das SMS-Feld muss 6 bis 19 Ziffern enthalten.';
            dateError = "Ungültiges Datumsformat";
        }

        theForm.find('div.alert').remove();
        theForm.find('.message_area').remove();

        for (i = 0; i < required.length; i++) {

            var input = theForm.find('input[name="' + required[i] + '"]');

            var inputType = input.attr('type');
            if (inputType == 'text') {
                if (input.val() == "" || input.val() == emptyError) {
                    input.closest('.row').addClass("needsfilled");
                    input.closest('.row').append('<div class="message_area" style="background-color: #f2dede;border:1px solid #ebccd1; color: #a94442;margin-top: 5px;"><button type="button" class="close">x</button>' + emptyError + '</div>');
                }
                else {
                    if (required[i] == 'email') {
                        if (!/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(input.val())) {
                            input.closest('.row').addClass("needsfilled");
                            input.closest('.row').append('<div class="message_area" style="background-color: #f2dede;border:1px solid #ebccd1; color: #a94442;margin-top: 15px;"><button type="button" class="close">x</button>' + emailError + '</div>');
                            input.val('');
                        } else {
                            input.closest('.row').removeClass("needsfilled");
                        }
                    }
                    else if (required[i] == 'SMS') {
                        if ($('#sms_prefix').length && $('#sms_prefix').val() == '') {
                            input.closest('.row').addClass("needsfilled");
                            input.closest('.row').append('<div class="alert alert-danger" style="width: ' + alert_width + alert_padding + '"><button type="button" class="close" style="' + button_style + '">x</button>' + emptyError + '</div>');
                        }
                        else {
                            input.closest('.row').removeClass("needsfilled");
                        }
                    }
                    else {
                        input.closest('.row').removeClass("needsfilled");
                    }
                }
            }
            else if (inputType == 'radio') {
                if (input.is(':checked') == false) {
                    input.closest('.row').addClass("needsfilled");
                    input.closest('.row').append('<div class="message_area" style="background-color: #f2dede;border:1px solid #ebccd1; color: #a94442;margin-top: 5px;"><button type="button" class="close">x</button>' + emptyError + '</div>');
                }
            } else if (required[i] == 'Captcha' && typeof grecaptcha != 'undefined') {
                var captchaResponse = grecaptcha.getResponse();
                if (captchaResponse.length == 0) {
                    $(".captcha > div.row").addClass("needsfilled");
                    $(".captcha > div.row").append('<div class="message_area" style="background-color: #f2dede;border:1px solid #ebccd1; color: #a94442;margin-top: 5px;"><button type="button" class="close">x</button>' + emptyError + '</div>');

                } else {
                    $(".captcha > div.row").removeClass("needsfilled");
                }
            } else {
                var fields = input.serializeArray();
                if (fields.length == 0) {
                    input.closest('.row').addClass("needsfilled");
                }
                else {
                    input.closest('.row').removeClass("needsfilled");
                }
            }
        }
        $(".row").each(function () {
            var spanElement = $(this).find('span');
            var ele = $(this).find("input");
            var alertWidth = ele.width() + 10;
            var smsPrefix = ($(this).find('#sms_prefix').length > 0 ) ? $(this).find('#sms_prefix').val() : '';
            if (ele.attr('name') == 'SMS') {
                if (!isValidSms(ele, smsPrefix + ele.val()) && ele.val() != "") {
                    ele.closest('.row').addClass("needsfilled");
                    ele.closest('.row').append('<div class="message_area" style="background-color: #f2dede;border:1px solid #ebccd1; color: #a94442;margin-top: 5px;width:' + alertWidth + ';"><button type="button" class="close">x</button>' + smsError + '</div>');
                    ele.val('');
                }
            }

            if (spanElement.text() == dateFormat) {
                if (!isValidDate(ele.val()) && ele.val() != "") {
                    ele.closest('.row').addClass("needsfilled");
                    ele.closest('.row').append('<div class="message_area" style="background-color: #f2dede;border:1px solid #ebccd1; color: #a94442;margin-top: 5px;width:' + alertWidth + ';"><button type="button" class="close">x</button>' + dateError + '</div>');
                    ele.val('');
                }
            }
        });
        $('div.message_area button.close').on('click', function () {
            $(this).parent().remove();
        });

        if (theForm.find('input').closest('.row').hasClass("needsfilled") || $(".captcha > div.row").hasClass("needsfilled")) {
            return false;
        } else {

            //errornotice.closest('.row').hide();
            // submit ajax process --> coding here
            var requestUrl = theForm.attr('action');
            var postData = theForm.serialize();
            theForm.addClass(sib_prefix + '_processing');
            theForm.parent().find('#' + sib_prefix + '_loading_gif_area').show();
            theForm.css('opacity', '0.5');
            $.ajax({
                url: requestUrl,
                data: postData,
                dataType: 'json',
                type: 'POST',
                beforeSend: function () {
                },
                success: function (data) {
                    var theForm = $('.' + sib_prefix + '_processing');

                    theForm.parent().find('#' + sib_prefix + '_loading_gif_area').hide();
                    theForm.css('opacity', '1');
                    if (data.result != undefined) {
                        if ((data.result.result == 'success') || (data.result.result == 'emailExist') || (data.result.result == 'OK') || (data.result.result == 'OK_UPDATE')) {
                            backColor = '#dff0d8';
                            borderColor = '#d6e9c6';
                            color = '#ffffff';
                            $(".sub-mob-alert").hide();
                            setTimeout(function () {
                                $('.message_area').remove();
                                $(".sub-mob-alert").show();
                            }, 3000);
                        }
                        else {
                            backColor = '#f2dede';
                            borderColor = '#ebccd1';
                            color = '#a94442';
                        }

                        var messageHtml = '<div class="message_area" style="background-color: ' + backColor + ';border:1px solid ' + borderColor + '; color: ' + color + '"><button type="button" class="close">x</button>';
                        if (data.result.result == 'success' || data.result.result == 'OK') {
                            if (window.location.pathname.indexOf('ru') < 0 && window.location.pathname.indexOf('zh') < 0) {
                                messageHtml += 'Awesome!<br>Now you are subscribed on MDL News'
                            }
                            if (window.location.pathname.indexOf('ru') > 0) {
                                messageHtml += 'Ура!<br>Теперь вы подписаны на MDL новости'
                            }
                            if (window.location.pathname.indexOf('zh') > 0) {
                                messageHtml += '这么好！<br>现在您订阅MDL的新闻'
                            }
                            if (data.result.smsExist != '') {
                                var smsMSG = '';
                                var smsNumber = data.result.smsExist;
                                smsMSG = data.result.smsExist_msg.split('[number]');

                                messageHtml += '. ' + smsMSG[0] + smsNumber + smsMSG[1];
                            }
                            theForm.find("div.email-group input[type='text']").val('');
                            theForm.find("div.sms-group input[type='text']").val('');
                            if (data.result.url_redirect != '') {
                                location.href = data.result.url_redirect;
                            }
                        }
                        else if (data.result.result == 'sms_emailExist') {
                            var emailMSG = '';
                            var emailAddress = data.result.emailExist;
                            emailMSG = data.result.emailExist_msg.split('[address]');

                            messageHtml += '. ' + emailMSG[0] + emailAddress + emailMSG[1];
                        }
                        else if (data.result.result == 'invalid_request' || data.result.result == 'invalidEmail') {
                            messageHtml += data.result.invalid_err_msg;
                        }
                        else if (data.result.result == 'invalidSms') {
                            messageHtml += data.result.invalidSms_msg;
                        }
                        else if (data.result.result == 'emailExist' || data.result.result == 'OK_UPDATE') {
                            messageHtml += data.result.exist_err_msg;
                            if (data.result.smsExist != '') {
                                var smsMSG = '';
                                var smsNumber = data.result.smsExist;
                                smsMSG = data.result.smsExist_msg.split('[number]');

                                messageHtml += '. ' + smsMSG[0] + smsNumber + smsMSG[1];
                            }
                        }
                        else if (data.result.result == 'dateFormat' || data.result.result == 'reqMiss') {
                            messageHtml += data.result.general_err_msg;
                        } else if (data.result.result == 'invalidCaptcha') {
                            messageHtml += data.result.general_err_msg;
                        }
                        messageHtml += '</div>';
                        theForm.find('.' + sib_prefix + '-container').prepend(messageHtml);
                        $('div.message_area button.close').on('click', function () {
                            $(this).parent().remove();
                        });
                        theForm.removeClass(sib_prefix + '_processing');
                    }
                }
            });
        }
        return false;
    });

    $('#' + sib_prefix + '_embed_signup :input').on('click', function () {
        if ($(this).closest('.row').hasClass("needsfilled")) {
            $(this).closest('.row').find('div.message_area').remove();
            $(this).val("");
            if ($(this).attr('type') == 'radio')
                $(this).val("1");
            $(this).closest('.row').removeClass("needsfilled");
        }
    });

    $('#' + sib_prefix + '_embed_signup input[type=radio]').on('click', function () {
        if ($(this).closest('.row').hasClass("needsfilled")) {
            $(this).attr('checked', true);
            $(this).closest('.row').find('div.message_area').remove();
            $(this).closest('.row').removeClass("needsfilled");
        }
    });

    // allow to input 0-9 and - only for date field
    $("input").on('keypress', function (event) {
        if ($(this).closest(".row").find("." + sib_prefix + "_dateformat").length > 0) {
            validateInteger('date', event);
        }
    });

    $("#SMS").on('keypress', function (event) {
        var length = $(this).val().length;
        validateInteger(length, event);
    });

    $("input[type=number]").on('keypress', function (event) {
        var theEvent = event || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);

        // 0-9, +/-, space, brackets
        var regex = /[0-9]/;

        if (!regex.test(key)) {
            theEvent.returnValue = false;
            key = theEvent.keyCode;
            // ignore input for del,tab, back, left, right, home and end key
            if (theEvent.preventDefault && key != 9 && key != 8) theEvent.preventDefault();
            var eleRow = $(this).closest('.row');
            var frmLang = eleRow.closest('.forms-builder-wrapper').find('#' + sib_prefix + '_embed_signup_lang').val();
            var numberError = "Please enter a number.";
            if (frmLang == "fr") {
                numberError = "Veuillez entrer un nombre.";
            }
            else if (frmLang == "es") {
                numberError = "Please enter a number.";
            }
            else if (frmLang == "pt") {
                numberError = "Please enter a number.";
            }
            else if (frmLang == "it") {
                numberError = "Please enter a number.";
            }
            else if (frmLang == "de") {
                numberError = "Please enter a number.";
            }
            if (!eleRow.find('.message_area').length) {
                eleRow.append('<div class="message_area" style="background-color: #f2dede;border:1px solid #ebccd1; color: #a94442"><button type="button" class="close">x</button>' + numberError + '</div>');
            }
        }
    });

    $(document).on('click', '.message_area .close', function () {
        $(this).closest('.message_area').remove();
    });

    $(document).on('click', '.sib-dropdown-toggle.country-flg', function () {
        $(".country-block ul").toggle();
    });

    $(document).on('click', '.country-block ul li a', function () {
        var code = $(this).data('code');
        var cCode = $(this).data('c_code');
        $('.sib-dropdown-toggle .cflags').attr('class', 'cflags');
        $('.sib-dropdown-toggle .cflags').addClass(cCode);

        // update country prefix
        $('#sms_prefix').val('+' + code);

        $(".country-block ul").hide();
    });

    $(document).bind('click', function (e) {
        var $clicked = $(e.target);
        if (!$clicked.parents().hasClass("country-block"))
            $(".country-block ul").hide();
    });

    if ($('.sms_field .country-block').length) {
        var cflagsClasses = $('.sib-dropdown-toggle .cflags').attr('class').split(' ');
        if (cflagsClasses[1] && cflagsClasses[1] != '') {
            var countryCode = $('.sib-dropdown-menu').find('[data-c_code="' + cflagsClasses[1] + '"]').data('code');
            // update country prefix
            $('#sms_prefix').val('+' + countryCode);
        }
        else {
            $('.sib-dropdown-toggle .cflags').addClass('FR');
            var countryCode = $('.sib-dropdown-menu').find('[data-c_code="FR"]').data('code');
            // update country prefix
            $('#sms_prefix').val('+' + countryCode);
        }
    }
    // set last submit to avoid refresh post
    $("#hdn_email_txt").val(new Date().getTime());
}(jQuery));