/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal) {
    'use strict';
    Drupal.behaviors.spyfx = {
        attach: function (context, settings) {
            if (!Array.indexOf) {
                Array.prototype.indexOf = function (obj) {
                    for (var i = 0; i < this.length; i++) {
                        if (this[i] == obj) {
                            return i;
                        }
                    }
                    return -1;
                }
            }
            ;
            function validateEmail(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }
            ;
            function getUrlParameter(sParam) {
                var sPageURL = window.location.search.substring(1);
                var sURLVariables = sPageURL.split('&');
                for (var i = 0; i < sURLVariables.length; i++)
                {
                    var sParameterName = sURLVariables[i].split('=');
                    if (sParameterName[0] == sParam || sParameterName[0] == sParam.toLowerCase())
                    {
                        return sParameterName[1];
                    }
                }
            }
            ;
            var refid = '',
                advid = '';
            var refid1 = getUrlParameter('refId');
            var refid2 = getUrlParameter('refid');
            if (refid1) {
                refid = refid1;
            } else if (refid2) {
                refid = refid2;
            }
            if (refid) {
                $.cookie('refid', refid, {domain: '.spy-fx.com', expires: 9999});
                //$.cookie('refid', refid, {domain: '.spy-fx.com', expires: 9999});
            }
            if (getUrlParameter('advid')) {
                advid = getUrlParameter('advid');
                //$.cookie('advid', advid, {domain: '.spy-fx.com', expires: 9999});
                $.cookie('advid', advid, {domain: '.spy-fx.com', expires: 9999});
            }
            var CookieDate = new Date(new Date().getTime() + 7776000000),
                CookieDayDate = new Date(new Date().getTime() + 86400000),
                rfrr = document.referrer,
                did = 'spy-fx.com';
            if ((rfrr.length !== 0 && rfrr.indexOf(did) == -1) || (rfrr.length !== 0 && rfrr.indexOf(did) > 25)) {
                var rfrr = decodeURIComponent(rfrr);
                document.cookie = "paxref=" + ref + "; path=/; expires=" + CookieDate.toGMTString() + ";domain=.spy-fx.com;";
            }
            document.cookie = "lastref=" + decodeURIComponent(rfrr) + "; path=/; expires=" + CookieDate.toGMTString() + ";domain=.spy-fx.com;";
            var url = window.location.href,
                cs = getUrlParameter('utm_source', url),
                cm = getUrlParameter('utm_medium', url),
                cn = getUrlParameter('utm_campaign', url),
                ct = getUrlParameter('utm_term', url),
                cc = getUrlParameter('utm_content', url),
                paxan = JSON.stringify({"url": url, "rfrr": rfrr, "cs": cs, "cm": cm, "cn": cn, "ct": ct, "cc": cc});
            if (cs) {
                document.cookie = "paxan=" + paxan + "; path=/; expires=" + CookieDayDate.toGMTString() + ";domain=.spy-fx.com;";
            }
            document.cookie = "lang=" + $('html').attr('lang') + "; path=/; expires=" + CookieDate.toGMTString() + ";domain=.spy-fx.com;";
            //console.log(refid);
            //console.log(advid);
            //var check = $('div.highlighted > aside > div.alert').hasClass('alert-success');
            //if (check){
            if (location.hash && location.hash === '#thank-you') {
                location.hash = '';
                window.location.replace('/thank-you-page');z
            }
            //};
            function makeid(length) {
                var result = '';
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for (var i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() *
                        charactersLength));
                }
                return result;
            }
            window.onload = function () {
                if (document.getElementById('ifrm')) {
                    $.getJSON('/tmpdata', function (data) {
                        if (data && data.data) {
                            //console.log(data.data);
                            var fname = '',
                                email = '',
                                phone = '',
                                country = '',
                                refid = '',
                                advid = '';
                            if (data.data.firstname) {
                                fname = '&fname=' + data.data.firstname;
                            }
                            if (data.data.email) {
                                email = '&email=' + data.data.email;
                            }
                            if (data.data.phone) {
                                phone = '&phone=' + data.data.phone;
                            }
                            if (data.data.country) {
                                country = '&country=' + data.data.country;
                            }
                            if (data.data.refid) {
                                refid = '&refid=' + data.data.refid;
                            }
                            if (data.data.advid) {
                                advid = '&advid=' + data.data.advid;
                            }
                            let uad = makeid(5) + btoa('campaign=EA-Spy-fx&utm_medium=referral&utm_source=spy-fx_com&source=spy-fx' + fname + email + phone + country + refid + advid);
                            document.getElementById('ifrm').src = 'https://adrofx.club/registration/live?uad=' + uad;
                        }
                    });
                }
                ;
                function resizeIFrameToFitContent(iFrame) {

                    iFrame.width = iFrame.contentWindow.document.body.scrollWidth;
                    iFrame.height = iFrame.contentWindow.document.body.scrollHeight;
                }
                window.addEventListener('DOMContentLoaded', function (e) {

                    var iFrame = document.getElementById('ifrm');
                    resizeIFrameToFitContent(iFrame);

                    // or, to resize all iframes:
                    var iframes = document.querySelectorAll("iframe");
                    for (var i = 0; i < iframes.length; i++) {
                        resizeIFrameToFitContent(iframes[i]);
                    }
                });
                //Unsub
                //console.log(window.location.pathname);
                if (window.location.pathname && window.location.pathname === '/unsub') {
                    var email = getUrlParameter('email');
                    if (email && validateEmail(email)) {
                        $.ajax({
                            url: Drupal.url('ajax/unsub'),
                            type: "POST",
                            data: JSON.stringify({'email': email}),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (response) {
                                console.log(response);
                            }
                        });
                    }
                }
                ;
            };
            $(document).ready(function () {


            });
        }
    };


    $( window ).on( "load", readyFn );

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function submit_true(elem){
        elem.closest('form').find('.webform-button--submit').prop( "disabled", true  )
        let input_visible = elem.closest('form').find('fieldset input:visible');
        if(!elem.closest('form').find('fieldset .form-item--error-message:visible').length){
            input_visible.each(function(index, value) {
                if($(value).val() != ''){
                    elem.closest('form').find('.webform-button--submit').prop( "disabled", false  )
                }
                console.log($(value).val());
            });
        }

    }

    function readyFn( jQuery ) {
        if($('body.page-node-3').length){
            $('form').find('fieldset input').each(function(index, value) {
                submit_true($(value));
            });
            if ('grecaptcha' in window) {
                // $('.highlighted ul li').each(function(i){
                //     if($(this).html() == 'The answer you entered for the CAPTCHA was not correct.'){
                //         $('.highlighted button').click();
                //     }
                //     else $('.highlighted').show();
                // });


                var ints = intlTelInputGlobals.instances;
                if (ints) {
                    Object.keys(ints).forEach(function (key) {
                        this[key].setCountry($('html').attr('data-country'));
                    }, ints);
                }
                ;
                $('body').on( "change", '[name="email_address"]', function(e){
                    e.preventDefault();
                    let elem = $(this);
                    let email = elem.val();
                    elem.removeClass('error is-invalid').next('.form-item--error-message').remove();
                    if (email && validateEmail(email)) {
                        if($.cookie('parida') === undefined){
                            $('.loader').show();
                            $.cookie('parida', 1, {domain: '.spy-fx.com', expires: 1});
                            $.ajax({
                                url: Drupal.url('ajax/validation/'+email),
                                type: "GET",
                                success: function (response) {
                                    $('.loader').hide();
                                    $.cookie('parida', 1, {domain: '.spy-fx.com', expires: -1});
                                    if(!response.result){
                                        elem.attr("placeholder", email).val('').addClass('error is-invalid').after('<div class="form-item--error-message" style="">' + Drupal.t('Invalid email') + '</div>');
                                    }
                                }
                            });
                        }
                    }
                    else {
                        elem.attr("placeholder", email).val('').addClass('error is-invalid').after('<div class="form-item--error-message" style="">' + Drupal.t('Invalid email') + '</div>');
                    }
                    submit_true(elem);
                });
            }
            else if(! $('#toolbar-administration').length){
                $('form').submit();
            }
        }


    }

    const slideUp = {
        distance: '50px',
        origin: 'bottom',
        opacity: 0,
        delay: 200,
    }

    ScrollReveal().reveal('.slide-up', slideUp)

})(jQuery, Drupal);
