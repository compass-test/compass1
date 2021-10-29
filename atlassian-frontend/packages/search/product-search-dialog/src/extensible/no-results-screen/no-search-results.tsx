import React from 'react';
import { withAnalytics } from '../../common/analytics';
import { onAdvancedSearchSelected } from '../../common/analytics/events';
import { NoResults, NoResultsProps } from '../../common/no-results';
import { ScreenSpecificProps } from '../product-router/product/result-provider/result-renderer';
import { useQuery } from '../query-context';

const NoResultsWithHooks = ({
  urlGeneratorForNoResultsScreen = () => '',
  advancedSearchSelected,
}: Pick<ScreenSpecificProps, 'urlGeneratorForNoResultsScreen'> &
  Pick<NoResultsProps, 'advancedSearchSelected'>) => {
  const { query } = useQuery();
  const advancedSearchUrl = urlGeneratorForNoResultsScreen(query);

  return (
    <NoResults
      advancedSearchUrl={advancedSearchUrl}
      advancedSearchSelected={advancedSearchSelected}
    />
  );
};

export default withAnalytics({
  advancedSearchSelected: onAdvancedSearchSelected,
})(NoResultsWithHooks);
