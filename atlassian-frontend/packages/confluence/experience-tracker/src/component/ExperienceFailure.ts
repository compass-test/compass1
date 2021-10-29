import { useContext, useEffect } from 'react';

import { ExperienceContext } from './ExperienceContext';
import { ExperienceTrackerContext } from './ExperienceTrackerContext';

export type ExperienceFailureProps = {
  name?: string;
  error: Error;
  attributes?: object;
};

export function ExperienceFailure({
  name,
  error,
  attributes,
}: ExperienceFailureProps) {
  const derivedName = useContext(ExperienceContext);
  const experienceTracker = useContext(ExperienceTrackerContext);
  const nameOfFailedExperience = name || derivedName;

  useEffect(
    () =>
      experienceTracker.fail({
        name: nameOfFailedExperience,
        error,
        attributes,
      }),
    [nameOfFailedExperience, error, experienceTracker, attributes],
  );

  return null;
}
