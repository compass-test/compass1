import React from 'react';
import Heading from './';
import { createDefaultExport } from '@atlassian/aux-test-utils';

export default createDefaultExport();

export function All() {
  const sizes = ['small', 'medium', 'large'] as const;
  return (
    <>
      {sizes.map((size, i) => (
        <Heading size={size} key={i}>
          Foo
        </Heading>
      ))}
    </>
  );
}
