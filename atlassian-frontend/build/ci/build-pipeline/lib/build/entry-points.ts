/**
 * This script creates entry-points in each packages' built dists so they can be imported as
 * @atlaskit/package/my-entry-point.
 *
 * Entry points are exposed as a directory with a package.json inside that allows them to support multiple dist types (esm, cjs etc) as well as typescript definitions.
 *
 * Entry points are defined in two ways:
 *
 * 1. [default] Under the `af:exports` field of package.json
 * 2. [deprecated] All top-level files underneath `/src` are treated as entry-points. Only occurs if `atlassian.deprecatedAutoEntryPoints` field is set to `true`.
 */

import fs, { promises as fsp } from 'fs';
import path from 'path';

import fse from 'fs-extra';
import partition from 'lodash/partition';
import startCase from 'lodash/startCase';

import { getPackagesInfo, PackageInfo } from '@atlaskit/build-utils/tools';

import { DistType } from '../types';

type Options = {
  cwd?: string;
  packageName?: string;
  /** Whether to only validate generated entries, or instead create them. We cannot validate generated entries at creation time because we need the TS build to occur */
  validateOnly?: boolean;
  /** Validate only certain dist types */
  distType?: DistType[];
  /** Custom logger */
  log?: (...msg: any) => void;
};

class ValidationError extends Error {}

function isAllowedNonSrcEntry(entryName: string, entryPath: string) {
  return !entryPath.startsWith('./src/') && entryName === entryPath;
}

function getDistPath(entryPath: string) {
  return entryPath.replace('./src/', './').replace(/\.tsx?/, '.js');
}

/** Validates the entry point configuration */
async function validateEntryConfig(
  entryName: string,
  entryPath: string,
  pkgDir: string,
) {
  const errors = [];

  if (entryName !== '.' && !entryName.startsWith('./')) {
    errors.push(
      `Entry point names must either be "." or start with "./", found "${entryName}"`,
    );
  }

  if (entryName.split('/').length > 2) {
    errors.push(
      `Entry point names can only be one level deep, found "${entryName}"`,
    );
  }

  if (!entryPath.startsWith('./src/') && entryName !== entryPath) {
    errors.push(
      `Entry point source locations must live in ./src/ unless the name is the same as the path (e.g. "./glyph": "./glyph"), found "${entryName}": "${entryPath}"`,
    );
  }

  try {
    await fsp.access(path.join(pkgDir, entryPath));
  } catch (e) {
    errors.push(`Entry point source location does not exist: "${entryPath}"`);
  }

  if (errors.length > 0) {
    throw new ValidationError(
      `Entry point failed validation: ${errors.join()}`,
    );
  }
}

async function createEntryPoint(
  pkg: PackageInfo,
  entryName: string,
  entryPath: string,
) {
  await validateEntryConfig(entryName, entryPath, pkg.dir);

  if (isAllowedNonSrcEntry(entryName, entryPath)) {
    return;
  }

  const distPath = getDistPath(entryPath);
  const distPathWithoutExt = distPath.replace(/\.js$/, '');

  const types = entryPath.includes('.ts')
    ? path.join('../dist/types', `${distPathWithoutExt}.d.ts`)
    : undefined;

  const entryPointJson = {
    // Use posix to ensure we always join with '/'
    name: path.posix.join(pkg.name, entryName),
    main: path.join('../dist/cjs', distPath),
    module: path.join('../dist/esm', distPath),
    'module:es2019': path.join('../dist/es2019', distPath),
    types,
  };
  const entryDir = path.join(pkg.dir, entryName);
  await fse.mkdirp(entryDir);
  await fsp.writeFile(
    path.join(entryDir, 'package.json'),
    JSON.stringify(entryPointJson, null, 2),
  );
}

/** Validates the generated entry points to ensure they point to a dist file that exists */
async function validateGeneratedEntries(
  pkg: PackageInfo,
  entryName: string,
  entryPath: string,
  distType?: DistType[],
) {
  if (isAllowedNonSrcEntry(entryName, entryPath)) {
    return;
  }

  const distTypes: DistType[] = ['cjs', 'esm'];
  if (pkg.runTypeScriptBuild) {
    // es2019 builds only supported for typescript packages
    distTypes.push('es2019');
  }
  const filteredDistTypes = distTypes.filter(
    type => !distType || distType.includes(type),
  );
  const distRelativeSrcPath = getDistPath(entryPath);
  const missingDistTypes = [];
  for (const distType of filteredDistTypes) {
    const distTypePath = path.join('dist', distType, distRelativeSrcPath);
    const fullDistPath = path.join(pkg.dir, distTypePath);
    try {
      await fsp.access(fullDistPath);
    } catch (e) {
      missingDistTypes.push(distTypePath);
    }
  }

  if (missingDistTypes.length > 0) {
    throw new ValidationError(`Missing dist paths: ${missingDistTypes.join()}`);
  }
}

