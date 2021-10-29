import populateProduct from '../product';
import { sendAnalytics } from '../../../util/analytics';
import * as git from '../../../util/git';
import { DEFAULT_TAG } from '../../../constants';
import { getMeta, uploadMeta } from '../../../util/statlas';
import { generateLogs } from '../__fixtures__/git';

type Unpacked<T> = T extends Promise<infer U> ? U : T;
type Func<P extends any[], R> = (...args: P) => R;
const asMockFunction = <
  T extends (...args: any[]) => any,
  U extends Func<Parameters<T>, Unpacked<ReturnType<T>> | ReturnType<T>>
>(
  fn: T,
): jest.MockedFunction<U> => (fn as unknown) as jest.MockedFunction<U>;

jest.mock('simple-git');
jest.mock('@atlassiansox/analytics-node-client');

jest.mock('../../../util/git');
jest.mock('../../../util/statlas');

jest.mock('../../../util/analytics', () => {
  const actualAnalytics = jest.requireActual('../../../util/analytics');
  return {
    ...jest.genMockFromModule<Object>('../../../util/analytics'),
    createUpgradeEvent: actualAnalytics.createUpgradeEvent,
  };
});

let mockLastRunHash = '0';
let mockPackageJsons: any[] = [];

function mockGit() {
  asMockFunction(git.doesTagExist).mockImplementation(() => true);
  asMockFunction(git.getChangesSince).mockImplementation(() =>
    generateLogs(
      Array.from({ length: mockPackageJsons.length }).map(() => [
        'package.json',
      ]),
    ),
  );
  asMockFunction(git.showFile).mockImplementation(ref =>
    JSON.stringify(
      // Treat the first entry of mockPackageJsons as the existing repo state at the 'last run'
      ref === DEFAULT_TAG ? mockPackageJsons[0] : mockPackageJsons[Number(ref)],
    ),
  );
  asMockFunction(git.getFiles).mockImplementation(() => ['package.json']);
}

function mockStatlas() {
  asMockFunction(getMeta).mockImplementation(() => ({
    lastRunHash: mockLastRunHash,
  }));
}

