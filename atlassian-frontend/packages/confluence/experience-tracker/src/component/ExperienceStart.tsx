import { useContext, useRef } from 'react';

import { Experience } from '../Experience';
import { ExperienceEvent } from '../ExperienceEvent';

import { ExperienceTrackerContext } from './ExperienceTrackerContext';

export type ExperienceStartProps = {
  id: string;
  name: string;
  attributes?: object;
  collect?: (events: ExperienceEvent[], experience: Experience) => void;
  onSuccess?: () => void;
};

export function ExperienceStart({
  id,
  name,
  attributes,
  collect,
  onSuccess,
}: ExperienceStartProps) {
  const experienceTracker = useContext(ExperienceTrackerContext);
  const wasCalledRef = useRef<boolean>(false);

  if (!wasCalledRef.current) {
    experienceTracker.start({
      attributes,
      name,
      id,
      collect,
      onSuccess,
    });
    wasCalledRef.current = true;
  }

  return null;
}
