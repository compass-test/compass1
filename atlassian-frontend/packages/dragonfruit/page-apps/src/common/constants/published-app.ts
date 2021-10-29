import {
  Environment,
  getEnvironmentFromOrigin,
} from '@atlassian/dragonfruit-tenant-context';

import { PublishedAppMetadata } from './types';

const runtimeEnvironment = getEnvironmentFromOrigin();
const APP_ARI_BASE = 'ari:cloud:ecosystem::app';

function getAppAriFromAppId(appId: string) {
  return [APP_ARI_BASE, appId].join('/');
}

export class PublishedApp {
  metadata: PublishedAppMetadata;

  constructor(metadata: PublishedAppMetadata) {
    this.metadata = metadata;
  }

  get runningInProd() {
    return runtimeEnvironment === Environment.PROD;
  }

  get id() {
    return this.runningInProd
      ? this.metadata.production.appId
      : this.metadata.staging.appId;
  }

  get ari() {
    return getAppAriFromAppId(
      this.runningInProd
        ? this.metadata.production.appId
        : this.metadata.staging.appId,
    );
  }

  get key() {
    return this.metadata.key;
  }

  get name() {
    return this.metadata.name;
  }

  get description() {
    return this.metadata.description;
  }

  get imageUrl() {
    return this.metadata.imageUrl;
  }

  get vendor() {
    return this.metadata.vendor;
  }

  get documentationUrl() {
    return this.metadata.documentationUrl;
  }

  get learnMoreDescription() {
    return this.metadata.learnMoreDescription;
  }

  get intlDescriptionKey() {
    return `${this.key}Description`;
  }
}
