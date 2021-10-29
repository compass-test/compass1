import React, { useCallback, useState } from 'react';

import { LegalOptInModal } from '../../index';

type Params = {
  onAgree: () => void;
  onNext: () => void;
  getHasOptedIn: () => Promise<boolean>;
  customText?: string;
};

const useLegalOptIn = ({
  onAgree,
  onNext,
  getHasOptedIn,
  customText,
}: Params) => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = useCallback(() => setModalOpen(false), [setModalOpen]);

  const onClickWithLegalRequired = useCallback(async () => {
    const hasOptedIn = await getHasOptedIn();
    if (hasOptedIn) {
      onNext();
    } else {
      setModalOpen(true);
    }
  }, [onNext, setModalOpen, getHasOptedIn]);

  const onModalAgree = useCallback(() => {
    setModalOpen(false);
    onAgree();
    onNext();
  }, [onAgree, onNext, setModalOpen]);

  const promptModal = modalOpen ? (
    <LegalOptInModal
      onAgree={onModalAgree}
      onClose={closeModal}
      customText={customText}
    />
  ) : null;

  return {
    onClickWithLegalRequired,
    promptModal,
  };
};

export default useLegalOptIn;
