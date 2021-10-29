import React from 'react';

import RadioLabel from '../src/ui/RadioLabel';

export default function RadioLabelExample() {
  return (
    <RadioLabel
      labelKey="All"
      labelValue="currently 10868 users, 8552 groups"
      isLoading={false}
    />
  );
}
