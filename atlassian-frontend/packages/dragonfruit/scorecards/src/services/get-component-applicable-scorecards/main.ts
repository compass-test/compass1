import { ApolloError } from '@apollo/client';

import {
  GetComponentApplicableScorecardsDocument,
  GetComponentApplicableScorecardsQuery,
  GetComponentApplicableScorecardsQueryVariables,
  QueryError,
  useImperativeQuery,
} from '@atlassian/dragonfruit-graphql';

import { ScorecardOption } from '../../common/ui/types';

import { ScorecardFragment } from './types';

const useApplicableScorecardsQuery = () => {
  return useImperativeQuery<
    GetComponentApplicableScorecardsQuery,
    GetComponentApplicableScorecardsQueryVariables
  >(GetComponentApplicableScorecardsDocument, {
    // Since we currently only filter our data client-side, for now it is sufficient
    // to query against the cache after the query is initially executed. We already refetch
    // the query after applying or removing a scorecard. We will likely want to change this
    // policy to 'network-only' when we ultimately implement server-side filtering.
    fetchPolicy: 'cache-first',
  });
};

const generateOptions = (
  scorecardData: GetComponentApplicableScorecardsQuery | undefined,
  error: ApolloError | undefined,
) => {
  // Check that returned data does not have any errors.
  // This is here to resolve TypeScript linting issues.

  const result = scorecardData?.compass?.component;

  if (!result || result?.__typename === 'QueryError' || error) {
    const queryError = result as QueryError;
    const errorMessage = queryError?.message || error?.message || '';
    throw new Error(
      `Error when calling GetComponentApplicableScorecardsQuery: ${errorMessage}`,
    );
  }

  if (result?.__typename !== 'CompassComponent') {
    return [];
  }

  const applicableScorecards = result?.applicableScorecards;

  return applicableScorecards?.map((scorecard: ScorecardFragment) => {
    return {
      label: scorecard?.name,
      value: scorecard?.id,
      description: scorecard?.description,
      componentType: scorecard?.componentType,
      importance: scorecard?.importance,
    } as ScorecardOption;
  });
};

const filterOptions = (
  scorecards: ScorecardOption[] | undefined,
  inputValue: string,
) => {
  // Only filter scorecards when necessary
  if (!inputValue || inputValue.length < 1) {
    return scorecards;
  }

  return scorecards?.filter((option) =>
    option?.label?.toLowerCase().includes(inputValue.toLowerCase()),
  );
};

export function useGetComponentApplicableScorecards(componentId: string) {
  const search = useApplicableScorecardsQuery();

  const handleScorecardSearch = async (input: string) => {
    const { data, error } = await search({
      componentId,
    });

    const generatedOptions = generateOptions(data, error);

    const filteredOptions = filterOptions(generatedOptions, input);

    return [
      {
        options: filteredOptions,
      },
    ];
  };

  return { search: handleScorecardSearch };
}
