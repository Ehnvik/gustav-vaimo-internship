define([
  'jquery',
  'uiComponent',
  'Magento_Customer/js/customer-data',
  'underscore',
  'escaper',
  'jquery/jquery-storageapi',
], function ($, Component, customerData, _, escaper) {
  'use strict';

  return Component.extend({
    defaults: {
      cookieMessages: [],
      messages: [],
      allowedTags: ['div', 'span', 'b', 'strong', 'i', 'em', 'u', 'a'],
    },

    initialize() {
      this._super();

      this.cookieMessages = _.unique(
        $.cookieStorage.get('mage-messages'),
        'text'
      );

      this.messages = customerData.get('messages').extend({
        disposableCustomerData: 'messages',
      });

      if (!_.isEmpty(this.messages().messages)) {
        customerData.set('messages', {});
      }

      $.mage.cookies.set('mage-messages', '', {
        samesite: 'strict',
        domain: '',
      });

      this.closeMessage();
    },

    prepareMessageForHtml(message) {
      return escaper.escapeHtml(message, this.allowedTags);
    },

    closeMessage() {
      $('body').on('click', '.close-message-icon', function () {
        $(this).closest('.message').hide();
      });
    },
  });
});
