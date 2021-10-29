import {
  CreateUIAnalyticsEvent,
  UIAnalyticsEvent,
} from '@atlaskit/analytics-next';
import { EventType } from '@atlassian/analytics-bridge';

/**
 * A `testId` prop is provided for specified elements, which is a unique
 * string that appears as a data attribute `data-testid` in the rendered code,
 * serving as a hook for automated tests */

export type AnalyticsEventWithType = {
  analyticsEvent: UIAnalyticsEvent;
  eventType: EventType;
};

//  Note we don't pass the DOM event, due to concerns regarding async behaviour and the recycling of DOM events particularly for how nextButtonHandler is used.
type OnActionHandler = (analyticsEvent: UIAnalyticsEvent) => void;
type AnalyticsHandler = (analyticsEvent: AnalyticsEventWithType) => void;

type FireAnalytics = (
  analyticsEvent: UIAnalyticsEvent,
  type: EventType,
  payload: { [key: string]: any },
) => void;
type IntegrationList = string[];

type CommonProps = {
  aaid: string | null;
  baseUrl: string;
  productName: string;
  cloudId: string;
  skipButtonLabel?: string;
  skipButtonHandler?: OnActionHandler;
  nextButtonLabel?: string;
  nextButtonHandler?: OnActionHandler;
  checkboxLabel?: string;
  checkboxDefaultValue?: boolean;
  fireAnalytics: FireAnalytics;
  isSiteAdmin?: boolean;
  testId?: string;
  onMount?: (integrationList: IntegrationList) => void;
};

export interface IntegrationsSurveyProps extends CommonProps {
  onUserSegError?: (err: Error) => void;
}

export interface IntegrationsSurveyPresentationalProps extends CommonProps {
  integrationList: IntegrationList;
}

export type CheckBoxGroupProps = {
  testId?: string;
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
  createAnalyticsEvent: CreateUIAnalyticsEvent;
  sendProductAnalytics: AnalyticsHandler;
  checkboxLabel: string;
};
