import React, { ReactNode, useEffect, useState } from 'react';

import debounce from 'debounce-promise';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';

import Button, { ButtonGroup } from '@atlaskit/button';
// eslint-disable-next-line no-restricted-imports
import { Label } from '@atlaskit/field-base';
import { ErrorMessage } from '@atlaskit/form';
import { RadioGroup } from '@atlaskit/radio';
import Select, { AsyncSelect } from '@atlaskit/select';
import { ValueType } from '@atlaskit/select/types';
import { LabelWrapper } from '@atlassian/proforma-common-core/form-system';
import { SelectOption } from '@atlassian/proforma-common-core/form-system-models';
import {
  CommonMessage,
  IntlCommonMessages,
} from '@atlassian/proforma-common-core/jira-common';
import {
  ExportFormat,
  Project,
  TemplateFormIndex,
} from '@atlassian/proforma-common-core/jira-common-models';

import {
  ExportConfigMessage,
  IntlExportConfigMessages,
} from './ExportConfigMessages.intl';

interface ExportConfigProps {
  projectId?: number;
  templateFormId?: number;
  format: ExportFormat;
  searchProjects: (pageSize: number, search?: string) => Promise<Project[]>;
  loadProjectForms: (projectId: number) => Promise<TemplateFormIndex[]>;
  updateProject: (projectId: number) => void;
  updateProjectForm: (form: SelectOption<number>) => void;
  updateFormat: (format: ExportFormat) => void;
  startExport: () => void;
  cancelExport: () => void;
}

enum ValidationErrorType {
  NoProjectSelected = 'noProjectSelected',
  NoFormSelected = 'noFormSelected',
}

interface ValidationError {
  errorType: ValidationErrorType;
  errorMsg: ReactNode;
}

const noProjectSelectedError: ValidationError = {
  errorType: ValidationErrorType.NoProjectSelected,
  errorMsg: (
    <FormattedMessage
      {...IntlExportConfigMessages[
        ExportConfigMessage.NoProjectSelectedErrorMessage
      ]}
    />
  ),
};

const noFormSelected: ValidationError = {
  errorType: ValidationErrorType.NoFormSelected,
  errorMsg: (
    <FormattedMessage
      {...IntlExportConfigMessages[
        ExportConfigMessage.NoTemplateFormSelectedErrorMessage
      ]}
    />
  ),
};

