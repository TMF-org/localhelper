/**
 * ticket router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::ticket.ticket', {
  only: ['create', 'find', 'findOne'],
  config: {
    create: { auth: false },
  },
});
