import React from 'react';
import { injectIntl } from 'react-intl';
import { Props } from './types';
import messages from '../../ui/project-pages-improvement/messages';

const PagesHeading = ({ intl, isPreExpand }: Props) => {
  return isPreExpand ? <p>{intl.formatMessage(messages.headingInfo)}</p> : null;
};

export default injectIntl(PagesHeading);
