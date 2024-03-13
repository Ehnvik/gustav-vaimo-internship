define([
  'uiComponent',
  'ko',
  'jquery',
  'Magento_Customer/js/customer-data',
  'Magento_Customer/js/model/customer',
], (Component, ko, $, customerData, customer) => {
  return Component.extend({
    defaults: {
      template: 'Magento_Wishlist/custom-wishlist',
      totalItems: 0,
      wishlistUrl: '',
      isLoggedIn: customer.isLoggedIn(),
      tracks: {
        totalItems: true,
      },
    },

    initialize() {
      this._super();
      const wishlist = customerData.get('wishlist');

      this.updateWishlistCounter(wishlist());
      wishlist.subscribe(this.updateWishlistCounter.bind(this));
    },

    updateWishlistCounter(wishlist) {
      if (wishlist.counter) {
        this.totalItems = wishlist.counter.slice(0, 1);
      }
    },
  });
});
