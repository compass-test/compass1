const getStorybookUrls = async () => {
  const { BITBUCKET_COMMIT } = process.env;
  const storybookPrefix = BITBUCKET_COMMIT;

  return {
    STORYBOOK_PREFIX: storybookPrefix,
    STORYBOOK_URL: `https://ss-search-dialog-story.ap-southeast-2.dev.public.atl-paas.net/${BITBUCKET_COMMIT}/index.html`,
    MASTER_STORYBOOK_URL: `https://ss-search-dialog-story.ap-southeast-2.dev.public.atl-paas.net/latest/index.html`,
  };
};

export default getStorybookUrls;
