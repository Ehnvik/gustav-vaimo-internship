define([
  'ko',
  'Magento_Customer/js/model/customer',
  'Magento_Checkout/js/model/step-navigator',
], function (ko, customer, stepNavigator) {
  return function (checkoutComponent) {
    return checkoutComponent.extend({
      defaults: {
        isVisible: ko.observable(true),
      },

      initialize() {
        this._super();

        if (!customer.isLoggedIn()) {
          this.navigateToAuthStep();
        }
      },

      navigateToNextStep() {
        if (!customer.isLoggedIn()) {
          return this.navigateToAuthStep();
        }

        this.isVisible(true);
        stepNavigator.next();
      },

      navigateToAuthStep() {
        this.isVisible(false);
        stepNavigator.navigateTo('isLoggedCheck');
      },
    });
  };
});
