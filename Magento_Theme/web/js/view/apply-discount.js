define([
  'ko',
  'Magento_Checkout/js/model/quote',
  'Magento_Checkout/js/model/full-screen-loader',
  'mage/url',
  'Magento_Checkout/js/model/error-processor',
  'Magento_SalesRule/js/view/payment/discount',
], function (
  ko,
  quote,
  fullScreenLoader,
  urlBuilder,
  errorProcessor,
  Component // Detta är Magento_SalesRule/js/view/payment/discount
) {
  'use strict';

  return Component.extend({
    defaults: {
      template: 'Magento_Theme/apply-discount',
    },
    couponCode: ko.observable(''),
    isApplied: ko.observable(false),

    initialize: function () {
      this._super();
    },

    apply: function () {
      if (!this.validateCouponCode()) {
        return;
      }

      fullScreenLoader.startLoader();
      $.ajax({
        url: urlBuilder.build('checkout/cart/couponPost'),
        data: { coupon_code: this.couponCode(), remove: 0 },
        type: 'post',
        dataType: 'json',

        success: function (response) {
          if (response.success) {
            this.isApplied(true);
          } else {
          }
          fullScreenLoader.stopLoader();
        }.bind(this),
        error: function (response) {
          errorProcessor.process(response);
          fullScreenLoader.stopLoader();
        },
      });
    },

    validateCouponCode: function () {
      let code = this.couponCode();

      return code.length > 0;
    },
  });
});
