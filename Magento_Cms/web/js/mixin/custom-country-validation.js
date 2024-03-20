define(['jquery', 'mage/translate', 'jquery/validate'], $ => {
  'use strict';

  return () => {
    $.validator.addMethod(
      'validate-country-id',
      inputValue => {
        return /^[A-Z]{2}$/.test(inputValue);
      },
      $.mage.__('Please enter the country code in uppercase format AB')
    );
  };
});