export const ExportConfig = injectIntl(
  ({
    projectId,
    templateFormId,
    format,
    searchProjects,
    loadProjectForms,
    updateProject,
    updateProjectForm,
    updateFormat,
    startExport,
    cancelExport,
    intl,
  }: ExportConfigProps & InjectedIntlProps) => {
    const [projectOptions, setProjectOptions] = useState<
      SelectOption<number>[]
    >([]);
    const [projectFormOptions, setProjectFormOptions] = useState<
      SelectOption<number>[]
    >([]);
    const [projectFormOptionsLoading, setProjectFormOptionsLoading] = useState<
      boolean
    >(false);
    const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
      [],
    );

    const maximumProjectsToLoad = 30;
    useEffect(() => {
      if (projectId !== undefined) {
        setProjectFormOptions([]);
        setProjectFormOptionsLoading(true);
        loadProjectForms(projectId).then(results => {
          const formOptions: SelectOption<number>[] = results.map(
            projectFormIndex => {
              return {
                label: projectFormIndex.name,
                value: projectFormIndex.id,
              };
            },
          );
          setProjectFormOptions(formOptions);
          setProjectFormOptionsLoading(false);
        });
      }
    }, [loadProjectForms, projectId]);

    const loadProjectOptions = (
      inputValue: string,
    ): Promise<SelectOption<number>[]> => {
      const searchStr = inputValue.trim();
      return searchProjects(maximumProjectsToLoad, searchStr).then(results => {
        const options: SelectOption<number>[] = results.map(project => ({
          label: project.name,
          value: project.id,
        }));
        setProjectOptions(options);
        return options;
      });
    };

    const selectedProjectOption = projectOptions.find(
      option => option.value === projectId,
    );

    const selectedProjectFormOption = projectFormOptions.find(
      option => option.value === templateFormId,
    );

    const handleProjectChange = (option: ValueType<SelectOption<number>>) => {
      if (option && 'value' in option) {
        updateProject(option.value);
      }
    };

    const handleFormChange = (option: ValueType<SelectOption<number>>) => {
      if (option && 'value' in option) {
        updateProjectForm(option);
      }
    };

    const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      updateFormat(event.currentTarget.value as any);
    };

    const formatOptions = [
      {
        name: ExportFormat.Xlsx,
        value: ExportFormat.Xlsx,
        label: <FormattedMessage {...IntlCommonMessages[CommonMessage.Xlsx]} />,
      },
      {
        name: ExportFormat.Json,
        value: ExportFormat.Json,
        label: <FormattedMessage {...IntlCommonMessages[CommonMessage.Json]} />,
      },
    ];

    const getValidationErrors = () => {
      const newValidationErrors: ValidationError[] = [];
      if (!projectId) {
        newValidationErrors.push(noProjectSelectedError);
      }
      if (!templateFormId) {
        newValidationErrors.push(noFormSelected);
      }
      return newValidationErrors;
    };

    const handleStartExport = () => {
      const valErrors = getValidationErrors();
      setValidationErrors(valErrors);
      if (!valErrors.length) {
        startExport();
      }
    };

    const noProjectValidationError = validationErrors.find(
      valErr => valErr.errorType === ValidationErrorType.NoProjectSelected,
    );

    const noProjectFormValidationError = validationErrors.find(
      valErr => valErr.errorType === ValidationErrorType.NoFormSelected,
    );

    return (
      <div>
        <StepWrapper>
          <StepTitle>
            <FormattedMessage
              {...IntlExportConfigMessages[ExportConfigMessage.Step1Title]}
            />
          </StepTitle>
          <StepContent>
            <StepSubTitle>
              <FormattedMessage
                {...IntlExportConfigMessages[ExportConfigMessage.Step1Desc]}
              />
            </StepSubTitle>
            <LabelWrapper>
              <Label
                htmlFor={'exportProjectSelect'}
                label={intl.formatMessage(
                  IntlExportConfigMessages[ExportConfigMessage.SelectProject],
                )}
              />
            </LabelWrapper>
            <AsyncSelect<SelectOption<number>>
              id={'exportProjectSelect'}
              loadOptions={debounce(loadProjectOptions, 500)}
              value={selectedProjectOption}
              onChange={handleProjectChange}
              defaultOptions
              isError={!!noProjectValidationError}
            />
            {!!noProjectValidationError && (
              <ErrorMessage>{noProjectValidationError.errorMsg}</ErrorMessage>
            )}

            <LabelWrapper>
              <Label
                htmlFor={'exportProjectFormSelect'}
                label={intl.formatMessage(
                  IntlExportConfigMessages[ExportConfigMessage.SelectForm],
                )}
              />
            </LabelWrapper>
            <Select<SelectOption<number>>
              id={'exportProjectFormSelect'}
              options={projectFormOptions}
              value={selectedProjectFormOption}
              onChange={handleFormChange}
              isDisabled={selectedProjectOption === undefined}
              isLoading={projectFormOptionsLoading}
              isError={!!noProjectFormValidationError}
            />
            {!!noProjectFormValidationError && (
              <ErrorMessage>
                {noProjectFormValidationError.errorMsg}
              </ErrorMessage>
            )}
          </StepContent>
        </StepWrapper>

        <StepWrapper>
          <StepTitle>
            <FormattedMessage
              {...IntlExportConfigMessages[ExportConfigMessage.Step2Title]}
            />
          </StepTitle>
          <StepContent>
            <RadioGroup
              options={formatOptions}
              onChange={handleFormatChange}
              value={format}
            />
          </StepContent>
        </StepWrapper>

        <StepWrapper>
          <StepTitle>
            <FormattedMessage
              {...IntlExportConfigMessages[ExportConfigMessage.Step3Title]}
            />
          </StepTitle>
          <StepContent>
            <StepSubTitle>
              <FormattedMessage
                {...IntlExportConfigMessages[ExportConfigMessage.Step3Desc]}
              />
            </StepSubTitle>

            <ExportActions>
              <ButtonGroup>
                <Button appearance="primary" onClick={handleStartExport}>
                  <FormattedMessage
                    {...IntlExportConfigMessages[
                      ExportConfigMessage.BeginExport
                    ]}
                  />
                </Button>
                <Button onClick={cancelExport}>
                  <FormattedMessage
                    {...IntlCommonMessages[CommonMessage.Cancel]}
                  />
                </Button>
              </ButtonGroup>
            </ExportActions>
          </StepContent>
        </StepWrapper>
      </div>
    );
  },
);

const StepWrapper = styled.div`
  margin-top: 20px;
`;

const StepTitle = styled.h3``;

const StepSubTitle = styled.div``;

const StepContent = styled.div`
  margin-top: 10px;
`;

const ExportActions = styled.div`
  margin-top: 15px;
`;
