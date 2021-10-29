import { getPrFromCommit } from '@atlaskit/build-utils/bitbucket';

const getPrId: () => Promise<number | undefined> = async () => {
  const {
    BITBUCKET_PR_ID,
    BITBUCKET_REPO_FULL_NAME,
    BITBUCKET_COMMIT,
  } = process.env;

  if (BITBUCKET_PR_ID) {
    return (BITBUCKET_PR_ID as unknown) as number | undefined;
  }

  const pr = await getPrFromCommit(
    BITBUCKET_COMMIT!,
    BITBUCKET_REPO_FULL_NAME!,
  );

  return pr ? pr.id : undefined;
};

export { getPrId };
