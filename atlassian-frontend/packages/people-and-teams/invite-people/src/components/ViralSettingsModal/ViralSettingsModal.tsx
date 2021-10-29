import React, { useCallback, useState, ChangeEvent } from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';
import InfoIcon from '@atlaskit/icon/glyph/editor/info';
import Modal, {
  ModalTitle,
  ModalTransition,
  ModalBody,
  ModalFooter,
} from '@atlaskit/modal-dialog';

import {
  triggerAnalyticsForViralSettingsModalViewed,
  triggerAnalyticsForClickedInfoModalButton,
  triggerAnalyticsForClickedInfoModalClosed,
  triggerAnalyticsForClickedInfoModalCloseButton,
} from '../analytics';
import { messages } from '../i18n/messages';
import OpenInviteCheckbox from '../ViralSettings/OpenInviteCheckbox';
import DirectAccessCheckboxList from '../ViralSettings/DirectAccessCheckboxList';
import { ViralSettingsByDomain } from '../ViralSettings/types';
import { ModalDescription, InfoModalTitle } from './styled';

interface OwnProps {
  selectedProductLabel: string;
  viralSettingsByDomain: ViralSettingsByDomain;
  onOpenInviteChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDomainChange: (value: ViralSettingsByDomain) => void;
  openInviteIsChecked: boolean;
  showOpenInvite: boolean;
}

// This is a temporary solution to make the invite people info modal work with the invite-people-drawer
const DrawerZIndexSetter: React.FC<{}> = () => {
  const zIndexRef = React.useCallback((node) => {
    if (node !== null) {
      const portalElement: Element | null =
        node.closest && node.closest('.atlaskit-portal');
      if (portalElement) {
        // we set it to 560 because we want it to stay above the invite-people-drawer, and below flag, spotlight and tooltip
        // directly setting the style property is the safer option than setAttribute()
        // because we don't know what other possible style properties could be
        (portalElement as any).style['z-index'] = 560;
      }
    }
  }, []);
  return <div ref={zIndexRef} />;
};
const ViralSettingsModal: React.FC<OwnProps & InjectedIntlProps> = ({
  selectedProductLabel,
  viralSettingsByDomain,
  onOpenInviteChange,
  openInviteIsChecked,
  showOpenInvite,
  onDomainChange,
}) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => {
    triggerAnalyticsForClickedInfoModalButton(createAnalyticsEvent);
    setIsModalOpen(true);
  };

  const onModalOpened = useCallback(() => {
    triggerAnalyticsForViralSettingsModalViewed(createAnalyticsEvent);
  }, [createAnalyticsEvent]);

  const onModalClosed = useCallback(() => {
    triggerAnalyticsForClickedInfoModalClosed(createAnalyticsEvent);
  }, [createAnalyticsEvent]);

  const onClickCloseButton = (closeModalFunction: () => void) => () => {
    triggerAnalyticsForClickedInfoModalCloseButton(createAnalyticsEvent);
    closeModalFunction();
  };
  return (
    <div test-id="testId-invite-people-viral-settings-modal-wrapper">
      <Button
        testId="testId-invite-people-viral-settings-modal-trigger-button"
        appearance="subtle"
        iconBefore={<InfoIcon label="more details" />}
        onClick={openModal}
        spacing="none"
        style={{ padding: 4 }}
      />

      <ModalTransition>
        {isModalOpen && (
          <Modal
            shouldScrollInViewport
            onClose={closeModal}
            onOpenComplete={onModalOpened}
            onCloseComplete={onModalClosed}
            testId="testId-invite-people-viral-settings-modal"
            width="small"
          >
            <ModalBody>
              <DrawerZIndexSetter />
              <InfoModalTitle>
                <ModalTitle>
                  <FormattedMessage {...messages.viralSettingsModalTitle} />
                </ModalTitle>
              </InfoModalTitle>
              <ModalDescription>
                <FormattedMessage
                  {...messages.viralSettingsModalDescription}
                  values={{
                    selectedProduct: selectedProductLabel,
                  }}
                />
              </ModalDescription>
              <OpenInviteCheckbox
                show={showOpenInvite}
                isChecked={openInviteIsChecked}
                onChange={onOpenInviteChange}
                checkboxTheme="MODAL"
              />
              <DirectAccessCheckboxList
                viralSettingsByDomain={viralSettingsByDomain}
                checkboxTheme="MODAL"
                onChange={onDomainChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                appearance={'default'}
                onClick={onClickCloseButton(closeModal)}
                testId={
                  'testId-invite-people-viral-settings-modal-close-button'
                }
              >
                <FormattedMessage
                  {...messages.viralSettingsModalCloseButtonLabel}
                />
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </ModalTransition>
    </div>
  );
};

export default injectIntl(ViralSettingsModal);
