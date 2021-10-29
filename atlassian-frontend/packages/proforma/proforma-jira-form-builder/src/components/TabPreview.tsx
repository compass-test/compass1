import React, { FunctionComponent } from 'react';

import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { N20 } from '@atlaskit/theme/colors';
import { RenderForm } from '@atlassian/proforma-common-core/form-system';
import { FormStore } from '@atlassian/proforma-common-core/form-system-stores';

import {
  FormBuilderMessage,
  IntlFormBuilderMessages,
} from './JiraFormBuilderMessages.intl';
import { TabPanelWrapper } from './styled';

interface TabPreviewProps {
  formStore?: FormStore;
  footer: JSX.Element;
}

export const TabPreview: FunctionComponent<TabPreviewProps> = ({
  formStore,
  footer,
}) => {
  return (
    <TabPanelWrapper>
      <PreviewWrapper>
        <PreviewPanel>
          <EditModeBar>
            <FormattedMessage
              {...IntlFormBuilderMessages[
                FormBuilderMessage.PreviewTabHeaderBar
              ]}
            />
          </EditModeBar>
          {formStore && (
            <FormBorder>
              <RenderForm
                formStore={formStore}
                revisionToken={formStore.revisionToken}
              />
            </FormBorder>
          )}
        </PreviewPanel>
      </PreviewWrapper>
      {footer}
    </TabPanelWrapper>
  );
};

const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  overflow-y: auto;
  padding: 20px;
`;

const PreviewPanel = styled.div`
  width: 750px;
  box-sizing: border-box;
`;

const EditModeBar = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 0.5rem 0.5rem 0 0;
  color: white;
  font-weight: 700;
  padding: 0.2rem 0;
  background-color: #0052cc;
`;

const FormBorder = styled.div`
  background-color: ${N20};
  border-radius: 0 0 6px 6px;
  padding: 5px;
`;
