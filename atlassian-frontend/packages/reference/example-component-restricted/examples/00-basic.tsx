import React from 'react';

import ExampleComponentRestricted from '../src';

export default function Basic() {
  return (
    <ExampleComponentRestricted
      content="Content"
      label="Label"
      testId="example-component"
    />
  );
}
