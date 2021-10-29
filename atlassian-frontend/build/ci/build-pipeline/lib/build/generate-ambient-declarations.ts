/**
 * We need to declare ambient declarations of package dependencies to ensure that our declaration (d.ts) files
 * do not contain deep import paths to dependencies. This is specifically needed for imports from package entry points
 * where exporting the inferred type from the package root or package entry point does not work
 * without an ambient declaration.
 */
import { promises as fsp } from 'fs';
import path from 'path';

import { getPackagesInfo, PackageInfo } from '@atlaskit/build-utils/tools';

type Options = {
  cwd: string;
  packageName?: string;
  log?: (...msg: any) => void;
};

export async function generateAmbientDeclarations(
  partialOpts: Partial<Options> = {},
) {
  const { packageName, cwd = process.cwd(), log = console.log } = partialOpts;
  const before = Date.now();

  const allPackages: PackageInfo[] = await getPackagesInfo(
    cwd,
    undefined,
    true,
  );
  const tsPackages = allPackages.filter(pkg => pkg.runTypeScriptBuild);

  const packageMap = new Map(tsPackages.map(pkg => [pkg.name, pkg]));

  let packages = tsPackages;
  if (packageName) {
    packages = tsPackages.filter(pkg => pkg.name === packageName);
    if (packages.length !== 1) {
      return;
    }
  }

  await Promise.all(
    packages.map(async pkg => {
      const allDeps = [
        ...Object.keys(pkg.config.dependencies || {}),
        ...Object.keys(pkg.config.peerDependencies || {}),
      ];

      const internalDeps = allDeps.reduce((acc, pkgName) => {
        const pkg = packageMap.get(pkgName);
        if (!pkg) {
          return acc;
        }
        const entries = Object.keys(pkg.config['af:exports'] || {}).map(entry =>
          path.posix.join(pkgName, entry),
        );
        return [...acc, pkgName, ...entries];
      }, [] as string[]);

      const fileContents = generateDeclarations(internalDeps);

      try {
        await fsp.access(path.join(pkg.dir, 'src'));
      } catch (e) {
        log(
          `src does not exist for "${pkg.name}", skipping ambient generation`,
        );
        return;
      }

      const ambientPath = getAmbientPath(pkg.dir);
      await fsp.writeFile(ambientPath, fileContents);
    }),
  );

  log(`Generating ambient declaration file (${Date.now() - before}ms)`);

  return async function cleanup() {
    await Promise.all(
      packages.map(async pkg => {
        const ambientPath = getAmbientPath(pkg.dir);
        try {
          await fsp.access(ambientPath);
        } catch (e) {
          log(
            `ambient.d.ts does not exist for "${pkg.name}", skipping cleanup`,
          );
          return;
        }
        await fsp.unlink(ambientPath);
      }),
    );
  };
}

function getAmbientPath(pkgDir: string) {
  return path.join(pkgDir, 'src', 'ambient.d.ts');
}

function generateDeclarations(dependencies: string[]) {
  let imports = [];
  let declarations = [];

  for (const dep of dependencies) {
    imports.push(`import '${dep}';`);
    declarations.push(`declare module '${dep}' {}`);
  }

  return [...imports, '', ...declarations].join('\n');
}

if (require.main === module) {
  generateAmbientDeclarations()
    .then(async cleanup => {
      if (process.argv[2] === '--cleanup' && cleanup) {
        await cleanup();
      }
    })
    .catch(e => {
      console.error(e);
      process.exit(1);
    });
}
