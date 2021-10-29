import { flatten } from '../utils/flatten';
import { pick } from '../utils/pick';

import { Deployment } from './Deployment';
import { ClosedLock, OpenLock } from './Lock';

export class Environment {
  readonly branchRestrictions: { pattern: string; uuid: string }[] = [];
  readonly deployment_gate_enabled: boolean = false;
  readonly latest_deployment?: Partial<Deployment> = undefined;
  readonly latest_successful_deployment?: Partial<Deployment> = undefined;
  readonly lock: OpenLock | ClosedLock = new OpenLock();
  readonly name: string = '';
  readonly next_promotion: Partial<Deployment> = new Deployment();
  readonly rank: number = 0;
  readonly slug: string = '';
  readonly type: string = '';
  readonly uuid: string = '';
  readonly environment_type: any = undefined;
  readonly restrictions: any = undefined;
  // flattened props
  readonly 'environment_type.name': string = '';
  readonly 'next_promotion.release.source_branch': string = '';
  readonly 'restrictions.admin_only': boolean = false;

  constructor(props: Partial<Environment> = {}) {
    Object.assign(this, {
      ...pick(flatten(props), Object.keys(this)),
      ...(props.branchRestrictions
        ? { branchRestrictions: props.branchRestrictions }
        : {}),
      ...(props.latest_deployment
        ? { latest_deployment: new Deployment(props.latest_deployment) }
        : {}),
      ...(props.latest_successful_deployment
        ? {
            latest_successful_deployment: new Deployment(
              props.latest_successful_deployment,
            ),
          }
        : {}),
      ...(props.lock
        ? props.lock.name === 'CLOSED'
          ? { lock: new ClosedLock(props.lock) }
          : { lock: new OpenLock(props.lock) }
        : {}),
      next_promotion: new Deployment(props.next_promotion),
      type: ((props as any)?.environment_type?.name || '').toLowerCase(),
    });
    Object.freeze(this);
  }

  get isLocked(): boolean {
    return !this.lock || this.lock.name === 'CLOSED';
  }

  get hasDeployment(): boolean {
    return !!this.latest_deployment || !!this.latest_successful_deployment;
  }

  get hasAdminOnlyRestriction(): boolean {
    return this['restrictions.admin_only'];
  }

  get sourceBranch(): string {
    return this['next_promotion.release.source_branch'];
  }

  get nextPromotion(): Deployment | undefined {
    return this.next_promotion.uuid
      ? (this.next_promotion as Deployment)
      : undefined;
  }

  get environmentType(): string {
    return this['environment_type.name'].toLowerCase();
  }
}
