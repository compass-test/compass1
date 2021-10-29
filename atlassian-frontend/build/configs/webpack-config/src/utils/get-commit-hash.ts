export const getCommitHash = (): string | null => {
  if (!process.env.BITBUCKET_COMMIT) {
    return null;
  }

  return process.env.BITBUCKET_COMMIT.substr(0, 12);
};
