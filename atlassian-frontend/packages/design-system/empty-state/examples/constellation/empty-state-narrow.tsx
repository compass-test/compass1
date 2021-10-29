import React from 'react';

import Button from '@atlaskit/button/standard-button';

import EmptyState from '../../src';

import LockClosedImage from './images/LockClosed.png';

const EmptyStateNarrow = () => {
  return (
    <EmptyState
      header="You don't have access to this issue"
      description="Make sure the issue exists in this project. If it does, ask a project admin for permission to see the project's issues."
      primaryAction={<Button appearance="primary">Request access</Button>}
      imageUrl={LockClosedImage}
      width="narrow"
    />
  );
};

export default EmptyStateNarrow;
