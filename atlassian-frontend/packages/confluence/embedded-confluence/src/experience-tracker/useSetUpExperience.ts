import { useRef, useEffect } from 'react';

import type { ExperienceTrackerAPI } from '@atlassian/experience-tracker/ExperienceTracker';
import { isStop } from '@atlassian/experience-tracker';

import type { PageCommonProps } from '../page-common';
import { ExperienceNames } from './ExperienceNames';

type SetUpExperience = {
  experienceTracker: ExperienceTrackerAPI;
  contentId: string;
  spaceKey: PageCommonProps['spaceKey'];
  experience: ExperienceNames;
  ccExperience: ExperienceNames;
};

export const useSetUpExperience = ({
  experienceTracker,
  contentId,
  spaceKey,
  experience,
  ccExperience,
}: SetUpExperience) => {
  const idRef = useRef<string>();
  const ccExperienceStartedRef = useRef(false);

  const id = `${spaceKey}-${contentId}`;

  /**
   * Start experience as close to the user action as possible.
   * Our approximation is component's first render.
   *
   * Addition to starting experience on first render, embedding products may do SPA transition e.g. view different contents without remounting component.
   * We need to re-start experience if `contentId` or `spaceKey` has changed.
   * In this case, experience will abort the current ongoing one and start a new experience (by checking experience id)
   */
  if (idRef.current !== id) {
    experienceTracker.start({
      name: experience,
      id,
      collect(events, experience) {
        if (
          events.find(
            (event) =>
              event.action === 'taskStart' &&
              event.name === ccExperience &&
              event.id === contentId,
          )
        ) {
          ccExperienceStartedRef.current = true;
        }

        /**
         * We have experience forwarding from confluence-frontend by `useEmbeddedConfluenceExperienceTracker`
         * With the forwarding experience set up, EP experience will be concluded following CC experience, either "succeed", "fail" or "abort"
         */
        experience.stopOn(
          events.find(
            (event) =>
              isStop(event) &&
              event.name === ccExperience &&
              event.id === contentId,
          ),
        );
      },
    });
    idRef.current = id;
  }

  useEffect(() => {
    return () => {
      /**
       * User can navigates away (EP component unmount) before CC experience started
       * In this case, we want to abort EP experience as the conclusion.
       */
      if (idRef.current && !ccExperienceStartedRef.current) {
        experienceTracker.abort({
          name: experience,
          reason: 'User navigated away before starting to load',
        });
      }
    };
  }, [experienceTracker, experience]);
};
