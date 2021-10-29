import { graphql, loadQuery, usePreloadedQuery } from 'react-relay';

import { RelayEnvironment } from '@atlassian/performance-portal-gql-client';

import type { useFeatureFlagQuery } from './__generated__/useFeatureFlagQuery.graphql';

const GetFeatureFlagQuery = graphql`
  query useFeatureFlagQuery {
    featureFlags {
      name
      value
    }
  }
`;

const featureFlagQueryRef = loadQuery<useFeatureFlagQuery>(
  RelayEnvironment,
  GetFeatureFlagQuery,
  {},
);

export function useFeatureFlag<T>(featureFlagName: string, defaultValue: T): T {
  const data = usePreloadedQuery<useFeatureFlagQuery>(
    GetFeatureFlagQuery,
    featureFlagQueryRef,
  );

  return (data.featureFlags?.find((ff) => ff?.name === featureFlagName)
    ?.value ?? defaultValue) as T;
}
