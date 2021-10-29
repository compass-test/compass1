import React from 'react';
import ServerErrorComponent from './index';
import { mockIntl, generateMetadata } from '../../../common/util/storybook';

const defaultProps = {
  intl: mockIntl,
};

export default generateMetadata('ProjectPagesComponent/EmptyState/ServerError');

export const ServerError = () => (
  <ServerErrorComponent {...defaultProps} type={'server'} />
);

export const RequestAccess = () => (
  <ServerErrorComponent {...defaultProps} type={'access'} />
);
