import React from 'react';

import { mount, ReactWrapper } from 'enzyme';

import RunPipelineMessage, { Props } from '../../RunPipelineMessage';

describe('RunPipelineMessage component', () => {
  let component: ReactWrapper<Props>;

  const defaultProps: Props = {
    plansPageUrl: '',
    settingsPageUrl: '',
  };

  function render(props: Props) {
    component = mount(<RunPipelineMessage {...props} />);
  }

  it('should render isPipelinesDisabled', () => {
    render({ ...defaultProps, isPipelinesDisabled: true });
    expect(component.text()).toContain(
      'Pipelines is currently disabled for this repository. Repository administrators can enable Pipelines in repository Settings → Pipelines.',
    );
  });

  it('should render isRepoReadOnly', () => {
    render({ ...defaultProps, isRepoReadOnly: true });
    expect(component.text()).toContain(
      'To run custom pipelines you need write permission that can be granted by the repository administrator.',
    );
  });

  it('should render isOverAllowance message', () => {
    render({ ...defaultProps, isOverAllowance: true });
    expect(component.text()).toContain(
      'Your account has run out of build minutes. Upgrade your current plan or purchase more build minutes to continue running pipelines. View plan details',
    );
  });

  it('should render isMissingPipelineDefinition', () => {
    render({ ...defaultProps, isMissingPipelineDefinition: true });
    expect(component.text()).toContain(
      'No PipelineYou can add a pipeline in your bitbucket-pipelines.yml file to manually trigger it from this dialog. Find out more',
    );
  });

  it.each([
    [
      'plan-service.parse.missing-section',
      'The bax section in your bitbucket-pipelines.yml' +
        ' file is missing a baz. Add the missing baz to get this working.',
    ],
    [
      'plan-service.parse.missing-string-specific',
      'The baz in the bax section of your bitbucket-pipelines.yml' +
        ' file is missing a string. Add the missing string to to get this working.',
    ],
    [
      'plan-service.parse.invalid-list',
      'The baz section in your bitbucket-pipelines.yml' +
        ' file must be a list.Check out our documentation on how to format the baz section.',
    ],
    [
      'plan-service.parse.invalid-map',
      'The baz section in your bitbucket-pipelines.yml' +
        ' file must be a map.Check out our documentation on how to format the baz section.',
    ],
    [
      'plan-service.parse.invalid-image-name',
      "We don't recognise the image name baz in your bitbucket-pipelines.yml" +
        ' file. Correct the name to get this working.',
    ],
    [
      'plan-service.parse.parse-error',
      'Something is misconfigured in your bitbucket-pipelines.yml file.',
    ],
    [
      'plan-service.parse.parse-indentation-error',
      'The indentation in the bitbucket-pipelines.yml' +
        ' file is incorrect. Correct the spacing and remove any tabs.',
    ],
    [
      'agent.build.time-limit-exceeded',
      'The build stopped because one or more steps reached the timeout limit of two hours.',
    ],
    [
      'agent-service.account-concurrency.reached',
      "Seems like you're running a lot of pipelines at the same time. This is usually due to" +
        " an accidental push. To conserve your minutes, we won't run them all.",
    ],
    ['pipeline-error', 'Unable to retrieve Pipeline.'],
  ])("should render '%s' message", (key, expected) => {
    render({
      ...defaultProps,
      error: { key, arguments: { element: 'baz', parent_element: 'bax' } },
    });
    expect(component.text()).toContain(expected);
  });
});
