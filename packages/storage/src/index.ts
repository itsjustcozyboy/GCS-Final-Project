export * from './adapter.js';
export * from './local.js';
export * from './s3.js';

import { LocalStorageAdapter } from './local.js';
import { S3StorageAdapter } from './s3.js';
import type { StorageAdapter } from './adapter.js';

export function createStorageAdapter(): StorageAdapter {
  const provider = process.env.STORAGE_PROVIDER ?? 'local';
  if (provider === 's3') {
    return new S3StorageAdapter(
      process.env.S3_BUCKET ?? '',
      process.env.S3_ENDPOINT ?? '',
      process.env.S3_ACCESS_KEY ?? '',
      process.env.S3_SECRET_KEY ?? '',
    );
  }
  return new LocalStorageAdapter(
    process.env.UPLOADS_DIR ?? './uploads',
    process.env.UPLOADS_URL ?? 'http://localhost:3001/uploads',
  );
}
