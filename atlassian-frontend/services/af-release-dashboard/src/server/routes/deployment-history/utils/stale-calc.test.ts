import { isStale } from './stale-calc';
import { DEPLOYMENT_GRACE_PERIOD_IN_HOURS } from '../../../constants';
import type { PullRequestsMetadata } from './types';

describe('isStale:', () => {
  const deployedTimestamp = `2020-10-05T14:00:00.000Z`;

  function mockPrMetadata(
    numPrsBehind: number,
    deployedTimestamp: string,
    pendingTimestamp: string,
    latestTimestamp: string,
  ): PullRequestsMetadata {
    return {
      numPrsBehind,
      deployedPr: {
        commit: 'deployed',
        timestamp: deployedTimestamp,
        date: new Date(deployedTimestamp),
      },
      prAfterDeployed: {
        commit: 'pending',
        timestamp: pendingTimestamp,
        date: new Date(pendingTimestamp),
      },
      latestPr: {
        commit: 'latest',
        timestamp: latestTimestamp,
        date: new Date(latestTimestamp),
      },
    };
  }

  it('should return false when the deployed commit matches the latest commit and/or numPrsBehind is zero', async () => {
    const numPrsBehind = 0;
    const upToDatePrMetadata = mockPrMetadata(
      numPrsBehind,
      deployedTimestamp,
      deployedTimestamp,
      deployedTimestamp,
    );
    const stale = isStale(true, upToDatePrMetadata);
    expect(stale).toEqual(false);
  });

  it('should return true when isAutoRebase is false, even if technically up to date', async () => {
    const numPrsBehind = 0;
    const upToDatePrMetadata = mockPrMetadata(
      numPrsBehind,
      deployedTimestamp,
      deployedTimestamp,
      deployedTimestamp,
    );
    const stale = isStale(false, upToDatePrMetadata);
    expect(stale).toEqual(true);
  });

  it('should return false when the commit after the deployed commit is less than 1 hour ago (within build/deploy threshold)', async () => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - 59);
    const pendingTimestamp = d.toISOString();
    const latestTimestamp = new Date().toISOString();
    const numPrsBehind = 2;
    const prMetadata = mockPrMetadata(
      numPrsBehind,
      deployedTimestamp,
      pendingTimestamp,
      latestTimestamp,
    );
    const stale = isStale(true, prMetadata);
    expect(stale).toEqual(false);
  });

  it(`should return true when the commit after the deployed commit occured ${DEPLOYMENT_GRACE_PERIOD_IN_HOURS} or more hours ago (exceeds build/deploy threshold)`, async () => {
    const d = new Date();
    d.setHours(d.getHours() - DEPLOYMENT_GRACE_PERIOD_IN_HOURS);
    const pendingTimestamp = d.toISOString();
    const latestTimestamp = new Date().toISOString();
    const numPrsBehind = 2;
    const prMetadata = mockPrMetadata(
      numPrsBehind,
      deployedTimestamp,
      pendingTimestamp,
      latestTimestamp,
    );
    const stale = isStale(true, prMetadata);
    expect(stale).toEqual(true);
  });
});
