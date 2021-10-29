import {
  sendFailedMessage,
  conflictedFilesBlock,
  constrainMessage,
} from '../../utils/slack';
import { MergeConflict, User } from '../../types';
import { SlackClient } from '@atlaskit/build-utils/slack';

const mockAxiosInstance = {
  get: jest.fn(),
  post: jest.fn(),
};
jest.mock('axios', () => ({
  create: jest.fn(() => mockAxiosInstance),
}));

const fakeClient = new SlackClient({
  channel: 'rm-channel',
  username: 'AFP Downstream Merge Notifier',
  token: 'token',
});

describe('merge downstream', () => {
  it('default message matches snapshot', async () => {
    mockAxiosInstance.post.mockResolvedValue({});
    mockAxiosInstance.get.mockResolvedValue({
      data: { ok: true, user: { id: 'rm-slack-id' } },
    });

    await sendFailedMessage(
      {
        from: 'from-branch',
        to: 'to-branch',
        releaseManager: {
          emailAddress: 'rm-email@atlassian.com',
        } as User,
        mergeBranch: 'merge-branch-name',
        pipelinesLink: 'pipeline-link',
      },
      [],
      fakeClient,
    );

    expect(mockAxiosInstance.post.mock.calls.length).toBe(1);
    expect(mockAxiosInstance.post.mock.calls[0][1].blocks).toMatchSnapshot();
  });

  describe('conflictedFilesBlock', () => {
    const textFieldCharacterThreshold = 3000;

    it('return a list of conflicted files as well as the person who last touched them', async () => {
      const conflict1: MergeConflict = {
        file: 'file1',
        authorName: 'Linus',
        authorEmail: 'lkarsai@atlassian.com',
      };
      const conflict2: MergeConflict = {
        file: 'file2',
        authorName: 'Roger',
        authorEmail: 'roger@atlassian.com',
      };

      const block = await conflictedFilesBlock(
        [conflict1, conflict2],
        fakeClient,
      );

      expect(block!.text!.text).toContain(conflict1.file);
      expect(block!.text!.text).toContain(conflict1.authorName);
      expect(block!.text!.text).toContain(conflict2.file);
      expect(block!.text!.text).toContain(conflict2.authorName);
    });

    it('only return first 20 files and display the proper text', async () => {
      const conflicts: Array<MergeConflict> = [];
      for (let i = 1; i <= 30; i++) {
        conflicts.push({
          file: `file-${i}`,
          authorName: 'Linus',
          authorEmail: 'lkarsai@atlassian.com',
        });
      }
      const block = await conflictedFilesBlock(conflicts, fakeClient);
      const message = constrainMessage(block!.text!.text);
      expect(message).toContain('file-1');
      expect(message).toContain('file-20');
      expect(message).not.toContain('file-21');
      expect(message).toContain('And 10 other files');
    });

    it(`returns a smaller text field message if the number of characters exceeds ${textFieldCharacterThreshold}`, async () => {
      const conflicts: Array<MergeConflict> = [];
      for (let i = 1; i <= 5; i++) {
        conflicts.push({
          file: `file-${i}_${'-'.repeat(textFieldCharacterThreshold)}`,
          authorName: 'foo',
          authorEmail: 'foo@atlassian.com',
        });
      }
      const block = await conflictedFilesBlock(conflicts, fakeClient);
      const message = constrainMessage(block!.text!.text);
      expect(message.length).toBeLessThan(textFieldCharacterThreshold);
      expect(message).toContain(
        'We are unable to display the conflicted files',
      );
    });

    it('return empty object if no conflicts', async () => {
      const block = await conflictedFilesBlock([], fakeClient);
      expect(block).toEqual({});
    });
  });
});
