export const BETTER_TOGETHER_URL = '/gpa-cross-flow/better-together.html';

// Type safety for blank page redirects
interface BlankPageParams {
  cloudId: string;
  origin: string;
  sourceComponent: string;
  sourceContext: string;
  projectKey?: string | null;
  projectName?: string | null;
}

export const getBlankPageRedirectUrl = ({
  projectKey,
  projectName,
  ...args
}: BlankPageParams) => {
  const betterTogetherProperties = new URLSearchParams({
    ...args,
    createBlank: 'true',
    flow: 'post-expand',
  });

  // If there is a connected space. Done here as URLSearchParams doesn't allow for null/undefined values
  if (projectKey) {
    betterTogetherProperties.append('projectKey', projectKey);
  }
  if (projectName) {
    betterTogetherProperties.append('projectName', projectName);
  }

  return `${BETTER_TOGETHER_URL}?${betterTogetherProperties.toString()}`;
};
