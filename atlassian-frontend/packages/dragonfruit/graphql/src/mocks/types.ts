import { IMockStore } from '@graphql-tools/mock';
import { IResolvers } from '@graphql-tools/utils';

export type Mocks = IResolvers;
export type Resolvers = IResolvers | ((store: IMockStore) => IResolvers);

/**
 * The mock store actually comes with a reference to the mocks.
 */
export type MockStore = IMockStore & {
  mocks?: Record<string, (override?: unknown) => any>;
};
