const routes = require('next-routes')();

routes
  .add('/detail/:ipfsHash', 'detail');

module.exports = routes;
