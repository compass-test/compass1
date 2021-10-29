import { promises as fsp } from 'fs';
import * as bolt from 'bolt';
import globby from 'globby';
import path from 'path';

// @ts-ignore
import { exists } from './fs';
import { AFPackage, AFPackageJson } from './types';

type TestInfo = {
  files: string[];
  run: boolean;
};

/** Package metadata containing a list of inferred attributes about the package, mostly used for change detection */
export type PackageInfo = {
  dir: string;
  name: string;
  config: AFPackageJson;
  relativeDir: string;
  isBrowserPackage: boolean;
  runTypeScriptBuild: boolean;
  runTypecheck: boolean;
  runBuild: boolean;
  runBranchDeploy: boolean;
  runBabel: boolean;
  runESLint: boolean;
  tests: {
    unit: TestInfo;
    webdriver: TestInfo;
    webdriverWebView: TestInfo;
    vr: TestInfo;
  };
  runBundleSize: boolean;
  runStyleLint: boolean;
  runWebsite: boolean;
  runDesignSystemDocs: boolean;
};

/** Used predominantly to key different changed builds for run.tool.if.changed script */
export type Tool =
  | 'branchDeploy'
  | 'build'
  | 'bundlesize'
  | 'webdriverWebView'
  | 'website'
  | 'designSystemDocs'
  | 'typecheck'
  | 'typescriptbuild'
  | 'babel'
  | 'eslint'
  | 'stylelint'
  | 'webdriver'
  | 'vr';

export async function getPackagesInfo(
  cwd: string = process.cwd(),
  opts?: bolt.Cwd & bolt.FilterOpts,
  skipGlobs = false,
) {
  const project: AFPackage = await bolt.getProject({ cwd });
  const packages: AFPackage[] = await bolt.getWorkspaces({ cwd, ...opts });

  return Promise.all(
    packages.map(pkg => getPackageInfo(pkg, project, skipGlobs)),
  );
}

/**
 * Retrieves the package info of a package rooted at `cwd`.
 * This is a speed optimisation that allows us to skip `bolt.getWorkspaces` by only reading
 * package.json for a single package
 */
export async function getPackageInfoFromCwd(
  cwd = process.cwd(),
  skipGlobs = true,
) {
  const packageJson = JSON.parse(
    await fsp.readFile(path.join(cwd, 'package.json'), 'utf8'),
  );
  const pkg = {
    dir: cwd,
    name: packageJson.name,
    config: packageJson,
  };
  const project: AFPackage = await bolt.getProject({ cwd });

  return getPackageInfo(pkg, project, skipGlobs);
}

