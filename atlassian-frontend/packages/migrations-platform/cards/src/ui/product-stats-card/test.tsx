import React from 'react';

import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import ProductStatsCard from './main';

const flushPromises = () => {
  return new Promise((resolve) => setImmediate(resolve));
};

describe('<ProductStatsCard />', () => {
  let getAppsStatsMock: jest.Mock;
  let getProductInstanceStatsMock: jest.Mock;
  let getUsersAndGroupsStatsMock: jest.Mock;
  let getCustomersStatsMock: jest.Mock;

  beforeEach(() => {
    getAppsStatsMock = jest.fn().mockResolvedValue({ count: 1 });
    getProductInstanceStatsMock = jest.fn().mockResolvedValue({
      numberOfUsers: 30,
      numberOfGroups: 3,
      numberOfContainers: 50,
      numberOfObjects: 500,
      sizeOfAttachments: 100 * 1024 * 1024,
    });
    getUsersAndGroupsStatsMock = jest.fn().mockResolvedValue({
      numberOfUsers: 30,
      numberOfGroups: 3,
    });
    getCustomersStatsMock = jest.fn().mockResolvedValue({
      numberOfCustomers: 40,
    });
  });

  describe('when data has not been loaded yet', () => {
    it('should renders only labels', () => {
      const { getByText, queryByText } = render(
        <IntlProvider locale="en">
          <ProductStatsCard
            productKey="jira-server"
            getAppsStats={getAppsStatsMock}
            getProductInstanceStats={getProductInstanceStatsMock}
            getUsersAndGroupsStats={getUsersAndGroupsStatsMock}
          />
        </IntlProvider>,
      );

      expect(getByText('Apps')).toBeInTheDocument();
      expect(getByText('Groups')).toBeInTheDocument();
      expect(getByText('Users')).toBeInTheDocument();
      expect(getByText('Project')).toBeInTheDocument();
      expect(queryByText('50 (500 issues, 100 MB)')).toBeNull();
    });
  });

  describe('when data has was loaded ', () => {
    it('should renders labels and values', async () => {
      const { getByText } = render(
        <IntlProvider locale="en">
          <ProductStatsCard
            productKey="jira-server"
            getAppsStats={getAppsStatsMock}
            getProductInstanceStats={getProductInstanceStatsMock}
            getUsersAndGroupsStats={getUsersAndGroupsStatsMock}
          />
        </IntlProvider>,
      );

      await flushPromises();
      expect(getByText('Apps')).toBeInTheDocument();
      expect(getByText('Groups')).toBeInTheDocument();
      expect(getByText('Users')).toBeInTheDocument();
      expect(getByText('Project')).toBeInTheDocument();
      expect(getByText('Issues')).toBeInTheDocument();
      expect(getByText('Attachments')).toBeInTheDocument();
    });
    it('should renders labels and values when customer data present', async () => {
      const { getByText } = render(
        <IntlProvider locale="en">
          <ProductStatsCard
            productKey="jira-server"
            getAppsStats={getAppsStatsMock}
            getProductInstanceStats={getProductInstanceStatsMock}
            getUsersAndGroupsStats={getUsersAndGroupsStatsMock}
            getCustomersStats={getCustomersStatsMock}
          />
        </IntlProvider>,
      );

      await flushPromises();
      expect(getByText('Apps')).toBeInTheDocument();
      expect(getByText('Groups')).toBeInTheDocument();
      expect(getByText('Users')).toBeInTheDocument();
      expect(getByText('Project')).toBeInTheDocument();
      expect(getByText('Project')).toBeInTheDocument();
      expect(getByText('Issues')).toBeInTheDocument();
      expect(getByText('Customers')).toBeInTheDocument();
    });
  });

  describe('when product is bitbucket-server ', () => {
    it('should hide size of attachment', async () => {
      const { getByText, queryByText } = render(
        <IntlProvider locale="en">
          <ProductStatsCard
            productKey="bitbucket-server"
            getProductInstanceStats={getProductInstanceStatsMock}
          />
        </IntlProvider>,
      );

      await flushPromises();
      expect(getByText('Project')).toBeInTheDocument();
      expect(queryByText('50 (500 repositories)')).toBeInTheDocument();
    });
  });
});
