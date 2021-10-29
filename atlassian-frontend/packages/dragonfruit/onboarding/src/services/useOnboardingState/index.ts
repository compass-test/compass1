import { useMemo } from 'react';

import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import {
  readJsonFromLocalStorage,
  writeToLocalStorage,
} from '@atlassian/dragonfruit-utils';

import { OnboardingState } from './types';

const CACHE_KEY = (
  messageId: string,
  cloudId: string,
  workspaceId: string,
  accountId: string,
) => `${messageId}:${cloudId}:${workspaceId}:${accountId}`;

export function useOnboardingState(messageId: string): OnboardingState {
  const tenantInfo = useTenantInfo();

  const onboardingState = useMemo(
    () => ({
      markViewed: (): void => {
        writeToLocalStorage(
          CACHE_KEY(
            messageId,
            tenantInfo.cloudId,
            tenantInfo.workspaceId,
            tenantInfo.accountId,
          ),
          true,
        );
      },
      wasViewed: (): boolean =>
        readJsonFromLocalStorage(
          CACHE_KEY(
            messageId,
            tenantInfo.cloudId,
            tenantInfo.workspaceId,
            tenantInfo.accountId,
          ),
          false,
        ),
    }),
    [
      messageId,
      tenantInfo.cloudId,
      tenantInfo.workspaceId,
      tenantInfo.accountId,
    ],
  );

  return onboardingState;
}
