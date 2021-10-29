import { useCallback } from 'react';
import { OpsgenieURLGenerators } from './types';

const getOpsgenieAggregatorRedirectUrl = ({
  cloudId,
  hostUrl = '',
}: OpsgenieUrlGeneratorProps) => {
  return `${hostUrl}/gateway/api/xpsearch-aggregator/redirect/advanced/opsgenie/${cloudId}`;
};

export interface OpsgenieUrlGeneratorProps {
  cloudId: string;
  hostUrl?: string;
}

/**
 * Generates URL functions for the Opsgenie tab, with appropriate absolute URLs.
 *
 * @returns functions for generating Opsgenie URLs
 */
export const useOpsgenieURLGenerators = (
  arg: OpsgenieUrlGeneratorProps,
): OpsgenieURLGenerators => {
  const opsgenieAggregatorRedirector = useCallback(
    (query: string) =>
      `${getOpsgenieAggregatorRedirectUrl(arg)}?query=${query}`,
    [arg],
  );

  return {
    viewAllLinkGenerator: opsgenieAggregatorRedirector,
    urlGeneratorForNoResultsScreen: opsgenieAggregatorRedirector,
  };
};
