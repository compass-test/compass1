import React from 'react';
import { injectIntl } from 'react-intl';

import messages from './messages';
import { Props, OwnProps } from './types';

const Header = ({ intl: { formatMessage } }: Props) => (
  <h3>{formatMessage(messages.title)}</h3>
);

export default injectIntl<OwnProps>(Header);
