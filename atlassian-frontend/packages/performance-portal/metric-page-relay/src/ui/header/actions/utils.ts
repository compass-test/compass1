import { ReactNode, useCallback, useState } from 'react';

export const useModalOpenState = (
  renderModal: (isOpen: boolean, closeModalCallback: () => void) => ReactNode,
): [() => ReactNode, () => void] => {
  const [isOpen, setIsOpen] = useState(false);
  const openModalCallback = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const closeModalCallback = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const renderModalComponent = useCallback(() => {
    if (!isOpen) {
      return null;
    }
    return renderModal(isOpen, closeModalCallback);
  }, [closeModalCallback, isOpen, renderModal]);

  return [renderModalComponent, openModalCallback];
};
