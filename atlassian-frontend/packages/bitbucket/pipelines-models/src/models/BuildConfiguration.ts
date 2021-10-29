export class BuildConfiguration {
  readonly hasFetchedRawYmlFile: boolean = false;
  readonly hasYmlFile: boolean = true;
  readonly isCommiting: boolean = false;
  readonly isCommitingError: any = null;
  readonly matchingLineNumber: number = 1;
  readonly yml: string = '';

  constructor(props: Partial<BuildConfiguration> = {}) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}
