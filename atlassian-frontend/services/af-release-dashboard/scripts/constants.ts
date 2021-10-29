import path from 'path';

export const RELEASES_CHANGELOGS_DIR = path.resolve(
  __dirname,
  '../../../releases',
);
export const RELEASES_JSON_DIR = path.resolve(__dirname, '../data');
export const RELEASES_JSON_PATH = path.resolve(
  __dirname,
  RELEASES_JSON_DIR,
  'releases.json',
);
export const SEEDS_JSON_DIR = path.resolve(__dirname, '../src/db/seeds');
export const SEEDS_JSON_PATH = (releaseName: string) =>
  path.resolve(__dirname, SEEDS_JSON_DIR, `${releaseName}.seed.json`);
export const STATLAS_RELEASES_JSON_DIR = `af-release-dashboard/${process.env.MICROS_ENV}/releases.json`;
export const STATLAS_RELEASES_JSON_URL = `https://statlas.prod.atl-paas.net/${process.env.STATLAS_NAMESPACE}/${STATLAS_RELEASES_JSON_DIR}`;
