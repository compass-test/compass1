export const MockProductPermission = {
  productId: 'jira-software',
  productName: 'Jira Software',
  permissions: ['WRITE'],
};

export const MockProductRole = {
  groupId: 'd338d2df-559d-4224-84f4-ae90956623a0',
  productId: 'jira-software',
  workspaceName: 'mpan-test-pu-live',
  workspaceId: 'b15b5c71-5124-41de-b716-405ccfbb4476',
  groupDefaultForRole: false,
  role: 'product/member',
  productAri:
    'ari:cloud:jira-software::site/b15b5c71-5124-41de-b716-405ccfbb4476',
};

export const MockGroup = {
  id: 'd338d2df-559d-4224-84f4-ae90956623a0',
  name: 'All users from G Suite',
  description:
    'Grants access to all applications and their administration features (excluding Site administration)',
  productPermissions: [MockProductPermission],
  defaultForProducts: [],
  sitePrivilege: 'NONE',
  userTotal: 0,
  unmodifiable: false,
  managementAccess: 'ALL',
  platformRole: null,
  productRoles: [MockProductRole],
  ownerType: null,
};

export const MockGroupResponse = {
  groups: [MockGroup],
  total: 1,
};
