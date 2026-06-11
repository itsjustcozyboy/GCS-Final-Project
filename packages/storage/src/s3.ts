import type { StorageAdapter } from './adapter.js';
import { LocalStorageAdapter } from './local.js';

export class S3StorageAdapter implements StorageAdapter {
  private bucket: string;
  private endpoint: string;
  private accessKey: string;
  private secretKey: string;
  private fallback = new LocalStorageAdapter();

  constructor(bucket: string, endpoint: string, accessKey: string, secretKey: string) {
    this.bucket = bucket;
    this.endpoint = endpoint;
    this.accessKey = accessKey;
    this.secretKey = secretKey;
  }

  private hasCreds() {
    return this.bucket && this.endpoint && this.accessKey && this.secretKey;
  }

  async upload(key: string, buffer: Buffer, mime: string): Promise<string> {
    if (!this.hasCreds()) return this.fallback.upload(key, buffer, mime);
    // AWS SDK v3 연동 — 키가 있을 때만 동작
    const { S3Client, PutObjectCommand } = await import('@aws-sdk/client-s3');
    const client = new S3Client({ endpoint: this.endpoint, credentials: { accessKeyId: this.accessKey, secretAccessKey: this.secretKey } });
    await client.send(new PutObjectCommand({ Bucket: this.bucket, Key: key, Body: buffer, ContentType: mime }));
    return `${this.endpoint}/${this.bucket}/${key}`;
  }

  async download(key: string): Promise<Buffer> {
    if (!this.hasCreds()) return this.fallback.download(key);
    const { S3Client, GetObjectCommand } = await import('@aws-sdk/client-s3');
    const client = new S3Client({ endpoint: this.endpoint, credentials: { accessKeyId: this.accessKey, secretAccessKey: this.secretKey } });
    const res = await client.send(new GetObjectCommand({ Bucket: this.bucket, Key: key }));
    const chunks: Uint8Array[] = [];
    for await (const chunk of res.Body as AsyncIterable<Uint8Array>) chunks.push(chunk);
    return Buffer.concat(chunks);
  }

  async delete(key: string): Promise<void> {
    if (!this.hasCreds()) return this.fallback.delete(key);
    const { S3Client, DeleteObjectCommand } = await import('@aws-sdk/client-s3');
    const client = new S3Client({ endpoint: this.endpoint, credentials: { accessKeyId: this.accessKey, secretAccessKey: this.secretKey } });
    await client.send(new DeleteObjectCommand({ Bucket: this.bucket, Key: key }));
  }

  async getSignedUrl(key: string, expiresInSeconds = 3600): Promise<string> {
    if (!this.hasCreds()) return this.fallback.getSignedUrl(key, expiresInSeconds);
    const { S3Client, GetObjectCommand } = await import('@aws-sdk/client-s3');
    const { getSignedUrl } = await import('@aws-sdk/s3-request-presigner');
    const client = new S3Client({ endpoint: this.endpoint, credentials: { accessKeyId: this.accessKey, secretAccessKey: this.secretKey } });
    return getSignedUrl(client, new GetObjectCommand({ Bucket: this.bucket, Key: key }), { expiresIn: expiresInSeconds });
  }
}
