import formatDuration from '../../formatDuration';

describe('formatDuration', () => {
  it('should format seconds into readable format', () => {
    expect(formatDuration('foo', 'bar')).toEqual('0s');
    expect(
      formatDuration('2020-06-03T00:59:52Z', '2020-06-03T00:59:57Z'),
    ).toEqual('5s');
    expect(
      formatDuration('2020-06-03T00:58:37Z', '2020-06-03T00:59:57Z'),
    ).toEqual('1m 20s');
    expect(
      formatDuration('2020-06-03T00:28:11Z', '2020-06-03T01:59:57Z'),
    ).toEqual('1h 31m 46s');
  });
});
