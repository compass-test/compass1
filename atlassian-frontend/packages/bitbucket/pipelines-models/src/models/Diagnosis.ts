export class Diagnosis {
  readonly key: string = '';
  readonly name: string = '';
  readonly logMatches: string = '';
  readonly links?: {
    name: string;
    url: string;
  }[] = [];
  readonly onStatus?: string = '';
  readonly description?: string = '';

  constructor(props: Partial<Diagnosis> = {}) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}
