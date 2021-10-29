import React from 'react';
import { shallow } from 'enzyme';
import AtlassianSwitcher from '../../atlassian-switcher';

jest.mock('../../../../common/utils/performance-now.ts', () => {
  const mockNow = jest.fn().mockReturnValueOnce(0).mockReturnValue(250);
  return {
    __esModule: true,
    mockNow,
    performanceNow: mockNow,
  };
});
const { performanceNow } = require('../../../../common/utils/performance-now');

beforeEach(() => {
  performanceNow.mockReset().mockReturnValueOnce(0).mockReturnValue(250);
});

const noop = () => void 0;

describe('Atlassian Switcher', () => {
  it('basic snapshot', () => {
    const switcher = shallow(
      <AtlassianSwitcher
        product="jira"
        cloudId="CLOUD_ID"
        triggerXFlow={noop}
      />,
    );
    expect(switcher).toMatchSnapshot();
  });
});
