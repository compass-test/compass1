import React, { useEffect, useState } from 'react';

import { TenantInfoState } from '@atlassian/dragonfruit-tenant-context';

import {
  CompassRecentsClient,
  RecentComponentsState,
  RecentlyViewedComponent,
  RecentlyViewedTeam,
  RecentTeamsState,
} from '../compass-recents-client';

export interface CompassRecentsClientContext {
  compassRecentsClient: CompassRecentsClient | undefined;
}

export const CompassRecentsClientContext = React.createContext<
  Partial<CompassRecentsClientContext>
>({});

type Props = {
  tenantInfo: TenantInfoState;
  children: React.ReactNode;
};

export const CompassRecentsProvider: React.FC<Props> = ({
  tenantInfo,
  children,
}) => {
  const [compassRecentsClient, setCompassRecentsClient] = useState<
    CompassRecentsClient | undefined
  >(undefined);

  useEffect(() => {
    if (
      tenantInfo.loading ||
      tenantInfo.error ||
      !tenantInfo.data?.cloudId ||
      !tenantInfo.data?.workspaceId
    ) {
      return;
    }

    const compassRecentsClient = new CompassRecentsClient({
      ...tenantInfo.data,
    });
    compassRecentsClient.init();
    setCompassRecentsClient(compassRecentsClient);
  }, [tenantInfo]);

  return (
    <CompassRecentsClientContext.Provider
      value={{
        compassRecentsClient,
      }}
    >
      {children}
    </CompassRecentsClientContext.Provider>
  );
};

// withCompassRecentsClient is a composable function for use with class components.
export const withCompassRecentsClient = <
  T extends Partial<CompassRecentsClientContext>
>(
  Component: React.ComponentType<T>,
) => {
  type PropsExcludedClients = Omit<T, 'compassRecentsClient'>;

  return (props: PropsExcludedClients) => (
    <CompassRecentsClientContext.Consumer>
      {({ compassRecentsClient }) => {
        const { ...rest } = props;

        return (
          <Component
            {...(rest as any)}
            compassRecentsClient={compassRecentsClient}
          />
        );
      }}
    </CompassRecentsClientContext.Consumer>
  );
};

// useCompassRecentsClient is a hook for use in functional components.
export const useCompassRecentsClient = () => {
  const context = React.useContext(CompassRecentsClientContext);

  return context as CompassRecentsClientContext;
};

export interface CompassRecentsContext {
  recentlyViewedComponents?: RecentComponentsState;
  recentlyViewedTeams?: RecentTeamsState;
  addRecentComponent?: (component: RecentlyViewedComponent) => void;
  addRecentTeam?: (team: RecentlyViewedTeam) => void;
}

// useCompassRecents hides the client implementation for consumers who don't need the full client.
export const useCompassRecents = (): CompassRecentsContext => {
  const context = React.useContext(
    CompassRecentsClientContext,
  ) as CompassRecentsClientContext;

  if (!context.compassRecentsClient) {
    return {};
  }

  const {
    recentlyViewedComponents,
    recentlyViewedTeams,
    addRecentComponent,
    addRecentTeam,
  } = context.compassRecentsClient;

  return {
    recentlyViewedComponents,
    recentlyViewedTeams,
    addRecentComponent,
    addRecentTeam,
  };
};

export const MockCompassRecentsProvider: React.FC = ({ children }) => {
  const [compassRecentsClient, setCompassRecentsClient] = useState<
    CompassRecentsClient | undefined
  >(undefined);

  useEffect(() => {
    const compassRecentsClient = new CompassRecentsClient({
      cloudId: 'mock-cloud-id',
      workspaceId: 'mock-workspace-id',
    });
    compassRecentsClient.init();
    setCompassRecentsClient(compassRecentsClient);
  }, []);

  if (!compassRecentsClient) {
    return null;
  }

  return (
    <CompassRecentsClientContext.Provider
      value={{
        compassRecentsClient,
      }}
    >
      {children}
    </CompassRecentsClientContext.Provider>
  );
};
