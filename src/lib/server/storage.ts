import fs from 'fs';
import path from 'path';

export async function appendToJsonl(filePath: string, record: unknown): Promise<void> {
  const abs = path.join(process.cwd(), filePath);
  const dir = path.dirname(abs);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.appendFileSync(abs, JSON.stringify(record) + '\n', 'utf-8');
}

export async function readJsonl(filePath: string): Promise<Record<string, unknown>[]> {
  const abs = path.join(process.cwd(), filePath);
  if (!fs.existsSync(abs)) return [];
  const lines = fs.readFileSync(abs, 'utf-8').split('\n').filter(Boolean);
  return lines.map((l) => {
    try { return JSON.parse(l); } catch { return {}; }
  });
}
