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
          this.isVisible(false);
          stepNavigator.navigateTo('isLoggedCheck');
        }
      },

      navigateToNextStep() {
        if (customer.isLoggedIn()) {
          this.isVisible(true);
          stepNavigator.next();
        } else {
          this.isVisible(false);
          stepNavigator.navigateTo('isLoggedCheck');
        }
      },
    });
  };
});
