import { useLayoutEffect } from 'react';

import { UFOExperience } from '@atlassian/ufo-experimental';

type Props = { experience: UFOExperience };

/**
 * A React component that succeeds the desired experience when mounted. Uses useLayoutEffect to ensure accuracy of success measurement
 * Use this instead of a straight call to `experience.success()` if your success point is during a render.
 * @param experience
 * @constructor
 */
export const ExperienceSuccess = ({ experience }: Props) => {
  useLayoutEffect(() => {
    experience.success();
  }, [experience]);
  return null;
};
