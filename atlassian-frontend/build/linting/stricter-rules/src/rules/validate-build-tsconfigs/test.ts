import { AFPackage } from '@atlaskit/build-utils/types';

import rule from './index';
import { FileToData } from '../../types';

const atlaskitPackage = {
  name: '@atlaskit/package',
  publishConfig: {
    registry: 'https://registry.npmjs.org/',
  },
  atlassian: {
    website: {
      name: 'package',
    },
    releaseModel: 'scheduled',
  },
  main: 'dist/cjs/index.js',
  'af:exports': {},
};

const packageWithoutMain = {
  name: '@atlaskit/package',
  publishConfig: {
    registry: 'https://registry.npmjs.org/',
  },
  atlassian: {
    website: {
      name: 'package',
    },
    releaseModel: 'scheduled',
  },
  'af:exports': {},
};

const privateAtlaskitPackage = {
  name: '@atlaskit/package',
  publishConfig: {
    registry: 'https://registry.npmjs.org/',
  },
  private: true,
  atlassian: {
    website: {
      name: 'package',
    },
    releaseModel: 'scheduled',
  },
  'af:exports': {},
};

const tsconfig = {
  extends: '../../../tsconfig.json',
};

const wrongExtendTsconfig = {
  extends: '../../tsconfig.json',
};

const buildTsconfig = {
  extends: '../tsconfig.json',
  exclude: ['../src/**/__tests__/*', '../src/**/*.test.*', '../src/**/test.*'],
  compilerOptions: {
    paths: {},
  },
};

const noExcludeBuildTsconfig = {
  extends: '../tsconfig.json',
  compilerOptions: {
    paths: {},
  },
};

const wrongExcludeBuildTsconfig = {
  extends: '../tsconfig.json',
  exclude: ['../src/**/examples/*'],
  compilerOptions: {
    paths: {},
  },
};

const noPathsTsconfig = {
  extends: '../tsconfig.json',
  compilerOptions: {},
};

const noPathsBuildTsconfig = {
  ...noPathsTsconfig,
  exclude: ['../src/**/__tests__/*', '../src/**/*.test.*', '../src/**/test.*'],
};

const noExtendsBuildTsconfig = {
  compilerOptions: {
    paths: {},
  },
  exclude: ['../src/**/__tests__/*', '../src/**/*.test.*', '../src/**/test.*'],
};

type ExecuteConfig = {
  workspaces: AFPackage[];
  files: FileToData;
};

const createPackage = (
  packageJson: any,
  tsconfig?: any,
  buildTsconfig?: any,
): ExecuteConfig => ({
  workspaces: [
    {
      name: packageJson.name,
      dir: '/packages/foo',
      config: packageJson,
    },
  ],
  files: {
    '/packages/foo/src/index.ts': {},
    ...(tsconfig && {
      '/packages/foo/tsconfig.json': {
        source: JSON.stringify(tsconfig),
      },
    }),
    ...(buildTsconfig && {
      '/packages/foo/build/tsconfig.json': {
        source: JSON.stringify(buildTsconfig),
      },
    }),
  },
});

const execute = ({ workspaces, files }: ExecuteConfig) =>
  rule.onProject({
    rootPath: '/',
    config: { workspaces, teams: {}, disableCache: true },
    dependencies: {},
    files,
    errorTransformer: (errors: any) => errors,
  });

describe('Validate build/tsconfig.json Stricter Check', () => {
  test('No errors for valid package', () => {
    expect(
      execute(createPackage(atlaskitPackage, tsconfig, buildTsconfig)),
    ).toHaveLength(0);
  });

  test('Skips private packages', () => {
    expect(execute(createPackage(privateAtlaskitPackage))).toHaveLength(0);
  });

  test('Error for no build/tsconfig.json', () => {
    const errors = execute(createPackage(atlaskitPackage, tsconfig));
    expect(errors).toHaveLength(1);
    expect(errors).toEqual([
      {
        errorType: rule.errorTypes.MISSING_BUILD,
        packageName: atlaskitPackage.name,
        packagePath: 'packages/foo',
      },
    ]);
  });

  test('Error for no paths inside build/tsconfig.json', () => {
    const errors = execute(
      createPackage(atlaskitPackage, tsconfig, noPathsBuildTsconfig),
    );
    expect(errors).toHaveLength(1);
    expect(errors).toEqual([
      {
        errorType: rule.errorTypes.MISSING_PATHS,
        packageName: atlaskitPackage.name,
        packagePath: 'packages/foo',
      },
    ]);
  });

  test(`Error for no excludes inside build/tsconfig.json`, () => {
    const errors = execute(
      createPackage(atlaskitPackage, tsconfig, noExcludeBuildTsconfig),
    );
    expect(errors).toHaveLength(1);
    expect(errors).toEqual([
      {
        errorType: rule.errorTypes.INCLUDES_TESTS,
        packageName: atlaskitPackage.name,
        packagePath: 'packages/foo',
      },
    ]);
  });

  test(`Error for wrong excludes inside build/tsconfig.json`, () => {
    const errors = execute(
      createPackage(atlaskitPackage, tsconfig, wrongExcludeBuildTsconfig),
    );
    expect(errors).toHaveLength(1);
    expect(errors).toEqual([
      {
        errorType: rule.errorTypes.INCLUDES_TESTS,
        packageName: atlaskitPackage.name,
        packagePath: 'packages/foo',
      },
    ]);
  });

  test(`Error for 'tsconfig.json' not extending root tsconfig`, () => {
    const errors = execute(
      createPackage(atlaskitPackage, wrongExtendTsconfig, buildTsconfig),
    );
    expect(errors).toHaveLength(1);
    expect(errors).toEqual([
      {
        errorType: rule.errorTypes.WRONG_PKG_EXTEND,
        packageName: atlaskitPackage.name,
        packagePath: 'packages/foo',
      },
    ]);
  });

  test(`Error for build/tsconfig.json not extending '../tsconfig.json'`, () => {
    const errors = execute(
      createPackage(atlaskitPackage, tsconfig, noExtendsBuildTsconfig),
    );
    expect(errors).toHaveLength(1);
    expect(errors).toEqual([
      {
        errorType: rule.errorTypes.WRONG_BUILD_EXTEND,
        packageName: atlaskitPackage.name,
        packagePath: 'packages/foo',
      },
    ]);
  });

  test('Error for package without main/bin fields having build/tsconfig', () => {
    const errors = execute(
      createPackage(packageWithoutMain, tsconfig, buildTsconfig),
    );
    expect(errors).toHaveLength(1);
    expect(errors).toEqual([
      {
        errorType: rule.errorTypes.ILLEGAL_BUILD,
        packageName: packageWithoutMain.name,
        packagePath: 'packages/foo',
      },
    ]);
  });

  test('Error for no src directory', () => {
    const pkg = createPackage(atlaskitPackage, tsconfig, buildTsconfig);

    delete pkg.files['/packages/foo/src/index.ts'];

    const errors = execute(pkg);

    expect(errors).toHaveLength(1);
    expect(errors).toEqual([
      {
        errorType: rule.errorTypes.MISSING_SRC,
        packageName: atlaskitPackage.name,
        packagePath: 'packages/foo',
      },
    ]);
  });
});
