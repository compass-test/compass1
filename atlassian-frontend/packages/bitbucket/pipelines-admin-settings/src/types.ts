export type Account = {
  hasFetchedUser: boolean;
  userHas2FaEnabled: boolean;
};

export type Capabilities = {
  hasFetchedCapabilities: boolean;
  pipelinesEnabled: boolean;
};

export type BuildConfiguration = {
  hasYmlFile: boolean;
  hasFetchedRawYmlFile: boolean;
};
