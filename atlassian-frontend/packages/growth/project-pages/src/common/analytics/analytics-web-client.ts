import flatMap from 'lodash/flatMap';

import AnalyticsWebClient, {
  envType,
  eventType,
  tenantType,
  userType,
} from '@atlassiansox/analytics-web-client';
import UIAnalyticsEvent from '@atlaskit/analytics-next/UIAnalyticsEvent';
import { getEvent } from './util';

let rootContext: any = {};
let analyticsClient: any;

const joinCamelCase = (base: any, value: any) => {
  const camelCasedValues = flatMap([value], (v) => v.split('.')).map((v) =>
    v.replace(/^./, (c: string) => c.toUpperCase()),
  );
  return [base, ...camelCasedValues].join('');
};

const createEvent = ({
  objectType,
  objectId,
  source,
  action,
  actionSubject,
  attributes,
  tags,
}: any) => ({
  containerType: rootContext.containerType,
  containerId: rootContext.containerId,
  objectType,
  objectId,
  source: joinCamelCase(rootContext.parent, source), // required
  actionSubject, // required
  action, // required
  actionSubjectId: joinCamelCase(action, actionSubject),
  attributes,
  tags,
});

const sendEvent = ({ type, payload }: any) => {
  switch (type) {
    case eventType.UI:
      analyticsClient.sendUIEvent(payload);
      break;
    case eventType.TRACK:
      analyticsClient.sendTrackEvent(payload);
      break;
    case eventType.OPERATIONAL:
      analyticsClient.sendOperationalEvent(payload);
      break;
    case eventType.SCREEN:
      analyticsClient.sendScreenEvent(payload.name, null, payload.attributes);
      break;
    default:
  }
};

export const sendEventWhichShouldNotBeUsedDirectlyExceptForVerySpecialCases = sendEvent;

export const sendAnalyticsEvent = (analyticsEvent: UIAnalyticsEvent) => {
  const { type, payload } = getEvent(analyticsEvent);
  sendEvent({ type: (type as string).toLowerCase(), payload });
};

export const sendTrackAnalyticsEvent = (eventData: any) => {
  const analyticsEvent = createEvent(eventData);
  sendEvent({ type: eventType.TRACK, payload: analyticsEvent });
};

export const sendOperationalAnalyticsEvent = (eventData: any) => {
  const analyticsEvent = createEvent(eventData);
  sendEvent({ type: eventType.OPERATIONAL, payload: analyticsEvent });
};

export const initAnalyticsClient = ({
  client: { environment, locale, cloudId, accountId },
  context,
}: any) => {
  analyticsClient = new AnalyticsWebClient({
    env: environment === 'prod' ? envType.PROD : envType.DEV, // required
    product: 'jira', // required
    version: '1.0.0',
    locale,
  });
  analyticsClient.setTenantInfo(tenantType.CLOUD_ID, cloudId);
  analyticsClient.setUserInfo(userType.ATLASSIAN_ACCOUNT, accountId);
  rootContext = context;
};

export const getAnalyticsWebClient = () => analyticsClient;
