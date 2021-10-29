import React, { ReactElement, useContext } from 'react';

export type AppStateError =
  /** Compass is not provisioned on this site */
  | 'COMPASS_NOT_PROVISIONED'

  /** The user does not have the base permissions (write) required to access Compass. */
  | 'NO_USER_PERMISSIONS'

  /** Failed to retrieve Tenant Info */
  | 'TENANT_RETRIEVAL_ERROR'

  /** The user is not authenticated. Redirect the user to login. */
  | 'USER_NOT_AUTHENTICATED';

export type AppState = {
  /**
   * When a page first loads, loading will be true. We will then start retrieving must-have data for the page (e.g.
   * tenant-info and account-info). Once the data is loaded successfully, or there are errors, loading will become false.
   */
  loading: boolean;

  /**
   * If success is true, it means that all the must-have data required to render a page is ready (e.g. tenant-info and account-info)
   * and the user has been verified as having access to Compass.
   *
   * success will be undefined initially, while loading and if an error occurs.
   */
  success?: boolean;

  /** This will hold any errors that occured during loading that prevented the AppState from becoming successful. Error will be undefined
   * at all times in a case where AppState loads successfully.
   *
   * error will be undefined initally, while loading and if the AppState returns successfully.
   */
  error?: AppStateError;
};

const AppStateContext = React.createContext<AppState | undefined>(undefined);

export const AppStateProvider = ({
  value,
  children,
}: {
  value: AppState;
  children: ReactElement;
}) => (
  <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
);

export const useAppState = () => {
  const appState = useContext(AppStateContext);

  if (appState === undefined) {
    throw new Error('useAppState must be used within a AppStateProvider');
  }

  return appState;
};
