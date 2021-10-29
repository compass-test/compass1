import { SimpleGit } from 'simple-git/promise';
import { resolveMergeConflicts } from '../../utils/merge-conflicts';
import spawn from 'spawndamnit';

jest.mock('spawndamnit');

const mockSpawn: jest.Mock = spawn as any;
describe('mergeConflicts', () => {
  beforeEach(() => {
    mockSpawn.mockResolvedValue(jest.fn());
  });
  describe('isThereMergeConflicts', () => {
    it('should return false when no conflicts', async () => {
      const gitMock: unknown = {
        status: () =>
          Promise.resolve({
            conflicted: [],
          }),
      };
      const result = await resolveMergeConflicts(gitMock as SimpleGit);
      expect(result).toBe(false);
    });
    it('should return false when commit is more than yarn.lock', async () => {
      const gitMock: unknown = {
        status: () =>
          Promise.resolve({
            conflicted: ['yarn.lock', 'package.json'],
          }),
      };
      const result = await resolveMergeConflicts(gitMock as SimpleGit);
      expect(result).toBe(false);
    });
    describe('fixing yarn.lock with bolt', () => {
      it('should try use bolt to fix yarn.lock', async () => {
        const addMock = jest.fn();
        const commitMock = jest.fn();
        const gitMock: unknown = {
          status: () =>
            Promise.resolve({
              conflicted: ['yarn.lock'],
            }),
          add: addMock,
          commit: commitMock,
        };
        await resolveMergeConflicts(gitMock as SimpleGit);
        expect(mockSpawn.mock.calls[0]).toEqual(['bolt']);
        expect(addMock.mock.calls[0]).toEqual(['yarn.lock']);
      });
      it('should add yarn.lock and commit if fix is successful', async () => {
        const addMock = jest.fn();
        const commitMock = jest.fn();
        const gitMock: unknown = {
          status: () =>
            Promise.resolve({
              conflicted: ['yarn.lock'],
            }),
          add: addMock,
          commit: commitMock,
        };
        await resolveMergeConflicts(gitMock as SimpleGit);
        expect(addMock.mock.calls[0]).toEqual(['yarn.lock']);
        expect(commitMock.mock.calls[0]).toEqual([
          [],
          undefined,
          { '--no-edit': true },
        ]);
      });
      it('should return true if fix is successful', async () => {
        const addMock = jest.fn();
        const commitMock = jest.fn();
        const gitMock: unknown = {
          status: () =>
            Promise.resolve({
              conflicted: ['yarn.lock'],
            }),
          add: addMock,
          commit: commitMock,
        };
        expect(await resolveMergeConflicts(gitMock as SimpleGit)).toBe(true);
      });
      it("should return false when yarn.lock couldn't be fixed", async () => {
        const addMock = jest.fn();
        const commitMock = jest.fn();
        const gitMock: unknown = {
          status: () =>
            Promise.resolve({
              conflicted: ['yarn.lock'],
            }),
          add: addMock,
          commit: commitMock,
        };
        mockSpawn.mockImplementation(() => {
          throw new Error('could not fix with bolt');
        });
        expect(await resolveMergeConflicts(gitMock as SimpleGit)).toBe(false);
      });
    });
  });
});
