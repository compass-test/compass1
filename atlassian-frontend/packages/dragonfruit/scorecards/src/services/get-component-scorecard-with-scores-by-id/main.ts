import { useGetComponentScorecardWithScoresByIdQuery } from '@atlassian/dragonfruit-graphql';

const useGetComponentScorecardWithScoresById = (
  componentId: string,
  scorecardId: string,
) => {
  const { data, loading, error } = useGetComponentScorecardWithScoresByIdQuery({
    variables: { componentId, scorecardId },
    fetchPolicy: 'cache-and-network',
    /**
     * Setting `nextFetchPolicy: cache-first` prevents Apollo from making unwanted network requests when
     * the cache for this query is updated (e.g. optimistic response for service relationships).
     * Reference: https://github.com/apollographql/apollo-client/issues/6760#issuecomment-668188727
     */
    nextFetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });

  return {
    loading,
    error,
    data,
  };
};

export default useGetComponentScorecardWithScoresById;
