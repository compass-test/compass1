export const AbandonWriteErrorName = 'AbandonWriteError';

export default class AbandonWriteError extends Error {
  constructor(source: string) {
    super(`Event Limit reached. Abandoning write to: ${source}`);

    // Must reset the prototypes after calling super of builtin classes
    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, AbandonWriteError.prototype);
    this.name = AbandonWriteErrorName;
  }
}
