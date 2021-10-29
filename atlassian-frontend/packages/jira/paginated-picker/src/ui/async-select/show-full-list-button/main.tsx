import React, { useCallback } from 'react';

import { FormattedMessage } from 'react-intl';

import Button from '@atlaskit/button';
// TODO: FORM-629 Analytics:
// import {
//   fireUIAnalytics,
//   useAnalyticsEvents,
// } from '@atlassian/jira-product-analytics-bridge';
// import type { Attributes } from '@atlassian/jira-product-analytics-bridge';

import messages from './messages';

interface Props {
  type?: string | null;
  onShowFullList: () => void;
}

export const ShowFullListButton = ({ onShowFullList /*, type*/ }: Props) => {
  // const { createAnalyticsEvent } = useAnalyticsEvents();

  const handleShowFullList = useCallback(() => {
    // const analyticsEvent = createAnalyticsEvent({
    //   eventType: 'UI',
    //   action: 'expanded',
    //   actionSubject: 'filterSearch',
    //   actionSubjectId: 'refinementBarFilterSearch',
    // });
    //
    // const attributes: Attributes = {
    //   fieldType: type,
    // };
    //
    // fireUIAnalytics(analyticsEvent, 'refinementBarFilterSearch', attributes);

    onShowFullList();
  }, [onShowFullList]);

  return (
    <Button
      onClick={handleShowFullList}
      appearance="subtle-link"
      testId="paginated-picker.ui.async-select.show-full-list-button.show-full-list-button"
    >
      <FormattedMessage {...messages.showFullListButtonText} />
    </Button>
  );
};

export default ShowFullListButton;
