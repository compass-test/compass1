import { flatten } from '../utils/flatten';
import { pick } from '../utils/pick';

export class User {
  readonly 'links.avatar.href': string = '';
  readonly 'links.html.href': string = '';
  readonly 'links.self.href': string = '';
  readonly display_name: string = '';
  readonly username: string = '';
  readonly links: any = undefined;
  readonly uuid: string = '';
  readonly has_2fa_enabled: boolean = false;

  constructor(props: Partial<User> & Partial<{ links: Object }> = {}) {
    Object.assign(this, {
      ...pick(flatten(props), Object.keys(this)),
    });
    Object.freeze(this);
  }

  get avatarUrl() {
    return this['links.avatar.href'];
  }

  get accountUrl() {
    return this['links.html.href'];
  }

  get displayName() {
    return this.display_name;
  }

  get has2FaEnabled() {
    return this.has_2fa_enabled;
  }
}
