import React from 'react';

import {
  CommonMessage,
  IntlCommonMessages,
} from '@atlassian/proforma-common-core/jira-common';

import { ChangeIssueFormStore } from '../../stores/ChangeIssueFormStore';

import { AvailableForms } from './AvailableForms';
import { ProjectSelector } from './ProjectSelector';

interface ChangeFormProps {
  changeIssueFormStore: ChangeIssueFormStore;
}

export const ChangeForm: React.FunctionComponent<ChangeFormProps> = ({
  changeIssueFormStore,
}) => {
  if (!changeIssueFormStore.currentProject) {
    return <></>;
  }
  return (
    <div data-testid="issue-create-change-form">
      <ProjectSelector
        currentProject={changeIssueFormStore.currentProject}
        availableProjects={changeIssueFormStore.projects}
        handleChangeProject={changeIssueFormStore.setCurrentProject}
        isLoading={changeIssueFormStore.loadingProjects}
      />
      <AvailableForms
        isLoading={changeIssueFormStore.loadingForms}
        loadingMsg={IntlCommonMessages[CommonMessage.LoadingAvailableForms]}
        availableForms={changeIssueFormStore.formsDisplayList}
        pageNumbers={changeIssueFormStore.pageNumbers}
        maxPages={changeIssueFormStore.maxPaginationDisplayPages}
        handleChangePage={changeIssueFormStore.setPageNumber}
        handleSearch={changeIssueFormStore.searchForms}
        handleFormClick={changeIssueFormStore.setForm}
        currentPage={changeIssueFormStore.pageNumber - 1}
      />
    </div>
  );
};
