import React from 'react';

import { FormattedMessage } from 'react-intl';

import Button from '@atlaskit/button/standard-button';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';

import { withIntlProvider } from '../../../intl-provider';
import { CommonMessage, IntlCommonMessages } from '../../CommonMessages.intl';
import { usePfAnalyticsUtils } from '../../context/AnalyticsUtilsContext';
import { AnalyticsEventName } from '../../utils/AnalyticsUtils';
import { LiteUpgradeMessage } from '../LiteUpgradeMessage/LiteUpgradeMessage';
import { ModalTitleContainer } from '../styled';

import {
  ExportApiModalMessage,
  IntlExportApiModalMessages,
} from './ExportApiModalMessages.intl';

interface ExportApiModalProps {
  closeModal: () => void;
  projectId?: number;
}

export const ExportApiModal = withIntlProvider<ExportApiModalProps>(
  ({ closeModal, projectId }) => {
    const analyticsUtils = usePfAnalyticsUtils();

    return (
      <Modal onClose={closeModal} width="large">
        <ModalHeader>
          <ModalTitleContainer>
            <ModalTitle>
              <FormattedMessage
                {...IntlExportApiModalMessages[ExportApiModalMessage.Heading]}
              />
            </ModalTitle>
          </ModalTitleContainer>
        </ModalHeader>

        <ModalBody>
          {
            // @ts-ignore
            <LiteUpgradeMessage
              title={
                IntlExportApiModalMessages[
                  ExportApiModalMessage.LiteUpgradeTitle
                ]
              }
              contents={
                <p>
                  <FormattedMessage
                    {...IntlExportApiModalMessages[
                      ExportApiModalMessage.LiteUpgradeContents1
                    ]}
                  />
                </p>
              }
            />
          }
          <p>
            <FormattedMessage
              {...IntlExportApiModalMessages[ExportApiModalMessage.Description]}
            />
          </p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={closeModal} appearance="subtle">
            <FormattedMessage {...IntlCommonMessages[CommonMessage.Close]} />,
          </Button>
          <Button
            autoFocus
            appearance="primary"
            href="http://links.thinktilt.net/export-api"
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => {
              analyticsUtils.track(AnalyticsEventName.ExportApiClicked, {
                projectId: projectId,
              });
            }}
          >
            <FormattedMessage
              {...IntlExportApiModalMessages[
                ExportApiModalMessage.OpenCustomerApi
              ]}
            />
          </Button>
        </ModalFooter>
      </Modal>
    );
  },
);
