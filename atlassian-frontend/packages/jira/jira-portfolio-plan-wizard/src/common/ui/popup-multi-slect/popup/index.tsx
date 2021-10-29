/**
 * "@atlaskit/popup" just crashes for some reason and its api is way to overkill for what we need anyway
 */

import React, { useEffect, useRef } from 'react';

import { PopupContainer, PopupContentContainer } from './styled';
import { Props } from './types';

const Popup: React.FC<Props> = ({
  isOpen,
  content,
  popupComponent: PopupComponent,
  trigger,
  onClose,
}) => {
  const prevIsOpen = useRef(isOpen);
  useEffect(() => {
    if (prevIsOpen.current && !isOpen && onClose) {
      onClose();
    }
    prevIsOpen.current = isOpen;
  }, [isOpen, onClose]);
  return (
    <PopupContainer>
      {trigger}
      {isOpen ? (
        <PopupContentContainer>
          <PopupComponent>{content}</PopupComponent>
        </PopupContentContainer>
      ) : null}
    </PopupContainer>
  );
};

export default Popup;
