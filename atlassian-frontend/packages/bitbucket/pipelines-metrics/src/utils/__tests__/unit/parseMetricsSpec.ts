import parseMetrics from '../../parseMetrics';

describe('parseMetrics', () => {
  it('should parse data for all visible containers', () => {
    expect(
      parseMetrics(
        [
          {
            timestamp: '2020-06-03T00:55:57Z',
            values: { build: 100, docker: 200 },
          },
          {
            timestamp: '2020-06-03T00:56:57Z',
            values: { build: 300, docker: 400 },
          },
        ],
        { build: true, docker: true },
        { build: 1000, docker: 1000 },
      ),
    ).toEqual([
      {
        duration: '0s',
        hasReachedLimit: false,
        limit: 1,
        timestamp: expect.anything(),
        values: { build: 0.1, docker: 0.2 },
      },
      {
        duration: '1m 0s',
        hasReachedLimit: false,
        limit: 1,
        timestamp: expect.anything(),
        values: { build: 0.3, docker: 0.4 },
      },
    ]);
  });
  it('should parse data for single visible container', () => {
    expect(
      parseMetrics(
        [
          {
            timestamp: '2020-06-03T00:55:57Z',
            values: { build: 100, docker: 200 },
          },
          {
            timestamp: '2020-06-03T00:56:57Z',
            values: { build: 300, docker: 400 },
          },
        ],
        { build: true, docker: false },
        { build: 1000, docker: 1000 },
      ),
    ).toEqual([
      {
        duration: '0s',
        hasReachedLimit: false,
        limit: 1,
        timestamp: expect.anything(),
        values: { build: 0.1 },
      },
      {
        duration: '1m 0s',
        hasReachedLimit: false,
        limit: 1,
        timestamp: expect.anything(),
        values: { build: 0.3 },
      },
    ]);
  });
  it('should set limit reached flag', () => {
    expect(
      parseMetrics(
        [
          {
            timestamp: '2020-06-03T00:55:57Z',
            values: { build: 100 },
          },
        ],
        { build: true },
        { build: 100 },
      ),
    ).toEqual([
      {
        duration: '0s',
        hasReachedLimit: true,
        limit: 1,
        timestamp: expect.anything(),
        values: { build: 1 },
      },
    ]);
  });
});
