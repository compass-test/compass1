import fetchMock from 'fetch-mock/cjs/client';

const STARGATE_ENDPOINT_COLLABS =
  '/gateway/api/collaboration/v1/collaborationgraph/user/user';

import { testCollaboratorsData } from './mock-data';

export function mockGetCollaborators(timeout = 500) {
  fetchMock.post(
    STARGATE_ENDPOINT_COLLABS,
    () =>
      new Promise((res) =>
        setTimeout(() => res(testCollaboratorsData), timeout),
      ),
    { method: 'POST', overwriteRoutes: true },
  );
}
