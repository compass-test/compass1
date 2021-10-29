import { pullrequest } from '../../../__fixtures__/pullrequest.json';

jest.mock('../../../src/lib/Logger', () => ({
  Logger: {
    info: jest.fn(),
  },
}));
jest.mock('../../../src/config', () => {
  const ignoreBranchPrefixes = [/^regex-.+?\//, 'magic-prefix/'];
  const ignorePrTags = [/\bREGEX\b/i, '[TAG]'];
  return {
    config: {
      ignoreBranchPrefixes,
      ignorePrTags,
      commentFooter: 'footer',
    },
  };
});

import {
  ignorePr,
  PREFIX_IGNORED,
  TAG_IGNORED,
  formatComment,
} from '../../../src/lib/utils';
import { PullRequest, ReviewerInfo } from '../../../src/types';

const defaultPR = pullrequest as PullRequest;

describe('prIgnore: Pull Request ignore check', () => {
  test('ignores string branch prefix', () => {
    expect(
      ignorePr({
        ...defaultPR,
        sourceBranch: 'magic-prefix/branch',
      }),
    ).toEqual(PREFIX_IGNORED);
  });

  test('ignores regex branch prefix', () => {
    expect(
      ignorePr({
        ...defaultPR,
        sourceBranch: 'regex-prefix/branch',
      }),
    ).toEqual(PREFIX_IGNORED);
  });

  test('ignores string title tags', () => {
    expect(
      ignorePr({
        ...defaultPR,
        title: '[TAG] Pull Request',
      }),
    ).toEqual(TAG_IGNORED);
    expect(
      ignorePr({
        ...defaultPR,
        title: 'Pull [TAG] Request',
      }),
    ).toEqual(TAG_IGNORED);
  });

  test('ignores regex title tags', () => {
    expect(
      ignorePr({
        ...defaultPR,
        title: '[REGEX] Pull Request',
      }),
    ).toEqual(TAG_IGNORED);
    expect(
      ignorePr({
        ...defaultPR,
        title: 'Pull REGEX Request',
      }),
    ).toEqual(TAG_IGNORED);
    expect(
      ignorePr({
        ...defaultPR,
        title: 'Pull [regex] Request',
      }),
    ).toEqual(TAG_IGNORED);
  });

  test('returns undefined for allowed PR', () => {
    expect(ignorePr(defaultPR)).toEqual(undefined);
  });
});

describe('formatComment', () => {
  const header =
    'These reviewers have been assigned to review the packages owned by their teams:\n\n';
  const footer = `\n\n***\nfooter`;
  it('should have header and footer in comment', () => {
    expect(formatComment({})).toEqual(header + footer);
  });

  it('should have all packages and one reviewer in comment  when one reviewer is passed', () => {
    const reviewerInfo: ReviewerInfo = {
      team1: {
        packages: ['package1', 'package2', 'package3'],
        reviewers: [
          {
            name: 'reviewer',
            aaid: '1',
          },
        ],
      },
    };

    const expectedPackage =
      '* `package1`, `package2`, `package3`: @{1} from **team1**';

    expect(formatComment(reviewerInfo)).toEqual(
      header + expectedPackage + footer,
    );
  });

  it('should have al packages and all reviewer in comment when multiple reviewers are passed', () => {
    const reviewerInfo: ReviewerInfo = {
      team1: {
        packages: ['package1', 'package2', 'package3'],
        reviewers: [
          {
            name: 'reviewer1',
            aaid: '1',
          },
          {
            name: 'reviewer2',
            aaid: '2',
          },
        ],
      },
    };

    const expectedPackage =
      '* `package1`, `package2`, `package3`: @{1}, @{2} from **team1**';

    expect(formatComment(reviewerInfo)).toEqual(
      header + expectedPackage + footer,
    );
  });
});
