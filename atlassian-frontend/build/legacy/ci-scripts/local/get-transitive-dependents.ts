/* eslint-disable @atlassian/tangerine/import/no-relative-package-imports */
import fs from 'fs';
import path from 'path';
import meow from 'meow';

import { Cache } from '../../../ci/cache';
import { cacheConfig as buildConfig } from '../../../ci/build-pipeline/cache.config';
import { cacheConfig as testConfig } from '../../../ci/test-pipeline/cache.config';

type Flags = {
  testConfig?: boolean;
  dependencies?: boolean;
  breakdown?: boolean;
};

async function main(packages: string[], flags: Flags) {
  let cacheConfig = buildConfig;
  if (flags.testConfig) {
    cacheConfig = testConfig;
  }
  const cache = new Cache(cacheConfig);
  await cache.init();
  for (const [wks] of Array.from(cache.project?.workspaces || [])) {
    await cache.computeHash(wks);
  }
  if (cache.hasher === undefined) {
    throw new Error('No hasher');
  }

  let transitiveGraph = new Map<string, Set<string>>();
  if (flags.dependencies) {
    transitiveGraph = cache.hasher.packageDependenciesMap;
  } else {
    Array.from(cache.hasher.packageDependenciesMap).forEach(([pkg, deps]) => {
      deps.forEach(dep => {
        const dependents = transitiveGraph.get(dep);
        if (!dependents) {
          transitiveGraph.set(dep, new Set([pkg]));
        } else {
          dependents.add(pkg);
        }
      });
    });
  }

  const packageDependentsArr = [...transitiveGraph]
    .filter(([pkg]) => packages.length === 0 || packages.includes(pkg))
    .map<[string, string[]]>(([pkg, deps]) => [pkg, [...deps]]);

  const numbers = packageDependentsArr
    .map<[string, number]>(([pkg, deps]) => [pkg, deps.length])
    .sort((a, b) => a[0].localeCompare(b[0]));

  const numbersSorted = numbers
    .slice()
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  const output: Record<string, any> = {
    total: Object.fromEntries(numbers),
    totalSorted: Object.fromEntries(numbersSorted),
  };

  if (flags.breakdown) {
    output.graph = Object.fromEntries(
      packageDependentsArr.sort((a, b) => a[0].localeCompare(b[0])),
    );
  }

  fs.writeFileSync(
    path.join(
      __dirname,
      'output',
      `transitive-${
        flags.dependencies ? 'dependencies' : 'dependents'
      }-${Date.now()}${flags.testConfig ? '-test' : ''}.json`,
    ),
    JSON.stringify(output, null, 2),
  );
}

if (require.main === module) {
  const cli = meow(
    `
    Calculate transitive dependendents (or dependencies) across the repo

    Usage
      $ yarn ts-node build/legacy/ci-scripts/local/get-transitive-dependents [packageName [packageName ...]]

    Options
      --testConfig Use test-pipeline config instead of build-pipeline
      --dependencies Calculate dependencies rather than dependents
      --breakdown List each packages dependents in addition to total numbers

    Examples
    TBD
`,
    {
      flags: {
        dev: {
          type: 'boolean',
        },
        dependencies: {
          type: 'boolean',
        },
        breakdown: {
          type: 'boolean',
        },
      },
    },
  );
  main(cli.input, cli.flags).catch(e => {
    console.error(e);
    process.exit(1);
  });
}
