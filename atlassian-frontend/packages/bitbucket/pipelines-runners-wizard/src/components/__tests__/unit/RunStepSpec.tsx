import React from 'react';

import { mount } from 'enzyme';

import { repositoryUuid, runner, workspaceUuid } from '../../../mocks';
import CopyButton from '../../CopyButton';
import { FlagProvider } from '../../FlagContext';
import RunStep from '../../RunStep';

describe('<RunStep />', () => {
  const defaultProps = {
    onSubmit: jest.fn(),
    onBack: jest.fn(),
    setRunCommandActioned: jest.fn(),
    runner: runner,
    repositoryUuid: repositoryUuid,
    workspaceUuid: workspaceUuid,
    environment: 'PRODUCTION',
  };

  const expectedCopyContent = `docker container run -it -v /tmp:/tmp -v \
/var/run/docker.sock:/var/run/docker.sock -v \
/var/lib/docker/containers:/var/lib/docker/containers:ro \
-e ACCOUNT_UUID=${workspaceUuid} \
-e REPOSITORY_UUID=${repositoryUuid} \
-e RUNNER_UUID=${runner.uuid} \
-e RUNTIME_PREREQUISITES_ENABLED=true \
-e OAUTH_CLIENT_ID=${runner.oauth_client.id} \
-e OAUTH_CLIENT_SECRET=${runner.oauth_client.secret} \
-e WORKING_DIRECTORY=/tmp \
--name runner-3b7fd7c7-6bc8-4954-9g53-69182c6e4d2f \
docker-public.packages.atlassian.com/sox/atlassian/bitbucket-pipelines-runner:1`;

  it('should render component', () => {
    const component = mount(
      <FlagProvider initialFlags={{ windowsEnabled: true }}>
        <RunStep {...defaultProps} />
      </FlagProvider>,
    );

    expect(component.find(CopyButton).length).toBe(1);
    expect(component.find(CopyButton).prop('name')).toBe('command');
    expect(component.find(CopyButton).prop('content')).toBe(
      expectedCopyContent,
    );
    expect(component.find(CopyButton).prop('analyticEventId')).toBe(
      'runnerWizardCopyCommand',
    );
  });
});
