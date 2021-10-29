import AnalyticsWebClient from '@atlassiansox/analytics-web-client';

import { Plan, SupportedProduct } from '../../common/types';

export type PlansTableProps = {
  /**
   * The product plan which the user is currently on. 'free', 'standard', or 'premium'. */
  currentPlan?: Plan;

  /**
   * The product plan which we would like to highlight to the user. */
  highlightedPlan?: Plan;

  /**
   * Callback function that is called when a user clicks on a feature row */
  onFeatureRowClick?: (featureName: string, product: SupportedProduct) => void;

  /**
   * Callback function that is called when a user clicks on a plan change button */
  onPlanChangeButtonClick?: (edition: Plan, product: SupportedProduct) => void;

  /**
   * Which product is being shown. Controls which feature list gets used. */
  product?: SupportedProduct;

  /**
   * A `testId` prop is provided for specified elements, which is a unique
   * string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests */
  testId?: string;

  /**
   * Which product is using this Plan Table Package
   */
  analyticsOriginProduct: string;

  /**
   * Adding Analytics Platform Client
   */
  analyticsPlatformClient: typeof AnalyticsWebClient;
};
