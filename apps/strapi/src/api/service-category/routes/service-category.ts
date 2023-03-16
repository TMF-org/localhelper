/**
 * service-category router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter(
  'api::service-category.service-category',
  {
    only: ['find', 'findOne'],
    config: {
      find: { auth: false },
      findOne: { auth: false },
    },
  },
);
