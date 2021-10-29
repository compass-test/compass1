import React from 'react';

import RadioLabel from '../src/ui/RadioLabel';

export default function RadioLabelExample() {
  return (
    <RadioLabel
      labelValue="All users and groups from the Confluence directory - currently 10345 users, 567 groups"
      description="Your users will have permissions to access their spaces after migration. We won’t send invitation emails to users."
      isLoading={false}
    />
  );
}
