export class ResponseError {
  readonly arguments: any = {};
  readonly key: string = '';
  readonly message: string = '';
  readonly name: string = '';
  readonly type: string = '';

  constructor(props: Partial<ResponseError> = {}) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}
