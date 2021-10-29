import React from 'react';

import RadioLabel from '../src/ui/RadioLabel';

export default function RadioLabelExample() {
  return (
    <RadioLabel
      labelKey="All"
      description="This number will vary, depending on how many users your server instance has at time of running your migration."
      isLoading={false}
    />
  );
}
