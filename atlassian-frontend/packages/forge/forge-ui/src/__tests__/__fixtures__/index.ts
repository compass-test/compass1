export function asMock(
  fn: (...args: unknown[]) => unknown,
): jest.Mock<unknown> {
  return fn as jest.Mock<unknown>;
}

export { mockAnalyticsWebClient } from './mockAnalyticsWebClient';
