import { promises } from 'fs';

export const loadFile = async (filePath: string) => {
  await promises.access(filePath);
  return await promises.readFile(filePath, { encoding: 'utf8' });
};

export const loadFileAsJson = async <T>(filePath: string) => {
  return JSON.parse(await loadFile(filePath)) as T;
};
