import { TeamsJson } from '@atlaskit/build-utils/types';
import rule from './index';

const execute = (config: any, dir?: string) =>
  rule.onProject({
    dependencies: {},
    files: {},
    rootPath: '/',
    config: {
      workspaces: [{ name: config.name, dir: dir ?? '/foo', config }],
      teams: ({
        Foo: {
          /* doesn't matter for now */
        },
      } as unknown) as TeamsJson,
      disableCache: true,
    },
    errorTransformer: (errors: any) => errors,
  });

describe('validate-package-ownership rule', () => {
  test('No errors for valid package', () => {
    expect(execute({ name: 'foo', atlassian: { team: 'Foo' } })).toHaveLength(
      0,
    );
  });
  test('No team error for missing teams', () => {
    expect(execute({ name: 'foo' })).toEqual([
      {
        errorType: rule.errorTypes.NO_TEAM,
        team: undefined,
        packageName: 'foo',
        packagePath: 'foo',
      },
    ]);
  });
  test('Unknown team error for unknown teams', () => {
    expect(execute({ name: 'foo', atlassian: { team: 'Bar' } })).toEqual([
      {
        errorType: rule.errorTypes.UNKNOWN_TEAM,
        team: 'Bar',
        packageName: 'foo',
        packagePath: 'foo',
      },
    ]);
    expect(execute({ name: 'foo', atlassian: { team: 'Bar' } })).toEqual([
      {
        errorType: rule.errorTypes.UNKNOWN_TEAM,
        team: 'Bar',
        packageName: 'foo',
        packagePath: 'foo',
      },
    ]);
  });
  //
  test('No errors for excluded packages', () => {
    expect(
      execute(
        { name: 'excluded' },
        '/excluded-remove-me-when-there-are-no-exceptions-left',
      ),
    ).toHaveLength(0);
  });
});
