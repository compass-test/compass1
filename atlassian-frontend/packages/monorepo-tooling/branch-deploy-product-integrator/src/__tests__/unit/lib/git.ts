jest.enableAutomock();

import { branchPrefix } from '../../../constants';
import * as gitUtils from '../../../lib/git';

jest.unmock('../../../lib/git');

describe('Git utils', () => {
  let mockGitMethods: any;
  // @ts-ignore
  let consoleLogSpy: jest.SpyInstance<
    ReturnType<Console['log']>,
    Parameters<Console['log']>
  >;

  beforeEach(() => {
    jest.resetAllMocks();
    mockGitMethods = {
      add: jest.fn(),
      checkout: jest.fn(),
      checkoutBranch: jest.fn(),
      commit: jest.fn(),
      listRemote: jest.fn(() => 'foo'),
      merge: jest.fn(),
      pull: jest.fn(),
      push: jest.fn(),
      revparse: jest.fn(),
      rm: jest.fn(),
      status: jest.fn(() => ({ staged: [] })),
    };
    // Comment out the mockImplementation to read console.logs for debugging
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });
  describe('checkoutOrCreate', () => {
    it('should create a new branch if one does not exist', async () => {
      expect(mockGitMethods.checkoutBranch).not.toHaveBeenCalled();
      await gitUtils.checkoutOrCreate(
        {
          ...mockGitMethods,
          revparse: () => {
            throw Error();
          },
        },
        'foo',
        'master',
      );
      expect(mockGitMethods.checkoutBranch).toHaveBeenCalledWith(
        'foo',
        'origin/master',
      );
    });
    it('should throw if branch does not exist and onlyCheckout arg is set', async () => {
      await expect(
        gitUtils.checkoutOrCreate(
          {
            ...mockGitMethods,
            revparse: () => {
              throw Error();
            },
          },
          'foo',
          'master',
          true,
        ),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Branch foo does not exist. Must specify existing branch. Have you mistakenly prefixed ${branchPrefix}?"`,
      );
    });
    it('should reuse existing branch if it exists', async () => {
      await gitUtils.checkoutOrCreate(mockGitMethods, 'foo', 'master');
      expect(mockGitMethods.checkout).toHaveBeenCalledWith('foo');
      expect(mockGitMethods.pull).toHaveBeenCalledWith('origin', 'foo');
      expect(mockGitMethods.checkoutBranch).not.toHaveBeenCalled();
    });
    it('should create branch off baseBranchName', async () => {
      expect(mockGitMethods.checkoutBranch).not.toHaveBeenCalled();
      await gitUtils.checkoutOrCreate(
        {
          ...mockGitMethods,
          revparse: () => {
            throw Error();
          },
        },
        'foo',
        'develop',
      );
      expect(mockGitMethods.checkoutBranch).toHaveBeenCalledWith(
        'foo',
        'origin/develop',
      );
    });
  });
  describe('merge', () => {
    it('should merge specified branch', async () => {
      expect(mockGitMethods.merge).not.toHaveBeenCalled();
      await gitUtils.merge(mockGitMethods, 'origin/master', { files: [] });

      expect(mockGitMethods.merge).toHaveBeenCalledWith(['origin/master']);
    });
    describe('Merge conflicts', () => {
      it('should auto-resolve standard conflicts for the provided files', async () => {
        expect(mockGitMethods.checkout).not.toHaveBeenCalled();
        expect(mockGitMethods.add).not.toHaveBeenCalled();
        await gitUtils.merge(
          {
            ...mockGitMethods,
            merge: jest.fn(() => {
              throw Error();
            }),
            status: jest.fn(() => ({
              conflicted: ['foo'],
              files: [{ path: 'foo', index: 'U', working_dir: 'U' }],
            })),
          },
          'origin/master',
          { files: ['foo', 'bar'] },
        );
        expect(mockGitMethods.checkout).toHaveBeenNthCalledWith(1, [
          '--theirs',
          'foo',
        ]);
        expect(mockGitMethods.add).toHaveBeenCalledWith(['foo']);
        expect(mockGitMethods.commit).toHaveBeenCalled();
      });
      it('should auto-resolve "deletedByThem" conflicts for the provided files', async () => {
        expect(mockGitMethods.rm).not.toHaveBeenCalled();
        await gitUtils.merge(
          {
            ...mockGitMethods,
            merge: jest.fn(() => {
              throw Error();
            }),
            status: jest.fn(() => ({
              conflicted: ['foo'],
              files: [{ path: 'foo', index: 'U', working_dir: 'D' }],
            })),
          },
          'origin/master',
          { files: ['foo', 'bar'] },
        );
        expect(mockGitMethods.rm).toHaveBeenCalledWith(['foo']);
        expect(mockGitMethods.commit).toHaveBeenCalled();
      });
      it('should error if unsupported merge conflicts exist for provided files', async () => {
        await expect(
          gitUtils.merge(
            {
              ...mockGitMethods,
              merge: jest.fn(() => {
                throw Error();
              }),
              status: jest.fn(() => ({
                conflicted: ['foo'],
                // Deleted by us conflict
                files: [{ path: 'foo', index: 'D', working_dir: 'U' }],
              })),
            },
            'origin/master',
            { files: ['foo', 'bar'] },
          ),
        ).rejects.toThrowErrorMatchingInlineSnapshot(`
"Found unsupported merge conflict types for files that would otherwise be automergeable, you will need to manually resolve foo to their version on master.
Please run the @atlaskit/branch-deploy-product-integrator CLI manually by following its README"
`);
      });
      it('should error if merge conflicts exist for other files', async () => {
        await expect(
          gitUtils.merge(
            {
              ...mockGitMethods,
              merge: jest.fn(() => {
                throw Error();
              }),
              status: jest.fn(() => ({
                conflicted: ['baz'],
                // Deleted by us conflict
                files: [{ path: 'baz', index: 'U', working_dir: 'U' }],
              })),
            },
            'origin/master',
            { files: ['foo', 'bar'] },
          ),
        ).rejects.toThrowErrorMatchingInlineSnapshot(
          `
"Found merge conflicts for files that are not automergeable, you will need to manually resolve conflicts for baz.
Please run the @atlaskit/branch-deploy-product-integrator CLI manually by following its README"
`,
        );
      });
      it('should still auto resolve conflicts if non-resolvable conflicts exist', async () => {
        await expect(
          gitUtils.merge(
            {
              ...mockGitMethods,
              merge: jest.fn(() => {
                throw Error();
              }),
              status: jest.fn(() => ({
                conflicted: [
                  'unsupportedConflict',
                  'unresolvableFile',
                  'standardConflict',
                  'deletedByThemConflict',
                ],
                // Deleted by us conflict
                files: [
                  { path: 'unresolvableFile', index: 'U', working_dir: 'U' },
                  { path: 'unsupportedConflict', index: 'D', working_dir: 'U' },
                  { path: 'standardConflict', index: 'U', working_dir: 'U' },
                  {
                    path: 'deletedByThemConflict',
                    index: 'U',
                    working_dir: 'D',
                  },
                ],
              })),
            },
            'origin/master',
            {
              files: [
                'foo',
                'bar',
                'standardConflict',
                'deletedByThemConflict',
              ],
            },
          ),
        ).rejects.toThrow();
        // Should still resolve auto-resolvable conflicts
        expect(mockGitMethods.checkout).toHaveBeenNthCalledWith(1, [
          '--theirs',
          'standardConflict',
        ]);
        expect(mockGitMethods.add).toHaveBeenCalledWith(['standardConflict']);
        expect(mockGitMethods.rm).toHaveBeenCalledWith([
          'deletedByThemConflict',
        ]);
        // Should not commit though
        expect(mockGitMethods.commit).not.toHaveBeenCalled();
      });
      it('should not try to auto resolve different conflicts if they do not exist', async () => {
        await expect(
          gitUtils.merge(
            {
              ...mockGitMethods,
              merge: jest.fn(() => {
                throw Error();
              }),
              status: jest.fn(() => ({
                conflicted: ['unresolvableFile'],
                files: [
                  { path: 'unresolvableFile', index: 'U', working_dir: 'U' },
                ],
              })),
            },
            'origin/master',
            { files: ['foo', 'bar'] },
          ),
        ).rejects.toThrow();
        expect(mockGitMethods.checkout).not.toHaveBeenCalled();
        expect(mockGitMethods.add).not.toHaveBeenCalled();
        expect(mockGitMethods.rm).not.toHaveBeenCalled();
      });
      it('should prompt to resolve conflicts and then continue instead of erroring when promptOnConflicts arg is set', async () => {
        await gitUtils.merge(
          {
            ...mockGitMethods,
            merge: jest.fn(() => {
              throw Error();
            }),
            status: jest.fn(() => ({
              conflicted: ['foo'],
              // Deleted by us conflict
              files: [{ path: 'foo', index: 'D', working_dir: 'U' }],
            })),
          },
          'origin/master',
          { files: ['foo', 'bar'] },
          true,
        );
        expect(mockGitMethods.commit).toHaveBeenCalled();
      });
      it('should auto-resolve conflicts with --ours for files listed under resolutionStrategies.ours', async () => {
        expect(mockGitMethods.checkout).not.toHaveBeenCalled();
        expect(mockGitMethods.add).not.toHaveBeenCalled();
        await gitUtils.merge(
          {
            ...mockGitMethods,
            merge: jest.fn(() => {
              throw Error();
            }),
            status: jest.fn(() => ({
              conflicted: ['foo', 'bar'],
              files: [
                { path: 'foo', index: 'U', working_dir: 'U' },
                { path: 'bar', index: 'U', working_dir: 'U' },
              ],
            })),
          },
          'origin/master',
          { files: ['foo', 'bar'], resolutionStrategies: { ours: ['bar'] } },
        );
        expect(mockGitMethods.checkout).toHaveBeenNthCalledWith(1, [
          '--theirs',
          'foo',
        ]);
        expect(mockGitMethods.checkout).toHaveBeenNthCalledWith(2, [
          '--ours',
          'bar',
        ]);
        expect(mockGitMethods.add).toHaveBeenCalledWith(['foo', 'bar']);
        expect(mockGitMethods.commit).toHaveBeenCalled();
      });
    });
  });
  describe('resetFiles', () => {
    it('should reset (checkout) provided files to their version on master', async () => {
      expect(mockGitMethods.checkout).not.toHaveBeenCalled();
      await gitUtils.resetFiles(
        {
          ...mockGitMethods,
          raw: jest.fn(([cmd, ...args]) => {
            if (cmd === 'merge-base') {
              return `<merge-base:${args.join('&')}>`;
            }
          }),
        },
        'origin/develop',
        ['foo', 'bar'],
      );
      expect(mockGitMethods.checkout).toHaveBeenCalledWith([
        '<merge-base:origin/develop&origin/master>',
        '--',
        'foo',
        'bar',
      ]);
    });
  });
});
