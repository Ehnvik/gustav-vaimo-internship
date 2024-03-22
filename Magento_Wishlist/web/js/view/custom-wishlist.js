define(['uiComponent', 'ko', 'jquery', 'Magento_Customer/js/customer-data'], (
  Component,
  ko,
  $,
  customerData
) => {
  return Component.extend({
    defaults: {
      template: 'Magento_Wishlist/custom-wishlist',
      totalItems: 0,
      wishlistUrl: '',
      isLoggedIn: customerData.isLoggedIn,
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
      if (wishlist && wishlist.counter) {
        const matches = wishlist.counter.match(/\d+/);

        if (matches) {
          this.totalItems = parseInt(matches[0], 10);
        }
      }
    },
  });
});
