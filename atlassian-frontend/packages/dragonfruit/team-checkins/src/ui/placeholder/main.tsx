import React from 'react';

interface Props {
  /**
   * A `testId` prop is provided for specified elements, which is a unique
   * string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests */
  testId?: string;
}

export default function Placeholder({ testId }: Props) {
  return <div data-testid={testId}>Hello world 👋</div>;
}
