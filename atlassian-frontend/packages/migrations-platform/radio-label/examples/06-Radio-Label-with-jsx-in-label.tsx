import React from 'react';

import RadioLabel from '../src/ui/RadioLabel';

export default function RadioLabelExample() {
  return (
    <RadioLabel
      labelKey="All"
      labelValue={
        <span>
          currently <b>10868</b> users, <b>8552</b> groups
        </span>
      }
      description="This number will vary, depending on how many users your server instance has at time of running your migration."
      isLoading={false}
    />
  );
}
