define(['jquery', 'mage/translate', 'jquery/validate'], $ => {
  'use strict';

  return () => {
    $.validator.addMethod(
      'validate-coupon-abc-123',
      inputValue => {
        return /^[A-Z]{3}-\d{3}$/.test(inputValue);
      },
      $.mage.__('Please enter a coupon code in the format ABC-123')
    );
    $.validator.addMethod(
      'validate-coupon-abc-abc',
      inputValue => {
        return /^[A-Z]{3}-[A-Z]{3}$/.test(inputValue);
      },
      $.mage.__('Please enter a coupon code in the format ABC-ABC')
    );
    $.validator.addMethod(
      'validate-coupon-123-123',
      inputValue => {
        return /^\d{3}-\d{3}$/.test(inputValue);
      },
      $.mage.__('Please enter a coupon in the format 123-123')
    );
  };
});
