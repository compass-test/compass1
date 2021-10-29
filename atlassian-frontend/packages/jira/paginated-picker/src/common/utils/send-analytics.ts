// TODO: FORM-629 Analytics:
export {};
// import type { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
// import { fireUIAnalytics } from '@atlassian/jira-product-analytics-bridge';
// import type { Attributes } from '@atlassian/jira-product-analytics-bridge';
//
// interface SendAnalyticsType {
//   actionSubjectId: string;
//   clickCount?: number;
//   createAnalyticsEvent: CreateUIAnalyticsEvent;
//   type?: string | null;
// }
//
// export const sendAnalytics = ({
//   actionSubjectId,
//   clickCount,
//   createAnalyticsEvent,
//   type,
// }: SendAnalyticsType) => {
//   const analyticsEvent = createAnalyticsEvent({
//     eventType: 'UI',
//     action: 'clicked',
//     actionSubject: 'button',
//     actionSubjectId,
//   });
//
//   const attributes: Attributes = {
//     fieldType: type,
//   };
//
//   if (clickCount !== undefined) {
//     attributes.clickCount = clickCount;
//   }
//
//   fireUIAnalytics(analyticsEvent, actionSubjectId, attributes);
// };
//
// export default sendAnalytics;
