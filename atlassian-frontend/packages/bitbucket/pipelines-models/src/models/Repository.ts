export class Repository {
  readonly uuid: string = '';
  readonly path: string = '';
  readonly enabled: boolean = false;
  readonly canWrite: boolean = false;
  readonly canWriteMainBranch: boolean = false;
  readonly userIsAdmin: boolean = false;
  readonly language: string = '';
  readonly displayName: string = '';
  readonly mainbranch: string = '';
  readonly scm: string = '';
  readonly link: string = '';
  readonly projectName: string = '';
  readonly projectKey: string = '';
  readonly hasFetched: boolean = false;
  readonly hasFetchedUserIsAdmin: boolean = false;
  readonly hasFetchedCanWriteMainBranch: boolean = false;
  readonly files: Array<string> = [];
  readonly apiBaseUrl: string = '';
  readonly name: string = '';

  constructor(props: Partial<Repository> = {}) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}
