import { exec as execDefault } from 'child_process';
import {
  existsSync,
  readFile as readFileDefault,
  writeFile as writeFileDefault,
} from 'fs';
import { promisify } from 'util';

// These exist here to simplify mocking in tests.
// Instead of mocking the `fs` package (inc `fs.promises`), we mock only these
// instances, which avoids unexpectedly breaking other FS usage within internal
// tooling such as Jest's stack.
export const readFile = promisify(readFileDefault);
export const writeFile = promisify(writeFileDefault);
export const exec = promisify(execDefault);

export function fileExists(path: string) {
  return existsSync(path);
}
