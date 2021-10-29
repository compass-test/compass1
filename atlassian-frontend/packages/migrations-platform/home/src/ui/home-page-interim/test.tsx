import React from 'react';

import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { HomePageInterim } from './index';

describe('HomePage', () => {
  it('should render link', () => {
    const { getByText } = render(
      <IntlProvider locale="en">
        <HomePageInterim
          productKey="jira-server"
          headerButtons="Fake Buttons"
          getUsersAndGroupsStats={jest.fn().mockResolvedValue({})}
          getProductInstanceStats={jest.fn().mockResolvedValue({})}
          getAppsStats={jest.fn().mockResolvedValue({})}
          onClickAssessApps={jest.fn()}
        ></HomePageInterim>
      </IntlProvider>,
    );

    expect(getByText('Assess')).toBeInTheDocument();
  });
});
