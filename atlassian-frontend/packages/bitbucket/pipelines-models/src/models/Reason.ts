import { User } from './User';

export class Reason {
  readonly actor: User = new User();
  readonly pipeline_uuid: string = '';
  readonly step_uuid: string = '';
  readonly type: string = '';

  constructor(props: Partial<Reason> = {}) {
    Object.assign(this, { ...props, actor: new User(props.actor) });
    Object.freeze(this);
  }

  get pipelineUuid() {
    return this.pipeline_uuid;
  }

  get stepUuid() {
    return this.step_uuid;
  }

  get isAllowanceExceededReason() {
    return this.type === 'pipeline_step_halted_reason_allowance_exceeded';
  }

  get isDeploymentConcurrencyReason() {
    return this.type === 'pipeline_step_halted_reason_concurrent_deployment';
  }

  get isUserHasNoDeploymentPermissionsReason() {
    return (
      this.type ===
      'pipeline_step_halted_reason_user_has_no_environment_permissions'
    );
  }

  get isBranchHasNoDeploymentPermissionsReason() {
    return (
      this.type === 'pipeline_step_halted_reason_branch_blocked_deployment'
    );
  }

  get isDeploymentGateChecksRequiredReason() {
    return (
      this.type ===
      'pipeline_step_halted_reason_deployment_gated_checks_required'
    );
  }

  get isDeploymentGateFailedReason() {
    return this.type === 'deployment_gate_failed_halted_reason';
  }

  get warningText(): string | null {
    if (this.isDeploymentGateChecksRequiredReason) {
      return 'Change request pending';
    }
    return null;
  }
}
