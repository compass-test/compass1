import React from 'react';

import { FlagContainer, Props } from './index';

const defaultProps: Props = {
  id: 'id',
  title: 'title',
  isAutoDismiss: false,
};

export const Default: React.FC = () => <FlagContainer {...defaultProps} />;

export const IsAutoDismiss: React.FC = () => (
  <FlagContainer {...defaultProps} isAutoDismiss />
);

export const Success: React.FC = () => (
  <FlagContainer {...defaultProps} appearance="success" />
);

export const Info: React.FC = () => (
  <FlagContainer {...defaultProps} appearance="info" />
);

export const Warning: React.FC = () => (
  <FlagContainer {...defaultProps} appearance="warning" />
);

export const Error: React.FC = () => (
  <FlagContainer {...defaultProps} appearance="error" />
);

export const CustomIcon: React.FC = () => (
  <FlagContainer {...defaultProps} icon={<div>Icon</div>} />
);
