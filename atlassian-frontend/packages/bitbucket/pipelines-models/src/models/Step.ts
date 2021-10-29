import { convertStepStatus } from '../utils/convertStatus';
import { flatten } from '../utils/flatten';
import { pick } from '../utils/pick';

import { Artifact } from './Artifact';
import { Reason } from './Reason';
import { ResponseError } from './ResponseError';
import { Service } from './Service';
import { TestReportResult } from './TestReportResult';
import { User } from './User';

/* maps to https://bitbucket.org/
	  bitbucketci/rest-service/src/master/model/src/main/java/com/atlassian/pipelines/rest/model/v1/step/state/
*/
type StepStatusUnknown = 'UNKNOWN';
type StepStatusPending = 'PENDING' | 'PAUSED' | 'HALTED';
type StepStatusReady = 'READY' | 'STARTING_AGENT';
type StepStatusInProgress =
  | 'CLONING'
  | 'COMPLETING_LOGS'
  | 'DOWNLOADING_ARTIFACTS'
  | 'DOWNLOADING_CACHES'
  | 'PULLING_IMAGES'
  | 'PARSING_TEST_RESULTS'
  | 'RUNNING'
  | 'UPLOADING_ARTIFACTS'
  | 'UPLOADING_CACHES';
type StepStatusCompleted =
  | 'SYSTEM_ERROR'
  | 'USER_ERROR'
  | 'ERROR'
  | 'FAILED'
  | 'NOT_RUN'
  | 'STOPPED'
  | 'SKIPPED'
  | 'SUCCESSFUL';
export type StepStatusType =
  | StepStatusUnknown
  | StepStatusPending
  | StepStatusReady
  | StepStatusInProgress
  | StepStatusCompleted;
export const StepStatus: {
  [K in StepStatusType]: { text: string; color: string };
} = {
  UNKNOWN: {
    text: '',
    color: '',
  },
  PENDING: {
    text: '',
    color: '#0065FF',
  },
  PAUSED: {
    text: 'Waiting',
    color: '#C1C7D0',
  },
  HALTED: {
    text: 'Paused',
    color: '#FFAB00',
  },
  READY: {
    text: 'Queued',
    color: '#0065FF',
  },
  STARTING_AGENT: {
    text: 'Assigned to runner',
    color: '#0065FF',
  },
  CLONING: {
    text: 'Cloning',
    color: '#0065FF',
  },
  COMPLETING_LOGS: {
    text: 'Completing logs',
    color: '#0065FF',
  },
  DOWNLOADING_ARTIFACTS: {
    text: 'Downloading artifacts',
    color: '#0065FF',
  },
  DOWNLOADING_CACHES: {
    text: 'Downloading caches',
    color: '#0065FF',
  },
  PULLING_IMAGES: {
    text: 'Pulling images',
    color: '#0065FF',
  },
  PARSING_TEST_RESULTS: {
    text: 'Parsing test results',
    color: '#0065FF',
  },
  RUNNING: {
    text: 'Running',
    color: '#0065FF',
  },
  UPLOADING_ARTIFACTS: {
    text: 'Uploading artifacts',
    color: '#0065FF',
  },
  UPLOADING_CACHES: {
    text: 'Uploading caches',
    color: '#0065FF',
  },
  ERROR: {
    text: 'Error',
    color: '#FF5630',
  },
  SYSTEM_ERROR: {
    text: 'System error',
    color: '#FF5630',
  },
  USER_ERROR: {
    text: 'Configuration error',
    color: '#FF5630',
  },
  FAILED: {
    text: 'Failed',
    color: '#FF5630',
  },
  NOT_RUN: {
    text: 'Not run',
    color: '#A5ADBA',
  },
  STOPPED: {
    text: 'Stopped',
    color: '#FFAB00',
  },
  SKIPPED: {
    text: 'Skipped',
    color: '#FFAB00',
  },
  SUCCESSFUL: {
    text: 'Successful',
    color: '#36B27E',
  },
};

class StepStatusContainer {
  readonly statusType: StepStatusType = 'UNKNOWN';
  readonly reason: Reason | null = null;

  constructor(props: Partial<StepStatusContainer> = {}) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}

export class Step {
  readonly artifacts: Artifact[] = [];
  readonly build_seconds_used: number = 0;
  readonly completed_on: string = '';
  readonly duration_in_seconds: number = 0;
  readonly error: ResponseError | null = null;
  readonly log_byte_count: number = 0;
  readonly name: string = '';
  readonly run_number: number = 0;
  readonly runs_on: string[] = [];
  readonly services: Service[] = [];
  readonly size: number = 0;
  readonly started_on: string = '';
  readonly state: any = undefined;
  readonly statusContainer: StepStatusContainer = new StepStatusContainer();
  readonly stepSize: number = 1;
  readonly test_report: any = undefined;
  readonly trigger: any = undefined;
  readonly type: string = '';
  readonly uuid: string = '';

