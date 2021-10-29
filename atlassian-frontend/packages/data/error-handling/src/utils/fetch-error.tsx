/**
 * This class was originally copied over from jira-frontend.
 */
class ExtensibleError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}

/**
 * Generic HTTP error for calling Fetch.
 * <p>
 * This would be used if there isn't a specific HTTP error that you are expecting to receive from
 * the server. For example, a Bad Gateway error (502).
 */
export class FetchError extends ExtensibleError {
  statusCode: number;

  constructor(statusCode: number, message?: string) {
    super(message || `Fetch call failed with status code: ${statusCode}`);
    this.statusCode = statusCode;
  }
}
