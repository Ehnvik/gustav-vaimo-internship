define([
  'ko',
  'uiComponent',
  'jquery',
  'mage/translate',
  'mage/validation',
], function (ko, Component, $, $t) {
  return Component.extend({
    defaults: {
      template: 'Magento_Cms/custom-form-two',
    },

    initialize() {
      this._super();
      this.onSubmit = this.onSubmit.bind(this);
      this.validateCouponForm();
    },

    onSubmit(e) {
      const form = $(e.currentTarget);

      if (form.validation && form.validation('isValid')) {
        this.submit();
        console.log('Form is valid, proceeding with submission...');
      } else {
        console.log('Form is invalid, cannot submit.');
      }
    },

    validateCouponForm() {
      $.validator.addMethod(
        'second-coupon-abc-123',
        function (value) {
          return /^[A-Z]{3}-\d{3}$/.test(value);
        },
        $t('Please enter a coupon code in the format ABC-123')
      );
    },
  });
});
