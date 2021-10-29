import React from 'react';
import ConfluenceActivating from './index';
import { mockIntl, generateMetadata } from '../../../common/util/storybook';

const defaultProps = {
  intl: mockIntl,
};

export default generateMetadata(
  'ProjectPagesComponent/EmptyState/ConfluenceActivating',
);

export const DefaultActivating = (props: any) => (
  <ConfluenceActivating {...defaultProps} {...props} />
);
