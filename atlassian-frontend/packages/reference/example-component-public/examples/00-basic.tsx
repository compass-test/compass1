import React from 'react';

import ExampleComponentPublic from '../src';

export default function Basic() {
  return (
    <ExampleComponentPublic
      content="Content"
      label="Label"
      testId="example-component"
    />
  );
}
