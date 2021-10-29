import React from 'react';

export interface Props {
  isOpen: boolean;
  content: JSX.Element;
  popupComponent: React.ComponentType<{}>;
  trigger: JSX.Element;
  onClose?: () => void;
}
