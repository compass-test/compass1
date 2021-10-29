import assertFn from 'assert';
import { promises as fsp } from 'fs';
import path from 'path';

import globby from 'globby';

export function assert(condition: any, msg?: string): asserts condition {
  return assertFn(condition, msg);
}

export async function copyDir(
  src: string,
  dest: string,
  srcGlob: string | string[] = '**/*',
) {
  const files = await globby(srcGlob, { cwd: src, nodir: true });
  await Promise.all(
    files.map(async file => {
      const destinationFolder = path.join(dest, path.dirname(file));
      await fsp.mkdir(destinationFolder, { recursive: true });
      await fsp.copyFile(path.join(src, file), path.join(dest, file));
    }),
  );
}

/** Converts required args to optional if they have a default
 * Example: export type UserFlags = Default<Flags, keyof typeof defaultFlags>;
 */
export type Default<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
