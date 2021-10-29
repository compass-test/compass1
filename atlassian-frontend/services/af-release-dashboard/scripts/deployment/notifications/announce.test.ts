import * as announce from './announce';
import * as analytics from './analytics';
import * as slackMsg from './slack/message';
import * as consts from '../../../src/server/constants';

const { announceChange, getStatus } = announce;

// Prevent scripts actually sending data
jest.mock('@atlassiansox/analytics-node-client');
jest.mock('axios');

describe('getStatus', () => {
  it('should return BROKEN when isStale is true', () => {
    expect(getStatus(true)).toEqual('BROKEN');
  });

  it('should return OPERATIONAL when isStale is false', () => {
    expect(getStatus(false)).toEqual('OPERATIONAL');
  });
});

describe('announceChange', () => {
  let consoleSpy: jest.SpyInstance;
  let analyticsSpy: jest.SpyInstance;
  let slackSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation((_msg: string) => {});
    analyticsSpy = jest.spyOn(analytics, 'getAnalyticsPayload');
    slackSpy = jest.spyOn(slackMsg, 'getMessagePayload');
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    analyticsSpy.mockRestore();
    slackSpy.mockRestore();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('analytics', () => {
    it('should send analytics event', async () => {
      const expectedAnalyticsPayload = {
        action: 'productFabricBranchDeploymentStatusChanged',
        actionSubject: 'af-release-dashboard',
        tags: ['atlaskit'],
        source: 'atlassian-frontend',
        origin: 'console',
        platform: 'bot',
      };

      await announceChange(getStatus(true), true);
      expect(analyticsSpy).toHaveBeenCalledWith('BROKEN');
      expect(analyticsSpy).toHaveReturnedWith({
        ...expectedAnalyticsPayload,
        attributes: { status: 'BROKEN' },
      });
      expect(consoleSpy).toHaveBeenCalledWith(
        'Dispatch analytics (dry run): status = BROKEN',
      );

      await announceChange(getStatus(false), true);
      expect(analyticsSpy).toHaveBeenCalledWith('OPERATIONAL');
      expect(analyticsSpy).toHaveReturnedWith({
        ...expectedAnalyticsPayload,
        attributes: { status: 'OPERATIONAL' },
      });
      expect(consoleSpy).toHaveBeenCalledWith(
        'Dispatch analytics (dry run): status = OPERATIONAL',
      );
    });
  });

  describe('slack', () => {
    it('should not ping slack when not production environment', async () => {
      await announceChange(getStatus(true), true);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Skipping announcement on Slack for non-production environment: localhost.',
      );
      expect(slackSpy).not.toBeCalled();
      await announceChange(getStatus(false), true);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Skipping announcement on Slack for non-production environment: localhost.',
      );
      expect(slackSpy).not.toBeCalled();
    });

    it('should ping slack when production environment', async () => {
      jest
        .spyOn(consts, 'getEnvironment')
        .mockImplementation(() => consts.ENVIRONMENT.PROD);

      await announceChange(getStatus(true), true);
      expect(slackSpy).toHaveBeenCalledWith('BROKEN');
      expect(slackSpy).toHaveNthReturnedWith(
        1,
        `:failed: <https://product-fabric.atlassian.net/wiki/home|Product Fabric> is *STALE*!\n
Consult the _Product Fabric Status_ section on the <https://af-release-dashboard.us-west-2.dev.atl-paas.net|Releases Dashboard> for details.\n
> *Release Manager*:
> <https://hello.atlassian.net/wiki/spaces/AFP/pages/908932565/Development+-+Daily+Routine#Keeping-builds-green|Troubleshoot> the problem and collaborate to resolve the situation. :crytime:
>
> Please _inform_ teams as they *may wish to postpone* their blitz sessions until it's back up to date. The dashboard's _'Behind by N merged pull requests'_ count, and the deployed commit's _'N days ago'_ can be used to make their decision.`,
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Slack message sent to #twp-release-managers: no longer up to date.',
      );
      await announceChange(getStatus(false), true);
      expect(slackSpy).toHaveBeenCalledWith('OPERATIONAL');
      expect(slackSpy).toHaveNthReturnedWith(
        2,
        `:successful: <https://product-fabric.atlassian.net/wiki/home|Product Fabric> is *UP TO DATE*!\n
Consult the _Product Fabric Status_ section on the <https://af-release-dashboard.us-west-2.dev.atl-paas.net|Releases Dashboard> for details.\n
> *Release Manager*:
> Please _inform_ teams that it's *safe* to blitz test again. :raised_hands:`,
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Slack message sent to #twp-release-managers: back up to date again.',
      );
    });
  });
});
