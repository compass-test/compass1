import React from 'react';

import { mount } from 'enzyme';

import Form from '@atlaskit/form';

import RunPipelineBranchSelector from '../../RunPipelineBranchSelector';
import RunPipelineModal from '../../RunPipelineModal';
import RunPipelineSelector from '../../RunPipelineSelector';

describe('RunPipelineModal component', () => {
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

  it('should run pipeline for with branch selector', async () => {
    const fetchCreatePipelinePromise = Promise.resolve({ build_number: 1 });
    const fetchCreatePipeline = jest.fn(
      () => fetchCreatePipelinePromise,
    ) as any;
    const openPipelinePage = jest.fn();

    const component = mount(
      <RunPipelineModal
        isRepoReadOnly={false}
        isOverAllowance={false}
        isPipelinesDisabled={false}
        isSecuredVariablesEnabled={false}
        fetchBranches={jest.fn(() => Promise.resolve()) as any}
        fetchPipelineDefinitions={jest.fn(() => Promise.resolve()) as any}
        fetchCreatePipeline={fetchCreatePipeline}
        openPipelinePage={openPipelinePage}
        onCloseDialog={jest.fn()}
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

    await fetchCreatePipelinePromise;

    expect(fetchCreatePipeline).toBeCalledWith({
      target: {
        ref_name: 'master',
        ref_type: 'branch',
        selector: { pattern: 'baz', type: 'bar' },
        type: 'pipeline_ref_target',
      },
    });
    expect(openPipelinePage).toBeCalledWith(1);
  });

  it('should run pipeline for commit with variables', async () => {
    const fetchCreatePipelinePromise = Promise.resolve({ build_number: 1 });
    const fetchCreatePipeline = jest.fn(
      () => fetchCreatePipelinePromise,
    ) as any;
    const openPipelinePage = jest.fn();

    const component = mount(
      <RunPipelineModal
        revision="foo"
        isRepoReadOnly={false}
        isOverAllowance={false}
        isPipelinesDisabled={false}
        isSecuredVariablesEnabled={true}
        fetchPipelineDefinitions={jest.fn(() => Promise.resolve()) as any}
        fetchCreatePipeline={fetchCreatePipeline}
        openPipelinePage={openPipelinePage}
        onCloseDialog={jest.fn()}
        getConfigurationUrl={jest.fn()}
      />,
    );

    component
      .find(RunPipelineSelector)
      .props()
      .onChange({
        label: 'foo',
        value: JSON.stringify({ type: 'bar', pattern: 'baz' }),
        pipelineDefinition: {
          type: 'bar',
          pattern: 'baz',
          variables: [
            { name: 'var' },
            { name: 'var2' },
            { name: 'SECURED_var' },
            { name: 'var_default', default: 'value1' },
            { name: 'var_default2', default: 'value2' },
            { name: 'var_default3', default: 'value3' },
            { name: 'SECURED_var_default4', default: 'value4' },
          ],
        },
      });

    component.update();
    component.find(Form).props().onSubmit({
      var: 'foo',
      var2: '',
      SECURED_var: 'bar',
      var_default: 'value1',
      var_default2: '',
      var_default3: undefined,
      SECURED_var_default4: 'value3',
    });

    await fetchCreatePipelinePromise;

    expect(fetchCreatePipeline).toBeCalledWith({
      target: {
        commit: { hash: 'foo', type: 'commit' },
        selector: { pattern: 'baz', type: 'bar' },
        type: 'pipeline_commit_target',
      },
      variables: [
        { key: 'var', secured: false, value: 'foo' },
        { key: 'SECURED_var', secured: true, value: 'bar' },
        { key: 'var_default', secured: false, value: 'value1' },
        { key: 'var_default2', secured: false, value: '' },
        { key: 'SECURED_var_default4', secured: false, value: 'value3' },
      ],
    });
    expect(openPipelinePage).toBeCalledWith(1);
  });
});
