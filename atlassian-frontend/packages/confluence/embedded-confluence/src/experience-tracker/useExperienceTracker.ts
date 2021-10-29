import { useContext, useRef, useEffect } from 'react';

import {
  ExperienceTrackerContext,
  ExperienceTracker,
} from '@atlassian/experience-tracker';
import type { ExperienceTrackerAPI } from '@atlassian/experience-tracker/ExperienceTracker';

import { useAnalytics } from '../analytics';
import { setExperiencesForwarding } from './setExperiencesForwarding';

/*
This hook is to set up experiences forwarding from embedded Confluence to embedding
product. First, the hook instantiates an ExperienceTracker instance for embedded
Confluence. There should only be 1 instance of ExperienceTracker existing at a time.
Second, the hook sets up experience forwarding from embedded Confluence to embedding
product. If the embedding product's experience tracker changes, the hook cancels the
old subscription and setup the new subscription. This hook returns the instance of
the embedded Confluence experience tracker.
*/
export function useExperienceTracker() {
  const embeddedConfluenceETRef = useRef<ExperienceTrackerAPI>();

  if (!embeddedConfluenceETRef.current) {
    embeddedConfluenceETRef.current = new ExperienceTracker();
  }

  useAnalytics(embeddedConfluenceETRef.current);
  useExperiencesForwarding(embeddedConfluenceETRef.current);

  return embeddedConfluenceETRef.current;
}

const useExperiencesForwarding = (experienceTracker: ExperienceTrackerAPI) => {
  const unsubscribeRef = useRef<ReturnType<typeof setExperiencesForwarding>>();

  // Make sure the Embeddable Pages ExperienceTrackerAPI instance forwards experence events to the embedding product.
  const embeddingProductETRef = useRef<
    Parameters<typeof setExperiencesForwarding>[1]
  >();
  const embeddingProductET = useContext(ExperienceTrackerContext);

  if (embeddingProductETRef.current !== embeddingProductET) {
    // Cancel the old forwarding on embedding product ExperienceTrackerAPI instance change.
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }

    embeddingProductETRef.current = embeddingProductET;

    // Set the new forwarding up.
    unsubscribeRef.current = setExperiencesForwarding(
      experienceTracker,
      embeddingProductETRef.current,
    );
  }

  // Cancel the forwarding on unmount.
  useEffect(() => unsubscribeRef.current, []);
};
