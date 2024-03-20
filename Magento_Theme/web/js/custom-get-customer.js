define(['jquery', 'mage/url', 'jquery-ui-modules/widget'], ($, urlBuilder) => {
  $.widget('vaimo.getCustomerWidget', {
    options: {
      accessToken:
        'eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjEsInV0eXBpZCI6MiwiaWF0IjoxNzEwOTQyNjU5LCJleHAiOjE3MTA5NDYyNTl9._cgpyPj4Dnju_gkHW6Noih66oHAqiyZSziS4dceL9h4',
    },

    _create() {
      this.getCustomerButton();
    },

    getCustomerButton() {
      const self = this;

      $('#get-customer-button').on('click', function () {
        self.fetchCustomer();
      });
    },

    fetchCustomer() {
      const self = this;

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
          self.showCustomer(data);
        })
        .fail(jqXHR => {
          let errorMessage = 'An unexpected error occurred. Please try again.';

          if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
            errorMessage = jqXHR.responseJSON.message;
          }
          self.showError(errorMessage);
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
