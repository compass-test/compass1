import { md } from '@atlaskit/docs';

export default md`
  The \`examples\` folder shows some examples of how to integrate \`notification-list\` into your product. Note that the component **requires** that some providers are available in the parent product, which we mock with \`utils/providers.tsx\` for our examples:

  - \`FabricAnalyticsListeners\` from \`@atlaskit/analytics-listeners\` for analytics. Without it, the notification component will not send any analytic events. We implement this in [Start](https://bitbucket.org/atlassian/uchi-ui/src/fa286eb1d7271716efbc5e339ab0f783e7e68210/src/ui/Layout/v3/NavNotificationsButton/index.tsx#lines-63).
  - \`IntlProvider\` for i18n,
  - \`SmartCardProvider\` for smart cards (only for running locally, otherwise our internal \`SmartCardProvider\` will automatically set itself up),
  - \`ExperienceTrackerContext.Provider\` for tracking SLO operational events.

  Optional:

  - \`ProfileClientContextProvider\` to use a custom client that allows hover-over profile cards experience. Use this if the default client doesn't work for you. You can import it from \`@atlassian/notification-list/helpers\`.

  The simplest example is available in \`examples/00-basic.tsx\`.

  In summary:

  - If you would like to integrate \`notification-list\` as a native component into your product, browse some of the examples in the \`examples\` folder and feel free to reach out in [#notificationsplatform](https://atlassian.slack.com/archives/CFG86D0HF).
  - If you would like to integrate \`notification-list\` through an \`iframe\` (as a temporary way to get around undesirable dependency issues), see the [@atlaskit/atlassian-notifications](https://atlaskit.atlassian.com/packages/navigation/atlassian-notifications) packages.
`;
