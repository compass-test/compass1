/**
 * Checks if a [url] is valid, returning 'true' if it is, and 'false' otherwise.
 * The validation results should be as consistent with the backend as possible.
 * Ideally we would implement validation such that we check against a custom-defined whitelist.
 * ^ This has been tracked in https://softwareteams.atlassian.net/browse/COMPASS-2699
 */
export const validateUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    const scheme = parsedUrl.protocol; // `URL.protocol` returns the scheme including the final ':' (e.g. 'https:')

    // Disallow URLs with the 'javascript' scheme to prevent XSS attacks
    if (scheme === 'javascript:') {
      return false;
    }

    return true;
  } catch (e) {
    return false;
  }
};
