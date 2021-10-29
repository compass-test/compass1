import { useQuery, getApolloContext } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { useContext } from 'react';
import {
  SelectedSpacesQuery,
  SelectedSpacesQueryVariables,
} from './graphql/__generated__/SelectedSpacesQuery';
import { Space } from './graphql/__generated__/Space';
import {
  SpaceSelectorQuery,
  SpaceSelectorQueryVariables,
} from './graphql/__generated__/SpaceSelectorQuery';
import { SPACE_PICKER_QUERY, SELECTED_SPACE_QUERY } from './graphql/queries';
import { SpacePickerOption } from './types';

const QUERY_LIMIT = 25;

const getSpacesSearchCql = (keyword?: string) => {
  let cql = "type = 'space'";
  if (keyword) {
    // prevent from injection
    cql += ` AND title ~ '${keyword.replace(/\'/g, '%27')}*'`;
  }
  return cql;
};

const getItems = (
  searchQuery: string | undefined,
  {
    favoriteSpaces,
    searchedSpaces,
    recentSpaces,
  }: {
    favoriteSpaces: SpacePickerOption[];
    searchedSpaces: SpacePickerOption[];
    recentSpaces: SpacePickerOption[];
  },
): Array<{
  label: string;
  dataTestID: string;
  options: SpacePickerOption[];
}> => [
  {
    label: 'Starred Spaces',
    options: searchQuery ? [] : favoriteSpaces,
    dataTestID: 'starred-spaces',
  },
  {
    label: 'Recent Spaces',
    options: searchQuery ? [] : recentSpaces,
    dataTestID: 'recent-spaces',
  },
  {
    label: 'All Spaces',
    options: !searchQuery ? [] : searchedSpaces,
    dataTestID: 'search-spaces',
  },
];

const processSpace = (
  space: Space,
  siteUrl: string,
): SpacePickerOption | undefined => {
  const { id, name, icon, containsExternalCollaborators } = space;
  const iconUrl = `${siteUrl}/wiki/${icon!.path}`;
  if (id && name) {
    return {
      id,
      name,
      iconUrl,
      containsExternalCollaborators,
    };
  }
  return undefined;
};

const processSpaces = (spaces: Space[] = [], siteUrl: string) =>
  spaces.reduce<Array<SpacePickerOption>>((spacesList, space) => {
    const spaceOption = processSpace(space, siteUrl);
    if (spaceOption) {
      spacesList.push(spaceOption);
    }
    return spacesList;
  }, []);

const normalizeValue = (value?: string | string[]): string[] => {
  if (Array.isArray(value)) {
    return value;
  } else if (value) {
    return [value];
  }
  return [];
};

const useProvidedClient = (client?: ApolloClient<unknown>) => {
  const apolloContext = useContext(getApolloContext());
  const apolloClient = client || apolloContext.client;
  if (!apolloClient) {
    throw new Error(
      'No apollo client provided. Please pass it as a prop, or create an apollo provider',
    );
  }
  return apolloClient;
};

const useSpacePicker = (
  siteUrl: string,
  value?: string | string[],
  client?: ApolloClient<unknown>,
) => {
  const apolloClient = useProvidedClient(client);
  const { data, loading } = useQuery<
    SelectedSpacesQuery,
    SelectedSpacesQueryVariables
  >(SELECTED_SPACE_QUERY, {
    variables: { spaceIds: normalizeValue(value) },
    client: apolloClient,
    context: { isConfluenceGQLRequest: true },
    skip: !value || !value.length,
  });

  const selectedSpaces =
    data?.selectedSpaces?.nodes &&
    processSpaces(
      data.selectedSpaces.nodes.filter(Boolean) as Space[],
      siteUrl,
    );

  const querySpaces = (query: string) =>
    apolloClient
      .query<SpaceSelectorQuery, SpaceSelectorQueryVariables>({
        query: SPACE_PICKER_QUERY,
        variables: {
          cql: getSpacesSearchCql(query),
          limit: QUERY_LIMIT,
        },
        context: { isConfluenceGQLRequest: true },
      })
      .then(({ data }) => processData(data, query, siteUrl));

  return { loading, selectedSpaces, querySpaces };
};

const processData = (
  queryData: SpaceSelectorQuery,
  searchFilter: string,
  siteUrl: string,
): any => {
  const favoriteSpaces = queryData?.favoriteSpaces?.nodes
    ?.filter(Boolean)
    .map((space) => space!);
  const recentlyVisitedSpaces = queryData?.recentlyVisitedSpaces
    ?.filter(Boolean)
    .map((space) => space!);
  const searchedSpaces = queryData?.searchedSpaces?.nodes
    ?.filter((node) => node?.space)
    .map((node) => node!.space!);

  return getItems(searchFilter, {
    favoriteSpaces: processSpaces(favoriteSpaces, siteUrl),
    searchedSpaces: processSpaces(searchedSpaces, siteUrl),
    recentSpaces: processSpaces(recentlyVisitedSpaces, siteUrl),
  });
};

export default useSpacePicker;
