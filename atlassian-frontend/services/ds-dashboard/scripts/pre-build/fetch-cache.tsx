import fetch, { Response } from 'node-fetch';
import fs from 'fs';
import path from 'path';
import process from 'process';

const EXIT_FAILURE_FETCH = 1;
const EXIT_FAILURE_JSON = 2;
const EXIT_FAILURE_MKDIR = 3;
const EXIT_FAILURE_WRITE = 4;

const localCacheName = 'cache.json';
const localCachePath = '../../cache';

const remoteCacheLocation = 'https://ds-dashboard.dev.atl-paas.net/cache.json';

const performFetch = async (url: string) => {
  const response = await fetch(url);
  if (response.ok) {
    return response;
  }
  return process.exit(EXIT_FAILURE_FETCH);
};

const getResponseText = async (response: Response) => {
  const contentType = response.headers.get('content-type');
  if (contentType === 'application/json') {
    return await response.text();
  }
  return process.exit(EXIT_FAILURE_JSON);
};

const createDirectory = async (filepath: string) => {
  try {
    fs.mkdirSync(filepath);
  } catch (error) {
    if ((error as any).code !== 'EEXIST') {
      process.exit(EXIT_FAILURE_MKDIR);
    }
  }
};

const writeFile = async (filepath: string, data: string) => {
  try {
    fs.writeFileSync(filepath, data);
  } catch (_) {
    process.exit(EXIT_FAILURE_WRITE);
  }
};

const fetchCache = async () => {
  const response = await performFetch(remoteCacheLocation);
  const json = await getResponseText(response);

  await createDirectory(path.resolve(__dirname, localCachePath));
  await writeFile(
    path.resolve(__dirname, localCachePath, localCacheName),
    json,
  );
};

fetchCache();
