import axios, {
  AxiosResponse,
  AxiosBasicCredentials,
  AxiosInstance,
} from 'axios';
import pWaitFor from 'p-wait-for';
import {
  Pipeline,
  CompletedPipeline,
  PaginatedPipelineSteps,
  PipelineStep,
  PipelineOpts,
  PipelineTarget,
} from './types';
import retry from 'async-retry';

const baseApiUrl = 'https://api.bitbucket.org/2.0';

type Logger = {
  info: (...args: any) => any;
  error: (...args: any) => any;
  debug: (...args: any) => any;
};

export class PipelinesClient {
  repoFullName: string;
  axiosInstance: AxiosInstance;
  logger: Logger;

  constructor({
    auth,
    repoFullName,
    logger,
  }: {
    auth: AxiosBasicCredentials;
    repoFullName: string;
    logger?: Logger;
  }) {
    this.repoFullName = repoFullName;
    this.axiosInstance = axios.create({
      baseURL: `${baseApiUrl}/repositories/${repoFullName}`,
      auth,
    });
    this.logger = logger || console;
  }

  getUrl(buildNumberOrUuid: string) {
    return `https://bitbucket.org/${this.repoFullName}/addon/pipelines/home#!/results/${buildNumberOrUuid}`;
  }

  async get(buildNumberOrUuid: string) {
    const response = await this.axiosInstance.get<Pipeline>(
      `/pipelines/${buildNumberOrUuid}`,
    );
    return response.data;
  }

  async waitToFinish(
    buildNumberOrUuid: string,
    opts: Parameters<typeof pWaitFor>[1] = {
      // wait 30 secs between each poll
      interval: 30 * 1000,
      // don't poll immediately after calling, wait one interval
      leadingCheck: false,
      // timeout after 90 mins
      timeout: 90 * 60 * 1000,
    },
  ) {
    this.logger.info(`Polling: ${this.getUrl(buildNumberOrUuid)}`);
    await pWaitFor(() => {
      return retry(
        async () => {
          const pipeline = await this.get(buildNumberOrUuid);
          this.logger.info('pipeline status:', pipeline.state.name);
          return pipeline.state.name === 'COMPLETED';
        },
        {
          retries: 3,
          onRetry: e => console.log(e),
        },
      );
    }, opts);
    return (this.get(buildNumberOrUuid) as unknown) as CompletedPipeline;
  }

  async getSteps(buildNumberOrUuid: string) {
    let endpoint: string | undefined = `/pipelines/${buildNumberOrUuid}/steps/`;
    let response: AxiosResponse<PaginatedPipelineSteps>;
    const fullResponse: {
      size: number;
      values: PipelineStep[];
    } = {
      size: 0,
      values: [],
    };

    while (endpoint) {
      response = await this.axiosInstance.get<PaginatedPipelineSteps>(endpoint);
      fullResponse.size += response.data.size;
      fullResponse.values.push(...response.data.values);
      endpoint = response.data.next;
    }

    return fullResponse;
  }

  async trigger({ pipeline, branch, commit, variables }: PipelineOpts) {
    const target: Partial<PipelineTarget> = {};

    if (pipeline === 'default') {
      target.selector = { type: 'default' };
    } else {
      target.selector = { type: 'custom', pattern: pipeline };
    }

    if (commit) {
      target.type = 'pipeline_commit_target';
      target.commit = {
        type: 'commit',
        hash: commit,
      };
    }

    if (branch) {
      target.type = 'pipeline_ref_target';
      target.ref_type = 'branch';
      target.ref_name = branch;
    }

    this.logger.info('Triggering pipeline on target:', target);

    const response = await this.axiosInstance.post<Pipeline>('/pipelines/', {
      target,
      variables: variables,
    });

    return response.data;
  }

  async stop(buildNumberOrUuid: string) {
    const response = await this.axiosInstance.post(
      `/pipelines/${buildNumberOrUuid}/stopPipeline`,
    );
    return response.data;
  }
}
