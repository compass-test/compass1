type BitbucketWorkspace = {
  name: string;
  avatar: string;
  slug: string;
};

export type BitbucketWorkspaceConnection = {
  connected: boolean;
  workspace: BitbucketWorkspace | null;
};
