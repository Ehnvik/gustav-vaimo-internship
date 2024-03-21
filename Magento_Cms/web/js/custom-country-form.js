define(['jquery', 'mage/url', 'jquery-ui-modules/widget', 'mage/validation'], (
  $,
  urlBuilder
) => {
  $.widget('vaimo.countryFormWidget', {
    _create() {
      this._init();
    },

    _init() {
      this.addEventListeners();
    },

    addEventListeners() {
      this._on(this.element, {
        submit: 'onSubmit',
      });
    },

    onSubmit(e) {
      e.preventDefault();
      const form = $(e.currentTarget);

      if (!form.valid()) {
        return this;
      }

      const countryIdField = form
        .serializeArray()
        .find(field => field.name === 'country-id');
      const countryId = countryIdField ? countryIdField.value : null;

      if (countryId) {
        this.fetchCountry(countryId);
      } else {
        this.showError('Country ID is required.');
      }
    },

    fetchCountry(countryId) {
      $('body').trigger('processStart');
      $.ajax({
        url: urlBuilder.build(`rest/all/V1/directory/countries/${countryId}`),
      })
        .done(data => {
          this.showCustomer(data);
        })
        .fail(jqXHR => {
          let errorMessage =
            'An unexpected error occurred. Please try again later.';

          if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
            errorMessage = jqXHR.responseJSON.message;
          }
          this.showError(errorMessage);
        })
        .always(() => {
          $('body').trigger('processStop');
        });
    },

    showCustomer(customerData) {
      $('.js-country-name')
        .text('Country: ' + customerData.full_name_english)
        .show();
      $('.js-error-message').hide();
    },

    showError(errorMessage) {
      $('.js-error-message').text(errorMessage).show();
    },
  });

  return $.vaimo.countryFormWidget;
});
