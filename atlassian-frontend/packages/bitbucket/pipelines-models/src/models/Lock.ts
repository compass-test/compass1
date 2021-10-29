export class PipelinesDeploymentLockOpener {
  readonly pipeline_uuid: string = '';
  readonly step_uuid: string = '';
  readonly type: string = '';

  constructor(props: Partial<PipelinesDeploymentLockOpener> = {}) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}

export class OpenLock {
  readonly name: string = 'OPEN';

  constructor(props: Partial<OpenLock> = {}) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}

export class ClosedLock {
  readonly name: string = '';
  readonly owner: PipelinesDeploymentLockOpener = null as any;

  constructor(props: Partial<ClosedLock> = {}) {
    const owner = props.owner
      ? new PipelinesDeploymentLockOpener(props.owner)
      : null;
    Object.assign(this, { ...props, owner });
    Object.freeze(this);
  }
}
