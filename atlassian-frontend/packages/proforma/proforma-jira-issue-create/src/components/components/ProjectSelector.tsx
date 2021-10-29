import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

// eslint-disable-next-line no-restricted-imports
import { Label } from '@atlaskit/field-base';
import Select from '@atlaskit/select';
import { SelectOption } from '@atlassian/proforma-common-core/form-system-models';
import {
  CommonMessage,
  IntlCommonMessages,
} from '@atlassian/proforma-common-core/jira-common';

import { ProjectReference } from '../../apis/IssueCreateFormApiV3';

interface ProjectSelectorProps {
  currentProject: ProjectReference;
  availableProjects: ProjectReference[];
  handleChangeProject: (projectId: number) => void;
  isLoading: boolean;
}

export const ProjectSelector = injectIntl(
  ({
    currentProject,
    availableProjects,
    handleChangeProject,
    isLoading,
    intl,
  }: ProjectSelectorProps & InjectedIntlProps) => {
    const currentValue: SelectOption<number> = {
      label: currentProject.name,
      value: currentProject.id,
    };

    const options = availableProjects.map(project => {
      return {
        label: project.name,
        value: project.id,
      } as SelectOption<number>;
    });

    return (
      <div data-testid="issue-create-select-project-dropdown">
        <Label
          label={intl.formatMessage(IntlCommonMessages[CommonMessage.Project])}
        />
        <Select<SelectOption<number>>
          value={currentValue}
          options={options}
          onChange={newValue => handleChangeProject(newValue?.value || -1)}
          isLoading={isLoading}
        />
      </div>
    );
  },
);
