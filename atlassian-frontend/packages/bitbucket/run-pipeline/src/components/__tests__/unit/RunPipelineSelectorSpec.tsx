import React from 'react';

import { mount } from 'enzyme';

import RunPipelineSelector from '../../RunPipelineSelector';

jest.mock('react', () => ({
  ...jest.requireActual<Object>('react'),
  useState: (initial: any) => [initial, jest.fn()],
}));

const pipelineDefinitionsResponse = {
  values: [
    { type: 'custom', pattern: 'foo' },
    {
      type: 'custom',
      pattern: 'with-variables',
      variables: [{ name: 'foo' }, { name: 'SECURED_bar' }],
    },
    { type: 'default' },
  ],
  size: 3,
};

describe('RunPipelineSelector component', () => {
  it('should not fetch without target value', () => {
    const fetchPipelineDefinitions = jest.fn();

    mount(
      <RunPipelineSelector
        configurationUrl=""
        target=""
        pipelineDefinitionOption={undefined}
        fetchPipelineDefinitions={fetchPipelineDefinitions}
        onChange={jest.fn()}
      />,
    );

    expect(fetchPipelineDefinitions).not.toBeCalled();
  });

  it('should fetch, format and select pipeline definitions response', async () => {
    let resolve: any;
    const promise = new Promise((r) => (resolve = r));
    const fetchPipelineDefinitions = jest.fn(() =>
      Promise.resolve(pipelineDefinitionsResponse),
    );
    const onChange = jest.fn(() => resolve());

    mount(
      <RunPipelineSelector
        configurationUrl=""
        target="foo"
        pipelineDefinitionOption={undefined}
        fetchPipelineDefinitions={fetchPipelineDefinitions}
        onChange={onChange}
      />,
    );

    await promise;

    expect(fetchPipelineDefinitions).toBeCalledWith('foo', {
      page: 1,
      pagelen: 100,
    });

    expect(onChange).toBeCalledWith({
      label: 'custom: foo',
      pipelineDefinition: {
        pattern: 'foo',
        type: 'custom',
      },
      value: '{"type":"custom","pattern":"foo"}',
    });
  });
});
