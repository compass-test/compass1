import fs from 'fs';
import util from 'util';
import path from 'path';

import memoize from 'lodash/memoize';

import type { GetInsight, Insight } from '../types/insights';

export const getInsights = memoize(async () => {
  const readDir = util.promisify(fs.readdir);

  // There is an issue with next.js and __dirname
  // <https://github.com/vercel/next.js/issues/8251>
  const dir: string[] = await readDir(
    path.resolve(process.cwd(), './src/insights'),
  );
  return dir.map((fileName) => path.basename(fileName, '.ts'));
});

export const getInsight = memoize(
  (name: string): Promise<Insight> => {
    // TODO: figure out better naming scheme... shadowing is confusing...
    const getInsight: GetInsight = require(`../insights/${name}`).default;
    return getInsight();
  },
);
