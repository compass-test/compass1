export function asMock(
  fn: (...args: unknown[]) => unknown,
): jest.Mock<unknown> {
  return fn as jest.Mock<unknown>;
}

export const mockAnalyticsWebClient = {
  sendUIEvent: jest.fn(),
  sendOperationalEvent: jest.fn(),
  sendTrackEvent: jest.fn(),
  sendScreenEvent: jest.fn(),
};
