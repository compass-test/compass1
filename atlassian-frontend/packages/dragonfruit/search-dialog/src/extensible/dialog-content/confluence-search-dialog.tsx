import React, { FunctionComponent } from 'react';
import { useAnalyticsContext } from '../../common/analytics';
import { useQuery } from '../query-context';
import ConfluenceSearchDialog, {
  Props,
} from '../../confluence/confluence-search-dialog';

const ConfluenceSearchDialogWithQueryContext: FunctionComponent<Omit<
  Props,
  'query' | 'queryVersion' | 'setAdditionalAnalyticsContext'
>> = (props) => {
  const { query } = useQuery();
  const { setAdditionalAnalyticsContext, queryVersion } = useAnalyticsContext(
    query,
  );

  return (
    <ConfluenceSearchDialog
      {...props}
      query={query}
      queryVersion={queryVersion}
      setAdditionalAnalyticsContext={setAdditionalAnalyticsContext}
    />
  );
};

export default ConfluenceSearchDialogWithQueryContext;
