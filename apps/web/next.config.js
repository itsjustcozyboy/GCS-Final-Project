const path = require('path');

/** @type {import('next').NextConfig} */
const config = {
  transpilePackages: ['@maeum/api', '@maeum/db', '@maeum/shared', '@maeum/ai', '@maeum/channel', '@maeum/storage'],
  outputFileTracingRoot: path.join(__dirname, '../../'),
  webpack(webpackConfig) {
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      '@': path.join(__dirname, 'src'),
    };
    return webpackConfig;
  },
};

module.exports = config;
