export const getPipes = async () => {
  const response = await fetch(
    `https://api.bitbucket.org/2.0/repositories/bitbucketpipelines/official-pipes/src/master/pipes.prod.json`,
  );
  return await response.json();
};
