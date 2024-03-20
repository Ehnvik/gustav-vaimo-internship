define(['ko', 'uiComponent', 'jquery', 'mage/translate', 'jquery/validate'], (
  ko,
  Component,
  $
) => {
  return Component.extend({
    defaults: {
      template: 'Magento_Cms/custom-form-two',
    },

    initialize() {
      this._super();
      this.validateCouponForm();
    },
    validateCouponForm() {
      $.validator.addMethod(
        'second-coupon-abc-123',
        inputValue => {
          return /^[A-Z]{3}-\d{3}$/.test(inputValue);
        },
        $.mage.__('Please enter a coupon code in the format ABC-123')
      );
      $('#second-custom-coupon-form').validate({
        rules: {
          'second-coupon-abc-123': {
            'validate-second-coupon-abc-123': true,
          },
        },
        messages: {
          'second-coupon-abc-123': {
            'validate-second-coupon-abc-123': $.mage.__(
              'Please enter a coupon code in the format ABC-123'
            ),
          },
        },
      });
    },
  });
});
