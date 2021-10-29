import generateChance from '../../../__test__/util/chance';
import User from '../user';

const chance = generateChance('integration/user');

describe('integration/user', () => {

  let user: User;

  beforeEach(() => {
    user = new User();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('should not have userId by default', () => {
    expect(user.getUserId()).toBeNull();
  });

  test('should return userId if set', () => {
    const userId = chance.string();
    user.setUserId(userId);
    expect(user.getUserId()).toEqual(userId);
  });

  test('should return new anonymous id if not set', () => {
    expect(user.getAnonymousId()).not.toBeUndefined();
  });

  test('should return same anonymous id each time', () => {
    const anonId = user.getAnonymousId();
    expect(user.getAnonymousId()).toEqual(anonId);
  });

  test('should return same anonymous id from each client', () => {
    const anonId = user.getAnonymousId();
    const newUser = new User();
    expect(newUser.getAnonymousId()).toEqual(anonId);
  });

  test('if anonymous id is set in one client, it should update in the other', () => {
    const anonId = chance.string();
    user.setAnonymousId(anonId);
    const newUser = new User();
    expect(newUser.getAnonymousId()).toEqual(anonId);
  });
});
