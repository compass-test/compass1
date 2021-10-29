/* eslint-disable no-template-curly-in-string */
import React from 'react';

import Code from '@atlaskit/code/inline';
import Spinner from '@atlaskit/spinner';
import { Runner } from '@atlassian/pipelines-models';

import { EnvironmentImage } from '../const';

import CopyButton from './CopyButton';
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

const commentCodeBlock = `# copy this command along with the token to run on the command line`;

const LinuxRunCommand: React.FC<Props> = ({
  setRunCommandActioned,
  repositoryUuid,
  workspaceUuid,
  runner,
  environment,
}) => {
  const environmentArgument =
    environment === 'PRODUCTION' ? '' : `-e ENVIRONMENT=${environment} `;
  const repositoryRunnerArgument = repositoryUuid
    ? `-e REPOSITORY_UUID=${repositoryUuid}`
    : '';

  const dockerCommandBlock = `docker container run -it \
-v /tmp:/tmp -v \
/var/run/docker.sock:/var/run/docker.sock -v \
/var/lib/docker/containers:/var/lib/docker/containers:ro \
-e ACCOUNT_UUID=${workspaceUuid} \
${repositoryRunnerArgument} \
-e RUNNER_UUID=${runner.uuid} \
${environmentArgument}\
-e RUNTIME_PREREQUISITES_ENABLED=true \
-e OAUTH_CLIENT_ID=${runner.oauth_client.id} \
-e OAUTH_CLIENT_SECRET=${runner.oauth_client.secret} \
-e WORKING_DIRECTORY=/tmp \
--name runner-${runner.uuid.replace(/{|}/g, '')} \
${EnvironmentImage[environment]}`;

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
        Run the command below to install the runner. This token will not be
        displayed again.
      </p>
      <RunCodeWrapper>
        <Code css={{ color: codeBlockTheme.textColor }}>
          {commentCodeBlock}
          <br />
          <br />
        </Code>
        <TokenCodeContainer>
          <Code>{dockerCommandBlock}</Code>
        </TokenCodeContainer>
        <RunStepCopyButton>
          <CopyButton
            name={'command'}
            content={dockerCommandBlock}
            analyticEventId={'runnerWizardCopyCommand'}
            setRunCommandActioned={setRunCommandActioned}
          />
        </RunStepCopyButton>
      </RunCodeWrapper>
    </StepWrapper>
  );
};

export default React.memo(LinuxRunCommand);
