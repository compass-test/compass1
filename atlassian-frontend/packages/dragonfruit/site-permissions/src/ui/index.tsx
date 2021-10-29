import React, { useCallback } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import Button, { ButtonGroup } from '@atlaskit/button';
import ModalDialog, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from '@atlaskit/modal-dialog';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';

import { useSitePermissionDeniedDialog } from '../services';

import messages from './messages';
import { FooterWrapper } from './styled';

export const SitePermissionErrorHandler = () => {
  const [dialogShown, setDialogShown] = useSitePermissionDeniedDialog();

  const onClose = useCallback(() => setDialogShown(false), [setDialogShown]);

  if (dialogShown === true) {
    return <SitePermissionErrorDialog onClose={onClose} />;
  } else {
    return null;
  }
};

type SitePermissionErrorDialogProps = {
  onClose: () => void;
};

export const SitePermissionErrorDialog = injectIntl(
  ({
    onClose,
    intl: { formatMessage },
  }: SitePermissionErrorDialogProps & InjectedIntlProps) => {
    const Footer = () => (
      <ModalFooter>
        <FooterWrapper>
          <ButtonGroup>
            <Button appearance="subtle" onClick={onClose}>
              {formatMessage(CommonMessages.close)}
            </Button>
            <Button
              appearance="primary"
              onClick={() => window.location.reload()}
            >
              {formatMessage(CommonMessages.reload)}
            </Button>
          </ButtonGroup>
        </FooterWrapper>
      </ModalFooter>
    );

    const JiraLink = (
      <a href={'/'} target="_blank" rel="noreferrer noopener">
        Jira
      </a>
    );

    return (
      <ModalTransition>
        <ModalDialog width="small" onClose={onClose} autoFocus={false}>
          <ModalHeader>
            <ModalTitle appearance="danger">
              {formatMessage(messages.cannotAccessDragonfruit)}
            </ModalTitle>
          </ModalHeader>

          <ModalBody>
            <p>
              <FormattedMessage
                {...messages.needAccessToJira}
                values={{
                  JiraLink,
                }}
              />
            </p>
            <p>{formatMessage(messages.contactAdministrator)}</p>
          </ModalBody>
          <Footer />
        </ModalDialog>
      </ModalTransition>
    );
  },
);
