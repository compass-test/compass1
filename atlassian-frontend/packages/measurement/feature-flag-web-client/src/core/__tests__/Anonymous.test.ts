import { Identifiers } from '../../index';
import { anonymousUser } from '../../testUtil/mockData';
import Anonymous from '../Anonymous';

describe('Core - Anonymous', () => {
  const UUID_V4_REGEX = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

  test('should generate anonymous identifier if no identifier provided', () => {
    const user = Anonymous.processAnonymousUser(anonymousUser);

    expect(user.identifier.type).toBe(Identifiers.FF_CLIENT_ANONYMOUS_ID);
    expect(user.identifier.value).toMatch(UUID_V4_REGEX);

    expect(user.isAnonymous).toBe(anonymousUser.isAnonymous);
    expect(user.additionalIdentifiers).toBe(
      anonymousUser.additionalIdentifiers,
    );
    expect(user.custom).toBe(anonymousUser.custom);
  });

  test('should generate anonymous identifier if no user provided', () => {
    const user = Anonymous.processAnonymousUser({});

    expect(user.identifier.type).toBe(Identifiers.FF_CLIENT_ANONYMOUS_ID);
    expect(user.identifier.value).toMatch(UUID_V4_REGEX);

    expect(user.isAnonymous).toBe(true);
    expect(user.additionalIdentifiers).toBeUndefined();
    expect(user.custom).toBeUndefined();
  });

  test('should reuse stored anonymous identifier if available', () => {
    const user1 = Anonymous.processAnonymousUser(anonymousUser);
    const user2 = Anonymous.processAnonymousUser(anonymousUser);
    expect(user1.identifier).toEqual(user2.identifier);
  });
});
