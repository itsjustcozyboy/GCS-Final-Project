const path = require('path');

/** @type {import('next').NextConfig} */
const config = {
  transpilePackages: ['@maeum/api', '@maeum/db', '@maeum/shared', '@maeum/ai', '@maeum/channel', '@maeum/storage'],
  outputFileTracingRoot: path.join(__dirname, '../../'),
};

module.exports = config;
