import React from 'react';

import { FormattedMessage } from 'react-intl';

import Button from '@atlaskit/button';

import messages from './messages';

interface Props {
  onShowMore: () => void;
}

const ShowMoreButton = ({ onShowMore }: Props) => (
  <Button
    onClick={onShowMore}
    appearance="link"
    testId="paginated-picker.ui.async-select.menu-list.show-more-button"
  >
    <FormattedMessage {...messages.showMoreButtonText} />
  </Button>
);

export default ShowMoreButton;
