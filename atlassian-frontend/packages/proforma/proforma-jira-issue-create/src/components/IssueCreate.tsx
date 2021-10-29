import React from 'react';

import { observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import SectionMessage from '@atlaskit/section-message';
import { RenderForm } from '@atlassian/proforma-common-core/form-system';
import {
  CommonMessage,
  IntlCommonMessages,
  Loader,
} from '@atlassian/proforma-common-core/jira-common';

import { IssueCreateStore } from '../stores/IssueCreateStore';

import { ActiveFormDetails } from './components/ActiveFormDetails';
import { ChangeForm } from './components/ChangeForm';
import { Footer } from './components/Footer';
import { NoPreferredFormMsg } from './components/NoPreferredFormMsg';
import {
  IntlIssueCreateMessages,
  IssueCreateMessage,
} from './IssueCreateMessages.intl';

interface IssueCreateProps {
  issueCreateStore: IssueCreateStore;
}

export const IssueCreate: React.FunctionComponent<IssueCreateProps> = observer(
  ({ issueCreateStore }) => {
    const changeIssueFormStore = issueCreateStore.changeIssueFormStore;
    const formStore = issueCreateStore.createFormStore?.formStore;

    const formDetails = issueCreateStore.createFormStore?.formDetails;
    const changeForm = changeIssueFormStore?.currentProject && (
      <ChangeForm changeIssueFormStore={changeIssueFormStore} />
    );

    return (
      <IssueCreateModal>
        <IssueCreateContent>
          <IssueCreateHeader>
            <h2 data-testid="issue-create-modal-header">
              <FormattedMessage
                {...IntlIssueCreateMessages[
                  IssueCreateMessage.IssueCreateModalHeader
                ]}
              />
            </h2>
          </IssueCreateHeader>
          <IssueCreateBody>
            {issueCreateStore.loadingPreferredFormDetails ? (
              <Loader
                message={IntlCommonMessages[CommonMessage.LoadingFormDetails]}
              />
            ) : !formDetails ? (
              <NoPreferredFormMsg />
            ) : changeForm ? (
              changeForm
            ) : (
              <>
                <ActiveFormDetails
                  formName={formDetails.name}
                  projectName={formDetails.projectName!}
                  issueTypeName={
                    formDetails.requestType
                      ? formDetails.requestType.name
                      : formDetails.issueType.name
                  }
                  handleChangeForm={issueCreateStore.showChangeForm}
                />
                {issueCreateStore.showIssueCreateSuccessBanner && (
                  <SectionMessage appearance="discovery">
                    <p>
                      <FormattedMessage
                        {...IntlIssueCreateMessages[
                          IssueCreateMessage.IssueCreateSuccessMsg
                        ]}
                      />
                    </p>
                  </SectionMessage>
                )}
                <div data-testid="issue-create-active-form">
                  {issueCreateStore.loadingForm ? (
                    <Loader
                      message={IntlCommonMessages[CommonMessage.LoadingForm]}
                    />
                  ) : (
                    formStore && (
                      <div data-testid="issue-create-active-form-display">
                        <RenderForm
                          formStore={formStore}
                          revisionToken={formStore.revisionToken}
                        />
                      </div>
                    )
                  )}
                </div>
              </>
            )}
          </IssueCreateBody>
          <Footer
            cancelOnly={
              issueCreateStore.loadingPreferredFormDetails ||
              !formDetails ||
              !!changeForm
            }
            handleCancel={issueCreateStore.cancel}
            handleCreate={issueCreateStore.createIssue}
            handleCreateAnother={issueCreateStore.setCreateAnother}
            createAnother={issueCreateStore.createAnother}
            creatingIssue={issueCreateStore.creatingIssue}
          />
        </IssueCreateContent>
      </IssueCreateModal>
    );
  },
);

const IssueCreateModal = styled.div`
  display: flex;
  justify-content: center;
`;

const IssueCreateContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  max-width: 800px;
`;

const IssueCreateHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  margin: 20px 20px 0;
`;

const IssueCreateBody = styled.div`
  min-width: 400px;
  padding: 0 20px 20px;
  font-size: 14px;
  box-sizing: border-box;
  overflow-x: hidden;
  height: 75vh;
  max-height: 900px;
  border-bottom: 1px solid #dfe1e5;
  overflow-y: auto;
`;
