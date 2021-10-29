import getPullRequests, {
  Auth,
  Options as GetPrOptions,
} from '../../../getPrsInRelease';
import { logger } from '../../index';

import { StepGetAllPullRequests } from './types';

export const getAllPullRequests: StepGetAllPullRequests = async (
  { currRelease, bitbucket },
  { force, develop, dev },
) => {
  logger.start('🏃 Getting all Pull Requests in release');
  const getPrOpts: GetPrOptions = {
    forceFetch: force,
    useDevelop: develop,
    logger: console.log,
    dev,
  };
  const pullRequestInfo = await getPullRequests(
    currRelease,
    bitbucket as Auth,
    getPrOpts,
  );
  logger.finish('✅ Fetched all pull requests!');
  return pullRequestInfo;
};
