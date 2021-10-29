import React, { useMemo } from 'react';
import { useQuery } from '../../../query-context';
import { SearchItems } from '../result-types';
import { filterItems, mergeSearchItems } from './faster-search-helpers';

interface FasterSearchFirstSectionProps {
  // Pre query items, we use this to render the first few items of the results
  preQueryItems: SearchItems;

  // Post query items, we render this for the post query screen
  postQueryItems?: SearchItems;

  children: ({
    searchItems,
  }: {
    searchItems: SearchItems;
  }) => React.ReactElement;
}

/**
 * This component abstracts the faster search logic. Faster search kicks in when user types a query
 * and is waiting for the API resposne to return. We filter out at max 3 preQuery items from the first section
 * and show it to the user and once the response from the API is available we append it to the existing results
 * and dedupe them.
 *
 * We do this by default only for the first section because we consider thats it is the most relevant and important for the user.
 *
 * @returns a callback function with the intermediate/faster search results and post query results combined.
 */
export const FasterSearchFirstSection: React.FC<FasterSearchFirstSectionProps> = ({
  postQueryItems,
  preQueryItems,
  children,
}) => {
  const { query } = useQuery();

  const intermediateItems = useMemo(() => filterItems(preQueryItems, query), [
    preQueryItems,
    query,
  ]);

  const resultItems = useMemo(
    () =>
      postQueryItems
        ? mergeSearchItems(intermediateItems, postQueryItems)
        : intermediateItems,
    [intermediateItems, postQueryItems],
  );

  return children({ searchItems: resultItems });
};
