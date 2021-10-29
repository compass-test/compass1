import {
  PipelinesClient as BaseClient,
  Pipeline,
  PipelineStep,
  CompletedPipelineStep,
  InprogressPipelineStep,
} from '@atlaskit/build-utils/bitbucket';

const stepIsNotPending = (
  step: PipelineStep,
): step is CompletedPipelineStep | InprogressPipelineStep =>
  step.state.name !== 'PENDING';

const stepHasCompleted = (step: PipelineStep): step is CompletedPipelineStep =>
  step.state.name === 'COMPLETED';

export class PipelineClient extends BaseClient {
  private getBuildType(pipeline: Pipeline) {
    switch (pipeline.target.selector.type) {
      case 'pull-requests':
        return 'pull-request';
      case 'branches':
      case 'custom':
        return pipeline.target.selector.pattern;
      case 'default':
      default:
        return 'default';
    }
  }

  private calculateBuildTime(pipeline: Pipeline, steps: PipelineStep[]) {
    let computedBuildTime = 0;
    const stepDurationArray = steps
      .filter(stepHasCompleted)
      .map(step => step.duration_in_seconds);
    // When there are many parallel steps, take the step that took the longest
    if (stepDurationArray.length > 1) {
      computedBuildTime += Math.max(...stepDurationArray, 30);
    }
    // Calculate approximate duration of current (final) step
    computedBuildTime += this.calculateSteptime(steps[steps.length - 1]);
    return Math.max(computedBuildTime, pipeline.duration_in_seconds ?? 0);
  }

  private calculateSteptime(step: PipelineStep) {
    return stepIsNotPending(step)
      ? (Date.now() - Date.parse(step.started_on)) / 1000
      : 0;
  }

  async getBuildInfo(buildNumberOrUuid: string) {
    const pipeline = await this.get(buildNumberOrUuid);
    const steps = await this.getSteps(buildNumberOrUuid);
    return {
      type: this.getBuildType(pipeline),
      time: this.calculateBuildTime(pipeline, steps.values),
      startedOn: pipeline.created_on,
    };
  }

  async getStepInfo(buildNumberOrUuid: string, stepNumber: number) {
    const pipeline = await this.get(buildNumberOrUuid);
    const steps = await this.getSteps(buildNumberOrUuid);
    const step = steps.values[stepNumber];
    return {
      type: this.getBuildType(pipeline),
      name: step.name,
      time: this.calculateSteptime(step),
      startedOn: stepIsNotPending(step) ? step.started_on : undefined,
    };
  }
}
