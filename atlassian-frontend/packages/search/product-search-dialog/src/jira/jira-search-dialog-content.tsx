import React, { FunctionComponent } from 'react';
import JiraSearchDialog, { Props as DialogProps } from './jira-search-dialog';
import WarmUpFiltersCache from './warm-up-filters-cache';

const JiraSearchDialogContent: FunctionComponent<DialogProps> = (props) => {
  const { isExpanded } = props;
  return (
    <>
      <JiraSearchDialog {...props} />
      {isExpanded ? <WarmUpFiltersCache /> : null}
    </>
  );
};

export default JiraSearchDialogContent;
export type Props = DialogProps;
