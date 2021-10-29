import { useContext, useEffect } from 'react';

import { ExperienceTrackerContext } from './ExperienceTrackerContext';

export type ExperienceSuccessProps = {
  name: string;
  attributes?: object;
};

export function ExperienceSuccess({
  name,
  attributes,
}: ExperienceSuccessProps) {
  const experienceTracker = useContext(ExperienceTrackerContext);
  useEffect(() => experienceTracker.succeed({ name, attributes }), [
    name,
    attributes,
    experienceTracker,
  ]);

  return null;
}
