import AnalyticsWebClient, {
  envType,
  originType,
  platformType,
  tenantType,
  userType,
} from '@atlassiansox/analytics-web-client';

import {
  AnalyticsEventName,
  AnalyticsTrackData,
  AnalyticsUtils,
} from '../AnalyticsUtils';

export interface AnalyticsSettings {
  userId: string | undefined;
  hostId: string;
}

export class LiveAnalyticsUtils implements AnalyticsUtils {
  private readonly analyticsClient: any;
  private readonly moduleName: string;
  private readonly userId: string | undefined; // Atlassian Account ID, undefined if it is an anonymous user
  private readonly hostId: string; // Tenant Cloud ID

  constructor(analyticsSettings: AnalyticsSettings, moduleName: string) {
    this.userId = analyticsSettings.userId;
    this.hostId = analyticsSettings.hostId;
    this.moduleName = moduleName;

    this.analyticsClient = new AnalyticsWebClient({
      env: this.getAnalyticsEnv(),
      product: 'jira',
      subproduct: 'proforma-cloud-legacy',
      version: process.env._PACKAGE_VERSION_,
      origin: originType.WEB,
      platform: platformType.WEB,
    });
    this.analyticsClient.setTenantInfo(tenantType.CLOUD_ID, this.hostId);
    if (this.userId) {
      this.analyticsClient.setUserInfo(userType.ATLASSIAN_ACCOUNT, this.userId);
    }
  }

  private getAnalyticsEnv = () => {
    const hostname = window?.location?.hostname || '';

    if (hostname.includes('localhost')) {
      return envType.LOCAL;
    } else if (hostname.includes('jira-dev')) {
      return envType.STAGING;
    }

    return envType.PROD;
  };

  public track = (
    eventName: AnalyticsEventName,
    data: AnalyticsTrackData,
  ): void => {
    this.analyticsClient.sendTrackEvent({
      actionSubject: `legacy${eventName}`,
      action: 'completed',
      attributes: data,
      source: this.moduleName || 'unknown',
    });
  };
}
