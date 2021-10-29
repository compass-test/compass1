export function responseErrorToError(responseError: any): Error {
  let stringRepresentation = 'undefined';

  // Check if error response has a nested 'message' object, if so we use that instead.
  const error = responseError.message ? responseError.message : responseError;

  if (error) {
    // Convert it to string directly by default
    stringRepresentation = String(error);

    // If the error is an object we will try to JSON parse it
    if (typeof error === 'object') {
      try {
        // Try to parse it as JSON
        stringRepresentation = JSON.stringify(responseError);
      } catch {
        // Swallow all stringify errors
      }
    }
  }

  return new Error(stringRepresentation);
}
