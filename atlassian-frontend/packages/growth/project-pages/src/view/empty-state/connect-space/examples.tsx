import React from 'react';
import { action } from '@storybook/addon-actions';

import ConnectSpace from './index';
import { mockIntl, generateMetadata } from '../../../common/util/storybook';

const defaultProps = {
  intl: mockIntl,
  showConnectSpaceDialog: action('show connect space dialog'),
};

export default generateMetadata(
  'ProjectPagesComponent/EmptyState/ConnectSpace',
);

export const DefaultConnectSpace = (props: any) => (
  <ConnectSpace {...defaultProps} {...props} />
);
