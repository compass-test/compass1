/**
 * @param url The URL you want to sanitize
 * @returns A URL string without any user generated content (UGC) or PII (personally identifiable information). The URL will not necessarily be valid URL.
 */
export const sanitizeUrlString = (url: string) => {
  // TODO: Should redact anything not from atlassian.com/atlassian.net/bitbucket.org/etc
  return url.replace(/\?.*$/, '');
};

// TODO: Export a version that works with URL objects
