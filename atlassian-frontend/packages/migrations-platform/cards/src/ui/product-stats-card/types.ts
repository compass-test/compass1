export type ProductKey =
  | 'jira-server'
  | 'confluence-server'
  | 'bitbucket-server';

export type ProductFamilyKey = 'jira' | 'confluence' | 'bitbucket';

export type UsersAndGroupsStats = {
  numberOfUsers: number;
  numberOfGroups: number;
};

export type ProductInstanceStats = {
  numberOfUsers: number;
  numberOfGroups: number;
  numberOfContainers: number;
  numberOfObjects: number;
  sizeOfAttachments: number;
  totalMigrationTime: number;
};

export type AppsStats = {
  count: number;
};

export type CustomersStats = {
  numberOfCustomers: number;
};

export type GetUsersAndGroupsStats = () => Promise<UsersAndGroupsStats>;

export type GetProductInstanceStats = () => Promise<ProductInstanceStats>;

export type GetAppsStats = () => Promise<AppsStats>;

export type GetCustomersStats = () => Promise<CustomersStats>;
