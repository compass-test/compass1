export class HttpResponseError extends Error {
  statusCode: number;
  body?: any;

  constructor(resourceName: string, statusCode: number, body?: any) {
    super(`Unable to fetch ${resourceName}, status: ${statusCode}`);
    this.name = 'HttpResponseError';
    this.statusCode = statusCode;
    this.body = body;

    // necessary as Subclassing Error needs special treatment in typescript for some compilation targets
    //https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, HttpResponseError.prototype);
  }
}

/**
 * Throws and {@link HttpResponseError} when server returned an error
 * @param resourceName - name of the resource - used in the error message
 * @param response - the response from server to check
 */
export const rejectOnHttpError = async (
  resourceName: string,
  response: Response | Promise<Response>,
): Promise<Response> => {
  const res: Response = await response;
  if (res.ok) {
    return response;
  }

  throw new HttpResponseError(
    resourceName,
    res.status,
    // ignore error if there is no body,
    // there is no way to check if body is set as https://developer.mozilla.org/en-US/docs/Web/API/Body/bodyUsed is not supported by many browsers
    await res.json().catch(() => undefined),
  );
};
