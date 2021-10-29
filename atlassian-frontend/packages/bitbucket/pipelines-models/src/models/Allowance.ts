export class Artifact {
  readonly startDate: string = '';
  readonly endDate: string = '';
  readonly totalUsage: number = -1;
  readonly quota: number = -1;
  readonly percentageUsed: number = -1;
  readonly hasFetched: boolean = false;
  readonly hasPermissionToView: boolean = false;
  readonly isTrusted: boolean = true;

  constructor(props: Partial<Artifact> = {}) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}
