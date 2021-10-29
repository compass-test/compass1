import React, { ReactNode } from 'react';

import { mount } from 'enzyme';
// eslint-disable-next-line import/no-extraneous-dependencies
import { IntlProvider } from 'react-intl';

import Button from '@atlaskit/button/custom-theme-button';

import ReportsLockedScreen from '../../ReportsLockedScreen';

const mountWithIntl = (component: ReactNode) => {
  return mount(<IntlProvider locale="en">{component}</IntlProvider>);
};

describe('ReportsLockedScreen component', () => {
  it('should have correct links', () => {
    const component = mountWithIntl(<ReportsLockedScreen />);

    const upgradeButton = component.find(Button).first();
    const plansButton = component.find(Button).last();
    expect(upgradeButton.props().href).toEqual(
      'https://confluence.atlassian.com/display/BITBUCKET/Code+insights',
    );
    expect(plansButton.props().href).toEqual('/account/admin/plans/');
  });
  it('should handle click events', () => {
    const onSeePlansClick = jest.fn();
    const onUpgradeClick = jest.fn();
    const component = mountWithIntl(
      <ReportsLockedScreen
        onSeePlansClick={onSeePlansClick}
        onUpgradeClick={onUpgradeClick}
      />,
    );

    component.find(Button).first().simulate('click');
    component.find(Button).last().simulate('click');
    expect(onSeePlansClick).toBeCalled();
    expect(onUpgradeClick).toBeCalled();
  });
});
