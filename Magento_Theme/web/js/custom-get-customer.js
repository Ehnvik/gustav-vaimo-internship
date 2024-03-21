define(['jquery', 'mage/url', 'jquery-ui-modules/widget'], ($, urlBuilder) => {
  $.widget('vaimo.getCustomerWidget', {
    options: {
      accessToken:
        'eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjEsInV0eXBpZCI6MiwiaWF0IjoxNzExMDA5OTIzLCJleHAiOjE3MTEwMTM1MjN9.AxukwY_ZCUNRxwltVx-IIm9E50HzKvlJXCsT7p2Tybo',
    },

    _create() {
      this.getCustomerButton();
    },

    getCustomerButton() {
      $('#get-customer-button').on('click', () => {
        self.fetchCustomer();
      });
    },

    fetchCustomer() {
      $.ajax({
        url: urlBuilder.build('rest/all/V1/customers/2'),
        beforeSend: xhr => {
          xhr.setRequestHeader(
            'Authorization',
            'Bearer ' + this.options.accessToken
          );
        },
      })
        .done(data => {
          this.showCustomer(data);
        })
        .fail(jqXHR => {
          let errorMessage = 'An unexpected error occurred. Please try again.';

          if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
            errorMessage = jqXHR.responseJSON.message;
          }
          this.showError(errorMessage);
        });
    },

    showCustomer(customerData) {
      $('#error-message').hide();
      $('#show-customer')
        .text(`Customer: ${customerData.firstname} ${customerData.lastname}`)
        .show();
    },

    showError(errorMessage) {
      $('#error-message').text(errorMessage).show();
    },
  });

  return $.vaimo.getCustomerWidget;
});
