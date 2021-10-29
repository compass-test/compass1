import axios, {
  AxiosBasicCredentials,
  AxiosInstance,
  AxiosResponse,
} from 'axios';
import queryString from 'query-string';
import { PaginatedBuildStatuses, BuildStatus, BuildStatusOpts } from './types';

const baseApiUrl = 'https://api.bitbucket.org/2.0';

const states = ['INPROGRESS', 'SUCCESSFUL', 'FAILED', 'STOPPED'];

type SortFilterOpts = {
  // Filters request based on object properties, see https://developer.atlassian.com/bitbucket/api/2/reference/meta/filtering
  q?: string;
  // Default order is ascending, prepend hyphen to reverse order, e.g. -updated_on
  sort?: string;
};

export class BuildStatusClient {
  axiosInstance: AxiosInstance;
  commit: string;
  log: typeof console.log;

  constructor({
    auth,
    repoFullName,
    commit,
  }: {
    auth: AxiosBasicCredentials;
    repoFullName: string;
    commit: string;
  }) {
    this.axiosInstance = axios.create({
      baseURL: `${baseApiUrl}/repositories/${repoFullName}/commit/${commit}`,
      auth,
    });
    this.commit = commit;
    if (process.env.DEBUG === 'TRUE') {
      this.log = console.log;
    } else {
      this.log = () => {};
    }
  }

  createDefaultKey(name: string) {
    // Key can have a maximum length of 40 characters
    return `${name.substr(0, 31)} - ${this.commit.substr(0, 6)}`;
  }

  async getStatuses(opts?: SortFilterOpts) {
    this.log('Finding statuses for commit', { commit: this.commit, opts });
    let query;
    if (opts) {
      query = `?${queryString.stringify(opts)}`;
    }

    let endpoint: string | undefined = `/statuses${query || ''}`;
    let response: AxiosResponse<PaginatedBuildStatuses>;
    const fullResponse: {
      size: number;
      values: BuildStatus[];
    } = {
      size: 0,
      values: [],
    };

    while (endpoint) {
      response = await this.axiosInstance.get<PaginatedBuildStatuses>(endpoint);
      fullResponse.size += response.data.size;
      fullResponse.values.push(...response.data.values);
      endpoint = response.data.next;
    }

    this.log('Found statuses', JSON.stringify(fullResponse, null, 2));

    return fullResponse;
  }

  async uploadBuildStatus(opts: BuildStatusOpts) {
    if (!opts.state || !opts.name) {
      throw new Error(
        'a state and name must be defined to upload a new build status',
      );
    }

    if (!states.includes(opts.state)) {
      throw new Error(`state must be one of: ${states}`);
    }

    const config = {
      key: this.createDefaultKey(opts.name),
      ...opts,
    };

    this.log('Creating new build status', { commit: this.commit, config });

    const response = await this.axiosInstance.post<BuildStatus>(
      '/statuses/build',
      config,
    );
    this.log('Upload status response:', response);
    return response.data;
  }

  /**
   *  NOTE: LIMITATIONS OF UPDATING BUILD STATUSES
   *    name and description are not persisted,
   *    if you use this script to change these values from a pipeline,
   *    the state changes (INPROGRESS -> SUCCESSFUL) will revert them
   *    see: https://hello.atlassian.net/wiki/spaces/~904291390/pages/749161906/Investigation+Build+Statuses
   */
  async updateBuildStatus(opts: BuildStatusOpts) {
    const { key, ...config } = opts;

    if (!key) {
      throw new Error('a key must be defined to update a build status');
    }

    if (config.state && !states.includes(config.state)) {
      throw new Error(`state must be one of: ${states}`);
    }

    this.log('Updating build status', { commit: this.commit, config });

    const response = await this.axiosInstance.put<BuildStatus>(
      `/statuses/build/${key}`,
      config,
    );
    this.log('Update status response:', response);
    return response.data;
  }
}
