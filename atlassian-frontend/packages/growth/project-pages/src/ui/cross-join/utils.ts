import OriginTracing from '@atlassiansox/origin-tracing';
import { BlueprintModuleCompleteKey } from '../../controllers/template/types';
import {
  PROJECT_PAGES_SOURCE_COMPONENT,
  PROJECT_PAGES_SOURCE_CONTEXT,
} from '../../common/constants';
const BETTER_TOGETHER_DEST_URL = '/gpa-cross-flow/better-together.html';

// The types below attempt to implement the Cross-Join Better Together API
// https://hello.atlassian.net/wiki/spaces/PGT/pages/939733413/Cross-join+via+Pages+Better+Together+steps

type BaseParams = {
  origin: OriginTracing | null;
  cloudId: string;
  accountId: string;
};

type FlowParams = {
  flow: 'request-access' | 'join-product';
};

type SourceParams = {
  sourceComponent: string;
  sourceContext: string;
};

export type RequestAccessUrlParams = {
  projectKey: string;
};

export type JoinProductTemplateParams = {
  blueprintModuleCompleteKey?: BlueprintModuleCompleteKey | null;
  createBlank?: true;
};

export type JoinProductUrlParams = JoinProductTemplateParams & {
  projectKey: string;
  projectName: string;
};

const generateUrlSearchParamsFromArgs = <T extends Record<string, any>>(
  args: T,
) =>
  Object.entries(args).reduce((params, [key, val]) => {
    if (val !== undefined && val !== null) {
      params.append(key, val.toString());
    }
    return params;
  }, new URLSearchParams());

const getCrossJoinUrl = ({
  origin,
  ...args
}: FlowParams &
  BaseParams &
  SourceParams &
  (JoinProductUrlParams | RequestAccessUrlParams)) => {
  const betterTogetherParams = generateUrlSearchParamsFromArgs<
    Omit<JoinProductUrlParams | RequestAccessUrlParams, 'origin'>
  >(args);
  const destUrl = `${BETTER_TOGETHER_DEST_URL}?${betterTogetherParams.toString()}`;
  const identityParams = new URLSearchParams({
    'dest-url': origin ? origin.addToUrl(destUrl) : destUrl, // TODO JOIN-55 atlOrigin gets clobbered by identity even when added to the dest-url. Maybe use a custom query param.
    application: 'confluence',
    'permission-violation': 'true', // this forces JSS not to attempt to redirect to dest-url
  });
  return `/login?${identityParams.toString()}`;
};

export const getRequestAccessUrl = (
  requestAccessArgs: RequestAccessUrlParams & BaseParams,
) =>
  getCrossJoinUrl({
    flow: 'request-access',
    sourceComponent: PROJECT_PAGES_SOURCE_COMPONENT,
    sourceContext: PROJECT_PAGES_SOURCE_CONTEXT,
    ...requestAccessArgs,
  });

export const getJoinProductUrl = ({
  ...joinProductArgs
}: JoinProductUrlParams & BaseParams) =>
  getCrossJoinUrl({
    flow: 'join-product',
    sourceComponent: PROJECT_PAGES_SOURCE_COMPONENT,
    sourceContext: PROJECT_PAGES_SOURCE_CONTEXT,
    ...joinProductArgs,
  });
