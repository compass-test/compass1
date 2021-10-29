import { AnalyticsClient as BaseClient } from '@atlassiansox/analytics-node-client';

import type { Status } from './announce';

type DeploymentStatusChangedEvent = {
  action: 'productFabricBranchDeploymentStatusChanged';
  actionSubject: 'af-release-dashboard';
  attributes: {
    status: Status;
  };
  tags: string[];
  source: string;
  origin: string;
  platform: string;
};

export function getAnalyticsPayload(
  status: Status,
): DeploymentStatusChangedEvent {
  return {
    action: 'productFabricBranchDeploymentStatusChanged',
    actionSubject: 'af-release-dashboard',
    attributes: {
      status,
    },
    tags: ['atlaskit'],
    source: 'atlassian-frontend',
    origin: 'console',
    platform: 'bot',
  };
}

export default class AnalyticsClient extends BaseClient {
  private dry: boolean;

  constructor({ dev, dry }: { dev?: boolean; dry?: boolean }) {
    super({
      env: dev ? 'dev' : 'prod',
      product: 'atlaskit',
    } as any);
    this.dry = !!dry || process.env.NODE_ENV === 'test';
  }

  sendEvent(event: DeploymentStatusChangedEvent) {
    const { status } = event.attributes;
    console.log(
      `Dispatch analytics${this.dry ? ' (dry run)' : ''}: status = ${status}`,
    );
    if (this.dry) {
      console.log(`\n${JSON.stringify(event)}\n`);
      return Promise.resolve();
    }
    return this.sendOperationalEvent({
      anonymousId: 'unknown',
      operationalEvent: event,
    });
  }
}
