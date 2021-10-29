import { attachJiraReferralIds } from '../attach-referral-ids';

const baseUrl = 'test';

describe('Attach referral ids', () => {
  beforeEach(() => {});

  it('attaches the right ids', () => {
    expect(
      attachJiraReferralIds(baseUrl, {
        searchSessionId: 'foo',
        searchObjectId: 'bar',
        searchContainerId: 'baz',
        searchContentType: 'issue',
      }),
    ).toEqual(
      'test?searchSessionId=foo&searchObjectId=bar&searchContainerId=baz&searchContentType=issue',
    );
  });

  it('works without container id', () => {
    expect(
      attachJiraReferralIds(baseUrl, {
        searchSessionId: 'foo',
        searchObjectId: 'bar',
        searchContentType: 'project',
      }),
    ).toEqual(
      'test?searchSessionId=foo&searchObjectId=bar&searchContentType=project',
    );
  });
});
