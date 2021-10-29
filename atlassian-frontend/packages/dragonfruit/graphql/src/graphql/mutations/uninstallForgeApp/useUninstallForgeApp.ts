// useUninstallForgeApp.ts

import {
  AppUninstallationInput,
  refetchGetInstalledAppsQuery,
  useUninstallForgeAppMutation,
} from '../../../__generated__/graphql';

type Input = Pick<
  AppUninstallationInput,
  'appId' | 'environmentKey' | 'installationContext'
>;

export function useUninstallForgeApp() {
  const [mutate] = useUninstallForgeAppMutation();

  function handleMutate(input: Input, options?: Parameters<typeof mutate>[0]) {
    const refetchQueries = input.installationContext
      ? [refetchGetInstalledAppsQuery({ contextId: input.installationContext })]
      : [];

    return mutate({
      variables: { input },
      ...options,
      refetchQueries: refetchQueries,
    });
  }

  return [handleMutate];
}
