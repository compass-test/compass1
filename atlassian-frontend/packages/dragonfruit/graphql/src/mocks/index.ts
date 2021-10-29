export { ApolloAutoMockProvider } from './apollo-auto-mock-provider/main';
export type { ApolloProviderMockProps } from './apollo-auto-mock-provider/main';
export { ApolloLoadingProvider } from './apollo-loading-provider/main';
export { ApolloNetworkErrorProvider } from './apollo-network-error-provider/main';

export {
  FakeCompassComponent,
  FakeCompassComponentResultSuccess,
  FakeCompassComponentResultQueryError,
  FakeCompassEventQueryError,
  FakeCompassScorecard,
  FakeCompassScorecardResultSuccess,
  FakeCompassScorecardResultQueryError,
  //Links
  FakeCompassRepositoryLink,
  FakeCompassDocumentLink,
  FakeCompassProjectLink,
  FakeCompassDashboardLink,
  FakeCompassOtherLink,
  FakeCompassCommsChannelLink,
  FakeCompassOnCallLink,
  getFakeLink,
  getFakeLinks,
} from './factories';

export type { Resolvers } from './types';

export { fake } from './utils';
