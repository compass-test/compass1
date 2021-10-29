import AnalyticsWebClient from '@atlassiansox/analytics-web-client';

import { Editions, ProductKeys } from './common/constants';

/**
 * Basic site definition
 */
export interface SiteDefinition {
  // Cloud ID (aka Site ID) for the site in question
  cloudId: string;

  // Base Site URL (e.g. http://foo.atlassian.net)
  siteUrl: string;
}

/**
 * Analytics client and channel, to be provided by the caller.
 */
export interface AnalyticsProps {
  analyticsOriginProduct: string;
  analyticsPlatformClient: typeof AnalyticsWebClient;
}

/**
 * ProductSubscriptionChangeInfo defines how the product info has changed as a
 * result of the Edition Change modal doing its thing.
 */
export interface ProductSubscriptionChangeInfo {
  // Product Key
  product: ProductKeys;

  // Edition
  edition: Editions;

  // Whether an upgrade is required for this product
  upgradeRequired: boolean;

  // What the target edition should be on upgrade
  upgradeEdition: Editions;

  // Whether the upgrade was actually done
  upgradeCompleted: boolean;
}

/**
 * Modernized Plan Selection component properties, exposed to external callers.
 */
export interface ModernizedPlanSelectionProps {
  // Feature Modal Name
  featureModal: string;

  // Product Key
  product: ProductKeys;

  // Edition
  edition?: Editions;

  // Function to handle post modal close
  onCloseHandler?: () => void;
}
export interface EditionChangeLifecycleProps extends SiteDefinition {
  subscriptions: ProductSubscriptionChangeInfo[];
}
