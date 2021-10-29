import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { InjectedIntlProps, injectIntl } from 'react-intl';

import Button from '@atlaskit/button/custom-theme-button';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import ModalDialog, {
  ModalBody,
  ModalHeader,
  ModalTitle,
  useModal,
} from '@atlaskit/modal-dialog';

import { Annotation } from '../types';

import messages from './i18n';
import { AnnotationsTable } from './ReportsModal';
import { ModalContent, ModalWrapper } from './styled';

const Header = injectIntl(({ intl }: InjectedIntlProps) => {
  const { onClose } = useModal();
  return (
    <ModalHeader>
      <ModalTitle>
        {intl.formatMessage(messages.outdatedModalHeader)}
      </ModalTitle>
      <Button onClick={onClose} appearance="subtle-link" spacing="none">
        <CrossIcon label={intl.formatMessage(messages.modalClose)} />
      </Button>
    </ModalHeader>
  );
});

type OutdatedAnnotationsProps = {
  closeDialog: () => void;
  outdatedAnnotations: Annotation[];
  getSourceUrl: (path: string) => string;
};

const OutdatedAnnotationsModal = injectIntl(
  ({
    closeDialog,
    outdatedAnnotations,
    getSourceUrl,
    intl,
  }: OutdatedAnnotationsProps & InjectedIntlProps) => {
    return (
      <ModalDialog onClose={closeDialog} width="x-large" height="80vh">
        <Header />
        <ModalBody>
          <ModalWrapper>
            <ModalContent>
              <p>{intl.formatMessage(messages.outdatedModalMessage)}</p>
              <AnnotationsTable
                annotations={outdatedAnnotations}
                getSourceUrl={getSourceUrl}
                closeDialog={closeDialog}
              />
            </ModalContent>
          </ModalWrapper>
        </ModalBody>
      </ModalDialog>
    );
  },
);

export default React.memo(OutdatedAnnotationsModal);
