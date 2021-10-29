import React from 'react';

import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Button from '@atlaskit/button/standard-button';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';

import { withIntlProvider } from '../../../intl-provider';
import { CommonMessage, IntlCommonMessages } from '../../CommonMessages.intl';
import { usePfBrowserUtils } from '../../context/BrowserUtilsContext';
import { LiteUpgradeMessage } from '../LiteUpgradeMessage/LiteUpgradeMessage';
import { ModalTitleContainer } from '../styled';

import {
  ExportJiraFieldsModalMessage,
  IntlExportJiraFieldsModalMessages,
} from './ExportJiraFieldsModalMessages.intl';
import { ExportJiraFieldsModalSampleImage } from './ExportJiraFieldsModalSampleImage';

interface ExportJiraFieldsModalProps {
  closeModal: () => void;
}

export const ExportJiraFieldsModal = withIntlProvider<
  ExportJiraFieldsModalProps
>(({ closeModal }) => {
  const browserUtils = usePfBrowserUtils();

  const handleClickContinue = () => {
    browserUtils.goToUrl(browserUtils.createJiraUrl('/issues/'));
  };

  return (
    <Modal onClose={closeModal} width="large">
      <ModalHeader>
        <ModalTitleContainer>
          <ModalTitle>
            <FormattedMessage
              {...IntlExportJiraFieldsModalMessages[
                ExportJiraFieldsModalMessage.Heading
              ]}
            />
          </ModalTitle>
        </ModalTitleContainer>
      </ModalHeader>

      <ModalBody>
        {
          // @ts-ignore
          <LiteUpgradeMessage
            title={
              IntlExportJiraFieldsModalMessages[
                ExportJiraFieldsModalMessage.LiteUpgradeTitle
              ]
            }
            contents={
              <p>
                <FormattedMessage
                  {...IntlExportJiraFieldsModalMessages[
                    ExportJiraFieldsModalMessage.LiteUpgradeContents1
                  ]}
                />
              </p>
            }
          />
        }
        <p>
          <FormattedMessage
            {...IntlExportJiraFieldsModalMessages[
              ExportJiraFieldsModalMessage.Instructions
            ]}
          />
        </p>
        <ol>
          <li>
            <FormattedMessage
              {...IntlExportJiraFieldsModalMessages[
                ExportJiraFieldsModalMessage.Step1
              ]}
            />
          </li>
          <li>
            <FormattedMessage
              {...IntlExportJiraFieldsModalMessages[
                ExportJiraFieldsModalMessage.Step2
              ]}
            />
          </li>
          <li>
            <FormattedMessage
              {...IntlExportJiraFieldsModalMessages[
                ExportJiraFieldsModalMessage.Step3
              ]}
              values={{
                searchRequestViewLabel: (
                  <b>
                    <FormattedMessage
                      {...IntlExportJiraFieldsModalMessages[
                        ExportJiraFieldsModalMessage.SearchRequestViewLabelCloud
                      ]}
                    />
                  </b>
                ),
              }}
            />
          </li>
        </ol>
        <Image>
          <ExportJiraFieldsModalSampleImage />
        </Image>
      </ModalBody>
      <ModalFooter>
        <Button onClick={closeModal} appearance="subtle">
          <FormattedMessage {...IntlCommonMessages[CommonMessage.Close]} />
        </Button>
        <Button onClick={handleClickContinue} appearance="primary" autoFocus>
          <FormattedMessage
            {...IntlExportJiraFieldsModalMessages[
              ExportJiraFieldsModalMessage.Continue
            ]}
          />
        </Button>
      </ModalFooter>
    </Modal>
  );
});

const Image = styled.span`
  display: block;
  margin: 20px auto;
  width: 750px;
`;
