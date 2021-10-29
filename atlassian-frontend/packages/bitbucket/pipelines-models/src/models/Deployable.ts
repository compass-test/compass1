import { flatten } from '../utils/flatten';
import { pick } from '../utils/pick';

import { Commit } from './Commit';

export class Deployable {
  readonly commit: Partial<Commit> = new Commit();
  readonly created_on: string = '';
  readonly key: string = '';
  readonly name: string = '';
  readonly url: string = '';
  readonly uuid: string = '';

  constructor(props: Partial<Deployable> = {}) {
    Object.assign(this, {
      ...pick(flatten(props), Object.keys(this)),
      commit: new Commit(props.commit),
    });
    Object.freeze(this);
  }
}
