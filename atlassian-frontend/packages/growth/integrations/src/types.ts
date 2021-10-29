import { ExternalUser } from '@atlaskit/user-picker';

export type ConfluenceSlackServiceAnalytics = {
  onFetchConnectMetadataSucceeded: () => void;
  onFetchConnectMetadataFailed: (params: {
    status: number;
    errorMessage?: string;
  }) => void;
  onRefreshIntegrationCsrfTokenSucceeded: () => void;
  onRefreshIntegrationCsrfTokenFailed: () => void;
};

const atlassianSlackProducts = <const>['jira', 'confluence'];

export type AtlassianSlackProduct = typeof atlassianSlackProducts[number];

export function isAtlassianSlackProduct(
  product: string,
): product is AtlassianSlackProduct {
  return Boolean(atlassianSlackProducts.find((p) => p === product));
}

export type Environment = 'prod' | 'staging';

export type FailureResult = {
  ok: false;
  aborted: false;
  status: number;
  code: string;
  message: string;
};

export type AbortedResult = {
  ok: false;
  aborted: true;
};

export type SuccessResult<RESULT> = {
  ok: true;
  result: RESULT;
};

export type Result<PAYLOAD> =
  | SuccessResult<PAYLOAD>
  | FailureResult
  | AbortedResult;

export type IsSlackEnabledResult = Result<boolean>;

export type GetSlackConsentUrlResult = Result<string>;

export type GetSlackTeamsResult = Result<SlackTeam[]>;

export type GetSlackUsersResult = Result<ExternalUser[]>;

export type SlackTeamsServiceResponse = {
  teams: SlackTeam[];
  nextCursor?: string;
};

export type SlackUsersResponse = {
  recipients: SlackUser[];
  nextCursor?: string;
};

export type SlackUser = {
  id: string;
  name: string;
  displayName: string;
  avatarUrl: string;
  type: 'directMessage';
  email: string;
};

export type SlackTeam = {
  id: string;
  name: string;
  avatar: string;
};
