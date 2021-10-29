import * as io from '../io/io';
import type { Test } from '../types';

import { determineJiraProjectForFilePath } from './json-parsing';

const mockedTest: Test = {
  path: 'packages/foo/foo-bar/src/__tests__/integration/pho-bar.ts',
  testName: 'foo bar',
  ancestorLabels: '',
  errors: [],
};

const mockedTest2: Test = {
  path: 'packages/hello/world/src/__tests__/integration/hi.ts',
  testName: 'hello world',
  ancestorLabels: '',
  errors: [],
};

type MockedJsonOptions = { noTeam?: boolean; teamMismatch?: boolean };

const mockedJson = (
  name = 'Foo Bar',
  jiraKey = 'FOO',
  jiraInstance = 'product-fabric',
  options?: MockedJsonOptions,
) => {
  const pkg: any = {
    name: `@atlaskit/${name.split(' ').join('-')}`,
    version: '123.0.0',
    description: 'Foo bar baz',
    atlassian: {
      team: `Team ${name}`,
    },
  };
  const team = {
    [`Team ${name}`]: {
      project: `https://${jiraInstance}.atlassian.net/browse/${jiraKey}`,
    },
  };
  if (options) {
    const { noTeam, teamMismatch } = options;
    if (noTeam) {
      delete pkg.atlassian;
    }
    if (teamMismatch) {
      pkg.atlassian.team = 'MIA';
    }
  }
  return [JSON.stringify(pkg), JSON.stringify(team)];
};

function mockReadFile(pkgJson: string, teamJson: string, error?: any) {
  const readSpy = jest.spyOn(io, 'readFile');
  readSpy.mockImplementationOnce(() => {
    if (error) {
      return Promise.reject(error);
    }
    return Promise.resolve(pkgJson);
  });
  readSpy.mockImplementationOnce(() => {
    return Promise.resolve(teamJson);
  });
  return readSpy;
}

function mockJsonFiles(
  team?: string,
  jiraKey?: string,
  jiraInstance?: string,
  options?: MockedJsonOptions,
) {
  const [pkgJson, teamJson] = mockedJson(team, jiraKey, jiraInstance, options);
  return mockReadFile(pkgJson, teamJson);
}

describe('determineJiraProjectForFilePath', () => {
  beforeEach(() => {
    mockJsonFiles();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it(`should map file path to owner's Jira project url`, async () => {
    const fileExistsSpy = jest.spyOn(io, 'fileExists');
    const jiraUrl1 = await determineJiraProjectForFilePath(mockedTest);
    expect(jiraUrl1).toEqual('https://product-fabric.atlassian.net/browse/FOO');
    mockJsonFiles('Blah', 'BLAH', 'ecosystem');
    const jiraUrl2 = await determineJiraProjectForFilePath(mockedTest2);
    expect(jiraUrl2).toEqual('https://ecosystem.atlassian.net/browse/BLAH');
    expect(fileExistsSpy).toBeCalledTimes(0);
  });

  it('should find package.json even if the tests are not in a src directory', async () => {
    jest.resetAllMocks();
    const fileExistsSpy = jest
      .spyOn(io, 'fileExists')
      .mockImplementationOnce(() => false)
      .mockImplementationOnce(() => false)
      .mockImplementationOnce(() => true);
    mockJsonFiles('Atlassian Frontend Platform', 'AFP');

    const url = await determineJiraProjectForFilePath({
      path: 'build/legacy/build-utils/__tests__/unit/packages.test.ts',
      testName: 'foo',
      ancestorLabels: '',
      errors: [],
    });
    expect(url).toEqual('https://product-fabric.atlassian.net/browse/AFP');
    expect(fileExistsSpy).toHaveBeenCalledTimes(3);
  });

  it('should return undefined when there is no atlassian property within the package.json', async () => {
    jest.resetAllMocks();
    mockJsonFiles(undefined, undefined, undefined, { noTeam: true });

    const url = await determineJiraProjectForFilePath(mockedTest);
    expect(url).toBeUndefined();
  });

  it("should return undefined if it can't find a matching team between package.json and teams.json", async () => {
    jest.resetAllMocks();
    mockJsonFiles(undefined, undefined, undefined, { teamMismatch: true });

    const url = await determineJiraProjectForFilePath(mockedTest);
    expect(url).toBeUndefined();
  });

  it('should throw error when fails to find package.json', async () => {
    jest.resetAllMocks();
    jest.spyOn(io, 'fileExists').mockImplementation(() => false);

    const test: Test = {
      path:
        'experiments/cypress/integration/editor/editor-core/full-page/editor.spec.ts',
      testName: 'foo',
      ancestorLabels: '',
      errors: [],
    };
    return expect(determineJiraProjectForFilePath(test)).rejects.toThrow(
      `Could not find package.json for ${test.path}`,
    );
  });
});
