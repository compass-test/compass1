const { rules, configs } = require('./index');

describe('Eslint-plugin-tangerine', () => {
  it('should export the correct configs', () => {
    expect(configs).toMatchSnapshot();
  });

  it('should export the correct rules', () => {
    expect(rules).toMatchSnapshot();
  });
});
