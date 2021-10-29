import React, { useCallback } from 'react';

import { FormattedMessage } from 'react-intl';

import Button from '@atlaskit/button';
// TODO: FORM-629 Analytics:
// import { useAnalyticsEvents } from '@atlassian/jira-product-analytics-bridge';

// import { sendAnalytics } from '../../../common/utils';

import messages from './messages';

interface Props {
  type?: string | null;
  onClear?: () => void;
}

export const ClearSelectedItemsButton = ({ onClear /*, type*/ }: Props) => {
  // const { createAnalyticsEvent } = useAnalyticsEvents();

  const onClearSelectedItems = useCallback(() => {
    // sendAnalytics({
    //   actionSubjectId: 'filterSearchClearSelectedItems',
    //   createAnalyticsEvent,
    //   type,
    // });

    onClear && onClear();
  }, [onClear]);

  return (
    <Button
      onClick={onClearSelectedItems}
      appearance="subtle-link"
      testId="paginated-picker.ui.async-select.clear-selection-button.clear-selected-items"
    >
      <FormattedMessage {...messages.clearAllSelectedItemsButtonText} />
    </Button>
  );
};

export default ClearSelectedItemsButton;
