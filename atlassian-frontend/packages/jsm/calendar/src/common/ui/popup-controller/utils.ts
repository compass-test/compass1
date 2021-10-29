import { useMemo } from 'react';

import type { PopupSpecInternal } from './types';

export const calculateForceRemountCounter = (
  existingPopupSpec:
    | Pick<
        PopupSpecInternal<unknown, unknown>,
        | 'id'
        | 'anchorTop'
        | 'anchorLeft'
        | 'anchorWidth'
        | 'forceRemountCounter'
      >
    | undefined,
  newAnchorTop: number,
  newAnchorLeft: number,
  newAnchorWidth: number,
) => {
  // First time rendering the popup
  if (existingPopupSpec === undefined) {
    return 0;
  }
  // If the anchor hasn't changed then don't force a remount
  if (
    existingPopupSpec.anchorTop === newAnchorTop &&
    existingPopupSpec.anchorLeft === newAnchorLeft &&
    existingPopupSpec.anchorWidth === newAnchorWidth
  ) {
    return existingPopupSpec.forceRemountCounter;
  }
  // The anchor has changed position or width, so we need to force a remount so that the popup
  // will be in the correct location
  return existingPopupSpec.forceRemountCounter + 1;
};

// Returns a set containing the string property keys of the passed object
export const useKeys = (object: { [id: string]: any }): Set<string> =>
  useMemo(() => new Set(Object.keys(object)), [object]);
