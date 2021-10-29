/*
 testing commerce mocks in "node" environment
 not using @jestEnvironment as AF tests setup expect window to exists
 */

// deleting window "manually"
// @ts-ignore
delete global.window;
// and importing mocks in the "non-hoistable" way in order to have window deleted prior
const { environment } = require('../src/mocks');

// we need to unblock any custom mocks, as the end client will not mocks, or not able to mock the same endpoints
jest.disableAutomock();

describe('running commerce mocks in node environment', () => {
  test('this test should just run', () => {
    expect(environment).not.toBe(undefined);
  });
});
