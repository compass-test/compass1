/** Extracted into its own file so the mock variables can be instantiated before other imports in the test file that would otherwise be hoisted before it */
export const mockStartUIViewedEvent = jest.fn();
export const mockSendUIEvent = jest.fn();
export const mockSendTrackEvent = jest.fn();
export const mockSendOperationalEvent = jest.fn();
export const mockSendScreenEvent = jest.fn();

jest.mock('@atlassiansox/analytics-web-client', () => {
  return {
    __esModule: true,
    envType: {
      LOCAL: 'local',
      PROD: 'production',
    },
  };
});

jest.mock('../../utils/analytics', () => {
  return {
    __esModule: true,
    createAnalyticsClient: jest.fn().mockReturnValue({
      startUIViewedEvent: mockStartUIViewedEvent,
      sendUIEvent: mockSendUIEvent,
      sendTrackEvent: mockSendTrackEvent,
      sendOperationalEvent: mockSendOperationalEvent,
      sendScreenEvent: mockSendScreenEvent,
    }),
  };
});
