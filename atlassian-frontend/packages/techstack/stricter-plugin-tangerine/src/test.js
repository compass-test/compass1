const { rules } = require('./index');

describe('Stricter-plugin-tangerine', () => {
  it('should export the correct rules', () => {
    expect(rules).toMatchSnapshot();
  });
});
