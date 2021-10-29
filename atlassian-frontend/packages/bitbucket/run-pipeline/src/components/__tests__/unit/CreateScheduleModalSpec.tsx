import React from 'react';

import { mount } from 'enzyme';

import Form from '@atlaskit/form';

import CreateScheduleModal from '../../CreateScheduleModal';
import RunPipelineBranchSelector from '../../RunPipelineBranchSelector';
import RunPipelineSelector from '../../RunPipelineSelector';

describe('CreateScheduleModal component', () => {
  const originalError = global.console.error;
  beforeAll(() => {
    // surpressees React warnings until it can be updated to 16.9+ to support async act
    global.console.error = jest.fn((...args) => {
      if (
        (typeof args[0] === 'string' &&
          args[0].includes('Warning: State updates from the useState()')) ||
        args[0].includes(
          'Warning: An update to %s inside a test was not wrapped in act',
        )
      ) {
        return;
      }
      return originalError.call(console, args);
    });
  });

  afterAll(() => {
    (global.console.error as any).mockRestore();
  });

  it('should create schedule with default values', () => {
    const onCloseDialog = jest.fn();
    const component = mount(
      <CreateScheduleModal
        fetchBranches={jest.fn(() => Promise.resolve()) as any}
        fetchPipelineDefinitions={jest.fn(() => Promise.resolve()) as any}
        onCloseDialog={onCloseDialog}
        getConfigurationUrl={jest.fn()}
      />,
    );

    component
      .find(RunPipelineBranchSelector)
      .props()
      .onChange({
        label: 'master',
        value: 'master',
        branch: { name: 'master', revision: 'foo' },
      });
    component
      .find(RunPipelineSelector)
      .props()
      .onChange({
        label: 'foo',
        value: JSON.stringify({ type: 'bar', pattern: 'baz' }),
        pipelineDefinition: { type: 'bar', pattern: 'baz' },
      });

    component.update();
    component.find(Form).props().onSubmit({});

    expect(onCloseDialog).toBeCalledWith({
      cron_pattern: expect.stringContaining('* * * ? *'),
      enabled: true,
      target: {
        ref_name: 'master',
        ref_type: 'branch',
        selector: { pattern: 'baz', type: 'bar' },
        type: 'pipeline_ref_target',
      },
    });
  });
});
