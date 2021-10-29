import { GetSlackConsentUrlResult } from '../types';

import AbstractSlackService, {
  SlackServiceAnalytics,
} from './AbstractSlackService';
import getConfluenceSlackConsentUrl from './getConfluenceSlackConsentUrl';
import { ConfluenceSlackServiceAnalytics } from './types';

export default class ConfluenceSlackService extends AbstractSlackService {
  constructor(
    analytics: SlackServiceAnalytics,
    private readonly confluenceAnalytics: ConfluenceSlackServiceAnalytics,
  ) {
    super('confluence', analytics);
  }

  getConsentUrl(
    location: Pick<Location, 'hostname' | 'pathname'>,
    signal?: AbortSignal,
  ): Promise<GetSlackConsentUrlResult> {
    return getConfluenceSlackConsentUrl(
      location,
      this.confluenceAnalytics,
      signal,
    );
  }
}