async function generateDeclarativeEntryPoints(
  packages: PackageInfo[],
  validateOnly: boolean | undefined,
  distType?: DistType[],
) {
  const entryPointFn = validateOnly
    ? validateGeneratedEntries
    : createEntryPoint;
  const errors = [];
  for (const pkg of packages) {
    const exports = pkg.config['af:exports'] || {};
    for (const [entryName, entryPath] of Object.entries(exports)) {
      if (entryName !== '.') {
        try {
          await entryPointFn(pkg, entryName, entryPath, distType);
        } catch (e) {
          if (e instanceof ValidationError) {
            errors.push(`${pkg.name}: ${e.message}`);
          } else {
            throw e;
          }
        }
      }
    }
  }

  return errors;
}

function getEntryFilesFromDir(dir: string) {
  return fs
    .readdirSync(path.join(dir, 'src'))
    .filter(
      file =>
        file.includes('.') &&
        !file.includes('index') &&
        path.parse(file).name &&
        !file.includes('.d.ts') &&
        !file.includes('version.json') &&
        !file.includes('.md'),
    );
}

async function generateDeprecatedAutoEntryPoints(
  packages: PackageInfo[],
  validateOnly: boolean | undefined,
  distType?: DistType[],
) {
  const entryPointFn = validateOnly
    ? validateGeneratedEntries
    : createEntryPoint;
  const packagesWithEntryFiles = packages
    .filter(pkg => fs.existsSync(path.join(pkg.dir, 'src')))
    .map(pkg => ({
      pkg,
      files: getEntryFilesFromDir(pkg.dir),
    }));
  const errors = [];
  for (const { pkg, files } of packagesWithEntryFiles) {
    for (const file of files) {
      const parsedFilepath = path.parse(file);
      const basename = parsedFilepath.name;
      try {
        await entryPointFn(pkg, `./${basename}`, `./src/${file}`, distType);
      } catch (e) {
        if (e instanceof ValidationError) {
          errors.push(`${pkg.name}: ${e.message}`);
        } else {
          throw e;
        }
      }
    }
  }

  return errors;
}

/**
 * Generates entry points for all packages or a single package if `opt.packageName` is provided.
 */
export async function generateEntryPoints(opts: Options = {}) {
  const {
    cwd = process.cwd(),
    distType,
    packageName,
    validateOnly,
    log = console.log,
  } = opts;
  const packages: PackageInfo[] = await getPackagesInfo(cwd, opts);

  const action = validateOnly ? 'validating' : 'generating';
  const startCaseAction = startCase(action);

  const validPackages = packages.filter(
    pkg =>
      pkg.relativeDir.startsWith('packages') &&
      (!packageName || packageName === pkg.name) &&
      pkg.runBuild,
  );

  const [declarativePackages, autoGenPackages] = partition(
    validPackages,
    pkg =>
      !(
        pkg.config.atlassian &&
        pkg.config.atlassian['deprecatedAutoEntryPoints'] === true
      ),
  );

  log(
    `${startCaseAction} declarative entry points for ${declarativePackages.map(
      pkg => pkg.name,
    )}`,
  );
  const declarativeErrors = await generateDeclarativeEntryPoints(
    declarativePackages,
    validateOnly,
    distType,
  );

  log(
    `${startCaseAction} automatic entry points (DEPRECATED) for ${autoGenPackages.map(
      pkg => pkg.name,
    )}`,
  );
  const autoErrors = await generateDeprecatedAutoEntryPoints(
    autoGenPackages,
    validateOnly,
    distType,
  );

  if (declarativeErrors.length > 0 || autoErrors.length > 0) {
    const combinedErrors = [...declarativeErrors, ...autoErrors];
    throw new Error(
      `Encountered the following errors ${action} entry points:\n${combinedErrors.join(
        '\n',
      )}`,
    );
  }
}

export async function generateEntryPointsForPkg(
  pkg: PackageInfo,
  opts: Options = {},
) {
  const { distType, validateOnly, log = console.log } = opts;

  if (!pkg.runBuild) {
    return;
  }
  const entryPointFn =
    pkg.config.atlassian &&
    pkg.config.atlassian['deprecatedAutoEntryPoints'] === true
      ? generateDeprecatedAutoEntryPoints
      : generateDeclarativeEntryPoints;

  log(
    `${validateOnly ? 'Validating' : 'Generating'} entrypoints for ${pkg.name}`,
  );
  const errors = await entryPointFn([pkg], validateOnly, distType);

  if (errors.length > 0) {
    throw new Error(
      `Encountered the following entry point errors:\n${errors.join('\n')}`,
    );
  }
}

export function validateGeneratedEntryPointsForPkg(
  pkg: PackageInfo,
  opts: Omit<Options, 'validateOnly'> = {},
) {
  return generateEntryPointsForPkg(pkg, { ...opts, validateOnly: true });
}

/** Validates generated entry points. Exposed as a separate function so that it can execute after the TS build (entry point generation occurs beforehand) */
export function validateGeneratedEntryPoints(
  opts: Omit<Options, 'validateOnly'> = {},
) {
  return generateEntryPoints({ ...opts, validateOnly: true });
}