/** TODO: Refactor this completely */
export async function getPackageInfo(
  pkg: AFPackage,
  project: AFPackage,
  // All the globbies increase the execution time from ~ 180 ms to 5000
  skipGlobs = false,
): Promise<PackageInfo> {
  const cwd = process.cwd();
  const resolvedProject = project || (await bolt.getProject({ cwd }));
  const relativeDir = path.relative(resolvedProject.dir, pkg.dir);

  const unitTestFiles = skipGlobs
    ? []
    : await globby(
        [
          // finds tests in __tests__/unit folder along with tests in first layer of __tests__ folder
          `**/__tests__/**/*.+(js|ts|tsx)`,
          // finds tests placed alongside corresponding files in accordance with Tangerine project structure
          `**/*.test.+(js|ts|tsx)`,
          `**/test.+(js|ts|tsx)`,
          // exclude other test types, helper files, and ignored folders
          '!**/__tests__/integration/**',
          '!**/__tests__/integration-webview/**',
          '!**/__tests__/visual-regression/**',
          '!**/__tests__/**/_*/**',
          '!**/node_modules/**',
        ],
        {
          cwd: pkg.dir,
        },
      );
  const webdriverTestFiles = skipGlobs
    ? []
    : await globby(
        [`**/__tests__/integration/**/*.+(js|ts|tsx)`, '!**/node_modules/**'],
        {
          cwd: pkg.dir,
        },
      );
  const webdriverWebViewTestFiles = skipGlobs
    ? []
    : await globby(
        [
          `**/__tests__/integration-webview/**/*.+(js|ts|tsx)`,
          '!**/node_modules/**',
        ],
        {
          cwd: pkg.dir,
        },
      );
  const vrTestFiles = skipGlobs
    ? []
    : await globby(
        [
          `**/__tests__/visual-regression/**/*.+(js|ts|tsx)`,
          '!**/node_modules/**',
        ],
        {
          cwd: pkg.dir,
        },
      );
  const pathToPkgDesignSystemDocs = skipGlobs
    ? []
    : await globby([`constellation/**`, '!**/node_modules/**'], {
        cwd: pkg.dir,
      });
  const srcExists = await exists(path.join(pkg.dir, 'src'));
  const afDocsExists = await exists(path.join(pkg.dir, 'docs'));
  const afExamplesExists = await exists(path.join(pkg.dir, 'examples'));
  const tsConfigExists = await exists(path.join(pkg.dir, 'tsconfig.json'));

  const isBrowserPackage = !relativeDir.startsWith('build');
  const isWebsitePackage = relativeDir.startsWith('website');
  const isWebpackConfig = relativeDir.includes('webpack-config');
  const isExcludedFromBundleSize =
    relativeDir.includes('monorepo-tooling') ||
    relativeDir.includes('test-helpers') ||
    relativeDir.includes('service-support');
  const isDesignSystemDocs = pkg.name === '@atlaskit/website-constellation';
  const isGatsbyBriskTheme = pkg.name === '@atlaskit/gatsby-theme-brisk';

  const runTypecheck = tsConfigExists;
  const runTypeScriptBuild = await exists(
    path.join(pkg.dir, 'build', 'tsconfig.json'),
  );

  const hasDistMainField =
    pkg.config && pkg.config.main ? pkg.config.main.includes('dist') : false;

  const packageHasDesignSystemDocs = !!pathToPkgDesignSystemDocs.length;

  const runBabel =
    srcExists && hasDistMainField && !tsConfigExists && !isWebsitePackage;
  const runBuild =
    runBabel || runTypeScriptBuild || pkg.name === '@af/build-pipeline';
  const runBundleSize =
    runBuild && isBrowserPackage && !isExcludedFromBundleSize;

  const runBranchDeploy =
    runBuild || pkg.name === '@atlaskit/editor-mobile-bridge';

  const runESLint = srcExists || isWebsitePackage || !isBrowserPackage;
  const runStyleLint = srcExists && isBrowserPackage;
  const runWebsite =
    afDocsExists || afExamplesExists || isWebsitePackage || isWebpackConfig;
  const runDesignSystemDocs =
    isDesignSystemDocs || isGatsbyBriskTheme || packageHasDesignSystemDocs;

  return {
    dir: pkg.dir,
    name: pkg.name,
    config: pkg.config,
    isBrowserPackage,
    relativeDir,
    runTypeScriptBuild,
    runTypecheck,
    runBabel,
    runBuild,
    runBranchDeploy,
    runBundleSize,
    runDesignSystemDocs,
    runESLint,
    runStyleLint,
    runWebsite,
    tests: {
      unit: {
        files: unitTestFiles,
        run: !!unitTestFiles.length,
      },
      webdriver: {
        files: webdriverTestFiles,
        run: !!webdriverTestFiles.length,
      },
      webdriverWebView: {
        files: webdriverWebViewTestFiles,
        run: !!webdriverWebViewTestFiles.length,
      },
      vr: {
        files: vrTestFiles,
        run: !!vrTestFiles.length,
      },
    },
  };
}

export const TOOL_NAME_TO_FILTERS: {
  [key in Tool]: (pkg: PackageInfo) => boolean;
} = {
  typecheck: pkg => pkg.runTypecheck,
  typescriptbuild: pkg => pkg.runTypeScriptBuild,
  babel: pkg => pkg.runBabel,
  build: pkg => pkg.runBuild,
  branchDeploy: pkg => pkg.runBranchDeploy,
  bundlesize: pkg => pkg.runBundleSize,
  eslint: pkg => pkg.runESLint,
  stylelint: pkg => pkg.runStyleLint,
  webdriver: pkg => pkg.tests.webdriver.run,
  webdriverWebView: pkg => pkg.tests.webdriverWebView.run,
  website: pkg => pkg.runWebsite,
  vr: pkg => pkg.tests.vr.run,
  designSystemDocs: pkg => pkg.runDesignSystemDocs,
};

export async function getGlobPackagesForTools(
  toolNames: Tool[],
  opts: bolt.Cwd & bolt.FilterOpts = {},
  spaceDelimited = false,
) {
  const { cwd = process.cwd() } = opts;

  if (!toolNames.length) {
    console.error(
      `Please pass one or more tool names (${Object.keys(
        TOOL_NAME_TO_FILTERS,
      ).join(', ')})`,
    );
    throw Error();
  }
  const filters = toolNames.map(toolName => {
    const filterFn = TOOL_NAME_TO_FILTERS[toolName];

    if (!filterFn) {
      console.error(
        `Invalid tool name: "${toolName}" (${Object.keys(
          TOOL_NAME_TO_FILTERS,
        ).join(', ')})`,
      );
      throw Error();
    }

    return filterFn;
  });

  const packages = await getPackagesInfo(cwd, opts);
  const relativePaths = packages
    .filter(pkg => filters.every(filter => filter(pkg)))
    .map(pkg => pkg.relativeDir);
  if (relativePaths.length > 1) {
    if (spaceDelimited) {
      return `${relativePaths.join(' ')}`;
    }
    return `{${relativePaths.join()}}`;
  }
  return [relativePaths];
}
