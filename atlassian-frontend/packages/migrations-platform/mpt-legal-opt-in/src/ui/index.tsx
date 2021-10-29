import React, { FC } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import Button, { ButtonGroup } from '@atlaskit/button';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  useModal,
} from '@atlaskit/modal-dialog';
import {
  AnalyticsScreen,
  useCallbackWithUIEventController,
} from '@atlassian/mpt-analytics';

import { messages } from './messages';

export type LegalOptInProps = {
  onAgree: () => void;
  onClose: () => void;
  customText?: string;
};

const Footer = ({ onAgree }: { onAgree: () => void }) => {
  const { onClose } = useModal();

  const wrappedOnAgree = useCallbackWithUIEventController(onAgree, {
    actionSubjectId: 'allowButton',
  });

  return (
    <ModalFooter>
      <ButtonGroup>
        <Button appearance="subtle" onClick={onClose}>
          <FormattedMessage {...messages.legalOptInFooterCancelButton} />
        </Button>
        <Button
          appearance="primary"
          autoFocus
          onClick={wrappedOnAgree}
          testId="legal-agree"
        >
          <FormattedMessage {...messages.legalOptInFooterAllowButton} />
        </Button>
      </ButtonGroup>
    </ModalFooter>
  );
};

const LegalOptInModal: FC<LegalOptInProps & InjectedIntlProps> = ({
  onAgree,
  onClose,
  customText,
  intl,
}) => (
  <AnalyticsScreen name="AllowDataSharingModal">
    <Modal onClose={onClose}>
      <ModalHeader>
        <ModalTitle>
          {intl.formatMessage(messages.legalOptInModalHeading)}
        </ModalTitle>
      </ModalHeader>

      <ModalBody>
        <>
          <p>
            <FormattedMessage {...messages.legalOptInDescription} />
          </p>
          {customText && <p>{customText}</p>}
          <p>
            <FormattedMessage
              {...messages.legalOptInDescriptionWithLinks}
              values={{
                message: (
                  <strong>
                    <FormattedMessage {...messages.legalOptInAllow} />
                  </strong>
                ),
                privacyPolicy: (
                  <a
                    href="https://www.atlassian.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FormattedMessage {...messages.legalOptInPrivacyPolicy} />
                  </a>
                ),
                customerAgreement: (
                  <a
                    href="https://www.atlassian.com/legal/customer-agreement"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FormattedMessage
                      {...messages.legalOptInCustomerAgreement}
                    />
                  </a>
                ),
              }}
            />
            .
          </p>
        </>
      </ModalBody>
      <Footer onAgree={onAgree} />
    </Modal>
  </AnalyticsScreen>
);

export default injectIntl(LegalOptInModal);
