import React, { ReactNode, useContext } from 'react';

import { TenantInfoState } from '../../services';
import {
  Permission,
  Product,
  TenantInfoResult,
} from '../../services/get-tenant-info/types';

const TenantInfoContext = React.createContext<TenantInfoState | undefined>(
  undefined,
);

export const TenantInfoProvider = ({
  value,
  children,
}: {
  value: TenantInfoState;
  children: ReactNode;
}) => (
  <TenantInfoContext.Provider value={value}>
    {children}
  </TenantInfoContext.Provider>
);

export const useTenantInfo = (): TenantInfoResult => {
  const tenantInfo = useContext(TenantInfoContext);

  if (tenantInfo === undefined) {
    throw new Error('useTenantInfo must be used within a TenantInfoProvider');
  }

  if (tenantInfo.loading || tenantInfo.data == null) {
    // We shouldn't run into this error as our application doesn't start fully rendering until
    // AppStateContext has success=true.
    throw new Error('Tenant info is not available yet.');
  }

  const getAvailableProductData = (targetProduct: Product) => {
    return tenantInfo?.data?.availableProducts?.find(
      (availableProduct) => availableProduct.product === targetProduct,
    );
  };

  const isAdmin = (): boolean =>
    Boolean(tenantInfo?.data?.permissions?.includes(Permission.MANAGE));

  return { getAvailableProductData, isAdmin, ...tenantInfo.data };
};
