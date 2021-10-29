import React, { useState, useEffect } from 'react';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import {
  useAnalyticsEvents,
  withAnalyticsContext,
} from '@atlaskit/analytics-next';

import {
  triggerAnalyticsForSlackConnectModal,
  triggerAnalyticsForClickSlackDoneButton,
  triggerAnalyticsForClickSlackCloseButton,
  triggerAnalyticsForClickSlackDisconnectButton,
  triggerAnalyticsForClickSlackDisconnectConfirmButton,
  triggerAnalyticsForClickSlackDisconnectCancelButton,
} from '../analytics';
import { messages } from '../i18n';

import Modal, {
  ModalFooter,
  ModalHeader,
  ModalHeaderProps,
  ModalTitle,
  ModalTransition,
  ModalBody,
} from '@atlaskit/modal-dialog';
import { SlackWorkspace, AnalyticsSource } from '../../types';
import { getConnectedSlackWorkSpace } from './localStorageUtils';
import SlackWorkspacesDropdown from './SlackWorkspacesDropdown';
import Button, { ButtonGroup } from '@atlaskit/button';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import styled from 'styled-components';
import { R400 } from '@atlaskit/theme/colors';
import DrawerDialogZIndexSetter from './DrawerDialogZIndexSetter';
import { useThirdPartyState } from './context';

const DisconnectLink = styled.a`
  color: ${R400};
`;

const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

interface OwnProps {
  productId: string;
}

const SlackWorkspacesDialog: React.FC<OwnProps> = ({ productId }) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const [
    isSlackDisconnectDialogOpen,
    setIsSlackDisconnectDialogOpen,
  ] = useState(false);

  const connectedSlackWorkspaceId = getConnectedSlackWorkSpace(productId);
  const {
    slackWorkspaces,
    openSlackConnectDialog,
    closeSlackConnectDialog,
    isSlackConnectDialogOpen,
    onChangeSelectedSlackWorkspace,
    onDisconnectSlackWorkspace,
  } = useThirdPartyState();

  const [selectedOption, setSelectedOption] = useState<SlackWorkspace>(() => {
    return (
      slackWorkspaces.find(
        (slackWorkspace) => slackWorkspace.id === connectedSlackWorkspaceId,
      ) || slackWorkspaces[0]
    );
  });

  const closeSlackDisconnectDialog = () => {
    triggerAnalyticsForClickSlackDisconnectCancelButton(
      connectedSlackWorkspaceId!,
      createAnalyticsEvent,
    );
    setIsSlackDisconnectDialogOpen(false);
    openSlackConnectDialog();
  };

  const openSlackDisconnectDialog = () => setIsSlackDisconnectDialogOpen(true);

  const onDisconnectSlackLink = () => {
    triggerAnalyticsForClickSlackDisconnectButton(
      connectedSlackWorkspaceId!,
      createAnalyticsEvent,
    );
    closeSlackConnectDialog();
    openSlackDisconnectDialog();
  };

  const onDisconnectClick = () => {
    triggerAnalyticsForClickSlackDisconnectConfirmButton(
      connectedSlackWorkspaceId!,
      createAnalyticsEvent,
    );
    onDisconnectSlackWorkspace();
    setIsSlackDisconnectDialogOpen(false);
  };

  const onConnectSlackWorkspaceButton = () => {
    triggerAnalyticsForClickSlackDoneButton(
      selectedOption.id,
      createAnalyticsEvent,
    );
    if (selectedOption.id !== connectedSlackWorkspaceId) {
      onChangeSelectedSlackWorkspace(selectedOption);
    }
    closeSlackConnectDialog();
  };

  const onCloseSlackConnectDialog = () => {
    triggerAnalyticsForClickSlackCloseButton(
      connectedSlackWorkspaceId,
      createAnalyticsEvent,
    );
    closeSlackConnectDialog();
  };

  useEffect(() => {
    if (isSlackConnectDialogOpen) {
      triggerAnalyticsForSlackConnectModal(createAnalyticsEvent);
    }
  }, [isSlackConnectDialogOpen, createAnalyticsEvent]);

  const DisconnectModalFooter = () => (
    <ModalFooter>
      <FooterWrapper>
        <ButtonGroup>
          <Button type="submit" onClick={closeSlackDisconnectDialog}>
            {<FormattedMessage {...messages.cancelButton} />}
          </Button>
          <Button appearance="danger" type="submit" onClick={onDisconnectClick}>
            {<FormattedMessage {...messages.disconnectButton} />}
          </Button>
        </ButtonGroup>
      </FooterWrapper>
    </ModalFooter>
  );

  const ConnectModalHeader = injectIntl(
    ({ intl }: ModalHeaderProps & InjectedIntlProps) => {
      return (
        <ModalHeader>
          <ModalTitle>
            {intl.formatMessage(
              connectedSlackWorkspaceId
                ? messages.slackWorkspacesManageDialogHeading
                : messages.slackWorkspacesConnectDialogHeading,
            )}
          </ModalTitle>
          <Button
            spacing="none"
            appearance="subtle-link"
            onClick={onCloseSlackConnectDialog}
          >
            <CrossIcon label="" />
          </Button>
        </ModalHeader>
      );
    },
  );

  const ConnectModalFooter = () => (
    <ModalFooter>
      {connectedSlackWorkspaceId && (
        <DisconnectLink href="#" onClick={onDisconnectSlackLink}>
          <FormattedMessage
            {...messages.slackWorkspacesDialogDisconnectSlack}
          />
        </DisconnectLink>
      )}
      <Button
        type="submit"
        appearance="primary"
        style={{ marginLeft: 'auto' }}
        onClick={onConnectSlackWorkspaceButton}
      >
        {<FormattedMessage {...messages.slackWorkspacesDoneButton} />}
      </Button>
    </ModalFooter>
  );

  return (
    <>
      {slackWorkspaces && (
        <ModalTransition>
          {isSlackConnectDialogOpen && (
            <Modal
              width={'small'}
              autoFocus={false}
              shouldScrollInViewport
              onClose={closeSlackConnectDialog}
            >
              <ConnectModalHeader />
              <ModalBody>
                <FormattedMessage
                  tagName={'p'}
                  {...messages.slackWorkspacesDialogBody}
                />
                <br />
                <SlackWorkspacesDropdown
                  slackWorkspaces={slackWorkspaces}
                  selectedOption={selectedOption}
                  onSelect={setSelectedOption}
                />
                <DrawerDialogZIndexSetter />
              </ModalBody>
              <ConnectModalFooter />
            </Modal>
          )}
        </ModalTransition>
      )}
      {connectedSlackWorkspaceId && (
        <ModalTransition>
          {isSlackDisconnectDialogOpen && (
            <Modal width={'small'} autoFocus={false}>
              <ModalHeader>
                <ModalTitle appearance="danger">
                  {
                    <FormattedMessage
                      {...messages.slackWorkspacesDisconnectDialogHeading}
                    />
                  }
                </ModalTitle>
              </ModalHeader>

              <ModalBody>
                <FormattedMessage
                  {...messages.slackWorkspacesDisconnectDialogBody}
                />
                <DrawerDialogZIndexSetter />
              </ModalBody>
              <DisconnectModalFooter />
            </Modal>
          )}
        </ModalTransition>
      )}
    </>
  );
};

const analyticsContextData = {
  source: AnalyticsSource.SLACK_CONNECT_MODAL,
  componentName: 'slackConnectModal',
};

export default withAnalyticsContext(analyticsContextData)(
  SlackWorkspacesDialog,
);
