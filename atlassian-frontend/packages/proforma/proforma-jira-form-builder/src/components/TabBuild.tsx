import React, { FunctionComponent } from 'react';

import { WithEditorActions } from '@atlaskit/editor-core';
import {
  QuestionParametersChoice,
  TemplateForm,
} from '@atlassian/proforma-common-core/form-system-models';
import { JiraField } from '@atlassian/proforma-common-core/jira-common-models';
import {
  FormBuilder,
  FormBuilderReferenceData,
} from '@atlassian/proforma-form-builder';

import { TabPanelWrapper } from './styled';

interface TabBuilderProps {
  form?: TemplateForm;
  refData: FormBuilderReferenceData;
  showTemplatesByDefault?: boolean;
  loadLinkedJiraFieldInsightChoices: (
    jiraField: JiraField,
  ) => Promise<QuestionParametersChoice[]>;
  footer: JSX.Element;
  formName?: string;
  updateFormName: (updatedFormName: string) => void;
}

export const TabBuild: FunctionComponent<TabBuilderProps> = ({
  form,
  refData,
  showTemplatesByDefault,
  loadLinkedJiraFieldInsightChoices,
  footer,
  formName,
  updateFormName,
}) => {
  if (!form) {
    return <></>;
  }
  return (
    <TabPanelWrapper>
      <WithEditorActions
        render={actions => (
          <FormBuilder
            form={form}
            refData={refData}
            editorActions={actions}
            showTemplatesByDefault={showTemplatesByDefault}
            loadLinkedJiraFieldInsightChoices={
              loadLinkedJiraFieldInsightChoices
            }
            footer={footer}
            formName={formName}
            updateFormName={updateFormName}
          />
        )}
      />
    </TabPanelWrapper>
  );
};
