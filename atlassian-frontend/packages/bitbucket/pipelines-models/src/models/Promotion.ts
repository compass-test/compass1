export class Promotion {
  readonly changes?: any;
  readonly environment: any;

  constructor(props: Partial<Promotion> = {}) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}
