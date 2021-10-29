import React, { ReactNode, useEffect, useState } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';

import Button, { ButtonProps } from '@atlaskit/button/standard-button';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';
import Spinner from '@atlaskit/spinner';
import { RenderForm } from '@atlassian/proforma-common-core/form-system';
import { TemplateForm } from '@atlassian/proforma-common-core/form-system-models';
import { FormStore } from '@atlassian/proforma-common-core/form-system-stores';
import { convertTemplateFormToUnsavedForm } from '@atlassian/proforma-common-core/form-system-utils';
import {
  CommonMessage,
  IntlCommonMessages,
} from '@atlassian/proforma-common-core/jira-common';

import { useTemplateApi } from '../../../context/TemplateApiContext';
import { ModalTitleContainer } from '../styles';

import {
  IntlTemplateSidebarMessages,
  TemplateSidebarMessage,
} from './TemplateSidebarMessages.intl';

interface TemplatePreviewProps {
  onClose: () => void;
  templateId: string;
  insertTemplate: (templateForm: TemplateForm) => void;
}

export const TemplatePreview = injectIntl(
  ({
    onClose,
    templateId,
    insertTemplate,
    intl,
  }: TemplatePreviewProps & InjectedIntlProps) => {
    const [formStore, setFormStore] = useState<FormStore | undefined>(
      undefined,
    );
    const [templateForm, setTemplateForm] = useState<TemplateForm | undefined>(
      undefined,
    );
    const [loadingTemplateForm, setLoadingTemplateForm] = useState<boolean>(
      false,
    );

    const templateApi = useTemplateApi();
    useEffect(() => {
      setLoadingTemplateForm(true);
      templateApi
        .getTemplate(templateId)
        .then(newTemplateForm => {
          setTemplateForm(newTemplateForm);
          setFormStore(
            new FormStore(
              () => () => Promise.resolve(),
              () => () => Promise.resolve(),
              () => Promise.resolve([]),
              convertTemplateFormToUnsavedForm(newTemplateForm),
            ),
          );
        })
        .finally(() => {
          setLoadingTemplateForm(false);
        });
    }, [templateApi, templateId]);

    let modalActions: Array<ButtonProps & { text: ReactNode }> = [
      {
        text: intl.formatMessage(IntlCommonMessages[CommonMessage.Cancel]),
        onClick: onClose,
        appearance: templateForm ? 'subtle' : 'primary',
        autoFocus: !templateForm,
      },
    ];

    if (templateForm) {
      modalActions = [
        ...modalActions,
        {
          text: intl.formatMessage(
            IntlTemplateSidebarMessages[TemplateSidebarMessage.InsertTemplate],
          ),
          onClick: () => insertTemplate(templateForm),
          appearance: 'primary',
          autoFocus: true,
        },
      ];
    }

    return (
      <Modal onClose={onClose} width="large">
        <ModalHeader>
          <ModalTitleContainer>
            <ModalTitle>
              {
                <FormattedMessage
                  {...IntlTemplateSidebarMessages[
                    TemplateSidebarMessage.TemplatePreview
                  ]}
                />
              }
            </ModalTitle>
          </ModalTitleContainer>
        </ModalHeader>
        <ModalBody>
          {loadingTemplateForm && (
            <SpinnerWrapper>
              <Spinner size="xlarge" />
              <h3>
                <FormattedMessage
                  {...IntlTemplateSidebarMessages[
                    TemplateSidebarMessage.LoadingTemplatePreview
                  ]}
                />
              </h3>
            </SpinnerWrapper>
          )}
          {!loadingTemplateForm && formStore && (
            <RenderForm
              formStore={formStore}
              revisionToken={formStore.revisionToken}
              showHiddenSections
            />
          )}
        </ModalBody>
        <ModalFooter>
          {modalActions.map((props, index) => (
            <Button
              {...props}
              appearance={
                index === 0
                  ? props.appearance || 'primary'
                  : props.appearance || 'subtle'
              }
            >
              {props.text}
            </Button>
          ))}
        </ModalFooter>
      </Modal>
    );
  },
);

const SpinnerWrapper = styled.div`
  text-align: center;
`;
