import {
  extractQueryParams,
  extractMetadataBody,
} from '../../../src/lib/utils/request';

jest.mock('../../../src/lib/Logger', () => ({
  Logger: {
    info: jest.fn(),
  },
}));

describe('extractQueryParams', () => {
  const params = {
    prId: '1',
    commit: 'abcdefghijkl', // 12 chars
  };

  test('Extracts prId and commit (hash length of 8)', () => {
    const queryParams = {
      ...params,
      commit: 'abcdefgh', // 8 chars
    };
    expect(extractQueryParams(queryParams)).toEqual(queryParams);
  });

  test('Extracts prId and commit (hash length of 12)', () => {
    expect(extractQueryParams(params)).toEqual(params);
  });

  test('Extracts prId and commit (hash length over 12)', () => {
    expect(
      extractQueryParams({
        ...params,
        commit: 'abcdefghijklmnop', // 16 chars
      }),
    ).toEqual(params);
  });

  test('Extracts prId and commit (with other params)', () => {
    expect(
      extractQueryParams({
        ...params,
        another: 'not-needed',
        ignore: 'ignore-this',
      }),
    ).toEqual(params);
  });

  test('Returns undefined if there are no query parameters', () => {
    expect(extractQueryParams(undefined)).toEqual(undefined);
  });

  test('Ensures existence of both prId and commit', () => {
    expect(extractQueryParams({ prId: '1' })).toEqual(undefined);
    expect(extractQueryParams({ commit: 'abcdefgh' })).toEqual(undefined);
  });

  test('Ensure commit hash length is at least 8', () => {
    expect(
      extractQueryParams({
        ...params,
        commit: 'abcdefg', // 7 chars
      }),
    ).toEqual(undefined);
  });
});

describe('extractMetadataBody', () => {
  const changedPackages = ['package-a', 'package-b'];

  test('Correctly extracts changedPackages', () => {
    expect(extractMetadataBody(JSON.stringify({ changedPackages }))).toEqual({
      changedPackages,
      addReviewers: false,
      addComment: false,
      reviewerMethod: 'random',
    });
  });

  test('Allows empty changedPackages', () => {
    expect(
      extractMetadataBody(JSON.stringify({ changedPackages: [] })),
    ).toEqual({
      changedPackages: [],
      addReviewers: false,
      addComment: false,
      reviewerMethod: 'random',
    });
  });

  test('Correctly extracts true flags', () => {
    const body = {
      changedPackages,
      addReviewers: true,
      addComment: true,
      reviewerMethod: 'random',
    };
    expect(extractMetadataBody(JSON.stringify(body))).toEqual(body);
  });

  test('Correctly extracts false flags', () => {
    const body = {
      changedPackages,
      addReviewers: false,
      addComment: false,
      reviewerMethod: 'random',
    };
    expect(extractMetadataBody(JSON.stringify(body))).toEqual(body);
  });

  test('Correctly extracts reviewerMethod as random ', () => {
    const body = {
      changedPackages,
      addReviewers: false,
      addComment: false,
      reviewerMethod: 'random',
    };
    expect(extractMetadataBody(JSON.stringify(body))).toEqual(
      expect.objectContaining({ reviewerMethod: 'random' }),
    );
  });

  test('Correctly extracts reviewerMehtod as entire-method ', () => {
    const body = {
      changedPackages,
      addReviewers: false,
      addComment: false,
      reviewerMethod: 'entire-team',
    };
    expect(extractMetadataBody(JSON.stringify(body))).toEqual(
      expect.objectContaining({ reviewerMethod: 'entire-team' }),
    );
  });

  test('Correctly extracts reviewerMehtod as random when an incorrect value is passed', () => {
    const body = {
      changedPackages,
      addReviewers: false,
      addComment: false,
      reviewerMethod: 'not valid',
    };
    expect(extractMetadataBody(JSON.stringify(body))).toEqual(
      expect.objectContaining({ reviewerMethod: 'random' }),
    );
  });

  test('Ensures existence of changedPackages', () => {
    expect(extractMetadataBody(undefined)).toEqual(undefined);
    expect(extractMetadataBody('')).toEqual(undefined);
    expect(extractMetadataBody(JSON.stringify({ something: 'else' }))).toEqual(
      undefined,
    );
  });
});
