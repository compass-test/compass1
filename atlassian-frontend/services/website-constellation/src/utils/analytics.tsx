const camelCase = (str: string) => {
  return str.replace(/( |-)./g, (match) => {
    return match.replace(' ', '').replace('-', '').toUpperCase();
  });
};

export const normalizeSourceName = (...parts: string[]) => {
  return parts
    .filter(Boolean)
    .map((part, index) => {
      const trimmedPart = part.trimLeft();
      if (index === 0) {
        return trimmedPart[0].toLowerCase() + camelCase(trimmedPart.slice(1));
      }

      return (
        trimmedPart[0].toUpperCase() +
        camelCase(trimmedPart.slice(1).toLowerCase())
      );
    })
    .join('');
};

/**
 * Factory function that returns an analytics client.
 * Purely some sugar to make testing easier.
 */
export const createAnalyticsClient = (options: {
  version: string;
  product: string;
  env: string;
  locale: string;
  useLegacyUrl: boolean;
}) => {
  // We require this so it's lazily instantiated (doesn't run on SSR!)
  const AnalyticsWebClient = require('@atlassiansox/analytics-web-client')
    .default;
  const { useLegacyUrl, ...opts } = options;
  // See repo for setup instructions:
  // https://bitbucket.org/atlassian/analytics-web-client/src/master/
  return new AnalyticsWebClient(opts, { useLegacyUrl });
};
