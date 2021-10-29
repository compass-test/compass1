import { FetchError } from './errors/fetch-error';
import { RetryConfig, retryOnException } from './retry-operation';

const extraJsonFromResponse = (response: Response) => {
  if (response.ok) {
    return response.json();
  }

  throw new FetchError(
    `Unable to fetch ${response.url} ${response.status} ${response.statusText}`,
    response.status,
  );
};

export const fetchJson = <T>(url: string, init?: RequestInit): Promise<T> =>
  fetch(url, { credentials: 'include', ...init }).then(extraJsonFromResponse);

export const fetchJsonWithNetworkRetries = <T>(
  url: string,
  retryConfig: RetryConfig,
  init?: RequestInit,
): Promise<T> => {
  return retryOnException<Response>(
    () => fetch(url, { credentials: 'include', ...init }),
    retryConfig,
  ).then(extraJsonFromResponse);
};

export const postJson = <T>(url: string, data: any) =>
  fetchJson<T>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
