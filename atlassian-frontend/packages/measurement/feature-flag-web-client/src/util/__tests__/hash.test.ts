import generateChance from '../../testUtil/chance';
import hashUser from '../hash';

describe('Util', () => {
  const chance = generateChance('Util');

  test('hash user returns valid md5', () => {
    for (let i = 0; i < 10; i++) {
      const user = chance.user();
      const patt = new RegExp(/^[a-f0-9]{32}$/i);
      expect(patt.test(hashUser(user))).toEqual(true);
    }
  });

  test('hash user returns consistent hash', () => {
    const user = chance.user();
    user.custom = {
      attr1: 'one',
      attr2: 2,
      attr3: ['three'],
    };
    const hash1 = hashUser(user);
    user.custom = {
      attr3: ['three'],
      attr2: 2,
      attr1: 'one',
    };
    const hash2 = hashUser(user);
    expect(hash1).toEqual(hash2);
  });
});
