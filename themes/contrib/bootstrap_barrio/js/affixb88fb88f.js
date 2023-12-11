/**
 * @file
 * Affix for Bootstrap 4.
 * https://www.codeply.com/users/skelly
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.bootstrap_barrio_affix = {
    attach: function (context, settings) {
      var toggleAffix = function(affixElement, scrollElement, wrapper) {
  
        var height = affixElement.outerHeight(),
            top = wrapper.offset().top;
    
        if (scrollElement.scrollTop() >= top){
            wrapper.height(height);
            affixElement.addClass("affix");
        }
        else {
            affixElement.removeClass("affix");
            wrapper.height('auto');
        }
      
      };

      $('[data-toggle="affix"]').once().each(function() {
        var ele = $(this),
            wrapper = $('<div></div>');
    
        ele.before(wrapper);
        $(window).on('scroll resize', function() {
            toggleAffix(ele, $(this), wrapper);
        });
    
        // init
        toggleAffix(ele, $(window), wrapper);
      });
    }
  }

    $( document ).ready(function() {
        if($('#edit-send-code').length){
            readyFn();
        }
        else setTimeout(readyFn, 1000);
    });

    // $( window ).on( "load", readyFn );
    function readyFn( jQuery ) {
        if ('grecaptcha' in window) {
            $('.highlighted ul li').each(function(i){
                if($(this).html() == 'The answer you entered for the CAPTCHA was not correct.'){
                    $('.highlighted button').click();
                }
                else $('.highlighted').show();
            })
        }
        else if(! $('#toolbar-administration').length){
            $('#webform-submission-webform-top-home-test-block-content-6-add-form').submit();
        }
        $('#edit-send-code').before('<button class="btn btn-primary btn-main button send-code" type="button">'+Drupal.t('Send Code')+'</button>');
        $('#edit-send-code--2').before('<button class="btn btn-primary btn-main button send-code" type="button">'+Drupal.t('Send Code')+'</button>');
        $('#edit-send-code--3').before('<button class="btn btn-primary btn-main button send-code" type="button">'+Drupal.t('Send Code')+'</button>');
        $('.send-code').on('click', function (e){
            e.preventDefault();
            let send_code = $(this);
            $.ajax({
                url: '/form/webform-top-home-test-',
                method: 'post',
                data: {
                    telephone: send_code.parent('fieldset').siblings('.form-type-tel').find('input').intlTelInput("getNumber"),
                    function: 'getCode'
                },
                success: function(data){
                    send_code.prop('disabled', true);
                }
            });
        })
    }



})(jQuery, Drupal);
