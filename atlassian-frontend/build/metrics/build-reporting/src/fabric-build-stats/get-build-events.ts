/*
 * Utilities helper to get build data.
 */
import fs from 'fs';
import path from 'path';
import axios, { AxiosInstance } from 'axios';
import yaml from 'js-yaml';

import { IStepsDataType, IBuildEventProperties, IPipelines } from './types';

export class FabricBuildStats {
  private axiosInstance: AxiosInstance;

  constructor() {
    const {
      BITBUCKET_REPO_FULL_NAME,
      BITBUCKET_USER,
      BITBUCKET_PASSWORD,
    } = process.env;

    if (!BITBUCKET_REPO_FULL_NAME || !BITBUCKET_USER || !BITBUCKET_PASSWORD) {
      throw Error(
        '$BITBUCKET_REPO_FULL_NAME or $BITBUCKET_USER or $BITBUCKET_PASSWORD environment variables are not set',
      );
    }

    this.axiosInstance = axios.create({
      baseURL: `https://api.bitbucket.org/2.0/repositories/${BITBUCKET_REPO_FULL_NAME}`,
      auth: {
        username: BITBUCKET_USER,
        password: BITBUCKET_PASSWORD,
      },
    });
  }

  returnStepsPerBuildType(
    pipelines: IPipelines,
    type: string,
    buildName: string,
  ) {
    if (type === 'default') {
      return pipelines.default;
    }
    if (type === 'pull-requests') {
      return pipelines['pull-requests']['**'];
    }
    if (type === 'custom') {
      return pipelines.custom[buildName];
    }
    throw new Error('Pipelines type not found!');
  }

  /* This function computes build time if build.duration_in_seconds returns 0, it is often applicable for 1 step build.
   * The Bitbucket computation is simple, they sum the longest step time with the shortest one.
   */
  async computeBuildTime(stepsData: Array<IStepsDataType>) {
    let buildDuration;
    // We need to filter if step_duration exists and if step is not run.
    const stepDurationArray = stepsData
      .filter(step => step.step_duration && step.step_status !== 'NOT_RUN')
      .map(step => step.step_duration);
    // When a build has 1 step, we can't apply this function, we take the only available value.
    if (stepDurationArray.length === 1) {
      // eslint-disable-next-line prefer-destructuring
      buildDuration = stepDurationArray[0];
    } else {
      // The minimum step duration cannot be 0 and it is in avg 30s in AK.
      const minStepDuration =
        Math.min.apply(null, stepDurationArray) === 0
          ? 30
          : Math.min.apply(null, stepDurationArray);
      buildDuration = Math.max.apply(null, stepDurationArray) + minStepDuration;
    }
    return buildDuration;
  }

  /* This function returns the build duration time. */
  async getBuildTime(stepsData: Array<IStepsDataType>, buildTime?: number) {
    const computedBuildTime = await this.computeBuildTime(stepsData);
    if (buildTime) {
      if (computedBuildTime > buildTime) {
        return computedBuildTime;
      }
      return buildTime;
    }
    return computedBuildTime;
  }

  /* This function computes step time if step.duration_in_seconds returns undefined or 0.
   * The function returns the difference between the current time and when the step started,
   * It is more likely applicable for 1 step build.
   */
  async computeStepTimes(stepStartTime: string) {
    // It returns the time in ms, we want in seconds.
    return (Date.now() - Date.parse(stepStartTime)) / 1000;
  }

  /* This function returns the step duration time. */
  async getStepTime(stepObject: IStepsDataType, stepsLength: number) {
    let stepDuration;
    if (
      stepObject &&
      stepObject.duration_in_seconds &&
      stepObject.duration_in_seconds > 0 &&
      stepsLength > 1
    ) {
      stepDuration = stepObject.duration_in_seconds;
    } else {
      // We need to do a computation if the step.duration_in_seconds is not yet available and it is a 1 step build.
      stepDuration = stepObject.started_on
        ? this.computeStepTimes(stepObject.started_on)
        : 0;
    }
    return stepDuration;
  }

