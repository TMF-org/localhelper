/**
 * faq router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::faq.faq', {
  only: ['find', 'findOne'],
  config: {
    find: { auth: false },
    findOne: { auth: false },
  },
});
