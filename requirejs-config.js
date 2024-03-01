// eslint-disable-next-line no-unused-vars
const config = {
  config: {
    mixins: {
      'Magento_Checkout/js/view/shipping': {
        'Magento_Checkout/js/mixin/step-validation-mixin': true,
      },
      'Magento_Checkout/js/view/payment': {
        'Magento_Checkout/js/mixin/step-validation-mixin': true,
      },
    },
  },
};
