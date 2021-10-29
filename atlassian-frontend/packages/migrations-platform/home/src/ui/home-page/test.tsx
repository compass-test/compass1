import React from 'react';

import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { HomePage } from './index';

describe('HomePage', () => {
  it('should render link', () => {
    const { getByText } = render(
      <IntlProvider locale="en">
        <HomePage
          productKey="jira-server"
          headerButtons="Fake Buttons"
          getUsersAndGroupsStats={jest.fn().mockResolvedValue({})}
          getProductInstanceStats={jest.fn().mockResolvedValue({})}
          getAppsStats={jest.fn().mockResolvedValue({})}
          onClickAssessApps={jest.fn()}
          onClickManage={jest.fn()}
        ></HomePage>
      </IntlProvider>,
    );

    expect(getByText('Prepare')).toBeInTheDocument();
    expect(getByText('Migrate')).toBeInTheDocument();
  });
});
