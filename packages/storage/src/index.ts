export * from './adapter';
export * from './local';
export * from './s3';

import { LocalStorageAdapter } from './local';
import { S3StorageAdapter } from './s3';
import type { StorageAdapter } from './adapter';

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
    // 웹앱의 /uploads/[...path] 라우트가 이 URL로 파일을 서빙한다
    process.env.UPLOADS_URL ?? `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/uploads`,
  );
}
