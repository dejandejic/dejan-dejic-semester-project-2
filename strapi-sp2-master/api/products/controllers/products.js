'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
// const { sanitizeEntity } = require('strapi-utils');

 module.exports = {

    async findFeatured() {
        return strapi.query('products').find({ featured: true });
      },
};
