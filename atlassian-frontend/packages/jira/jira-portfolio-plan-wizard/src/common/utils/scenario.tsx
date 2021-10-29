/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef } from 'react';

import { getQueriesForElement } from '@testing-library/dom';
import { act } from '@testing-library/react';

const Scenario: React.FC<{
  act: (queries: ReturnType<typeof getQueriesForElement>) => Promise<void>;
  waitForSelector?: string;
}> = ({ act: actFn, children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  // Run the act
  useEffect(() => {
    const el = ref.current;
    if (el) {
      const queries = getQueriesForElement(el);

      if (typeof jest !== 'undefined') {
        act(() => actFn(queries));
      } else {
        // Make sure that the act running on different stack
        // since the current stack may interfere the state
        setTimeout(() => {
          actFn(queries);
        }, 0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  // Wait for the DOM
  useEffect(() => {});
  return <div ref={ref}>{children}</div>;
};

export default Scenario;
