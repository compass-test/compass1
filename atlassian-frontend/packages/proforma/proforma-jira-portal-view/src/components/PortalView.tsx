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
import { ListForms } from '@atlassian/proforma-common-core/jira-common';
import { PermissionLevel } from '@atlassian/proforma-common-core/jira-common-models';
import { isNativeApp } from '@atlassian/proforma-common-core/jira-common-utils';

import { PortalViewStore } from '../stores/PortalViewStore';

interface PortalViewProps {
  portalViewStore: PortalViewStore;
  permissions: PermissionLevel;
  showFormVisibility: boolean;
}

export const PortalView: React.FunctionComponent<PortalViewProps> = observer(
  ({ portalViewStore, permissions, showFormVisibility }) => {
    const formStore = portalViewStore.selectedFormStore;

    const ContainerElement = FormContainerIssueCreateStyles;
    const TopHeaderBar = isNativeApp()
      ? TopHeaderBarNativeIssueView
      : TopHeaderBarPortalViewCloudStyles;
    const BottomHeaderBar = BottomHeaderBarPortalViewCloudStyles;

    return (
      <div>
        <ListForms
          actions={portalViewStore.formIndexStore}
          disableAddFormBtn={true}
          forms={portalViewStore.formIndexStore.formList}
          isIndexLoading={portalViewStore.formIndexStore.isIndexLoading}
          permissions={permissions}
          selectedFormId={portalViewStore.formIndexStore.selectedFormId}
          showFormVisibility={showFormVisibility}
          isPortalView
        />
        {formStore && formStore.formIsBlank && <BlankForm />}
        {formStore && !formStore.formIsBlank && portalViewStore.viewMode && (
          <>
            <ViewModeBar
              viewMode={portalViewStore.viewMode}
              roundAllCorners={true}
            />
            <TopHeaderBar>
              <CustomHeaderBar
                showTitle={true}
                portalViewStore={portalViewStore}
                permissions={permissions}
                showFormVisibility={showFormVisibility}
              />
            </TopHeaderBar>
            <ContainerElement viewMode={portalViewStore.viewMode}>
              <ValidationFailedMsg invalid={formStore.invalid} />
              <FormPageStyles>
                <RenderForm
                  key={portalViewStore.formIndexStore.selectedFormId}
                  formStore={formStore}
                  revisionToken={formStore.revisionToken}
                  view={portalViewStore.viewMode !== ViewMode.Edit}
                />
                <ValidationFailedMsg invalid={formStore.invalid} />
              </FormPageStyles>
              {portalViewStore.viewMode === ViewMode.Edit && (
                <BottomHeaderBar>
                  <CustomHeaderBar
                    showTitle={false}
                    portalViewStore={portalViewStore}
                    permissions={permissions}
                    showFormVisibility={showFormVisibility}
                  />
                </BottomHeaderBar>
              )}
            </ContainerElement>
          </>
        )}
      </div>
    );
  },
);

interface CustomHeaderBarProps {
  showTitle: boolean;
  portalViewStore: PortalViewStore;
  permissions: PermissionLevel;
  showFormVisibility: boolean;
}

const CustomHeaderBar: React.FunctionComponent<CustomHeaderBarProps> = observer(
  ({ showTitle, portalViewStore, permissions, showFormVisibility }) => {
    const formStore = portalViewStore.selectedFormStore;
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
        viewMode={portalViewStore.viewMode!}
        showTitle={showTitle}
        handleViewModeChange={portalViewStore.setViewMode.bind(portalViewStore)}
        handleDownloadPdf={portalViewStore.formIndexStore.downloadFormPdf}
        handleCancelEdit={portalViewStore.cancelEditSelectedForm.bind(
          portalViewStore,
        )}
        handleSubmitForm={portalViewStore.submitSelectedForm.bind(
          portalViewStore,
        )}
        handleSaveForm={portalViewStore.saveSelectedForm.bind(portalViewStore)}
        submittingForm={portalViewStore.submittingForm}
        permissions={permissions}
        showFormVisibility={showFormVisibility}
        savingAnswers={portalViewStore.savingForm}
        isPortalView
      />
    );
  },
);
