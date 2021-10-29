import createReleaseBranch from '../../../createRelease';

import { logger } from '../../index';
import { StepCreateRelease } from './types';

export const createRelease: StepCreateRelease = async (
  { currRelease, nextRelease },
  scriptOpts,
) => {
  logger.start('😱 Creating release branch');
  const response = await createReleaseBranch(
    currRelease,
    nextRelease,
    scriptOpts,
  );
  logger.finish('✅ Release branch created');
  return response;
};
