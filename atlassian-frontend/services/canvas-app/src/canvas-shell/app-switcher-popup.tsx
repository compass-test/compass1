import React from 'react';
import Popup from '@atlaskit/popup';
import { AppSwitcher } from '@atlaskit/atlassian-navigation';

export const AppSwitcherPopup: React.FC = function AppSwitcherPopup() {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClick = React.useCallback(() => setIsOpen(!isOpen), [isOpen]);
  const onClose = React.useCallback(() => setIsOpen(false), []);

  return (
    <Popup
      placement="bottom-start"
      content={() => null}
      isOpen={isOpen}
      onClose={onClose}
      trigger={triggerProps => (
        <AppSwitcher
          onClick={onClick}
          tooltip="Switch to..."
          {...triggerProps}
        />
      )}
    />
  );
};
