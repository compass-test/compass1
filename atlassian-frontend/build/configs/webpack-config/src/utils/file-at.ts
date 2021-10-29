import fs from 'fs';

export async function fileAt(filePath: string): Promise<boolean> {
  try {
    const stat = await fs.promises.stat(filePath);
    return stat.isFile();
  } catch (err) {
    return false;
  }
}
