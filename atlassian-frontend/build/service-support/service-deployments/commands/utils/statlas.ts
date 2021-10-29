import spawndamnit from 'spawndamnit';
import { Logger } from './index';

const NAMESPACE = 'atlassian-frontend-services';
const BASE_URL = `https://statlas.prod.atl-paas.net/${NAMESPACE}`;

type StatlasOpts = {
  path: string;
  authToken: string;
};

type UploadOpts = StatlasOpts & {
  method: 'POST' | 'PUT';
  file: string;
};

type TarOpts = {
  dir: string;
  filename: string;
  tarContents?: boolean;
};

function spawn(command: string, args: string[], cwd: string) {
  Logger.log(`${command} ${args.join(' ')}`);
  return spawndamnit(command, args, {
    cwd,
    stdio: 'inherit',
  });
}

export const createTarFilename = (path: string) =>
  `${path.replace(/\//g, '_').replace(/\./g, '-')}.tar.gz`;

export async function tar(
  { dir, filename, tarContents }: TarOpts,
  cwd: string,
) {
  const normalisedFilename = createTarFilename(filename);
  const args = ['-cvzf', normalisedFilename];
  if (tarContents) {
    args.push('-C', dir, '.');
  } else {
    args.push(dir);
  }
  await spawn('tar', args, cwd);
  return normalisedFilename;
}

export async function untar({ filename }: { filename: string }, cwd: string) {
  await spawn('tar', ['-xvzf', filename], cwd);
}

export async function uploadToStatlas(
  { method, path, file, authToken }: UploadOpts,
  cwd: string,
) {
  const url = `${BASE_URL}/${path}`;
  await spawn(
    'curl',
    [
      '-v',
      '-X',
      method,
      '-H',
      `Authorization: Bearer ${authToken}`,
      '-T',
      file,
      url,
    ],
    cwd,
  );
  return url;
}

export async function downloadFromStatlas(
  { path, authToken }: StatlasOpts,
  cwd: string,
) {
  const url = `${BASE_URL}/${path}`;
  await spawn(
    'curl',
    [
      '-v',
      '-X',
      'GET',
      '-H',
      `Authorization: Bearer ${authToken}`,
      url,
      '--output',
      path,
    ],
    cwd,
  );
  return url;
}
