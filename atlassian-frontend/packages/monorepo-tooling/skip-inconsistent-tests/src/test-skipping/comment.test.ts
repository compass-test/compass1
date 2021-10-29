import { getSkipLineComment } from './comment';

const SKIPPED_TEST_COMMENT =
  'FIXME: This test was automatically skipped due to failure on 8/16/2017';

const SKIPPED_TEST_COMMENT_WITH_TICKET = `${SKIPPED_TEST_COMMENT}: https://product-fabric.atlassian.net/browse/ED-12815`;

describe('getSkipLineComment', () => {
  it('should include date in generated skip line comment', () => {
    expect(getSkipLineComment()).toEqual(SKIPPED_TEST_COMMENT);
  });

  it('should include jira ticket when provided', () => {
    expect(
      getSkipLineComment(
        'https://product-fabric.atlassian.net/browse/ED-12815',
      ),
    ).toEqual(SKIPPED_TEST_COMMENT_WITH_TICKET);
  });
});
