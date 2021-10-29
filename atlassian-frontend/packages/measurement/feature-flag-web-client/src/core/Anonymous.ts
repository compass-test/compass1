import {
  FeatureFlagUser,
  FeatureFlagUserWithIdentifier,
  Identifiers,
} from '../index';
import Storage from '../storage';

import { uuidv4 } from './util';

export default class Anonymous {
  public static processAnonymousUser(
    featureFlagUser: FeatureFlagUser,
  ): FeatureFlagUserWithIdentifier {
    let { identifier } = featureFlagUser;
    if (identifier) {
      return {
        ...featureFlagUser,
        identifier,
      };
    }

    identifier = {
      type: Identifiers.FF_CLIENT_ANONYMOUS_ID,
      value: Anonymous.generateAnonymousId(),
    };

    return {
      ...featureFlagUser,
      isAnonymous: true,
      identifier,
    };
  }

  private static generateAnonymousId(): string {
    const storedAnonymousId = Storage.getAnonymousId();
    if (storedAnonymousId) {
      return storedAnonymousId;
    }

    const anonymousId = uuidv4();
    Storage.setAnonymousId(anonymousId);
    return anonymousId;
  }
}
