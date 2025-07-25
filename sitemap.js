const { ROUTES, ROUTES_SITEMAP } = require("./constants");
//const { dataForSitemap } = require("./raschets");
const dateNow = (new Date()).toString();

module.exports.paths = [
    {
      path: '/',
      lastmod: dateNow,
      priority: 1,
      changefreq: 'monthly'
    },
    
].concat(Object.keys(ROUTES_SITEMAP).map((key) => ({
    path: ROUTES[key],
    lastmod: dateNow,
    priority: 0.9,
    changefreq: 'monthly'
  })))
