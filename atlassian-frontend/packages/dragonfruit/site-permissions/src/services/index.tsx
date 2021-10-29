import { gql, useApolloClient, useQuery } from '@apollo/client';
import { ApolloCache } from '@apollo/client/cache/core/cache';
import { onError } from '@apollo/client/link/error';

export type SitePermissionDeniedDialogShown = {
  // This value will initially be false until we make a request where we get a graphql PERMISSION_DENIED error
  sitePermissionDeniedDialogShown: boolean;
};

export const SITE_PERMISSION_DENIED_DIALOG_SHOWN_QUERY = gql`
  {
    sitePermissionDeniedDialogShown @client
  }
`;

export const setSitePermissionDeniedDialogShown = (
  show: boolean,
  cache: ApolloCache<any>,
) => {
  const data: SitePermissionDeniedDialogShown = {
    sitePermissionDeniedDialogShown: show,
  };
  cache.writeQuery({
    query: SITE_PERMISSION_DENIED_DIALOG_SHOWN_QUERY,
    data,
  });
};

export const setDefaultDataForSitePermissionDeniedDialogShown = (
  cache: ApolloCache<any>,
) => {
  setSitePermissionDeniedDialogShown(false, cache);
};

export const permissionDeniedErrorLink = onError(
  ({ graphQLErrors, operation }) => {
    const { cache } = operation.getContext();

    graphQLErrors?.forEach((error) => {
      if (error.extensions?.errorType === 'PERMISSION_DENIED') {
        setSitePermissionDeniedDialogShown(true, cache);
      }
    });
  },
);

export const useSitePermissionDeniedDialog = () => {
  const { cache } = useApolloClient();
  const { data } = useQuery<SitePermissionDeniedDialogShown>(
    SITE_PERMISSION_DENIED_DIALOG_SHOWN_QUERY,
  );

  const shown = data?.sitePermissionDeniedDialogShown ?? false;
  const setShown = (show: boolean) =>
    setSitePermissionDeniedDialogShown(show, cache);

  return [shown, setShown] as const;
};
