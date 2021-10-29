import React, { useCallback, useMemo, useState } from 'react';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/custom-theme-button';
import Form from '@atlaskit/form';
import ModalDialog, {
  ModalBody,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';

import { SECURED_VAR_PREFIX, YML_FILE_NAME } from '../const';
import {
  BranchOption,
  FetchBranches,
  FetchCreatePipeline,
  FetchPipelineDefinitions,
  PipelineDefinitionOption,
} from '../types';

import RunPipelineBranchSelector from './RunPipelineBranchSelector';
import RunPipelineMessage from './RunPipelineMessage';
import RunPipelineSelector from './RunPipelineSelector';
import RunPipelineVariables from './RunPipelineVariables';
import {
  FooterButtons,
  MessageWrapper,
  NoBrancheSelectorMessage,
} from './styled';

type Props = {
  isRepoReadOnly: boolean;
  isOverAllowance: boolean;
  isPipelinesDisabled: boolean;
  isSecuredVariablesEnabled: boolean;
  refName?: string;
  revision?: string;
  fetchBranches?: FetchBranches;
  fetchCreatePipeline: FetchCreatePipeline;
  fetchPipelineDefinitions: FetchPipelineDefinitions;
  openPipelinePage: (buildNumber: number) => void;
  onCloseDialog: () => void;
  getConfigurationUrl: (revision: string) => string;
  settingsPageUrl?: string;
  plansPageUrl?: string;
};

const RunPipeline: React.FC<Props> = ({
  onCloseDialog,
  isPipelinesDisabled,
  isRepoReadOnly,
  isOverAllowance,
  isSecuredVariablesEnabled,
  refName,
  revision,
  fetchBranches,
  fetchPipelineDefinitions,
  fetchCreatePipeline,
  openPipelinePage,
  getConfigurationUrl,
  settingsPageUrl,
  plansPageUrl,
}) => {
  const [isCreatingPipeline, setIsCreatingPipeline] = useState<boolean>(false);
  const [createPipelineError, setCreatePipelineError] = useState<any>(null);

  const [branchOption, setBranchOption] = useState<BranchOption>(
    (refName
      ? { branch: { name: refName, revision } }
      : undefined) as BranchOption,
  );
  const [pipelineDefinitionOption, setPipelineDefinitionOption] = useState<
    PipelineDefinitionOption
  >();

  const hasError = useMemo(
    () =>
      createPipelineError ||
      isPipelinesDisabled ||
      isOverAllowance ||
      isRepoReadOnly,
    [createPipelineError, isPipelinesDisabled, isOverAllowance, isRepoReadOnly],
  );

  const hasWarning = useMemo(
    () =>
      pipelineDefinitionOption &&
      pipelineDefinitionOption.pipelineDefinition.error,
    [pipelineDefinitionOption],
  );

  const isDisabled = useMemo(
    () =>
      hasError || hasWarning || isCreatingPipeline || !pipelineDefinitionOption,
    [hasError, hasWarning, isCreatingPipeline, pipelineDefinitionOption],
  );

  const variables = useMemo(
    () => pipelineDefinitionOption?.pipelineDefinition.variables || [],
    [pipelineDefinitionOption],
  );

  const target = useMemo(
    () => (branchOption ? branchOption.branch.revision : revision) || '',
    [branchOption, revision],
  );

  const onRunPipeline = useCallback(
    async (formData: {}) => {
      setCreatePipelineError(null);
      setIsCreatingPipeline(true);
      const variablesWithDefaultValues: Record<string, string> = variables
        .filter((v) => v.default)
        .reduce((map, v) => {
          map[v.name] = v.default as string;
          return map;
        }, {} as Record<string, string>);
      const varHasDefaultValue = (key: string) =>
        !!variablesWithDefaultValues[key];
      const varOverridesDefaultValue = (key: string, value: string) =>
        varHasDefaultValue(key) &&
        value !== undefined &&
        value !== variablesWithDefaultValues[key];

      const providedVariables = Object.entries(formData)
        .filter(([k, v]) => v || varOverridesDefaultValue(k, v as string))
        .map(([key, value]) => ({
          key,
          value,
          secured:
            isSecuredVariablesEnabled &&
            !varHasDefaultValue(key) &&
            key.startsWith(SECURED_VAR_PREFIX),
        }));
      try {
        const type =
          branchOption && branchOption.branch.name
            ? 'pipeline_ref_target'
            : 'pipeline_commit_target';
        const selector = pipelineDefinitionOption
          ? JSON.parse(pipelineDefinitionOption.value)
          : undefined;

        const { build_number } = await fetchCreatePipeline({
          target: {
            type,
            selector,
            // branch or commit
            ...(type === 'pipeline_ref_target'
              ? { ref_name: branchOption.branch.name, ref_type: 'branch' }
              : { commit: { hash: revision, type: 'commit' } }),
          },
          ...(providedVariables.length
            ? { variables: providedVariables }
            : null),
        });
        openPipelinePage(build_number);
      } catch (error) {
        setCreatePipelineError(error);
        setIsCreatingPipeline(false);
      }
    },
    [
      branchOption,
      fetchCreatePipeline,
      isSecuredVariablesEnabled,
      openPipelinePage,
      pipelineDefinitionOption,
      revision,
      variables,
    ],
  );

  return (
    <ModalDialog
      onClose={onCloseDialog}
      width="medium"
      shouldScrollInViewport
      isBlanketHidden
    >
      <ModalHeader>
        <ModalTitle>
          {`Run Pipeline${
            refName
              ? ` for ${refName}`
              : revision
              ? ` for commit ${revision.substring(0, 7)}`
              : ''
          }`}
        </ModalTitle>
      </ModalHeader>

      <ModalBody>
        <Form onSubmit={onRunPipeline}>
          {({ formProps }) => (
            <form {...formProps}>
              {hasError || hasWarning ? (
                <MessageWrapper>
                  <RunPipelineMessage
                    isPipelinesDisabled={isPipelinesDisabled}
                    isRepoReadOnly={isRepoReadOnly}
                    isOverAllowance={isOverAllowance}
                    isMissingPipelineDefinition={!pipelineDefinitionOption}
                    error={
                      pipelineDefinitionOption
                        ? pipelineDefinitionOption.pipelineDefinition.error
                        : undefined
                    }
                    plansPageUrl={plansPageUrl || ''}
                    settingsPageUrl={settingsPageUrl || ''}
                  />
                </MessageWrapper>
              ) : null}
              {!hasError ? (
                <>
                  {fetchBranches ? (
                    <RunPipelineBranchSelector
                      branchOption={branchOption}
                      fetchBranches={fetchBranches}
                      onChange={setBranchOption}
                    />
                  ) : (
                    <NoBrancheSelectorMessage>
                      Select the pipeline from your {YML_FILE_NAME} file that
                      you wish to run:
                    </NoBrancheSelectorMessage>
                  )}
                  <RunPipelineSelector
                    pipelineDefinitionOption={pipelineDefinitionOption}
                    configurationUrl={getConfigurationUrl(target)}
                    target={target}
                    fetchPipelineDefinitions={fetchPipelineDefinitions}
                    onChange={setPipelineDefinitionOption}
                  />
                  {variables.length ? (
                    <RunPipelineVariables
                      variables={variables}
                      isSecuredVariablesEnabled={isSecuredVariablesEnabled}
                    />
                  ) : null}
                </>
              ) : null}
              <FooterButtons>
                <ButtonGroup>
                  <Button appearance="subtle" onClick={onCloseDialog}>
                    Cancel
                  </Button>
                  <Button
                    isDisabled={isDisabled}
                    appearance="primary"
                    isLoading={isCreatingPipeline}
                    type="submit"
                  >
                    Run
                  </Button>
                </ButtonGroup>
              </FooterButtons>
            </form>
          )}
        </Form>
      </ModalBody>
    </ModalDialog>
  );
};

export default React.memo(RunPipeline);
