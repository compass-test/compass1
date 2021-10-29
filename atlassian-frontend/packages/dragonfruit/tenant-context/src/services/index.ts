export {
  default as useGetTenantInfo,
  Environment,
  getEnvironmentFromOrigin,
  mockGetTenantInfo as mockTenantInfo,
  Product,
  Permission,
} from './get-tenant-info';
export type { TenantInfoState } from './get-tenant-info';

export {
  default as useGetAccountInfo,
  mockGetAccountInfo as mockAccountInfo,
} from './get-account-info';
export type { AccountInfoState } from './get-account-info';
