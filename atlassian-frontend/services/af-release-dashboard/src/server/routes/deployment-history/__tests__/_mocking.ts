import * as bbPullRequests from '../../../bitbucket/pullRequests';
import * as bbCommit from '../../../bitbucket/commit';
import mockedPullRequestData from './__fixtures__/pull-requests.json';

export function mockPullRequests(
  payloads: { values: any }[] | { values: any },
) {
  const spy = jest.spyOn(bbPullRequests, 'getMergedPullRequests');
  if (Array.isArray(payloads)) {
    for (let { values } of payloads) {
      spy.mockResolvedValueOnce(values);
    }
  } else {
    spy.mockResolvedValueOnce(payloads.values);
  }
  return spy;
}

export function mockCommit(hash: string, timestamp: string) {
  const spy = jest.spyOn(bbCommit, 'getCommit');
  // A normal payload contains additional parameters,
  // but these are the only values we use.
  spy.mockResolvedValueOnce({
    type: 'commit',
    date: timestamp,
    hash,
    message: 'foo',
  });
  return spy;
}

export function manipulateMockedPrData(
  updates: { index: number; timestamp: string }[],
): { values: bbPullRequests.BitbucketPullRequest[] } {
  const clone = JSON.parse(JSON.stringify(mockedPullRequestData));
  for (let update of updates) {
    const { index, timestamp } = update;
    clone.values[index].closed_on = timestamp;
  }
  // We discard surplus entries as they're irrelevant for the purpose of our mocks
  // This also avoids date mismatch checking between the mocked datetime in our
  // test environment, and the timestamps contained within the JSON fixture data.
  clone.values = clone.values.slice(0, updates.length);
  return clone;
}
