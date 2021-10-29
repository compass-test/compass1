# Notification List

This is the package for the new notifications experience, `notification-list`. Updates from the [existing experience](https://bitbucket.org/atlassian/pf-home-ui/src/master/) include:

- The ability to filter notifications by read state (i.e. read and unread) with a new “Only show unread” checkbox in the top right.
- Notifications can no longer be deleted, now only marked as read or unread (and filtered out as such).
- The experience is now user centric - that is, notifications from all sites will now appear in the list. (The current experience filters notifications to the current cloud id)

_Note._ Self-service notifications are not yet live for the in-app notifications drawer.

> **Questions / need help or support?**
>
> The `notification-list` component is owned by Your Work; reach out at [#notificationsplatform](https://atlassian.slack.com/archives/CFG86D0HF) on Slack (please use the `!disturbed` alias during business hours).

## Running locally

To get `notification-list` up and running on your machine, run

```
bolt start notification-list
```

You may need to switch to the correct version of `nvm` and update all packages by running `nvm use && bolt install`.

- [http://localhost:9000/examples/notifications/notification-list](http://localhost:9000/examples/notifications/notification-list) will show the examples.
- [http://localhost:9000](http://localhost:9000) will show a local version of [atlaskit.atlassian.com](https://atlaskit.atlassian.com/).

## Testing

To run tests on your machine, run

```
yarn test notification-list
```

To run the integration tests, run

```
yarn test:webdriver notification-list
yarn test:webdriver:watch:chrome notification-list
yarn test:webdriver:browserstack notification-list
```

For more details and most up-to-date information, refer to the AFP documentation [DAC](https://developer.atlassian.com/cloud/framework/atlassian-frontend/development/04-testing/). For VR testing make sure you enable LFS:

```
yarn test:vr notification-list -u
```

## Implementing notification-list into your product

The `examples` folder shows some examples of how to integrate `notification-list` into your product. Note that the component **requires** that some providers are available in the parent product, which we mock with `utils/providers.tsx` for our examples:

- `FabricAnalyticsListeners` from `@atlaskit/analytics-listeners` for analytics. Without it, the notification component will not send any analytic events. We implement this in [Start](https://bitbucket.org/atlassian/uchi-ui/src/fa286eb1d7271716efbc5e339ab0f783e7e68210/src/ui/Layout/v3/NavNotificationsButton/index.tsx#lines-63).
- `IntlProvider` for i18n,
- `SmartCardProvider` for smart cards (only for running locally, otherwise our internal \`SmartCardProvider\` will automatically set itself up),
- `ExperienceTrackerContext.Provider` for tracking SLO operational events.

Optional:

- `ProfileClientContextProvider` to use a custom client that allows hover-over profile cards experience. Use this if the default client doesn't work for you. You can import it from `@atlassian/notification-list/helpers`.

It may also be useful to use `FabricAnalyticsListeners` from `@atlaskit/analytics-listeners` for analytics. We implement this in [Start](https://bitbucket.org/atlassian/uchi-ui/src/fa286eb1d7271716efbc5e339ab0f783e7e68210/src/ui/Layout/v3/NavNotificationsButton/index.tsx#lines-63).

The simplest example is available in `examples/00-basic.tsx`.

In summary:

- If you would like to integrate `notification-list` as a native component into your product, browse some of the examples in the `examples` folder and feel free to reach out in [#notificationsplatform](https://atlassian.slack.com/archives/CFG86D0HF).
- If you would like to integrate `notification-list` through an `iframe` (as a temporary way to get around undesirable dependency issues), see the [@atlaskit/atlassian-notifications](https://atlaskit.atlassian.com/packages/navigation/atlassian-notifications) packages.
