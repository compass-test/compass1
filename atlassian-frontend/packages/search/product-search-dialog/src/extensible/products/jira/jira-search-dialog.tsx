import React, { FunctionComponent } from 'react';
import { useQuery } from '../../query-context';
import JiraSearchDialog, { Props } from '../../../jira/jira-search-dialog';

export type JiraSearchDialogProps = Omit<
  Props,
  'query' | 'queryVersion' | 'setAdditionalAnalyticsContext'
>;

const JiraSearchDialogWithQueryContext: FunctionComponent<JiraSearchDialogProps> = (
  props,
) => {
  const { query, setAdditionalAnalyticsContext, queryVersion } = useQuery();

  return (
    <JiraSearchDialog
      {...props}
      query={query}
      queryVersion={queryVersion}
      setAdditionalAnalyticsContext={setAdditionalAnalyticsContext}
    />
  );
};

export default JiraSearchDialogWithQueryContext;
