/* eslint-disable no-undef */
const { RuleTester } = require('eslint');

RuleTester.describe = (text, method) => {
  const origHasAssertions = expect.hasAssertions;
  describe(text, () => {
    beforeAll(() => {
      // Stub out expect.hasAssertions beforeEach from jest-presetup.js
      expect.hasAssertions = () => {};
    });
    afterAll(() => {
      expect.hasAssertions = origHasAssertions;
    });

    method();
  });
};

module.exports = new RuleTester({
  parser: require.resolve('babel-eslint'),
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});
