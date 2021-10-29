import React, { useState } from 'react';

import { observer } from 'mobx-react-lite';

import Button from '@atlaskit/button';
import Popup from '@atlaskit/popup';

export const InlineDialogWithButton = observer<{
  child: JSX.Element;
  label: JSX.Element;
}>(({ child, label }) => {
  const buttonStyles = {
    borderRadius: '20px',
    alignItems: 'center',
    left: '-12px',
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popup
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      content={() => child}
      placement="bottom-start"
      rootBoundary="viewport"
      trigger={triggerProps => (
        <Button
          {...triggerProps}
          isSelected={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          style={buttonStyles}
          appearance="subtle"
          spacing="compact"
        >
          {label}
        </Button>
      )}
    />
  );
});
