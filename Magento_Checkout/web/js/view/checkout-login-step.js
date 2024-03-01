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
    },

    isVisible: ko.observable(true),
    isLoggedIn: customer.isLoggedIn(),
    stepCode: 'isLoggedCheck',
    stepTitle: 'Logging Status',

    initialize: function () {
      this._super();
      stepNavigator.registerStep(
        this.stepCode,
        null,
        this.stepTitle,
        this.isVisible,

        this.navigate.bind(this),
        1
      );

      return this;
    },

    navigate: function () {},

    navigateToNextStep: function () {
      stepNavigator.next();
    },
  });
});
