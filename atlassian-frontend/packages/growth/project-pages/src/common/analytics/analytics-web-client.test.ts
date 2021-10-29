const mockSetTenantInfo = jest.fn();
const mockSetUserInfo = jest.fn();
const mockSendTrackEvent = jest.fn();
const mockSendUIEvent = jest.fn();
const mockSendOperationalEvent = jest.fn();
const mockSendScreenEvent = jest.fn();

jest.mock('@atlassiansox/analytics-web-client', () => ({
  __esModule: true, // this property makes it work
  default: jest.fn().mockImplementation(() => ({
    setTenantInfo: mockSetTenantInfo,
    setUserInfo: mockSetUserInfo,
    sendTrackEvent: mockSendTrackEvent,
    sendUIEvent: mockSendUIEvent,
    sendOperationalEvent: mockSendOperationalEvent,
    sendScreenEvent: mockSendScreenEvent,
  })),
  envType: { DEV: 'dev', PROD: 'prod' },
  tenantType: { CLOUD_ID: 'cloudId' },
  userType: { ATLASSIAN_ACCOUNT: 'atlassianAccount' },
  eventType: { TRACK: 'track' },
}));

describe('send track analytics event', () => {
  let initAnalyticsClient: any;
  let sendTrackAnalyticsEvent: any;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    const analyticsClient = require('./analytics-web-client');
    initAnalyticsClient = analyticsClient.initAnalyticsClient;
    sendTrackAnalyticsEvent = analyticsClient.sendTrackAnalyticsEvent;
  });

  test('should send analytics event with proper source and actionSubjectId', () => {
    initAnalyticsClient({
      client: { environment: 'dev' },
      context: { parent: 'projectPagesTest' },
    });
    sendTrackAnalyticsEvent({
      source: 'source',
      action: 'failed',
      actionSubject: 'fetch1',
    });

    expect(mockSendScreenEvent).toHaveBeenCalledTimes(0);
    expect(mockSendUIEvent).toHaveBeenCalledTimes(0);
    expect(mockSendOperationalEvent).toHaveBeenCalledTimes(0);
    expect(mockSetTenantInfo).toHaveBeenCalledTimes(1);
    expect(mockSetUserInfo).toHaveBeenCalledTimes(1);
    expect(mockSendTrackEvent).toHaveBeenCalledTimes(1);
    expect(mockSendTrackEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        source: 'projectPagesTestSource',
        actionSubjectId: 'failedFetch1',
      }),
    );
  });
});
