type RunnerStatusType = 'ONLINE' | 'DISABLED' | 'OFFLINE' | 'UNREGISTERED';
export type RunnerType = 'WORKSPACE' | 'REPOSITORY';
export const SELF_HOSTED_LABEL = 'self.hosted';
export const SYSTEM_LABELS = ['linux', 'windows', 'macos'];
export const RUNNER_LABEL_REGEXP = new RegExp('^[a-z0-9]+(\\.?[a-z0-9])*$');
export const RESERVED_NAMESPACE_REGEXP = new RegExp(
  '^(bitbucket.|atlassian.|linux.|windows.|macos.).*',
);
export const MAX_LENGTH_OF_LABEL = 50;
export const MAX_NUMBER_OF_CUSTOM_LABELS = 10;

class OAuthClient {
  readonly audience: string = '';
  readonly id: string = '';
  readonly token_endpoint: string = '';
  readonly secret?: string | undefined;

  constructor(props: Partial<OAuthClient> = {}) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}

class RunnerState {
  readonly status: RunnerStatusType = 'UNREGISTERED';
  readonly updated_on?: string = '';
  readonly step?: {
    type: string;
    uuid: string;
  };

  constructor(props: Partial<RunnerState> = {}) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}

class RunnerError {
  readonly key: string = '';
  readonly message?: string = '';
  readonly name?: string = '';
  readonly type?: string = '';
  readonly arguments?: any = '';

  constructor(props: Partial<RunnerError> = {}) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}

export class Runner {
  readonly uuid: string = '';
  readonly name: string = '';
  readonly labels: string[] = [];
  readonly oauth_client: OAuthClient = new OAuthClient();
  readonly state: RunnerState = new RunnerState();
  readonly error: RunnerError | undefined;
  readonly latest_version?: string | undefined;
  readonly type: RunnerType = 'REPOSITORY';
  readonly updated_on: string = '';

  constructor(props: Partial<Runner> = {}) {
    Object.assign(this, {
      ...props,
      oauth_client: new OAuthClient(props.oauth_client),
      state: new RunnerState(props.state),
      error: props.error ? new RunnerError(props.error) : undefined,
    });
    Object.freeze(this);
  }
}
