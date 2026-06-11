import type { NextConfig } from 'next';
import path from 'path';

const config: NextConfig = {
  transpilePackages: ['@maeum/api', '@maeum/db', '@maeum/shared', '@maeum/ai', '@maeum/channel', '@maeum/storage'],
  outputFileTracingRoot: path.join(__dirname, '../../'),
};

export default config;
