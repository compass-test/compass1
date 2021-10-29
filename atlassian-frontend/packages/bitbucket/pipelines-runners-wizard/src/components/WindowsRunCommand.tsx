/* eslint-disable no-template-curly-in-string */
import React from 'react';

import Code from '@atlaskit/code/inline';
import Spinner from '@atlaskit/spinner';
import { Runner } from '@atlassian/pipelines-models';

import DownloadButton from './DownloadButton';
import {
  Loading,
  RunCodeWrapper,
  RunStepCopyButton,
  StepWrapper,
  TokenCodeContainer,
} from './styled';

type Props = {
  setRunCommandActioned: (isActioned: boolean) => void;
  runner: Runner;
  repositoryUuid: string;
  workspaceUuid: string;
  environment: string;
};

const codeBlockTheme = {
  textColor: '#C76B00',
};

const downloadInstruction = `# download powershell script`;

const WindowsRunCommand: React.FC<Props> = ({
  setRunCommandActioned,
  repositoryUuid,
  workspaceUuid,
  runner,
  environment,
}) => {
  // will be replaced with actual commands
  const powershellScript = 'Never gonna give you up. Never gonna let you down.';

  if (!(runner && workspaceUuid && environment)) {
    return (
      <Loading>
        <Spinner size="large" />
      </Loading>
    );
  }

  return (
    <StepWrapper>
      <p>
        Download and run the powershell script below to install the runner. This
        script will not be available to download again.
      </p>
      <RunCodeWrapper>
        <Code css={{ color: codeBlockTheme.textColor }}>
          {downloadInstruction}
          <br />
          <br />
        </Code>
        <TokenCodeContainer>
          <Code>start.ps1</Code>
        </TokenCodeContainer>
        <RunStepCopyButton>
          <DownloadButton
            name={'command'}
            content={powershellScript}
            setRunCommandActioned={setRunCommandActioned}
          />
        </RunStepCopyButton>
      </RunCodeWrapper>
    </StepWrapper>
  );
};

export default React.memo(WindowsRunCommand);
