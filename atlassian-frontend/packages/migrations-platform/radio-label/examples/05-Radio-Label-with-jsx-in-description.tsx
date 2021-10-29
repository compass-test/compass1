import React from 'react';

import RadioLabel from '../src/ui/RadioLabel';

export default function RadioLabelExample() {
  return (
    <RadioLabel
      labelKey="All"
      labelValue="currently 10868 users, 8552 groups"
      description={
        <span>
          This number will vary,{' '}
          <a target="_blank" href="https://www.google.com">
            depending on how
          </a>{' '}
          many users your server instance has at time of running your migration.
        </span>
      }
      isLoading={false}
    />
  );
}
