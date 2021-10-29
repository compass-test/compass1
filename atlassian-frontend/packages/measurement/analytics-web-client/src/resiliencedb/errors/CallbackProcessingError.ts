export const CallbackProcessingErrorName = 'CallbackProcessingError';
export default class CallbackProcessingError extends Error {
  constructor(error: unknown) {
    const messageFromError = error
      && typeof error === 'object'
      && 'toString' in error
      && typeof error.toString === 'function'
      && error.toString();
    const messageFromString = typeof error === 'string' && error;
    const message = messageFromError || messageFromString || 'Argument passed to CallbackProcessingError was not an Error or string.';
    super(`Error thrown while processing events in callback: ${message}`);
    // Must reset the prototypes after calling super of builtin classes
    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, CallbackProcessingError.prototype);
    this.name = CallbackProcessingErrorName;
  }
}
