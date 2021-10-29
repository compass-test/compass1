import path from 'path';
import process from 'process';

import { readFile, writeFile, mkdir } from './fs';

// There is an issue with next.js and __dirname
// <https://github.com/vercel/next.js/issues/8251>
const cacheFile =
  __dirname.length === 1
    ? path.resolve(process.cwd(), './cache/cache.json') // next.js
    : path.resolve(__dirname, '../../cache/cache.json'); // node.js

type UninitializedCacheRef = {
  current: Record<string, any> | null;
};

type CacheRef = {
  current: Record<string, any>;
};

const cacheRef: UninitializedCacheRef | CacheRef = { current: null };

const writeCache = async () => {
  const cache = await readCache();
  // TODO: probably debounce
  await mkdir(path.dirname(cacheFile), { recursive: true });
  return writeFile(cacheFile, JSON.stringify(cache), { encoding: 'utf-8' });
};

const readCache = async () => {
  if (cacheRef.current === null) {
    try {
      const file = await readFile(cacheFile, { encoding: 'utf-8' });
      const cache = JSON.parse(file);
      cacheRef.current = cache;
    } catch (_) {
      // currently assuming this is always because it doesn't exist
      // not sure if we should consider other possibilities
      cacheRef.current = {};
    }
  }
  return (cacheRef as CacheRef).current;
};

export const getEntry = async (key: string) => {
  // TODO: maybe freeze / clone
  const cache = await readCache();
  return cache[key];
};

export const hasEntry = async (key: string) => {
  const cache = await readCache();
  return cache.hasOwnProperty(key);
};

export const putEntry = async (key: string, value: any) => {
  // TODO: might need a lock to avoid concurrency issues..?
  const cache = await readCache();
  cache[key] = value;
  await writeCache();
};

export const removeEntry = async (key: string) => {
  const cache = await readCache();
  delete cache[key];
  await writeCache();
};
