export type IntegrationInstallRequest = {
  appDetailsUrl: string;
  appName: string;
  comment: string;
  manageAppRequestUrl: string;
  userId: string;
};

export type IntegrationInstallRequestResponse = {
  key: string;
  requested?: boolean;
};

export type SendIntegrationsInstallRequests = {
  productName: string;
  baseUrl: string;
  cloudId: string;
  aaid: string | null;
  integrationList: string[];
};

export type UserSegmentationDataMapping = {
  [key: string]: string[];
};
