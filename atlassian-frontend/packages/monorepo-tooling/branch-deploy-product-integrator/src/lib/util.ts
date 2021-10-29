/**
 * Util functions
 */
import * as fs from 'fs';
import { promises as fsp } from 'fs';
import path from 'path';

import { integratorVariablesFileName } from '../lib/constants';

export function debugMock(
  objName: string,
): {
  [prop: string]: any;
} {
  return new Proxy(
    {},
    {
      get(target, prop: string) {
        return (...args: any[]) => {
          console.log(`Called ${objName}.${prop}(${args})`);
        };
      },
    },
  );
}

export class ValidationError extends Error {}

export type Default<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// As we can't publish to the private registry with sox packages, we do publish them to `not-sox`.
export const convertSoxToNotSox = (packages: string[]) =>
  packages.map(pkg => pkg.replace('@atlassiansox/', '@atlassian/not-sox-'));

export const convertNotSoxToSox = (packages: string[]) =>
  packages.map(pkg => pkg.replace('@atlassian/not-sox-', '@atlassiansox/'));

/** Exports a variable to a file that can be read in a later stage in the CI pipeline. */
export function exportVariable(key: string, value: string) {
  if (key.includes(' ')) {
    throw Error(`Key "${key}" must not contain spaces`);
  }

  const metadata = {
    [key]: value,
  };

  // Path to the `branch-deploy-product-integrator` folder root
  const filePath = path.join(
    __dirname,
    '..',
    '..',
    `${key}-${integratorVariablesFileName}`,
  );

  return fsp.writeFile(filePath, JSON.stringify(metadata), {
    encoding: 'utf8',
  });
}

export async function readVariable(key: string) {
  let variable;
  // Path to the `branch-deploy-product-integrator` folder root
  const filePath = path.join(
    __dirname,
    '..',
    '..',
    `${key}-${integratorVariablesFileName}`,
  );
  if (fs.existsSync(filePath)) {
    variable = JSON.parse(await fsp.readFile(filePath, 'utf8'))[key];
  } else {
    `${filePath} does not exist - please check 'push.ts' file in 'branch-deploy-product-integrator'.`;
  }
  return variable;
}

export function createBranchName(afBranchName: string, prefix: string) {
  return `${prefix}${afBranchName}`.replace(/\//g, '-');
}
