import AnalyticsWebClient, {
  envType,
  originType,
} from '@atlassiansox/analytics-web-client';

const ANALYTICS_PRODUCT = 'embeddedConfluence';

// Define default analytic-web-client environment config for now
const getAnalyticsEnv = (hostname: string) => {
  if (hostname.includes('localhost')) {
    return envType.LOCAL;
  }
  if (hostname.includes('jira-dev')) {
    return envType.DEV;
  }

  return envType.PROD;
};

let analyticsClient: typeof AnalyticsWebClient;

export const getAnalyticsWebClient = ({ hostname }: { hostname?: string }) => {
  if (!analyticsClient) {
    analyticsClient = new AnalyticsWebClient({
      product: ANALYTICS_PRODUCT,
      env: getAnalyticsEnv(hostname || window.location.hostname),
      origin: originType.WEB,
    });
  }

  return analyticsClient;
};
