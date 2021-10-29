import { AtlRequestInit, FetchError } from './types';

const defaultFetchOptions: Partial<RequestInit> = {
  mode: 'cors',
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
};

const appendHeadersToOptions = (options: AtlRequestInit = {}): RequestInit => {
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  const { org, cloudId, ...rest } = options;
  return { ...rest };
};

const fetchAPI = (url: RequestInfo, options: AtlRequestInit = {}) =>
  fetch(url, {
    ...defaultFetchOptions,
    ...options,
    headers: { ...defaultFetchOptions.headers, ...options.headers },
  });

export const parseResponse = (response: Response) => {
  if (response.ok) {
    if (response.status === 204) {
      return response.status;
    }
    return response.json();
  } else {
    const statusText = response.statusText || 'Non-200 response';
    const error = new Error(statusText) as FetchError;
    error.statusText = statusText;
    error.status = response.status;
    throw error;
  }
};

export const get = async (url: string, options: AtlRequestInit) => {
  const resp = await fetchAPI(`${url}`, {
    ...appendHeadersToOptions(options),
    method: 'GET',
  });
  return parseResponse(resp);
};

export const put = async <T>(url: string, body: T, options: AtlRequestInit) => {
  const resp = await fetchAPI(`${url}`, {
    ...appendHeadersToOptions(options),
    body: JSON.stringify(body),
    method: 'PUT',
  });

  return parseResponse(resp);
};

export const post = async <T>(
  url: string,
  body: T,
  options: AtlRequestInit,
) => {
  const resp = await fetchAPI(`${url}`, {
    ...appendHeadersToOptions(options),
    body: JSON.stringify(body),
    method: 'POST',
  });

  return parseResponse(resp);
};
