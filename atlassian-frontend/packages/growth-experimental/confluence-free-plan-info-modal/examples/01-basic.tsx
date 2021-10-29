import React, { useState } from 'react';

import ConfluenceFreePlanInfoModal from '../src';

export default function Basic() {
  const [open, setOpen] = useState(false);

  const mockCallback = () => setOpen(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <ConfluenceFreePlanInfoModal
        isOpen={open}
        locale="en"
        onClose={mockCallback}
        onPrimaryActionClick={mockCallback}
        onSecondaryActionClick={mockCallback}
      />
    </>
  );
}
