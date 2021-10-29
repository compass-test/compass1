import { GetSlackConsentUrlResult } from '../types';

import AbstractSlackService, {
  SlackServiceAnalytics,
} from './AbstractSlackService';
import getJiraSlackConsentUrl from './getJiraSlackConsentUrl';

export default class JiraSlackService extends AbstractSlackService {
  constructor(analytics: SlackServiceAnalytics) {
    super('jira', analytics);
  }

  getConsentUrl(
    location: Pick<Location, 'hostname' | 'pathname'>,
  ): Promise<GetSlackConsentUrlResult> {
    return Promise.resolve({
      ok: true,
      result: getJiraSlackConsentUrl(location),
    });
  }
}
