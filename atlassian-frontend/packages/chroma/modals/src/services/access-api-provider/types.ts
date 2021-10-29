import { Permission } from '../../common/constants';

export interface ProductPermission {
  productId: string;
  productName: string;
  permissions: Permission;
}

export interface ProductRole {
  groupId: string;
  productId: string;
  workspaceName: string;
  workspaceId: string;
  groupDefaultForRole: boolean;
  role: string;
  productAri: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  productPermissions: ProductPermission[];
  defaultForProducts: Array<string>;
  sitePrivilege: string;
  userTotal: number;
  unmodifiable: boolean;
  managementAccess: string;
  platformRole: string | null;
  productRoles: ProductRole[];
  ownerType: string | null;
}

export interface GroupResponse {
  groups: Group[];
  total: number;
}

export interface GroupBody {
  groups: string[];
}

export interface ResponseHook {
  statusCode: number;
}
