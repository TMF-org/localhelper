import path from 'path';

// load .env file from monorepo
require('dotenv-expand').expand(
  require('dotenv').config({ path: path.join(process.cwd(), '../../.env') }),
);

export default ({ env }) => {
  return {
    auth: {
      secret: env('STRAPI_ADMIN_JWT_SECRET'),
    },
    apiToken: {
      salt: env('STRAPI_API_TOKEN_SALT'),
    },
  };
};
