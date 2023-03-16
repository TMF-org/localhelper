const path = require('path');

// load .env file from monorepo
require('dotenv-expand').expand(
  require('dotenv').config({ path: path.join(process.cwd(), '../../.env') }),
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
};

module.exports = nextConfig;
