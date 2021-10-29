import { AppProviders, MigrationStatsProvider } from '../types';

const migrationStatsProvider: Partial<MigrationStatsProvider> = {
  getUsersAndGroupsStats: async () => ({
    numberOfUsers: Math.round(Math.random() * 30000),
    numberOfGroups: Math.round(Math.random() * 3000),
  }),
};

export const providersContext = {
  migrationStats: migrationStatsProvider as AppProviders['migrationStats'],
};
