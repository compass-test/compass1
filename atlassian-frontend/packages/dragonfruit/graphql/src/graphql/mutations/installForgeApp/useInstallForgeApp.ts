// useInstallForgeApp.ts

import {
  AppInstallationInput,
  refetchGetInstalledAppsQuery,
  useInstallForgeAppMutation,
} from '../../../__generated__/graphql';

type Input = Pick<
  AppInstallationInput,
  'appId' | 'environmentKey' | 'installationContext'
>;

export function useInstallForgeApp() {
  const [mutate] = useInstallForgeAppMutation();

  function handleMutate(input: Input, options?: Parameters<typeof mutate>[0]) {
    return mutate({
      variables: { input },
      ...options,

      // TODO: (COMPASS-2516) use optimistic UI instead
      refetchQueries: [
        refetchGetInstalledAppsQuery({ contextId: input.installationContext }),
      ],
    });
  }

  return [handleMutate];
}
