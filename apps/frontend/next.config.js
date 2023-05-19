const path = require('path');

// load .env file from monorepo
require('dotenv-expand').expand(
  require('dotenv').config({ path: path.join(process.cwd(), '../../.env') }),
);

const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  buildExcludes: [/static\/media\/.*.woff$/],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
};

module.exports = withPWA(nextConfig);
