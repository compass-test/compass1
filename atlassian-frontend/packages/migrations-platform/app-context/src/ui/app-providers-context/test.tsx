import React from 'react';

import { mount } from 'enzyme';

import { useLoadingValue } from '@atlassian/mpt-elements';

import { providersContext } from '../../common/mocks/app-context';
import { UsersAndGroupsStats } from '../../common/types';
import { useProviders } from '../../common/utils/use-providers';

import AppProvidersContext from './index';

const getUsersAndGroupsSummary = (stats?: UsersAndGroupsStats) =>
  stats
    ? `users - ${stats.numberOfUsers} & groups - ${stats.numberOfGroups}`
    : '';

const AppContextComponent = () => {
  const [migrationStats] = useProviders(['migrationStats']);
  const [data] = useLoadingValue(migrationStats!.getUsersAndGroupsStats);

  const usersAndGroups = getUsersAndGroupsSummary(data);

  return (
    <AppProvidersContext.Provider value={providersContext}>
      <div id="migration-plan-stats">{usersAndGroups}</div>
    </AppProvidersContext.Provider>
  );
};

jest.mock('../../common/utils/use-providers', () => ({
  useProviders: jest.fn().mockReturnValue([
    {
      getUsersAndGroupsStats: jest.fn().mockResolvedValue({
        numberOfUsers: 36,
        numberOfGroups: 6,
      }),
    },
  ]),
}));

describe('AppProvidersContext', () => {
  test('renders correctly when users and groups stats are present', async () => {
    const wrapper = mount(<AppContextComponent />);

    const provider = useProviders(['migrationStats'])[0]!
      .getUsersAndGroupsStats;
    const mockedProvider = provider as jest.Mock;

    await mockedProvider.mock.results[0].value;

    expect(wrapper.find('#migration-plan-stats').text()).toBe(
      'users - 36 & groups - 6',
    );
  });
});
