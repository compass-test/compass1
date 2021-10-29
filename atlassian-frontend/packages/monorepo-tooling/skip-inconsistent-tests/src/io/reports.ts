import type { Test } from '../types';

import { readFile, writeFile } from './io';

export async function loadReport<T>(path: string): Promise<T | undefined> {
  let report = '';
  try {
    report = await readFile(path, { encoding: 'utf-8' });
  } catch (error) {
    const errorMessage = `Read Error: ${path}${
      error.message ? `\n${error.message}` : ''
    }`;
    throw new Error(errorMessage);
  }
  return path.endsWith('.json') ? JSON.parse(report) : report;
}

export async function writeReport(path: string, input: Test[]) {
  try {
    await writeFile(path, JSON.stringify(input), { encoding: 'utf-8' });
  } catch (error) {
    throw new Error(`Write Error: '${path}'\n${error.message}`);
  }
}
