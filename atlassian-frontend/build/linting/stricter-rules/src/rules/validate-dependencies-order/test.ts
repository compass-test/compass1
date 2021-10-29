import { AFPackageJson } from '@atlaskit/build-utils/types';

import rule from './index';

const validDependencies = { a: '*', b: '1' };
const invalidDependencies = { b: '1', a: '*' };
const validPackageJson = ({
  name: 'foo',
  dependencies: validDependencies,
  peerDependencies: validDependencies,
  devDependencies: validDependencies,
  optionalDependencies: validDependencies,
} as unknown) as AFPackageJson;
const invalidPackageJson = ({
  name: 'foo',
  dependencies: invalidDependencies,
  peerDependencies: invalidDependencies,
  devDependencies: invalidDependencies,
  optionalDependencies: invalidDependencies,
} as unknown) as AFPackageJson;

const execute = (config: AFPackageJson) =>
  rule.onProject({
    dependencies: {},
    files: {},
    rootPath: '/',
    config: {
      workspaces: [{ name: config.name, dir: '/foo', config }],
      teams: {},
      disableCache: true,
    },
    errorTransformer: (errors: any) => errors,
  });

describe('validate-dependencies-order', () => {
  test('No errors for valid dependencies', () => {
    expect(execute(validPackageJson)).toHaveLength(0);
  });
  test('Wrong order error for dependencies', () => {
    expect(
      execute({
        ...validPackageJson,
        dependencies: invalidDependencies,
      }),
    ).toEqual([
      {
        property: 'dependencies',
        packageName: 'foo',
        packagePath: 'foo',
      },
    ]);
  });
  test('No order errors for all other dependency fields', () => {
    expect(
      execute({
        ...invalidPackageJson,
        dependencies: validDependencies,
      }),
    ).toEqual(
      ['devDependencies', 'peerDependencies', 'optionalDependencies'].map(
        property => ({
          property,
          packageName: 'foo',
          packagePath: 'foo',
        }),
      ),
    );
  });
});
