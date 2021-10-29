export class Account {
  readonly uuid: string = '';
  readonly addonKey: string = '';
  readonly userUuid: string = '';
  readonly accountId: string = '';
  readonly userEmail: string = '';
  readonly userHas2FaEnabled: boolean = false;
  readonly hasFetchedUser: boolean = false;
  readonly name: string = '';
  readonly avatarSrc: string = '';

  constructor(props: Partial<Account> = {}) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}
