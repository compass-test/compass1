import { useMemo } from 'react';

// @ts-expect-error: `implicitly has an 'any' type` error should go away
// once https://team.atlassian.com/project/ATLAS-414 is shipped
import { CoordinationClient } from '@atlassiansox/engage-coordination';

import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';

const STARGATE_URL = '/gateway/api';

export function useCoordinationClient(): CoordinationClient {
  const tenantInfo = useTenantInfo();
  const client = useMemo(
    () => new CoordinationClient(tenantInfo.cloudId, STARGATE_URL),
    [tenantInfo.cloudId],
  );

  return client;
}
