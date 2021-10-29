import React from 'react';

import { mount } from 'enzyme';

import { AsyncSelect } from '@atlaskit/select';

import RunPipelineBranchSelector from '../../RunPipelineBranchSelector';

describe('RunPipelineBranchSelector component', () => {
  it('should fetch and format branch response', async () => {
    const fetchBranches = jest.fn().mockReturnValue({
      then: (callback: any) =>
        callback({
          values: [
            { name: 'master', target: { hash: 'foo' } },
            { name: 'staging', target: { hash: 'bar' } },
          ],
        }),
    });
    const component = mount(
      <RunPipelineBranchSelector
        branchOption={undefined}
        fetchBranches={fetchBranches}
        onChange={jest.fn()}
      />,
    );
    const data = await component.find(AsyncSelect).prop('loadOptions')('foo');
    expect(fetchBranches).toBeCalledWith({
      name: 'foo',
      pagelen: 50,
    });
    expect(data).toEqual([
      {
        branch: { name: 'master', revision: 'foo' },
        label: 'master',
        value: 'master',
      },
      {
        branch: { name: 'staging', revision: 'bar' },
        label: 'staging',
        value: 'staging',
      },
    ]);
  });
});
