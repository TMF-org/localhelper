/**
 * approved-email-domain router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter(
  'api::approved-email-domain.approved-email-domain',
  {
    only: ['findOne'],
    config: { findOne: { auth: false } },
  },
);
