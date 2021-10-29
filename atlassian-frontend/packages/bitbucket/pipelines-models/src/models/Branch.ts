export class Links {
  readonly commits?: string = '';
  readonly html?: string = '';
  readonly self?: string = '';

  constructor(props: Partial<Links> = {}) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}

export class Branch {
  readonly default_merge_strategy?: string = '';
  readonly links?: Links = new Links();
  readonly merge_strategies?: Array<string> = [];
  readonly name: string = '';
  readonly type?: string = '';
  readonly target?: any;

  constructor(props: Partial<Branch> = {}) {
    Object.assign(this, {
      ...props,
      links: new Links(props.links),
    });
    Object.freeze(this);
  }
}

export class Branches {
  readonly list: Array<Branch> = [];
  readonly page: number = 0;

  constructor(props: Partial<Branches> = {}) {
    Object.assign(this, {
      ...props,
      list: props.list?.map(branch => new Branch(branch)),
    });
    Object.freeze(this);
  }
}
