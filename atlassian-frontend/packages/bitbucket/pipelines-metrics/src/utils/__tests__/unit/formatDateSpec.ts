import formatDate from '../../formatDate';

describe('formatDate', () => {
  it('should format seconds into readable format', () => {
    expect(formatDate('2020-06-03T00:59:52Z')).toContain(':59:52');
  });
});
