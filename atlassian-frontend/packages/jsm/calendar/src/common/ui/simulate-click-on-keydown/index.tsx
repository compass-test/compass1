import React, { ReactNode } from 'react';

export const SimulateClickOnKeydown = ({
  children,
}: {
  children: ReactNode;
}) => (
  <div
    tabIndex={0}
    role="button"
    aria-hidden="true"
    style={{ height: 'inherit', width: 'inherit' }}
    onKeyDown={(event) => {
      if (
        (event.key === 'Enter' || event.key === ' ') &&
        event.currentTarget === event.target
      ) {
        // Scroll the event into view so that the popup will open in the right place
        event.currentTarget.scrollIntoView();
        // Simulate a click on the event to open the event popup
        event.currentTarget.click();
      }
    }}
  >
    {children}
  </div>
);
