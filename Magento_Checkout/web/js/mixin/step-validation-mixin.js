define([
  'ko',
  'Magento_Customer/js/model/customer',
  'Magento_Checkout/js/model/step-navigator',
  'Magento_Checkout/js/model/quote',
], function (ko, customer, stepNavigator, quote) {
  return function (checkoutComponent) {
    return checkoutComponent.extend({
      defaults: {
        visible: ko.observable(!quote.isVirtual() && customer.isLoggedIn()),
        listens: {
          visible: 'onVisibleUpdate',
        },
      },

      navigate() {
        return customer.isLoggedIn()
          ? this._super()
          : this.navigateToAuthStep();
      },

      navigateToAuthStep() {
        stepNavigator.setHash('isLoggedCheck');
      },

      onVisibleUpdate(visible) {
        if (!visible || customer.isLoggedIn()) {
          return this;
        }
      },
    });
  };
});
