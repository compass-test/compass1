import { useEffect } from 'react';

import { IntercomProps, useIntercom } from 'react-use-intercom';

import { useIntercomEnabled } from '@atlassian/dragonfruit-feature-flags';
import {
  useGetAccountInfo,
  useTenantInfo,
} from '@atlassian/dragonfruit-tenant-context';

export const Intercom = () => {
  const { boot } = useIntercom();
  const intercomEnabled = useIntercomEnabled();
  const tenantInfo = useTenantInfo();
  const accountInfo = useGetAccountInfo();

  useEffect(() => {
    if (
      intercomEnabled &&
      tenantInfo.accountId &&
      tenantInfo.cloudId &&
      accountInfo.data?.email
    ) {
      const intercomProps: IntercomProps = {
        userId: tenantInfo.accountId,
        name: accountInfo.data?.name,
        email: accountInfo.data?.email,
        company: {
          companyId: tenantInfo.orgId,
          name: `${window.location.hostname} (${tenantInfo.cloudId})`,
          website: window.location.hostname,
        },
      };

      boot(intercomProps);
    }
  }, [
    boot,
    intercomEnabled,
    tenantInfo.accountId,
    tenantInfo.orgId,
    tenantInfo.cloudId,
    accountInfo.data?.email,
    accountInfo.data?.name,
  ]);

  return null;
};
