import fs from 'node:fs/promises';
import path from 'node:path';
import type { StorageAdapter } from './adapter.js';

export class LocalStorageAdapter implements StorageAdapter {
  private baseDir: string;
  private baseUrl: string;

  constructor(baseDir = './uploads', baseUrl = 'http://localhost:3001/uploads') {
    this.baseDir = baseDir;
    this.baseUrl = baseUrl;
  }

  private async ensureDir(key: string) {
    const dir = path.dirname(path.join(this.baseDir, key));
    await fs.mkdir(dir, { recursive: true });
  }

  async upload(key: string, buffer: Buffer, _mime: string): Promise<string> {
    await this.ensureDir(key);
    await fs.writeFile(path.join(this.baseDir, key), buffer);
    console.log(`[LocalStorage] Uploaded: ${key}`);
    return `${this.baseUrl}/${key}`;
  }

  async download(key: string): Promise<Buffer> {
    return fs.readFile(path.join(this.baseDir, key));
  }

  async delete(key: string): Promise<void> {
    await fs.unlink(path.join(this.baseDir, key));
  }

  async getSignedUrl(key: string, _expiresInSeconds = 3600): Promise<string> {
    return `${this.baseUrl}/${key}`;
  }
}
