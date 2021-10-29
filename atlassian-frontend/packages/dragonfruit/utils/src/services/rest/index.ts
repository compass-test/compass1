export class FetchError extends Error {
  statusCode: number;
  errorType: String | undefined;

  constructor(
    message: string,
    statusCode: number,
    errorType: String | undefined = undefined,
  ) {
    super(message);
    this.name = 'FetchError';
    this.statusCode = statusCode;
    this.errorType = errorType;
  }
}

export const fetchJson = <T>(url: string, init?: RequestInit): Promise<T> =>
  fetch(url, { credentials: 'include', ...init }).then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new FetchError(
      `Unable to fetch ${url} ${response.statusText}`,
      response.status,
    );
  });

export const postJson = <T>(url: string, data: any) =>
  fetchJson<T>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
