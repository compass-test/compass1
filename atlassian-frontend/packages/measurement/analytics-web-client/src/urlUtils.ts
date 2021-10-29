import { omitBy, pickBy } from './objectUtils';

const { parseUrl, stringify } = require('query-string');

export const defaultHistoryReplaceFn = (newUrl: any) => window.history.replaceState({}, '', newUrl);

const urlParamExtractor = (
  isCaptureParam: any,
  historyReplaceFn = defaultHistoryReplaceFn,
) => {
  // Extract target parameters and values from URL if present
  const originalUrl = window.location.href;
  const fragmentHash = window.location.hash;
  const removedFragmentURL = fragmentHash !== '' ? originalUrl.replace(fragmentHash, '') : originalUrl;
  const { url, query } = parseUrl(removedFragmentURL);
  const captureParams = pickBy(query, isCaptureParam);

  // Do not modify URL if no matches
  if (Object.keys(captureParams).length > 0) {
    const queryWithoutCaptureParams = omitBy(query, isCaptureParam);

    // Replace the URL minus captured parameters
    if (Object.keys(queryWithoutCaptureParams).length > 0) {
      const newUrl = `${url}?${stringify(
        queryWithoutCaptureParams,
      )}${fragmentHash}`;
      historyReplaceFn(newUrl);
    } else {
      historyReplaceFn(`${url}${fragmentHash}`);
    }
  }
  return captureParams;
};

export default urlParamExtractor;
