import React, { useState } from 'react';

import ExampleComponentPublic from '../src';

export default function Controlled() {
  const [isOpen, setIsOpen] = useState(true);
  const handleOpenChange = (newIsOpen: boolean) => setIsOpen(newIsOpen);
  return (
    <>
      <ExampleComponentPublic
        content="Content"
        isOpen={isOpen}
        label="Label"
        onOpenChange={handleOpenChange}
      />
      <div>
        <p>
          The panel is <strong>{isOpen ? 'open' : 'closed'}</strong>.
        </p>
        <button onClick={() => setIsOpen(true)}>Open the panel</button>{' '}
        <button onClick={() => setIsOpen(false)}>Close the panel</button>
      </div>
    </>
  );
}
