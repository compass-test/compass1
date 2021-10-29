import React, { useState } from 'react';

import Button from '@atlaskit/button';
import Popup from '@atlaskit/popup';

type Props = {
  children: React.ReactNode;
};

const ExamplePopup = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Popup
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      placement="bottom-start"
      content={() => (
        <div
          data-test-id="popup-container"
          style={{ width: '548px', height: 'calc(100vh - 200px)' }}
        >
          {children}
        </div>
      )}
      trigger={(triggerProps) => (
        <Button
          {...triggerProps}
          isSelected={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          style={{ margin: '10px' }}
        >
          {isOpen ? 'Close' : 'Open'}
        </Button>
      )}
    />
  );
};

export default ExamplePopup;
