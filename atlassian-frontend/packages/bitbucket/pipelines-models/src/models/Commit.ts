import { flatten } from '../utils/flatten';
import { pick } from '../utils/pick';

import { User } from './User';

export class Commit {
  readonly author: any = undefined;
  readonly parents: any = undefined;
  readonly summary: any = undefined;
  readonly date: string = '';
  readonly hash: string = '';
  readonly message: string = '';
  // flattened props
  readonly 'author.user': User = new User();
  readonly 'links.html.href': string = '';
  readonly 'links.self.href': string = '';
  readonly 'parents.0.hash': string = '';
  readonly 'summary.html': string = '';

  constructor(props: Partial<Commit> = {}) {
    Object.assign(this, {
      ...pick(flatten(props), Object.keys(this)),
      ...(props.author && props.author.user
        ? { 'author.user': new User(props.author.user) }
        : {}),
    });
    Object.freeze(this);
  }

  get shortHash() {
    return this.hash.substr(0, 7);
  }

  get parentHash() {
    return this['parents.0.hash'];
  }

  get url() {
    return this['links.html.href'];
  }
}
