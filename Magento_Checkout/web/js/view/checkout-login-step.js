define([
  'ko',
  'uiComponent',
  'Magento_Checkout/js/model/step-navigator',
  'Magento_Customer/js/model/customer',
], function (ko, Component, stepNavigator, customer) {
  'use strict';

  return Component.extend({
    defaults: {
      template: 'Magento_Checkout/check-login',
      customerName: ko.observable(''),
      isNextEnabled: ko.observable(false),
    },

    isVisible: ko.observable(customer.isLoggedIn()),
    isLoggedIn: customer.isLoggedIn(),
    stepCode: 'isLoggedCheck',
    stepTitle: 'Logging Status',

    initialize() {
      this._super();
      this.checkAuthorization();
    },

    checkAuthorization() {
      if (customer.isLoggedIn()) {
        this.registerNewCheckoutStep();
        this.checkNameInputValue();
      }
    },

    registerNewCheckoutStep() {
      stepNavigator.registerStep(
        this.stepCode,
        null,
        this.stepTitle,
        this.isVisible,
        this.navigate.bind(this),
        1
      );
    },

    checkNameInputValue() {
      this.customerName.subscribe(newValue => {
        this.isNextEnabled(newValue.length > 0);
      });
    },

    navigate() {},

    navigateToNextStep() {
      stepNavigator.next();
    },
  });
});
