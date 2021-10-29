/*
 * util to support defining url for the examples website to be used in webdriver tests.
 */

/**
 * @see https://www.browserstack.com/question/663
 */

const PORT = process.env.ATLASKIT_DEV_PORT || process.env.PORT || 9000;
const { CI } = process.env;

export const getExampleUrl = (
  groupId: string,
  packageId: string,
  exampleId?: string,
  baseUrl = `http://${CI ? 'bs-local.com' : '127.0.0.1'}:${PORT}`,
  params?: { [key: string]: string | boolean },
): string => {
  const queryStrings = new URLSearchParams({
    groupId,
    packageId,
    ...(exampleId ? { exampleId } : {}),
    ...(params || {}),
  });

  return `${baseUrl}/examples.html?${queryStrings.toString()}`;
};
