/**
 * @file
 * JavaScript behaviors for Telephone element.
 */

(function ($, Drupal, drupalSettings) {

  'use strict';

  // @see https://github.com/jackocnr/intl-tel-input#options
  Drupal.webform = Drupal.webform || {};
  Drupal.webform.intlTelInput = Drupal.webform.intlTelInput || {};
  Drupal.webform.intlTelInput.options = Drupal.webform.intlTelInput.options || {};

  /**
   * Initialize Telephone international element.
   * @see http://intl-tel-input.com/node_modules/intl-tel-input/examples/gen/is-valid-number.html
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.webformTelephoneInternational = {
    attach: function (context) {
      if (!$.fn.intlTelInput) {
        return;
      }

      $(context).find('input.js-webform-telephone-international').once('webform-telephone-international').each(function () {
        var $telephone = $(this);

        // Add error message container.
        var $error = $('<div class="form-item--error-message">' + Drupal.t('Invalid phone number') + '</div>').hide();
        $telephone.closest('.js-form-item').append($error);

        var options = {
          // The utilsScript is fetched when the page has finished.
          // @see \Drupal\webform\Plugin\WebformElement\Telephone::prepare
          // @see https://github.com/jackocnr/intl-tel-input
          utilsScript: drupalSettings.webform.intlTelInput.utilsScript,
          nationalMode: false
        };

        // Parse data attributes.
        if ($telephone.attr('data-webform-telephone-international-initial-country')) {
          options.initialCountry = $telephone.attr('data-webform-telephone-international-initial-country');
        }
        if ($telephone.attr('data-webform-telephone-international-preferred-countries')) {
          options.preferredCountries = JSON.parse($telephone.attr('data-webform-telephone-international-preferred-countries'));
        }

        options = $.extend(options, Drupal.webform.intlTelInput.options);
        $telephone.intlTelInput(options);

        var reset = function () {
          $telephone.removeClass('error');
          $error.hide();
        };

        $telephone.blur(function () {
          reset();
          if ($.trim($telephone.val())) {
            if (!$telephone.intlTelInput('isValidNumber')) {
              $telephone.addClass('error');
              $error.show();
            }
          }
          submit_true($telephone);
        });

        $telephone.on('keyup change', reset);
      });

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
    }
  };

})(jQuery, Drupal, drupalSettings);
