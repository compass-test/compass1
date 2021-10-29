import React from 'react';
import { EmptyState } from './empty-state';
import { ErrorImage } from './storybook-utils';

export const Basic = () => (
  <EmptyState
    title="Oops, we're having trouble searching"
    content={<div>let's try again</div>}
    Image={ErrorImage}
  />
);

export default { title: 'Search Dialog / Empty State' };
