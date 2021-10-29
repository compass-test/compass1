import { useGetComponentScorecardsWithScoresQuery } from '@atlassian/dragonfruit-graphql';

const useGetComponentScorecardsWithScores = (componentId: string) => {
  const { data, loading, error } = useGetComponentScorecardsWithScoresQuery({
    variables: { componentId },
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
    data,
    loading,
    error,
  };
};

export default useGetComponentScorecardsWithScores;
