/* eslint-disable no-template-curly-in-string */
import React, { useContext } from 'react';

import Button from '@atlaskit/button';
import Spinner from '@atlaskit/spinner';
import { Runner } from '@atlassian/pipelines-models';

import { LINUX_SYSTEM_OPTION } from '../const';
import { detectRunnerSystemFromLabels } from '../utils';

import FlagContext from './FlagContext';
import LinuxRunCommand from './LinuxRunCommand';
import { ButtonGroupWrapper, Loading, StepWrapper } from './styled';
import WindowsRunCommand from './WindowsRunCommand';

type Props = {
  onSubmit: () => void;
  onBack: () => void;
  setRunCommandActioned: (isActioned: boolean) => void;
  runner: Runner;
  repositoryUuid: string;
  workspaceUuid: string;
  environment: string;
};

const RunStep: React.FC<Props> = ({
  onSubmit,
  onBack,
  setRunCommandActioned,
  repositoryUuid,
  workspaceUuid,
  runner,
  environment,
}) => {
  const { windowsEnabled } = useContext(FlagContext);
  const runnerSystem = detectRunnerSystemFromLabels(
    windowsEnabled,
    runner.labels,
  );

  if (!(runner && workspaceUuid && environment)) {
    return (
      <Loading>
        <Spinner size="large" />
      </Loading>
    );
  }

  return (
    <StepWrapper>
      {runnerSystem === LINUX_SYSTEM_OPTION.value ? (
        <LinuxRunCommand
          setRunCommandActioned={setRunCommandActioned}
          runner={runner}
          workspaceUuid={workspaceUuid}
          repositoryUuid={repositoryUuid}
          environment={environment}
        />
      ) : (
        <WindowsRunCommand
          setRunCommandActioned={setRunCommandActioned}
          runner={runner}
          workspaceUuid={workspaceUuid}
          repositoryUuid={repositoryUuid}
          environment={environment}
        />
      )}
      <ButtonGroupWrapper>
        <Button className="backButton" appearance="subtle" onClick={onBack}>
          Back
        </Button>
        <Button
          name="finishRun"
          className="forwardButton"
          appearance="primary"
          type="submit"
          onClick={onSubmit}
        >
          Next
        </Button>
      </ButtonGroupWrapper>
    </StepWrapper>
  );
};

export default React.memo(RunStep);
