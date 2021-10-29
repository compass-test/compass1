/* eslint-disable no-underscore-dangle */
export class ResponseError extends Error {
  private readonly _status: number;

  private readonly _body: string;

  constructor(status: number, body: string) {
    // Extending error requires this workaround, see https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    super(`Response Error: ${status}`);
    Object.setPrototypeOf(this, ResponseError.prototype);

    this._status = status;
    this._body = body;
  }

  get status(): number {
    return this._status;
  }

  get body(): string {
    return this._body;
  }
}
