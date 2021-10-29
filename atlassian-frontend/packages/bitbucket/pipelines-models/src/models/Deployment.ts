import { flatten } from '../utils/flatten';
import { pick } from '../utils/pick';

import { Deployable } from './Deployable';
import { Step } from './Step';
import { User } from './User';

export type DeploymentStatusType =
  | ''
  | 'FAILED'
  | 'IN_PROGRESS'
  | 'STOPPED'
  | 'SUCCESSFUL'
  | 'UNDEPLOYED'
  | 'REDEPLOY'
  | 'RERUN'
  | 'FAILED_REDEPLOY';

export type DeploymentStatusIconType =
  | ''
  | 'failed'
  | 'building'
  | 'stopped'
  | 'success'
  | 'undeployed'
  | 'redeploy'
  | 'rerun'
  | 'failedRedeploy';

const DeploymentStatus: {
  [K in DeploymentStatusType]: {
    icon: DeploymentStatusIconType;
    text: string;
    lozengeAppearance: string;
  };
} = {
  '': {
    icon: '',
    text: '',
    lozengeAppearance: 'default',
  },
  FAILED: {
    icon: 'failed',
    text: 'Failed',
    lozengeAppearance: 'removed',
  },
  IN_PROGRESS: {
    icon: 'building',
    text: 'In progress',
    lozengeAppearance: 'inprogress',
  },
  STOPPED: {
    icon: 'stopped',
    text: 'Stopped',
    lozengeAppearance: 'moved',
  },
  SUCCESSFUL: {
    icon: 'success',
    text: 'Successful',
    lozengeAppearance: 'success',
  },
  REDEPLOY: {
    icon: 'redeploy',
    text: 'Redeployment',
    lozengeAppearance: 'success',
  },
  FAILED_REDEPLOY: {
    icon: 'failedRedeploy',
    text: 'Failed redeployment',
    lozengeAppearance: 'removed',
  },
  RERUN: {
    icon: 'rerun',
    text: 'Rerun',
    lozengeAppearance: 'success',
  },
  UNDEPLOYED: {
    icon: 'success',
    text: 'Undeployed',
    lozengeAppearance: 'default',
  },
};

export class DeploymentState {
  readonly completed_on: string = '';
  readonly deployer: Partial<User> = new User();
  readonly last_successful_deployment: Partial<Deployment> = null as any; // circular dep
  readonly name: string = '';
  readonly started_on: string = '';
  readonly status: string = '';
  readonly triggerUrl: string = '';
  readonly url: string = '';
  readonly step: Partial<Step> = new Step();
  // flattened props
  readonly 'status.name': string = '';

  constructor(props: Partial<DeploymentState> = {}) {
    Object.assign(this, {
      ...pick(flatten(props), Object.keys(this)),
      step: new Step(props.step),
      deployer: props.deployer ? new User(props.deployer) : null,
      last_successful_deployment: props.last_successful_deployment
        ? new Deployment(props.last_successful_deployment)
        : null,
    });
    Object.freeze(this);
  }

  get statusIcon(): DeploymentStatusIconType {
    return DeploymentStatus[this.parsedStatus].icon;
  }

  get statusText(): string {
    return DeploymentStatus[this.parsedStatus].text;
  }

  get statusLozengeAppearance(): string {
    return DeploymentStatus[this.parsedStatus].lozengeAppearance;
  }

  get parsedStatus(): DeploymentStatusType {
    let statusName = this['status.name'] || this.status;
    if (this.step?.isRedeploy) {
      statusName = this.step?.isSuccessful ? 'REDEPLOY' : 'FAILED_REDEPLOY';
    } else if (Number(this.step?.run_number) > 1 && this.step?.isSuccessful) {
      statusName = 'RERUN';
    }
    return this.name === 'IN_PROGRESS' || this.name === 'UNDEPLOYED'
      ? this.name
      : (statusName as DeploymentStatusType);
  }
}

export class Deployment {
  readonly deployable: Partial<Deployable> = new Deployable();
  readonly state: Partial<DeploymentState> = null as any; // circular dep
  readonly step: Partial<Step> = new Step();
  readonly uuid: string = '';
  // flattened props
  readonly environment: any = undefined;
  readonly 'environment.name': string = '';
  readonly 'environment.uuid': string = '';

  constructor(props: Partial<Deployment> = {}) {
    Object.assign(this, {
      ...pick(flatten(props), Object.keys(this)),
      deployable: new Deployable(props.deployable),
      state: new DeploymentState({
        ...props.state,
        // copy props
        step: Object.assign({}, props.step),
      }),
      step: new Step(props.step),
    });
    Object.freeze(this);
  }

  get environmentUuid(): string {
    return this['environment.uuid'];
  }

  get environmentName(): string {
    return this['environment.name'];
  }
}
