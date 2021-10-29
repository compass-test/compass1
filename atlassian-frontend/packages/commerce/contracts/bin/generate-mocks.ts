import { writeFileSync } from 'fs';
import { resolve, relative } from 'path';

import glob from 'glob';

const testsDirectory = resolve(__dirname, '../contract-mocks');

const discover = (pattern: string): string[] => glob.sync(pattern);

// test directory contains contracts + config. And only contract has "-" in the name
const tests = discover(`${testsDirectory}/*.json`);
const asArray = <T>(x: T | T[]): T[] => (Array.isArray(x) ? x : [x]);

const writeTo = resolve(__dirname, '../contract-mocks/build-info.json');
const workingDir = resolve(__dirname, '..');
const mocks = tests.flatMap(file => {
  if (writeTo === file) {
    return [];
  }
  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require
  const contracts: any = asArray(require(file));
  return contracts.map(({ consumer, provider }: any) => ({
    consumerName: consumer.name,
    providerName: provider.name,
    specName: provider.specName,
    location: relative(workingDir, file),
  }));
});

writeFileSync(writeTo, JSON.stringify({ mocks }, null, 2));
