import React from 'react';

import { observer } from 'mobx-react';

import {
  BlankForm,
  BottomHeaderBarPortalViewCloudStyles,
  FormContainerIssueCreateStyles,
  FormPageStyles,
  HeaderBar,
  RenderForm,
  TopHeaderBarNativeIssueView,
  TopHeaderBarPortalViewCloudStyles,
  ValidationFailedMsg,
  ViewMode,
  ViewModeBar,
} from '@atlassian/proforma-common-core/form-system';
import {
  AddForm,
  ListForms,
} from '@atlassian/proforma-common-core/jira-common';
import { PermissionLevel } from '@atlassian/proforma-common-core/jira-common-models';
import { isNativeApp } from '@atlassian/proforma-common-core/jira-common-utils';

import { IssueViewStore } from '../stores/IssueViewStore';

interface IssueViewProps {
  issueViewStore: IssueViewStore;
  permissions: PermissionLevel;
  showFormVisibility: boolean;
  panelAddFormButtonClickedCount: number;
}

export const IssueView: React.FunctionComponent<IssueViewProps> = observer(
  ({
    issueViewStore,
    permissions,
    showFormVisibility,
    panelAddFormButtonClickedCount,
  }) => {
    const formStore = issueViewStore.selectedFormStore;

    const ContainerElement = FormContainerIssueCreateStyles;
    const TopHeaderBar = isNativeApp()
      ? TopHeaderBarNativeIssueView
      : TopHeaderBarPortalViewCloudStyles;
    const BottomHeaderBar = BottomHeaderBarPortalViewCloudStyles;

    return (
      <div>
        <ListForms
          actions={issueViewStore.formIndexStore}
          disableAddFormBtn={!!issueViewStore.addFormStore}
          forms={issueViewStore.formIndexStore.formList}
          isIndexLoading={issueViewStore.formIndexStore.isIndexLoading}
          permissions={permissions}
          selectedFormId={issueViewStore.formIndexStore.selectedFormId}
          showFormVisibility={showFormVisibility}
          panelAddFormButtonClickedCount={panelAddFormButtonClickedCount}
          isPortalView={false}
        />
        {formStore && issueViewStore.viewMode && (
          <>
            <ViewModeBar viewMode={issueViewStore.viewMode} />
            <TopHeaderBar>
              <CustomHeaderBar
                showTitle={true}
                issueViewStore={issueViewStore}
                permissions={permissions}
                showFormVisibility={showFormVisibility}
              />
            </TopHeaderBar>
            <ContainerElement viewMode={issueViewStore.viewMode}>
              <ValidationFailedMsg invalid={formStore.invalid} />
              <FormPageStyles>
                {formStore.formIsBlank ? (
                  <BlankForm />
                ) : (
                  <RenderForm
                    key={issueViewStore.formIndexStore.selectedFormId}
                    formStore={formStore}
                    revisionToken={formStore.revisionToken}
                    view={issueViewStore.viewMode !== ViewMode.Edit}
                  />
                )}
                <ValidationFailedMsg invalid={formStore.invalid} />
              </FormPageStyles>
              {issueViewStore.viewMode === ViewMode.Edit && (
                <BottomHeaderBar>
                  <CustomHeaderBar
                    showTitle={false}
                    issueViewStore={issueViewStore}
                    permissions={permissions}
                    showFormVisibility={showFormVisibility}
                  />
                </BottomHeaderBar>
              )}
            </ContainerElement>
          </>
        )}
        {issueViewStore.addFormStore && (
          <AddForm
            actions={issueViewStore.addFormStore}
            loadingAvailableForms={
              issueViewStore.addFormStore.loadingAvailableForms
            }
            availableForms={issueViewStore.addFormStore.availableForms}
            loadingFormPreview={issueViewStore.addFormStore.loadingFormPreview}
            previewTemplateFormId={
              issueViewStore.addFormStore.previewTemplateFormId
            }
            formStore={issueViewStore.addFormStore?.previewFormStore}
          />
        )}
      </div>
    );
  },
);

interface CustomHeaderBarProps {
  showTitle: boolean;
  issueViewStore: IssueViewStore;
  permissions: PermissionLevel;
  showFormVisibility: boolean;
}

const CustomHeaderBar: React.FunctionComponent<CustomHeaderBarProps> = observer(
  ({ showTitle, issueViewStore, permissions, showFormVisibility }) => {
    const formStore = issueViewStore.selectedFormStore;
    if (!formStore) {
      // eslint-disable-next-line no-console
      console.warn(
        'Requested to render `HeaderBar` without a form store. Skipping.',
      );
      return null;
    }
    return (
      <HeaderBar
        formStore={formStore}
        viewMode={issueViewStore.viewMode!}
        showTitle={showTitle}
        formVisibilityLoading={issueViewStore.updatingFormVisibility}
        handleViewModeChange={issueViewStore.setViewMode.bind(issueViewStore)}
        handleUpdateVisibility={issueViewStore.updateSelectedFormVisibility.bind(
          issueViewStore,
        )}
        handleDownloadPdf={issueViewStore.formIndexStore.downloadFormPdf}
        handleDownloadXlsx={issueViewStore.formIndexStore.downloadFormXlsx}
        handleDeleteForm={issueViewStore.deleteSelectedForm.bind(
          issueViewStore,
        )}
        handleCancelEdit={issueViewStore.cancelEditSelectedForm.bind(
          issueViewStore,
        )}
        handleSubmitForm={issueViewStore.submitSelectedForm.bind(
          issueViewStore,
        )}
        handleSaveForm={issueViewStore.saveSelectedForm.bind(issueViewStore)}
        handleReopenForm={issueViewStore.reopenSelectedForm.bind(
          issueViewStore,
        )}
        submittingForm={issueViewStore.submittingForm}
        reopeningForm={issueViewStore.reopeningForm}
        permissions={permissions}
        showFormVisibility={showFormVisibility}
        savingAnswers={issueViewStore.savingForm}
        isIssueView
      />
    );
  },
);
