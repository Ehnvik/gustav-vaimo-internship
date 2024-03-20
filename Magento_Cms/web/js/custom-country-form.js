define(['jquery', 'mage/url', 'jquery-ui-modules/widget', 'jquery/validate'], (
  $,
  urlBuilder
) => {
  $.widget('vaimo.countryFormWidget', {
    options: {},

    _create() {
      this.submitForm();
    },

    submitForm() {
      const self = this;

      $('#search-country-form').on('submit', function (e) {
        e.preventDefault();
        if ($(this).valid()) {
          const countryId = $('#country-id').val();

          self.fetchCountry(countryId);
        }
      });
    },

    fetchCountry(countryId) {
      $('body').trigger('processStart');
      $.ajax({
        url: urlBuilder.build(`rest/all/V1/directory/countries/${countryId}`),
      })
        .done(data => {
          $('#country-name')
            .text('Country: ' + data.full_name_english)
            .show();
          $('#error-message').hide();
        })
        .fail(jqXHR => {
          let userMessage =
            'Error, your request could not be sent. Please try again later.';

          if (jqXHR.responseText) {
            try {
              let response = JSON.parse(jqXHR.responseText);

              if (response && response.message) {
                userMessage = response.message;
              }
            } catch (e) {
              userMessage =
                'An unexpected error occurred. Please try again later.';
            }
          } else {
            userMessage =
              'Network error, please check your connection and try again.';
          }

          $('#error-message').text(userMessage).show();
        })
        .always(() => {
          $('body').trigger('processStop');
          $('#country-id').val('');
        });
    },
  });

  return $.vaimo.countryFormWidget;
});
