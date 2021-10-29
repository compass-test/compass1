import { AnalyticsClient as BaseClient } from '@atlassiansox/analytics-node-client';
import { RepoEvent, GenericAttributes } from '../types';

export class AnalyticsClient extends BaseClient {
  private dry: boolean;

  constructor({ dev, dry }: { dev?: boolean; dry?: boolean }) {
    super({
      env: dev ? 'dev' : 'prod',
      product: 'atlaskit',
    } as any);
    this.dry = !!dry;
  }

  sendEvent(attributes: GenericAttributes) {
    console.log(attributes);
    if (this.dry) {
      return Promise.resolve();
    }
    return this.sendOperationalEvent({
      anonymousId: 'unknown',
      operationalEvent: {
        action: 'updated',
        actionSubject: 'af-repo',
        attributes,
        tags: ['atlaskit'],
        source: 'atlassian-frontend',
        origin: 'console',
        platform: 'bot',
      } as RepoEvent,
    });
  }
}
