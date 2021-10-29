export const getTemplates = async () => {
  const response = await fetch(
    `https://api.bitbucket.org/2.0/repositories/bitbucketpipelines/official-templates/src/master/templates.prod.json`,
  );
  return await response.json();
};
