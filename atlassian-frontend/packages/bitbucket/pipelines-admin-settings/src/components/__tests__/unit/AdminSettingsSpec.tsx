import React from 'react';

import { mount } from 'enzyme';

import Spinner from '@atlaskit/spinner';
import Toggle from '@atlaskit/toggle';

import { Account, BuildConfiguration, Capabilities } from '../../../types';
import AdminSettings from '../../AdminSettings';

describe('AdminSettings component', () => {
  const defaultProps = {
    account: {
      hasFetchedUser: true,
      userHas2FaEnabled: true,
    } as Account,
    buildConfiguration: {
      hasYmlFile: true,
      hasFetchedRawYmlFile: true,
    } as BuildConfiguration,
    is2FaRequired: false,
    capabilities: {
      hasFetchedCapabilities: true,
      pipelinesEnabled: true,
    } as Capabilities,
    gettingStartedPageURL: 'foo',
    editConfigurationURL: 'bar',
    onBuildsToggle: () => {},
  };

  it('should render component', () => {
    const component = mount(<AdminSettings {...defaultProps} />);
    expect(component.find(AdminSettings).length).toBe(1);
  });

  it('should show spinner when fetching data', () => {
    expect(
      mount(<AdminSettings {...defaultProps} />).find(Spinner).length,
    ).toBe(0);
    expect(
      mount(
        <AdminSettings
          {...{
            ...defaultProps,
            capabilities: {
              hasFetchedCapabilities: false,
            } as Capabilities,
          }}
        />,
      ).find(Spinner).length,
    ).toBe(1);
    expect(
      mount(
        <AdminSettings
          {...{
            ...defaultProps,
            buildConfiguration: {
              hasFetchedRawYmlFile: false,
            } as BuildConfiguration,
          }}
        />,
      ).find(Spinner).length,
    ).toBe(1);
    expect(
      mount(
        <AdminSettings
          {...{
            ...defaultProps,
            account: {
              hasFetchedUser: false,
            } as Account,
          }}
        />,
      ).find(Spinner).length,
    ).toBe(1);
  });

  it('should disable toggle when enabling not allowed', () => {
    expect(
      mount(<AdminSettings {...defaultProps} />)
        .find(Toggle)
        .props().isDisabled,
    ).toBe(false);
    expect(
      mount(
        <AdminSettings
          {...{
            ...defaultProps,
            is2FaRequired: true,
            account: {
              hasFetchedUser: true,
              userHas2FaEnabled: false,
            } as Account,
          }}
        />,
      )
        .find(Toggle)
        .props().isDisabled,
    ).toBe(true);
  });

  it('should toggle enable pipelines', () => {
    expect(
      mount(<AdminSettings {...defaultProps} />)
        .find(Toggle)
        .props().isChecked,
    ).toBe(true);
    expect(
      mount(
        <AdminSettings
          {...{
            ...defaultProps,
            capabilities: {
              hasFetchedCapabilities: true,
              pipelinesEnabled: false,
            } as Capabilities,
          }}
        />,
      )
        .find(Toggle)
        .props().isChecked,
    ).toBe(false);
  });
});
