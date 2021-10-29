export const getPublicPath = (
  isPrivateWebsiteBuild: boolean,
  commitHash: string | null,
): string => {
  if (!isPrivateWebsiteBuild || !commitHash) {
    return '/';
  }

  // In CI, when building the website for public and private packages,
  // we need to use the hash & dist into the path.
  return `/atlassian-frontend/${commitHash}/`;
};
