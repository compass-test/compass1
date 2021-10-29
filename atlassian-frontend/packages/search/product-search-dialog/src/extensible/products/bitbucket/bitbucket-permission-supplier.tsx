import { useMemo } from 'react';
import {
  useTypedAggregatorClient,
  PLACEHOLDER_EXPERIENCE,
} from '../../aggregator-client-context';
import { PermissionSupplier } from '../../product-router';
import {
  AggregatorBitbucketResponse,
  BitbucketScope,
  BITBUCKET_PRODUCT_ID,
} from './types';

export const useBitbucketPermissionSupplier = (
  enableSingleScopesCall: boolean,
  overridenPermissionsSupplier?: PermissionSupplier,
) => {
  const client = useTypedAggregatorClient<
    AggregatorBitbucketResponse,
    BitbucketScope
  >();

  return useMemo(() => {
    if (overridenPermissionsSupplier) {
      return overridenPermissionsSupplier;
    }

    if (enableSingleScopesCall) {
      return () =>
        client.getProductScopes(BITBUCKET_PRODUCT_ID, PLACEHOLDER_EXPERIENCE);
    }

    return undefined;
  }, [enableSingleScopesCall, client, overridenPermissionsSupplier]);
};
