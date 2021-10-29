import {
  CrossFlowExtensions,
  JSONValue,
} from '@atlassiansox/cross-flow-base-types';
import { APIv0 } from './api/v0';

export type ExperimentalOptions = Record<string, JSONValue>;

export const Journeys = {
  GET_STARTED: 'get-started',
  DECIDE: 'decide',
  DISCOVER: 'discover',
} as const;

export const Targets = {
  CONFLUENCE: 'confluence.ondemand',
  JIRA_CORE: 'jira-core.ondemand',
  JIRA_SERVICE_DESK: 'jira-servicedesk.ondemand',
  JIRA_SOFTWARE: 'jira-software.ondemand',
  BITBUCKET: 'bitbucket.ondemand',
  TRELLO: 'trello',
  OPSGENIE: 'opsgenie',
  STATUSPAGE: 'statuspage',
  TEAM_CENTRAL: 'townsquare',
  AVOCADO: 'avocado',
} as const;

export type TargetType = typeof Targets[keyof typeof Targets];

export type JourneyTargetProductDefinition =
  | {
      journey: typeof Journeys.GET_STARTED | typeof Journeys.DECIDE;
      targetProduct: TargetType;
    }
  | {
      journey?: typeof Journeys.DISCOVER;
    };

export type Options = JourneyTargetProductDefinition & {
  sourceComponent: string;
  sourceContext: string;
  experimentalOptions?: ExperimentalOptions;
  extensions?: CrossFlowExtensions;
};

export interface CompletionStatus {
  success?: boolean;
}

export type OnOpen = (options: Options) => Promise<CompletionStatus>;

export const Reasons = {
  NO_API_SUPPORT: 'Could not provide requested API version',
  NO_PROVIDER: 'Provider not found',
} as const;

export type ReasonType = typeof Reasons[keyof typeof Reasons]; // equivalent of `typeof Reason.NO_API_SUPPORT | typeof Reason.NO_PROVIDER | ...`

interface ContextDisabled {
  isEnabled: false;
  reason: ReasonType;
}

interface ContextEnabled<T> {
  isEnabled: true;
  api: T;
}

export type CrossFlowContextType = ContextEnabled<APIv0> | ContextDisabled;

export type NegotiateCrossFlowAPI = (version: number) => CrossFlowContextType;

export interface WithCrossFlowProps {
  crossFlow: CrossFlowContextType;
}
