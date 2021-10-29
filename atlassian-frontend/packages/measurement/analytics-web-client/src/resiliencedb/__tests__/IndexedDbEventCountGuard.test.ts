import generateChance from '../../../__test__/util/chance';
import MockLogger from '../../../__test__/util/mockLogger';
import IndexedDbEventCountGuard from '../IndexedDbEventCountGuard';
const chance = generateChance('IndexedDbEventCountGuard');

const mockDeleteItemsHandler = jest.fn();

describe('IndexedDbEventCountGuard', () => {
  test('Should throw when event limit is provided below 1', () => {
    expect(() => new IndexedDbEventCountGuard(
        chance.integer({min: -100, max: -1}),
        chance.string(),
        MockLogger,
        mockDeleteItemsHandler
      )).toThrow();
  });
});
