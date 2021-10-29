import React, { FunctionComponent } from 'react';
import { useQuery } from '../../query-context';
import ConfluenceSearchDialog, {
  Props,
} from '../../../confluence/confluence-search-dialog';

export type ConfluenceSearchDialogProps = Omit<
  Props,
  'query' | 'queryVersion' | 'setAdditionalAnalyticsContext'
>;

const ConfluenceSearchDialogWithQueryContext: FunctionComponent<ConfluenceSearchDialogProps> = (
  props,
) => {
  const { query, queryVersion, setAdditionalAnalyticsContext } = useQuery();

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
