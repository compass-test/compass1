import React from 'react';

import { observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import LoadingButton from '@atlaskit/button/loading-button';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import {
  IntlViewFormMessages,
  RenderForm,
  ViewFormMessage,
  WrappingBanner,
} from '@atlassian/proforma-common-core/form-system';
import {
  CommonMessage,
  IntlCommonMessages,
  Loader,
} from '@atlassian/proforma-common-core/jira-common';

import { IssueCreateDirectStore } from '../stores/IssueCreateDirectStore';

import { ActiveFormDetails } from './components/ActiveFormDetails';
import {
  IntlIssueCreateMessages,
  IssueCreateMessage,
} from './IssueCreateMessages.intl';

interface IssueCreateDirectProps {
  issueCreateDirectStore: IssueCreateDirectStore;
}

export const IssueCreateDirect: React.FunctionComponent<IssueCreateDirectProps> = observer(
  ({ issueCreateDirectStore }) => {
    const { createFormStore } = issueCreateDirectStore;
    const formDetails = createFormStore?.formDetails;
    const formStore = createFormStore?.formStore;

    if (issueCreateDirectStore.invalid) {
      return (
        <IssueCreateDirectWrapper>
          <IssueCreateDirectContent>
            <ErrorPageWrapper>
              <h1>
                <FormattedMessage
                  {...IntlIssueCreateMessages[
                    IssueCreateMessage.InvalidLinkPageTitle
                  ]}
                />
              </h1>
              <p>
                <FormattedMessage
                  {...IntlIssueCreateMessages[
                    IssueCreateMessage.InvalidLinkPageMsg
                  ]}
                />
              </p>
            </ErrorPageWrapper>
          </IssueCreateDirectContent>
        </IssueCreateDirectWrapper>
      );
    }

    return (
      <IssueCreateDirectWrapper>
        <IssueCreateDirectContent>
          {formDetails && formStore ? (
            <>
              <IssueCreateDirectHeader>
                <h2 data-testid="issue-create-modal-header">
                  <FormattedMessage
                    {...IntlIssueCreateMessages[
                      IssueCreateMessage.IssueCreateModalHeader
                    ]}
                  />
                </h2>
              </IssueCreateDirectHeader>
              <IssueCreateDirectBody>
                <ActiveFormDetails
                  formName={formDetails.name}
                  projectName={formDetails.projectName!}
                  issueTypeName={
                    formDetails.requestType
                      ? formDetails.requestType.name
                      : formDetails.issueType.name
                  }
                />
                <RenderForm
                  formStore={formStore}
                  revisionToken={formStore.revisionToken}
                />
                <WrappingBanner
                  icon={
                    <WarningIcon
                      label="Warning icon"
                      secondaryColor="inherit"
                    />
                  }
                  isOpen={formStore?.invalid}
                  appearance="error"
                >
                  <FormattedMessage
                    {...IntlViewFormMessages[
                      ViewFormMessage.ValidationBannerMsg
                    ]}
                  />
                </WrappingBanner>
              </IssueCreateDirectBody>
              <IssueCreateDirectFooter>
                <LoadingButton
                  appearance="primary"
                  onClick={issueCreateDirectStore.createIssue}
                  isLoading={createFormStore?.creating}
                >
                  <FormattedMessage
                    {...IntlCommonMessages[CommonMessage.Create]}
                  />
                </LoadingButton>
              </IssueCreateDirectFooter>
            </>
          ) : (
            <Loader message={IntlCommonMessages[CommonMessage.LoadingForm]} />
          )}
        </IssueCreateDirectContent>
      </IssueCreateDirectWrapper>
    );
  },
);

const ErrorPageWrapper = styled.div`
  text-align: center;
  margin-top: 200px;
`;

const IssueCreateDirectWrapper = styled.div`
  display: flex;
  background: #fff;
`;

const IssueCreateDirectContent = styled.div`
  background: #fff;
  max-width: 600px;
  width: 75%;
  margin-left: auto;
  margin-right: auto;
`;

const IssueCreateDirectHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const IssueCreateDirectBody = styled.div`
  min-width: 400px;
  font-size: 14px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
`;

const IssueCreateDirectFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin: 20px;
`;
