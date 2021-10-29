export interface Response {
  nextCallTimestamp: string;
  sessionExpiryTime?: string;
}

async function fetchRetry(
  url: string,
  options = {},
  retries = 5,
  backoff = 300,
): Promise<globalThis.Response> {
  const retryCodes = [408, 500, 502, 503, 504, 522, 524];
  const response = await fetch(url, options);
  if (response.ok || response.status === 401) {
    return response;
  }

  if (retries > 0 && retryCodes.includes(response.status)) {
    setTimeout(() => {
      return fetchRetry(url, options, retries - 1, backoff * 2);
    }, backoff);
  }

  return Promise.reject('retried for 5 times, stopped to call api');
}

export const postHeartbeat = async (
  endpoint: string,
  onAuthenticationFailed?: () => void,
): Promise<Response | void> => {
  try {
    const response = await fetchRetry(endpoint, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response && response.ok) {
      return response.json();
    }

    if (response.status === 401 && onAuthenticationFailed) {
      onAuthenticationFailed();
      return;
    }
  } catch (error) {
    console.warn(error);
  }
};
