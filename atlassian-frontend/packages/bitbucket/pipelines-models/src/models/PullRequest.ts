import { flatten } from '../utils/flatten';
import { pick } from '../utils/pick';

import { Commit } from './Commit';
import { User } from './User';

enum StateCategoryToAppearenceMap {
  OPEN = 'inprogress',
  MERGED = 'success',
  DECLINED = 'removed',
}

export class PullRequest {
  readonly author: User = new User();
  readonly created_on: string = '';
  readonly updated_on: string = '';
  readonly id: string = '';
  readonly merge_commit: Commit = new Commit();
  readonly source: any = {};
  readonly destination: any = {};
  readonly state: keyof typeof StateCategoryToAppearenceMap = 'OPEN';
  readonly title: string = '';
  readonly type: string = '';
  // flattened props
  readonly 'links.html.href': string = '';
  readonly 'links.self.href': string = '';
  readonly 'destination.branch.name': string = '';
  readonly 'source.branch.name': string = '';
  readonly 'source.commit': Commit = new Commit();

  constructor(props: Partial<PullRequest> = {}) {
    Object.assign(this, {
      ...pick(flatten(props), Object.keys(this)),
      author: new User(props.author || {}),
      merge_commit: new Commit(props.merge_commit || {}),
      ...(props.source && props.source.commit
        ? { 'source.commit': new Commit(props.source.commit) }
        : {}),
    });
    Object.freeze(this);
  }
  get destinationBranch() {
    return this['destination.branch.name'];
  }

  get url() {
    return this['links.html.href'];
  }

  get mergeCommit() {
    return this.merge_commit;
  }

  get sourceBranch() {
    return this['source.branch.name'];
  }

  get sourceCommit() {
    return this['source.commit'];
  }

  get stateApperance() {
    return StateCategoryToAppearenceMap[this.state];
  }
}
