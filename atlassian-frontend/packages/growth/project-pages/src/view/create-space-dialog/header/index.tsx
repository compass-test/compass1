import React from 'react';
import { injectIntl } from 'react-intl';
import messages from './messages';

import { OwnProps, Props } from './types';

const Header = ({ intl: { formatMessage } }: Props) => (
  <h3>{formatMessage(messages.title)}</h3>
);

export default injectIntl<OwnProps>(Header);