  // flattened properties
  readonly 'environment.name': string = '';
  readonly 'environment.uuid': string = '';
  readonly 'image.name': string = '';
  readonly 'parallel_group.group_name': any = null;
  readonly 'resource_limits.cpu_limit_in_millicores': number = 0;
  readonly 'resource_limits.memory_limit_in_megabytes': number = 0;
  readonly 'test_report.result': Partial<
    TestReportResult
  > = new TestReportResult();
  readonly 'trigger.triggerer': Partial<User> = new User();
  readonly 'trigger.type': string = '';

  constructor(props: Partial<Step> = {}) {
    const statusName = convertStepStatus(props.state) as StepStatusType;
    const hasError =
      statusName === 'ERROR' ||
      statusName === 'FAILED' ||
      statusName === 'SYSTEM_ERROR' ||
      statusName === 'STOPPED';
    const reason =
      statusName === 'HALTED' && props.state.stage
        ? new Reason(props.state.stage.reason)
        : null;
    const statusContainer = new StepStatusContainer({
      statusType: statusName,
      reason,
    });

    Object.assign(this, {
      ...pick(flatten(props), Object.keys(this)),
      state: props.state,
      runs_on: props.runs_on != null ? [props.runs_on] : [],
      artifacts:
        props.artifacts != null
          ? [props.artifacts.map(artifact => new Artifact(artifact))]
          : [],
      services:
        props.services != null
          ? [props.services.map(service => new Service(service))]
          : [],
      statusContainer,
      error:
        hasError &&
        props.state.result &&
        new ResponseError(props.state.result.error),
      stepSize: props.size || 1,
      'trigger.triggerer': new User(
        props.trigger != null ? props.trigger.triggerer : {},
      ),
      'test_report.result': new TestReportResult(
        props.test_report && props.test_report.result,
      ),
    });
    Object.freeze(this);
  }

  get status(): StepStatusType {
    return this.statusContainer.statusType;
  }

  get statusIcon() {
    if (this.isRedeployed) {
      return 'REDEPLOY';
    }
    return this.status;
  }

  get statusText(): string {
    if (this.statusContainer.statusType === 'STARTING_AGENT') {
      return `Assigned to ${this.runnerType} runner`;
    }
    return StepStatus[this.statusContainer.statusType].text;
  }

  get statusColor(): string {
    return StepStatus[this.statusContainer.statusType].color;
  }

  get statusReason(): Reason | null {
    return this.statusContainer.reason;
  }

  get isNotStarted(): boolean {
    return (
      this.statusContainer.statusType === 'PAUSED' ||
      this.statusContainer.statusType === 'PENDING' ||
      this.statusContainer.statusType === 'HALTED'
    );
  }

  get willNotRun(): boolean {
    return this.statusContainer.statusType === 'NOT_RUN';
  }

  get isReady(): boolean {
    return (
      this.statusContainer.statusType === 'READY' ||
      this.statusContainer.statusType === 'STARTING_AGENT'
    );
  }

  get isSuccessful(): boolean {
    return this.statusContainer.statusType === 'SUCCESSFUL';
  }

  get isFailed(): boolean {
    return this.statusContainer.statusType === 'FAILED';
  }

  get isStopped(): boolean {
    return this.statusContainer.statusType === 'STOPPED';
  }

  get isSkipped(): boolean {
    return this.statusContainer.statusType === 'SKIPPED';
  }

  get isPaused(): boolean {
    return this.statusContainer.statusType === 'PAUSED';
  }

  get isHalted(): boolean {
    return this.statusContainer.statusType === 'HALTED';
  }

  get hasError(): boolean {
    return (
      this.statusContainer.statusType === 'ERROR' ||
      this.statusContainer.statusType === 'FAILED' ||
      this.statusContainer.statusType === 'SYSTEM_ERROR'
    );
  }

  get hasExecuted(): boolean {
    return (
      !!this.statusContainer.statusType &&
      (this.statusContainer.statusType === 'CLONING' ||
        this.statusContainer.statusType === 'DOWNLOADING_ARTIFACTS' ||
        this.statusContainer.statusType === 'DOWNLOADING_CACHES' ||
        this.statusContainer.statusType === 'PULLING_IMAGES' ||
        this.statusContainer.statusType === 'RUNNING' ||
        this.statusContainer.statusType === 'UPLOADING_ARTIFACTS' ||
        this.statusContainer.statusType === 'UPLOADING_CACHES' ||
        this.statusContainer.statusType === 'COMPLETING_LOGS' ||
        this.statusContainer.statusType === 'PARSING_TEST_RESULTS' ||
        this.statusContainer.statusType === 'SYSTEM_ERROR' ||
        this.statusContainer.statusType === 'USER_ERROR' ||
        this.statusContainer.statusType === 'ERROR' ||
        this.statusContainer.statusType === 'FAILED' ||
        this.statusContainer.statusType === 'STOPPED' ||
        this.statusContainer.statusType === 'SUCCESSFUL')
    );
  }

