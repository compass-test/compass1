import { useMemo } from 'react';

import type { ConsentStatus } from '../../common/types';

type AppsControllerState = {
  done: number;
  total: number;
  hasCompleted: boolean;
};

type AppsController = (
  apps: { status: ConsentStatus }[],
) => AppsControllerState;

// Resolving the total policies needed consents and how many have given
const useConsentAppsController: AppsController = (apps) => {
  return useMemo<AppsControllerState>(() => {
    let done = 0;
    let total = 0;

    apps.forEach((app) => {
      switch (app.status) {
        case 'ConsentGiven':
          done++;
          total++;
          break;
        case 'ConsentNotGiven':
        case 'ConsentOutdated':
        case 'ServerAppOutdated':
          total++;
          break;
      }
    });
    return { done, total, hasCompleted: done === total };
  }, [apps]);
};

export default useConsentAppsController;