describe('populateProduct', () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    // Comment out the mockImplementation to read console.logs for debugging
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  beforeEach(() => {
    jest.resetAllMocks();
    mockGit();
    mockStatlas();
    mockPackageJsons = [
      {
        dependencies: {
          '@atlaskit/button': '^12.0.0',
          foo: '^2.3.4',
        },
      },
      {
        dependencies: {
          '@atlaskit/button': '^13.1.2',
          foo: '^2.3.4',
        },
      },
    ];
  });

  it('should send an analytics event for an atlaskit package upgrade', async () => {
    await populateProduct({
      dev: true,
      dryRun: false,
      interactive: false,
      csv: false,
      product: 'test',
      reset: false,
    });

    expect(sendAnalytics).toHaveBeenCalledWith(
      [
        expect.objectContaining({
          commitHash: '1',
          date: '2020-11-26T01:00:00.000Z',
          dependencyName: '@atlaskit/button',
          dependencyType: 'dependency',
          historical: true,
          major: '13',
          minor: '1',
          patch: '2',
          upgradeSubType: 'major',
          upgradeType: 'upgrade',
          versionString: '^13.1.2',
        }),
      ],
      {
        dev: true,
        limit: undefined,
        product: 'test',
        skipPrompt: true,
      },
    );
  });
  it('should send an analytics event when adding a new atlaskit dependency', async () => {
    mockPackageJsons = [
      {
        dependencies: {
          '@atlaskit/button': '^12.0.0',
          foo: '^2.3.4',
        },
      },
      {
        dependencies: {
          '@atlaskit/button': '^12.0.0',
          '@atlaskit/lozenge': '^6.0.0',
          foo: '^2.3.4',
        },
      },
    ];

    await populateProduct({
      dev: true,
      dryRun: false,
      interactive: false,
      csv: false,
      product: 'test',
      reset: false,
    });
    expect(sendAnalytics).toHaveBeenCalledTimes(1);
    expect((sendAnalytics as jest.Mock).mock.calls[0][0]).toEqual([
      expect.objectContaining({
        commitHash: '1',
        date: '2020-11-26T01:00:00.000Z',
        dependencyName: '@atlaskit/lozenge',
        dependencyType: 'dependency',
        historical: true,
        major: '6',
        minor: '0',
        patch: '0',
        upgradeSubType: null,
        upgradeType: 'add',
        versionString: '^6.0.0',
      }),
    ]);
  });
  it('should handle jira suffixed deps ', async () => {
    mockPackageJsons = [
      {
        dependencies: {
          '@atlaskit/button': '^12.0.0',
          foo: '^2.3.4',
        },
      },
      {
        dependencies: {
          '@atlaskit/button--current': 'npm:@atlaskit/button@^12.0.0',
          '@atlaskit/button--next': 'npm:@atlaskit/button@^13.1.0',
          foo: '^2.3.4',
        },
      },
      {
        dependencies: {
          '@atlaskit/button': '^13.1.0',
          foo: '^2.3.4',
        },
      },
    ];

    await populateProduct({
      dev: true,
      dryRun: false,
      interactive: false,
      csv: false,
      product: 'test',
      reset: false,
    });
    expect(sendAnalytics).toHaveBeenCalledTimes(1);
    expect((sendAnalytics as jest.Mock).mock.calls[0][0]).toEqual([
      expect.objectContaining({
        commitHash: '2',
        date: '2020-11-26T02:00:00.000Z',
        dependencyName: '@atlaskit/button',
        dependencyType: 'dependency',
        historical: true,
        major: '13',
        minor: '1',
        patch: '0',
        upgradeSubType: 'major',
        upgradeType: 'upgrade',
        versionString: '^13.1.0',
      }),
    ]);
  });
  it('should fire separate add & remove events when a dependency moves from dependency to devDependency without version change', async () => {
    mockPackageJsons = [
      {
        dependencies: {
          '@atlaskit/button': '^12.0.0',
          foo: '^2.3.4',
        },
      },
      {
        dependencies: {
          foo: '^2.3.4',
        },
        devDependencies: {
          '@atlaskit/button': '^12.0.0',
        },
      },
    ];

    await populateProduct({
      dev: true,
      dryRun: false,
      interactive: false,
      csv: false,
      product: 'test',
      reset: false,
    });
    expect(sendAnalytics).toHaveBeenCalledTimes(1);
    expect((sendAnalytics as jest.Mock).mock.calls[0][0]).toEqual([
      expect.objectContaining({
        commitHash: '1',
        dependencyName: '@atlaskit/button',
        dependencyType: 'devDependency',
        historical: true,
        major: '12',
        minor: '0',
        patch: '0',
        upgradeSubType: null,
        upgradeType: 'add',
        versionString: '^12.0.0',
      }),
      expect.objectContaining({
        commitHash: '1',
        dependencyName: '@atlaskit/button',
        dependencyType: 'dependency',
        historical: true,
        major: '12',
        minor: '0',
        patch: '0',
        upgradeSubType: null,
        upgradeType: 'remove',
        versionString: '^12.0.0',
      }),
    ]);
  });
  it('should fire separate add & remove events when a dependency moves from dependency to devDependency with version change', async () => {
    mockPackageJsons = [
      {
        dependencies: {
          '@atlaskit/button': '^12.0.0',
          foo: '^2.3.4',
        },
      },
      {
        dependencies: {
          foo: '^2.3.4',
        },
        devDependencies: {
          '@atlaskit/button': '^12.5.0',
        },
      },
    ];

    await populateProduct({
      dev: true,
      dryRun: false,
      interactive: false,
      csv: false,
      product: 'test',
      reset: false,
    });
    expect(sendAnalytics).toHaveBeenCalledTimes(1);
    expect((sendAnalytics as jest.Mock).mock.calls[0][0]).toEqual([
      expect.objectContaining({
        commitHash: '1',
        dependencyName: '@atlaskit/button',
        dependencyType: 'devDependency',
        historical: true,
        major: '12',
        minor: '5',
        patch: '0',
        upgradeSubType: null,
        upgradeType: 'add',
        versionString: '^12.5.0',
      }),
      expect.objectContaining({
        commitHash: '1',
        dependencyName: '@atlaskit/button',
        dependencyType: 'dependency',
        historical: true,
        major: '12',
        minor: '0',
        patch: '0',
        upgradeSubType: null,
        upgradeType: 'remove',
        versionString: '^12.0.0',
      }),
    ]);
  });

  it('should transform yarn aliased versions but keep version ranges and pre-release info', async () => {
    mockPackageJsons = [
      {
        dependencies: {
          '@atlaskit/button': '^12.0.0',
          foo: '^2.3.4',
        },
      },
      {
        dependencies: {
          '@atlaskit/button--current': 'npm:@atlaskit/button@^12.5.0',
          foo: '^2.3.4',
        },
      },
      {
        dependencies: {
          '@atlaskit/button': '^12.6.0-hotfix',
          foo: '^2.3.4',
        },
      },
    ];

    await populateProduct({
      dev: true,
      dryRun: false,
      interactive: false,
      csv: false,
      product: 'test',
      reset: false,
    });
    expect(sendAnalytics).toHaveBeenCalledTimes(1);
    expect((sendAnalytics as jest.Mock).mock.calls[0][0]).toEqual([
      expect.objectContaining({
        commitHash: '1',
        dependencyName: '@atlaskit/button',
        dependencyType: 'dependency',
        historical: true,
        major: '12',
        minor: '5',
        patch: '0',
        upgradeSubType: 'minor',
        upgradeType: 'upgrade',
        versionString: '^12.5.0',
      }),
      expect.objectContaining({
        commitHash: '2',
        dependencyName: '@atlaskit/button',
        dependencyType: 'dependency',
        historical: true,
        major: '12',
        minor: '6',
        patch: '0',
        upgradeSubType: 'minor',
        upgradeType: 'upgrade',
        versionString: '^12.6.0-hotfix',
      }),
    ]);
  });

  it('should run from start of history in reset mode', async () => {
    mockPackageJsons = [
      {
        dependencies: {
          '@atlaskit/button': '^12.0.0',
          foo: '^2.3.4',
        },
      },
      {
        dependencies: {
          '@atlaskit/button': '^13.1.2',
          foo: '^2.3.4',
        },
      },
    ];

    await populateProduct({
      dev: true,
      dryRun: false,
      interactive: false,
      csv: false,
      product: 'test',
      reset: true,
    });

    expect(sendAnalytics).toHaveBeenCalledTimes(1);
    expect((sendAnalytics as jest.Mock).mock.calls[0][0]).toEqual([
      expect.objectContaining({
        commitHash: '0',
        date: '2020-11-26T00:00:00.000Z',
        dependencyName: '@atlaskit/button',
        dependencyType: 'dependency',
        historical: true,
        major: '12',
        minor: '0',
        patch: '0',
        upgradeSubType: null,
        upgradeType: 'add',
        versionString: '^12.0.0',
      }),
      expect.objectContaining({
        commitHash: '1',
        date: '2020-11-26T01:00:00.000Z',
        dependencyName: '@atlaskit/button',
        dependencyType: 'dependency',
        historical: true,
        major: '13',
        minor: '1',
        patch: '2',
        upgradeSubType: 'major',
        upgradeType: 'upgrade',
        versionString: '^13.1.2',
      }),
    ]);
  });

  // 'latest' version
  // ignores next version invalid
  // does send event when prev version is invalid and next is valid
  it('should gracefully handle invalid semver versions', async () => {
    mockPackageJsons = [
      {
        dependencies: {
          '@atlaskit/button': '^12.0.0',
          foo: '^2.3.4',
        },
      },
      {
        dependencies: {
          '@atlaskit/button': 'latest',
          foo: '^2.3.4',
        },
      },
      {
        dependencies: {
          '@atlaskit/button': '^12.5.0',
          foo: '^2.3.4',
        },
      },
    ];

    await populateProduct({
      dev: true,
      dryRun: false,
      interactive: false,
      csv: false,
      product: 'test',
      reset: false,
    });

    expect(sendAnalytics).toHaveBeenCalledTimes(1);
    expect((sendAnalytics as jest.Mock).mock.calls[0][0]).toEqual([
      expect.objectContaining({
        commitHash: '2',
        dependencyName: '@atlaskit/button',
        dependencyType: 'dependency',
        historical: true,
        major: '12',
        minor: '5',
        patch: '0',
        upgradeSubType: 'minor',
        upgradeType: 'upgrade',
        versionString: '^12.5.0',
      }),
    ]);
  });

  describe('Yarn workspaces', () => {
    type WorkspaceLogEntry = { workspace?: string; config?: any };
    function mockGitForWorkspaces(mockWorkspaceLog: WorkspaceLogEntry[][]) {
      const changedFiles = mockWorkspaceLog.map(logEntry =>
        logEntry
          .reduce(
            (acc, curr) => [...acc, curr?.workspace],
            [] as Array<string | undefined>,
          )
          .filter((v: any) => v != null),
      ) as string[][];
      const gitLogs = generateLogs(changedFiles);
      asMockFunction(git.getChangesSince).mockImplementation(() => gitLogs);
      asMockFunction(git.showFile).mockImplementation((ref, filename) => {
        // Treat the first entry of mockPackageJsons as the existing repo state at the 'last run'
        const entryNum = ref === DEFAULT_TAG ? 0 : Number(ref);
        let workspaceEntry: WorkspaceLogEntry = {};
        // Finds the most recent log entry containing filename starting at entryNum going backwards
        mockWorkspaceLog
          .slice(0, entryNum + 1)
          .reverse()
          .find(logEntry =>
            logEntry.find(ws => {
              if (ws.workspace === filename) {
                workspaceEntry = ws;
                return true;
              }
            }),
          );
        if (workspaceEntry?.config === null) {
          // This signals that the package.json doesn't exist
          throw new Error(`${ref} ${filename}`);
        }
        return JSON.stringify(workspaceEntry?.config);
      });
      asMockFunction(git.getFiles).mockImplementation(ref => {
        const entryNum = ref === DEFAULT_TAG ? 0 : Number(ref);
        const files = new Set<string>();
        for (const log of mockWorkspaceLog.slice(0, entryNum + 1)) {
          for (const logEntry of log) {
            if (logEntry.workspace && logEntry.config !== null) {
              files.add(logEntry.workspace);
            }
          }
        }
        return [...files];
      });
    }
    it('should send an event for a dependency only declared in a workspace and not in the root', async () => {
      mockGitForWorkspaces([
        [
          {
            workspace: 'package.json',
            config: {
              workspaces: ['packages/*'],
              dependencies: {
                '@atlaskit/button': '^12.0.0',
                foo: '^2.3.4',
              },
            },
          },
          {
            workspace: 'packages/foo/package.json',
            config: {
              dependencies: {
                '@atlaskit/lozenge': '^6.0.0',
              },
            },
          },
        ],
        [
          {
            workspace: 'packages/foo/package.json',
            config: {
              dependencies: {
                '@atlaskit/lozenge': '^7.0.0',
              },
            },
          },
        ],
      ]);

      await populateProduct({
        dev: true,
        dryRun: false,
        interactive: false,
        csv: false,
        product: 'test',
        reset: false,
      });

      expect(sendAnalytics).toHaveBeenCalledTimes(1);
      expect((sendAnalytics as jest.Mock).mock.calls[0][0]).toEqual([
        expect.objectContaining({
          commitHash: '1',
          dependencyName: '@atlaskit/lozenge',
          dependencyType: 'dependency',
          historical: true,
          major: '7',
          minor: '0',
          patch: '0',
          upgradeSubType: 'major',
          upgradeType: 'upgrade',
          versionString: '^7.0.0',
        }),
      ]);
    });

    it('should only send an upgrade event when all workspaces have upgraded a package', async () => {
      const notAllUpgraded = [
        [
          {
            workspace: 'package.json',
            config: {
              workspaces: ['packages/*'],
              dependencies: {
                '@atlaskit/button': '^12.0.0',
                foo: '^2.3.4',
              },
            },
          },
          {
            workspace: 'packages/foo/package.json',
            config: {
              dependencies: {
                '@atlaskit/button': '^12.0.0',
              },
            },
          },
        ],
        [
          {
            workspace: 'packages/foo/package.json',
            config: {
              dependencies: {
                '@atlaskit/button': '^13.0.0',
              },
            },
          },
        ],
      ];
      mockGitForWorkspaces(notAllUpgraded);

      await populateProduct({
        dev: true,
        dryRun: false,
        interactive: false,
        csv: false,
        product: 'test',
        reset: false,
      });

      expect(sendAnalytics).not.toHaveBeenCalled();

      jest.clearAllMocks();

      mockGitForWorkspaces([
        ...notAllUpgraded,
        [
          {
            workspace: 'package.json',
            config: {
              dependencies: {
                '@atlaskit/button': '^13.0.0',
                foo: '^2.3.4',
              },
            },
          },
        ],
      ]);

      await populateProduct({
        dev: true,
        dryRun: false,
        interactive: false,
        csv: false,
        product: 'test',
        reset: false,
      });

      expect(sendAnalytics).toHaveBeenCalledTimes(1);
      expect((sendAnalytics as jest.Mock).mock.calls[0][0]).toEqual([
        expect.objectContaining({
          commitHash: '2',
          dependencyName: '@atlaskit/button',
          dependencyType: 'dependency',
          historical: true,
          major: '13',
          minor: '0',
          patch: '0',
          upgradeSubType: 'major',
          upgradeType: 'upgrade',
          versionString: '^13.0.0',
        }),
      ]);
    });

    it('should pick up new workspaces', async () => {
      mockGitForWorkspaces([
        [
          {
            workspace: 'package.json',
            config: {
              workspaces: ['packages/*'],
              dependencies: {
                '@atlaskit/button': '^12.0.0',
                foo: '^2.3.4',
              },
            },
          },
          {
            workspace: 'packages/foo/package.json',
            config: {
              dependencies: {
                '@atlaskit/lozenge': '^6.0.0',
              },
            },
          },
        ],
        [
          {
            workspace: 'packages/bar/package.json',
            config: {
              dependencies: {
                '@atlaskit/spinner': '^7.0.0',
              },
            },
          },
        ],
      ]);

      await populateProduct({
        dev: true,
        dryRun: false,
        interactive: false,
        csv: false,
        product: 'test',
        reset: false,
      });

      expect(sendAnalytics).toHaveBeenCalledTimes(1);
      expect((sendAnalytics as jest.Mock).mock.calls[0][0]).toEqual([
        expect.objectContaining({
          commitHash: '1',
          dependencyName: '@atlaskit/spinner',
          dependencyType: 'dependency',
          historical: true,
          major: '7',
          minor: '0',
          patch: '0',
          upgradeSubType: null,
          upgradeType: 'add',
          versionString: '^7.0.0',
        }),
      ]);
    });

    it('should not send remove event when a package is removed from only one workspace', async () => {
      mockGitForWorkspaces([
        [
          {
            workspace: 'package.json',
            config: {
              workspaces: ['packages/*'],
              dependencies: {
                '@atlaskit/button': '^12.0.0',
                foo: '^2.3.4',
              },
            },
          },
          {
            workspace: 'packages/foo/package.json',
            config: {
              dependencies: {
                '@atlaskit/button': '^12.0.0',
              },
            },
          },
        ],
        [
          {
            workspace: 'packages/foo/package.json',
            config: {
              dependencies: {},
            },
          },
        ],
      ]);

      await populateProduct({
        dev: true,
        dryRun: false,
        interactive: false,
        csv: false,
        product: 'test',
        reset: false,
      });

      expect(sendAnalytics).not.toHaveBeenCalled();
    });

    it('should send remove event when a package is removed from all workspaces', async () => {
      mockGitForWorkspaces([
        [
          {
            workspace: 'package.json',
            config: {
              workspaces: ['packages/*'],
              dependencies: {
                '@atlaskit/button': '^12.0.0',
                foo: '^2.3.4',
              },
            },
          },
          {
            workspace: 'packages/foo/package.json',
            config: {
              dependencies: {
                '@atlaskit/button': '^12.0.0',
              },
            },
          },
        ],
        [
          {
            workspace: 'packages/foo/package.json',
            config: {
              dependencies: {},
            },
          },
        ],
        [
          {
            workspace: 'package.json',
            config: {
              workspaces: ['packages/*'],
              dependencies: {
                foo: '^2.3.4',
              },
            },
          },
        ],
      ]);

      await populateProduct({
        dev: true,
        dryRun: false,
        interactive: false,
        csv: false,
        product: 'test',
        reset: false,
      });

      expect(sendAnalytics).toHaveBeenCalledTimes(1);
      expect((sendAnalytics as jest.Mock).mock.calls[0][0]).toEqual([
        expect.objectContaining({
          commitHash: '2',
          dependencyName: '@atlaskit/button',
          dependencyType: 'dependency',
          historical: true,
          major: '12',
          minor: '0',
          patch: '0',
          upgradeSubType: null,
          upgradeType: 'remove',
          versionString: '^12.0.0',
        }),
      ]);
    });

    it('should send remove events for extraneous dependencies when a workspace is removed', async () => {
      mockGitForWorkspaces([
        [
          {
            workspace: 'package.json',
            config: {
              workspaces: ['packages/*'],
              dependencies: {
                '@atlaskit/button': '^12.0.0',
                foo: '^2.3.4',
              },
            },
          },
          {
            workspace: 'packages/foo/package.json',
            config: {
              dependencies: {
                '@atlaskit/lozenge': '^7.0.0',
              },
            },
          },
        ],
        [
          {
            workspace: 'packages/foo/package.json',
            config: null,
          },
        ],
      ]);

      await populateProduct({
        dev: true,
        dryRun: false,
        interactive: false,
        csv: false,
        product: 'test',
        reset: false,
      });

      expect(sendAnalytics).toHaveBeenCalledTimes(1);
      expect((sendAnalytics as jest.Mock).mock.calls[0][0]).toEqual([
        expect.objectContaining({
          commitHash: '1',
          dependencyName: '@atlaskit/lozenge',
          dependencyType: 'dependency',
          historical: true,
          major: '7',
          minor: '0',
          patch: '0',
          upgradeSubType: null,
          upgradeType: 'remove',
          versionString: '^7.0.0',
        }),
      ]);
    });

    it('should remove dependencies for workspaces that are removed and no longer fall under a valid workspace path', async () => {
      mockGitForWorkspaces([
        [
          {
            workspace: 'package.json',
            config: {
              workspaces: ['packages/foo', 'packages/bar'],
              dependencies: {
                '@atlaskit/button': '^12.0.0',
                foo: '^2.3.4',
              },
            },
          },
          {
            workspace: 'packages/bar/package.json',
            config: {
              dependencies: {
                '@atlaskit/lozenge': '^7.0.0',
              },
            },
          },
        ],
        [
          {
            workspace: 'package.json',
            config: {
              workspaces: ['packages/foo'],
              dependencies: {
                '@atlaskit/button': '^12.0.0',
                foo: '^2.3.4',
              },
            },
          },
          {
            workspace: 'packages/bar/package.json',
            config: null,
          },
        ],
      ]);

      await populateProduct({
        dev: true,
        dryRun: false,
        interactive: false,
        csv: false,
        product: 'test',
        reset: false,
      });

      expect(sendAnalytics).toHaveBeenCalledTimes(1);
      expect((sendAnalytics as jest.Mock).mock.calls[0][0]).toEqual([
        expect.objectContaining({
          commitHash: '1',
          dependencyName: '@atlaskit/lozenge',
          dependencyType: 'dependency',
          historical: true,
          major: '7',
          minor: '0',
          patch: '0',
          upgradeSubType: null,
          upgradeType: 'remove',
          versionString: '^7.0.0',
        }),
      ]);
    });

    it('should remove dependencies for workspaces that still exist but no longer fall under a valid workspace path', async () => {
      mockGitForWorkspaces([
        [
          {
            workspace: 'package.json',
            config: {
              workspaces: ['packages/foo', 'packages/bar'],
              dependencies: {
                '@atlaskit/button': '^12.0.0',
                foo: '^2.3.4',
              },
            },
          },
          {
            workspace: 'packages/bar/package.json',
            config: {
              dependencies: {
                '@atlaskit/lozenge': '^7.0.0',
              },
            },
          },
        ],
        [
          {
            workspace: 'package.json',
            config: {
              workspaces: ['packages/foo'],
              dependencies: {
                '@atlaskit/button': '^12.0.0',
                foo: '^2.3.4',
              },
            },
          },
        ],
      ]);

      await populateProduct({
        dev: true,
        dryRun: false,
        interactive: false,
        csv: false,
        product: 'test',
        reset: false,
      });

      expect(sendAnalytics).toHaveBeenCalledTimes(1);
      expect((sendAnalytics as jest.Mock).mock.calls[0][0]).toEqual([
        expect.objectContaining({
          commitHash: '1',
          dependencyName: '@atlaskit/lozenge',
          dependencyType: 'dependency',
          historical: true,
          major: '7',
          minor: '0',
          patch: '0',
          upgradeSubType: null,
          upgradeType: 'remove',
          versionString: '^7.0.0',
        }),
      ]);
    });

    it('should only track a dependency listed in "dependencies" if declared in both dependencies and devDependencies across different workspaces', async () => {
      mockGitForWorkspaces([
        [
          {
            workspace: 'package.json',
            config: {
              workspaces: ['packages/*'],
            },
          },
          {
            workspace: 'packages/foo/package.json',
            config: {
              dependencies: {
                '@atlaskit/button': '^12.0.0',
              },
            },
          },
          {
            workspace: 'packages/bar/package.json',
            config: {
              devDependencies: {
                '@atlaskit/button': '^12.0.0',
              },
            },
          },
          {
            workspace: 'packages/baz/package.json',
            config: {
              dependencies: {
                '@atlaskit/button': '^12.0.0',
              },
            },
          },
        ],
        [
          {
            workspace: 'packages/bar/package.json',
            config: {
              devDependencies: {
                '@atlaskit/button': '^13.0.0',
              },
            },
          },
          {
            workspace: 'packages/baz/package.json',
            config: {
              dependencies: {
                '@atlaskit/button': '^14.0.0',
              },
            },
          },
        ],
        [
          {
            workspace: 'packages/foo/package.json',
            config: {
              dependencies: {
                '@atlaskit/button': '^12.2.0',
              },
            },
          },
        ],
      ]);

      await populateProduct({
        dev: true,
        dryRun: false,
        interactive: false,
        csv: false,
        product: 'test',
        reset: false,
      });

      expect(sendAnalytics).toHaveBeenCalledTimes(1);
      expect((sendAnalytics as jest.Mock).mock.calls[0][0]).toEqual([
        expect.objectContaining({
          commitHash: '2',
          dependencyName: '@atlaskit/button',
          dependencyType: 'dependency',
          historical: true,
          major: '12',
          minor: '2',
          patch: '0',
          upgradeSubType: 'minor',
          upgradeType: 'upgrade',
          versionString: '^12.2.0',
        }),
      ]);
    });

    it('should ignore deps in package.jsons listed outside of workspace globs', async () => {
      mockGitForWorkspaces([
        [
          {
            workspace: 'package.json',
            config: {
              workspaces: ['packages/*'],
              dependencies: {
                '@atlaskit/button': '^12.0.0',
                foo: '^2.3.4',
              },
            },
          },
        ],
        [
          {
            workspace: 'random/bar/package.json',
            config: {
              dependencies: {
                '@atlaskit/spinner': '^7.0.0',
              },
            },
          },
          {
            workspace: 'random/foo/package.json',
            config: {
              dependencies: {
                '@atlaskit/lozenge': '^7.0.0',
              },
            },
          },
        ],
      ]);

      await populateProduct({
        dev: true,
        dryRun: false,
        interactive: false,
        csv: false,
        product: 'test',
        reset: false,
      });

      expect(sendAnalytics).not.toHaveBeenCalled();
    });

    it('should pick up changes to workspace glob in root package.json', async () => {
      mockGitForWorkspaces([
        [
          {
            workspace: 'package.json',
            config: {
              workspaces: ['packages/*'],
              dependencies: {
                '@atlaskit/button': '^12.0.0',
                foo: '^2.3.4',
              },
            },
          },
          {
            workspace: 'random/foo/package.json',
            config: {
              dependencies: {
                '@atlaskit/lozenge': '^7.0.0',
              },
            },
          },
        ],
        [
          {
            workspace: 'package.json',
            config: {
              workspaces: ['packages/*', 'random/*'],
              dependencies: {
                '@atlaskit/button': '^12.0.0',
                foo: '^2.3.4',
              },
            },
          },
          {
            workspace: 'random/bar/package.json',
            config: {
              dependencies: {
                '@atlaskit/spinner': '^7.0.0',
              },
            },
          },
        ],
      ]);

      await populateProduct({
        dev: true,
        dryRun: false,
        interactive: false,
        csv: false,
        product: 'test',
        reset: false,
      });

      expect(sendAnalytics).toHaveBeenCalledTimes(1);
      expect((sendAnalytics as jest.Mock).mock.calls[0][0]).toEqual([
        expect.objectContaining({
          commitHash: '1',
          dependencyName: '@atlaskit/lozenge',
          dependencyType: 'dependency',
          historical: true,
          major: '7',
          minor: '0',
          patch: '0',
          upgradeSubType: null,
          upgradeType: 'add',
          versionString: '^7.0.0',
        }),
        expect.objectContaining({
          commitHash: '1',
          dependencyName: '@atlaskit/spinner',
          dependencyType: 'dependency',
          historical: true,
          major: '7',
          minor: '0',
          patch: '0',
          upgradeSubType: null,
          upgradeType: 'add',
          versionString: '^7.0.0',
        }),
      ]);
    });
  });
  describe('Last run state', () => {
    describe('Tag', () => {
      it('should source from tag by default', async () => {
        expect(git.getChangesSince).not.toHaveBeenCalled();
        await populateProduct({
          dev: true,
          dryRun: false,
          interactive: false,
          csv: false,
          product: 'test',
          reset: false,
        });
        expect(git.getChangesSince).toHaveBeenCalledTimes(1);
        expect(git.getChangesSince).toHaveBeenCalledWith(DEFAULT_TAG);
      });

      it('should throw if tag does not exist', async () => {
        asMockFunction(git.doesTagExist).mockImplementation(() => false);
        await expect(
          populateProduct({
            dev: true,
            dryRun: false,
            interactive: false,
            csv: false,
            product: 'test',
            reset: false,
          }),
        ).rejects.toThrowError(
          `Tag '${DEFAULT_TAG}' does not exist. Must use --reset for populating from start of history.`,
        );
      });

      it('should source from specified tag when set', async () => {
        asMockFunction(git.showFile).mockImplementation(ref =>
          JSON.stringify(
            // Treat the first entry of mockPackageJsons as the existing repo state at the 'last run'
            ref === 'foo' ? mockPackageJsons[0] : mockPackageJsons[Number(ref)],
          ),
        );
        expect(git.getChangesSince).not.toHaveBeenCalled();
        await populateProduct({
          dev: true,
          dryRun: false,
          interactive: false,
          csv: false,
          product: 'test',
          reset: false,
          tag: 'foo',
        });
        expect(git.getChangesSince).toHaveBeenCalledTimes(1);
        expect(git.getChangesSince).toHaveBeenCalledWith('foo');
      });

      it('should tag current commit after successful completion', async () => {
        expect(git.tagCommit).not.toHaveBeenCalled();
        await populateProduct({
          dev: true,
          dryRun: false,
          interactive: false,
          csv: false,
          product: 'test',
          reset: false,
        });
        expect(git.tagCommit).toHaveBeenCalledWith(DEFAULT_TAG);
      });
    });

    describe('Statlas', () => {
      it('should source from statlas when statlas flag is set', async () => {
        expect(git.getChangesSince).not.toHaveBeenCalled();
        await populateProduct({
          dev: true,
          dryRun: false,
          interactive: false,
          csv: false,
          product: 'test',
          reset: false,
          statlas: true,
        });
        expect(git.getChangesSince).toHaveBeenCalledWith(mockLastRunHash);
      });

      it('should throw if statlas meta file does not exist', async () => {
        asMockFunction(getMeta).mockImplementation(() => null);
        await expect(
          populateProduct({
            dev: true,
            dryRun: false,
            interactive: false,
            csv: false,
            product: 'test',
            reset: false,
            statlas: true,
          }),
        ).rejects.toThrowError(
          'Missing or invalid metadata file for test. Must use --reset for populating from start of history',
        );
      });

      it('should throw if statlas meta file does not have lastRunHash', async () => {
        asMockFunction(getMeta).mockImplementation(
          () =>
            ({
              badData: true,
            } as any),
        );
        await expect(
          populateProduct({
            dev: true,
            dryRun: false,
            interactive: false,
            csv: false,
            product: 'test',
            reset: false,
            statlas: true,
          }),
        ).rejects.toThrowError(
          'Missing or invalid metadata file for test. Must use --reset for populating from start of history',
        );
      });

      it('should upload current commit to statlas on successful completion', async () => {
        asMockFunction(git.getHash).mockImplementationOnce(() => 'abcdef');
        expect(uploadMeta).not.toHaveBeenCalled();
        await populateProduct({
          dev: true,
          dryRun: false,
          interactive: false,
          csv: false,
          product: 'test',
          reset: false,
          statlas: true,
        });
        expect(uploadMeta).toHaveBeenCalledTimes(1);
        expect(uploadMeta).toHaveBeenCalledWith('test', 'abcdef');
      });
    });
  });
});