  get isSyncing(): boolean {
    // verbose but type checked
    return (
      !this.statusContainer.statusType ||
      this.statusContainer.statusType === 'PENDING' ||
      this.statusContainer.statusType === 'READY' ||
      this.statusContainer.statusType === 'STARTING_AGENT' ||
      this.statusContainer.statusType === 'DOWNLOADING_ARTIFACTS' ||
      this.statusContainer.statusType === 'DOWNLOADING_CACHES' ||
      this.statusContainer.statusType === 'UPLOADING_ARTIFACTS' ||
      this.statusContainer.statusType === 'UPLOADING_CACHES' ||
      this.statusContainer.statusType === 'COMPLETING_LOGS' ||
      this.statusContainer.statusType === 'PULLING_IMAGES' ||
      this.statusContainer.statusType === 'PARSING_TEST_RESULTS' ||
      this.statusContainer.statusType === 'CLONING' ||
      this.statusContainer.statusType === 'RUNNING'
    );
  }

  get isComplete(): boolean {
    return (
      this.isSuccessful ||
      this.isFailed ||
      this.willNotRun ||
      this.isStopped ||
      this.isSkipped ||
      this.hasError
    );
  }

  get imageName(): string {
    return this['image.name'];
  }

  get isManual(): boolean {
    return this['trigger.type'] === 'pipeline_step_trigger_manual';
  }

  get isRedeploy(): boolean {
    return this['trigger.type'] === 'pipeline_step_trigger_redeploy';
  }

  get isRedeployed(): boolean {
    return this.isComplete && this.isRedeploy;
  }

  get redeployStatus() {
    if (!this.isRedeployed) {
      return '';
    }
    if (!this.isSuccessful) {
      return {
        statusIcon: 'failedRedeploy',
        statusText: 'Failed redeployment',
      };
    }
    return { statusIcon: 'redeploy', statusText: 'Successful redeployment' };
  }

  get rerunStatus() {
    if (this.run_number <= 1 || !this.isSuccessful) {
      return '';
    }
    return { statusIcon: 'successRerun', statusText: 'Successful rerun' };
  }

  get testReportResult(): TestReportResult {
    return this['test_report.result'] as TestReportResult;
  }

  get environmentUuid(): string {
    return this['environment.uuid'];
  }

  get environmentName(): string {
    return this['environment.name'];
  }

  get memoryLimitInMegabytes(): number {
    return this['resource_limits.memory_limit_in_megabytes'];
  }

  get cpuLimitInMilicores(): number {
    return this['resource_limits.cpu_limit_in_millicores'];
  }

  get totalMemoryLimitInMegabytes(): number {
    const sumServicesMemory = this.customServices.reduce(
      (sum: number, service: Service) => sum + service.memoryLimitInMegabytes,
      0,
    );
    return (
      this['resource_limits.memory_limit_in_megabytes'] + sumServicesMemory
    );
  }

  get customServices() {
    return this.services.filter(
      (service: any) =>
        !(service.origin === 'SYSTEM' && service.name === 'auth-proxy'),
    );
  }

  get hasEnvironment(): boolean {
    return !!this['environment.uuid'];
  }

  get isDeployable(): boolean {
    return (
      (this.isManual || this.isHalted) &&
      this.isNotStarted &&
      this.hasEnvironment
    );
  }

  get isRedeployable(): boolean {
    return this.hasEnvironment && (this.isSuccessful || this.isRedeployed);
  }

  get isRerunnable(): boolean {
    return this.hasExecuted && !this.isSuccessful;
  }

  get hasTestReportWithPassedTestCases(): boolean {
    const passedTestsCases = this.testReportResult
      .number_of_successful_test_cases;
    return this.isComplete && passedTestsCases > 0;
  }

  get hasTestReportWithFailedTestCases(): boolean {
    const failedTestsCases =
      this.testReportResult.number_of_failed_test_cases +
      this.testReportResult.number_of_error_test_cases;
    return this.isComplete && failedTestsCases > 0;
  }

  get hasArtifacts(): boolean {
    return this.isComplete && this.artifacts.length > 0;
  }

  get hasServices(): boolean {
    return !!(
      !this.uuid ||
      (this.uuid &&
        this.services.filter(
          (service: Service) =>
            !(service.origin === 'SYSTEM' && service.name === 'auth-proxy'),
        ).length > 0)
    );
  }

  get rerunCount(): string {
    return `${this.run_number - 1} ${this.run_number === 2 ? 'time' : 'times'}`;
  }

  get isParallel() {
    return !!this['parallel_group.group_name'];
  }

  get triggerer() {
    return this['trigger.triggerer']?.uuid ? this['trigger.triggerer'] : null;
  }

  get wasExecutedOnSelfHostedRunner(): boolean {
    return this.runs_on.length !== 0;
  }

  get runnerType(): string {
    return this.runs_on.length !== 0 ? 'self-hosted' : 'cloud';
  }
}
