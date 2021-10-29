import meow from 'meow';

import { getPackagesInfo, PackageInfo } from '@atlaskit/build-utils/tools';

import { DistType } from '../lib/types';
import watchPkg from '../lib/watch';

async function main() {
  const cli = meow(
    `
      Usage
        $ watch <packageName>

      where packageName is a long form (@atlaskit/my-pkg) or short form (my-pkg) name

      Options
        -d, --distType <cjs|esm|es2019|types|none>  Run watch only for specific distTypes, cjs, esm, es2019, or types, or specify 'none' to not compile a dist type and only run other build steps
        -s, --strict                                Do not ignore typescript errors when building single packages. (They are always unignored for full builds)

      Examples
        $ watch
        $ watch --distType cjs
        $ watch -d cjs
  `,
    {
      description: 'Watches & rebuilds a package in current directory',
      flags: {
        distType: {
          alias: 'd',
          type: 'string',
        },
        strict: {
          type: 'boolean',
        },
      },
    },
  );

  const distType =
    cli.flags && cli.flags.distType
      ? (cli.flags.distType.split(',') as DistType[])
      : undefined;

  const packagesInfo: PackageInfo[] = await getPackagesInfo(
    process.cwd(),
    undefined,
    true,
  );

  const pkgName = cli.input[0];
  if (!pkgName) {
    throw new Error('Must pass in a package name');
  }

  const filteredPkgs = packagesInfo.filter(
    pkg => pkgName === pkg.name || pkgName === pkg.name.split('/')[1],
  );
  if (filteredPkgs.length > 1) {
    throw new Error(
      `Found too many packages: "${filteredPkgs}".\nUse full package name instead`,
    );
  } else if (filteredPkgs.length === 0) {
    throw new Error(`Could not find workspace with name "${pkgName}"`);
  }

  await watchPkg({
    cwd: filteredPkgs[0].dir,
    ...cli.flags,
    ignoreTsErrors: !cli.flags.strict,
    distType,
  });
}

if (require.main === module) {
  process.on('SIGINT', () => {
    // We need our own SIGINT handler since concurrently overrides the default one (and doesn't even throw)
    process.exit(2);
  });
  main().catch(e => {
    console.error(e);
    process.exit(1);
  });
}
