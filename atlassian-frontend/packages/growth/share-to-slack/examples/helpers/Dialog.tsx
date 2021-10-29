import React from 'react';

import styled from 'styled-components';

import Modal, { ModalBody, ModalTransition } from '@atlaskit/modal-dialog';

import ShareToSlack from '../../src';

const Header = () => <div />;
const Footer = () => <div />;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Dialog({ isOpen, onClose, children }: Props) {
  return (
    <ModalTransition>
      {isOpen && (
        <Modal width={500} onClose={onClose} testId="modal">
          <Header />
          <ModalBody>{children}</ModalBody>
          <Footer />
        </Modal>
      )}
    </ModalTransition>
  );
}

// ShareToSlack is full bleed, so cancel out the dialog body’s padding.
// (Awkward selectors to out-specify form:first-child { margin: 0; })
export const DialogShareToSlack = styled(ShareToSlack)`
  &,
  &:first-child {
    margin: -2px -24px;
  }
`;
