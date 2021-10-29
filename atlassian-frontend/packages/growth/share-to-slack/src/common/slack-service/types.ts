export type ConfluenceSlackServiceAnalytics = {
  onFetchConnectMetadataSucceeded: () => void;
  onFetchConnectMetadataFailed: (params: {
    status: number;
    errorMessage?: string;
  }) => void;
  onRefreshIntegrationCsrfTokenSucceeded: () => void;
  onRefreshIntegrationCsrfTokenFailed: () => void;
};
