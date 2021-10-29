interface AppEnvironmentMetadata {
  appId: string;
}

export interface PublishedAppMetadata {
  key: string;
  name: string;
  production: AppEnvironmentMetadata;
  staging: AppEnvironmentMetadata;
  description: string;
  imageUrl: string;
  vendor: string;
  documentationUrl?: string;
  learnMoreDescription?: string;
}
