import { clientFailure, empty, fetchScenarioMock, ok, url } from './index';

describe('fetchScenarioMock', () => {
  it('should mock fetch', async () => {
    const fetch = fetchScenarioMock([
      { request: url('/test'), response: ok({ result: 42 }) },
    ]);

    const response = await fetch('/test');

    expect(response.status).toBe(200);
    expect(await response.json()).toStrictEqual({ result: 42 });
  });

  it('should fail if there is not request mock', () => {
    const fetch = fetchScenarioMock([]);

    expect(() => fetch('/test')).toThrowError('Request not mocked');
  });

  it('should fail if there is request mock conflict', () => {
    const fetch = fetchScenarioMock([
      { request: url('/test'), response: ok({ result: 42 }) },
      { request: url('/test'), response: empty() },
    ]);

    expect(() => fetch('/test')).toThrowError('Request mocks conflict');
  });

  it('should reject promise on failure response', () => {
    const fetch = fetchScenarioMock([
      { request: url('/test'), response: clientFailure() },
    ]);

    expect(() => fetch('/test')).rejects.toEqual('Network error');
  });
});