  /* This function returns the payload for the build / pipelines. */
  async getPipelinesBuildEvents(buildId: string) {
    let payload: Partial<IBuildEventProperties> = {};
    try {
      const res = await this.axiosInstance.get(`/pipelines/${buildId}`);
      const build = res.data;
      const stepsData = await this.getStepsEvents(
        buildId,
        build.target.selector.pattern || build.target.selector.type,
      );
      // eslint-disable-next-line no-nested-ternary
      const buildStatus = process.env.BITBUCKET_EXIT_CODE
        ? process.env.BITBUCKET_EXIT_CODE === '0'
          ? 'SUCCESSFUL'
          : 'FAILED'
        : build.state.result.name;
      if (stepsData) {
        const buildTime = await this.getBuildTime(
          stepsData,
          build.duration_in_seconds,
        );
        payload = {
          build_number: buildId,
          build_status: buildStatus,
          build_time: buildTime,
          // build_type categorises the type of the build that runs:
          // - default
          // - master
          // - custom
          // Most of the time, build.target.selector.pattern === build.target.ref_name.
          // It depends on what is available for the particular build.
          build_type:
            build.target.selector.pattern ||
            build.target.selector.type ||
            'default',
          // build_name refers to the branch name that runs this build.
          // In case, the build_name is undefined, we will refer it as its type.
          build_name:
            build.target.ref_name ||
            build.target.selector.pattern ||
            build.target.selector.type,
          build_number_steps: stepsData.length,
          build_steps: stepsData,
        };
      }
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
    return payload;
  }

  /* This function returns the payload for the build steps.*/
  // eslint-disable-next-line consistent-return
  async getStepsEvents(
    buildId: string,
    buildType?: string,
  ): Promise<Array<IStepsDataType>> {
    try {
      const resp = await this.axiosInstance.get(`/pipelines/${buildId}/steps/`);
      return Promise.all(
        // eslint-disable-next-line consistent-return
        resp.data.values.map(async (step: any) => {
          // We don't have control of the last step, it is a edge case.
          // In the after_script, the last step is still 'IN-PROGRESS' but the result of the last step does not matter.
          // We use the process.env.BITBUCKET_EXIT_CODE to determine the status of the pipeline.
          if (step && step.state) {
            // eslint-disable-next-line no-nested-ternary
            const stepStatus = process.env.BITBUCKET_EXIT_CODE
              ? process.env.BITBUCKET_EXIT_CODE === '0'
                ? 'SUCCESSFUL'
                : 'FAILED'
              : step.state.result.name;
            const stepTime = await this.getStepTime(
              step,
              resp.data.values.length,
            );
            return {
              step_uuid: step.uuid,
              step_command:
                step.script_commands[step.script_commands.length - 1].command,
              step_duration: stepTime,
              step_name: step.name || buildType, // on Master, there is no step name.
              step_status: stepStatus,
              duration_in_seconds: step.duration_in_seconds,
            };
          }
        }),
      );
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }

  /* This function returns the payload per build type. */
  returnPayloadPerBuildType(
    pipelines: IPipelines,
    buildType: string,
    buildName: string,
  ) {
    const steps = this.returnStepsPerBuildType(pipelines, buildType, buildName);
    // Builds can have `variables` and sometimes not - so to identify parallel steps info, it is better to filter it.
    const parallelStep = steps.filter((step: any) => step.parallel)[0];
    const stepName =
      parallelStep.parallel[process.env.BITBUCKET_PARALLEL_STEP || 0].step.name;
    return {
      step_name: stepName,
      build_type: buildType,
      build_name: buildName,
    };
  }

  /* This function identifies the step currently running and build a partial payload based on the build type.*/
  async getStepNamePerBuildType(buildId: string) {
    try {
      const config = yaml.safeLoad(
        fs.readFileSync(
          path.resolve(__dirname, '../../../../../bitbucket-pipelines.yml'),
          'utf8',
        ),
      );
      const indentedJson = JSON.parse(JSON.stringify(config, null, 4));
      const res = await this.axiosInstance.get(`/pipelines/${buildId}`);
      const buildType = res.data.target.selector.type || 'default';
      const buildName =
        res.data.target.selector.pattern || res.data.target.ref_name;
      // Master branch is not returning data per step but per build.
      if (buildName === 'master') {
        return;
      }
      // process.env.BITBUCKET_PARALLEL_STEP returns zero-based index of the current step in the group, for example: 0, 1, 2, … - only for parallel step.
      // This will return the actual step where the build is currently running.
      // Only landkid, run-full-suite and push-bundle-size-s3 have parallel steps.
      // eslint-disable-next-line consistent-return
      return this.returnPayloadPerBuildType(
        indentedJson.pipelines,
        buildType,
        buildName,
      );
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }

  /* This function the final step payload when a build with parallel step is running in Bitbucket.*/
  // eslint-disable-next-line consistent-return
  async getStepEvents(buildId: string) {
    try {
      const stepPayload = await this.getStepNamePerBuildType(buildId);
      const res = await this.axiosInstance.get(`/pipelines/${buildId}/steps/`);
      // Filter returns an array and we need the first value.
      if (stepPayload) {
        const stepObject = res.data.values.filter(
          (step: any) => step.name === stepPayload.step_name,
        )[0];
        // eslint-disable-next-line no-nested-ternary
        const buildStatus = process.env.BITBUCKET_EXIT_CODE
          ? process.env.BITBUCKET_EXIT_CODE === '0'
            ? 'SUCCESSFUL'
            : 'FAILED'
          : stepObject.state.result.name;
        const stepTime = await this.getStepTime(stepObject, stepObject.length);
        // Build type and build name are confused for custom build.
        const buildType =
          stepPayload.build_type === 'custom'
            ? stepPayload.build_name
            : stepPayload.build_type;
        // In case of pull-requests, we use '**' to match all the branches, bookmarks or tags that run after a pull request is created.
        const buildName =
          stepPayload.build_name === '**'
            ? 'pull-request'
            : stepPayload.build_name;
        return {
          build_number: buildId,
          build_status: buildStatus,
          build_time: stepTime,
          build_name: buildName,
          build_number_steps: stepObject.length,
          build_type: buildType,
          build_steps: [
            {
              step_uuid: stepObject.uuid,
              step_command:
                stepObject.script_commands[
                  stepObject.script_commands.length - 1
                ].command,
              step_duration: stepTime,
              step_status: buildStatus,
              step_name: stepObject.name || stepPayload.build_type, // if there is one step and no step name, we can refer to the build type.
            },
          ],
        };
      }
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
}
