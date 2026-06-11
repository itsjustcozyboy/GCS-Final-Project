import type { NextConfig } from 'next';

const config: NextConfig = {
  transpilePackages: ['@maeum/api', '@maeum/db', '@maeum/shared', '@maeum/ai', '@maeum/channel', '@maeum/storage'],
};

export default config;
