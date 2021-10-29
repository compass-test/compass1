export const addQuery = (url: string, key: string, unencodedValue: string) => {
  return addQueryParams(url, { [key]: unencodedValue });
};

export const addQueryParams = (url: string, params: object) => {
  if (!url) {
    return url;
  }

  const sanitisedUrl =
    url.endsWith('?') || url.endsWith('&') ? url.slice(0, url.length - 1) : url;

  const paramsString = Object.entries(params).reduce(
    (rest, [key, unencodedValue]) => {
      if (!key) {
        return rest;
      }
      const nextPart = `${encodeURIComponent(key)}=${encodeURIComponent(
        unencodedValue,
      )}`;

      if (rest) {
        return `${rest}&${nextPart}`;
      }

      return nextPart;
    },
    '',
  );

  if (!paramsString) {
    return url;
  }

  // If it has a query string already
  if (sanitisedUrl.includes('?')) {
    return `${sanitisedUrl}&${paramsString}`;
  }

  return `${sanitisedUrl}?${paramsString}`;
};
