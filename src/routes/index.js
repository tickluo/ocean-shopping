export default {
  routes: {
    /* '/': require('../views/app'),*/
    '/order': require('./order'),
    '/cart': require('./cart')
  },

  alias: {
    // '/order/:orderId': '/order'
  }
}
