# Data Services - Analytics Web Client

## Usage

#### Add the package to your project:

```base
$ yarn add @atlassiansox/analytics-web-client
```

#### Various bundles

`analytics-web-client` is packaged in:
- cjs - default when using require
- esm - default when using import
- es2019
- `analytics-web-client.amd.js` (amd module)
- `analytics-web-client.amd.min.js` (amd module minified)
- With dependencies alternative:
  - `analytics-web-client.with-deps.amd.js`
  - `analytics-web-client.with-deps.amd.min.js`
  - `analytics-web-client.with-deps.js`
  - `analytics-web-client.with-deps.min.js`

##### With dependencies alternative

By default all transitive dependencies are excluded from the main `@atlassiansox/analytics-web-client` build.

In some rare cases you many want to bring these dependencies in. Example usage:

```javascript
import AnalyticsClient, {
  envType,
  originType,
  tenantType,
  userType,
} from '@atlassiansox/analytics-web-client/dist/analytics-web-client.with-deps';
```

#### Initialise the library

```javascript
import AnalyticsWebClient, {
  envType,
  originType,
  tenantType,
  userType,
  eventType,
  platformType,
} from '@atlassiansox/analytics-web-client';

const analyticsClient = new AnalyticsWebClient(
  {
    env: envType.DEV, // required
    product: 'jira', // required
    subproduct: 'software', // should only be used by Jira
    version: '1.0.0',
    origin: originType.DESKTOP, // defaults to WEB if not specified
    platform: platformType.MAC, // defaults to WEB if not specified
    locale: 'en-US',
  },
  {
    historyReplaceFn: newUrl => customReplaceFn(newUrl), // defaults to window.history.replaceState if not specified
    flushBeforeUnload: false, // defaults to false
    useLegacyUrl: false, // defaults to false
  },
);
```

The `env` parameter controls which environment events get sent to:

- `LOCAL`, `DEV`, `STAGING` - events will be sent to our staging analytics environment
- `PROD` - events will be sent to our production analytics environment, only instances in production should use this

The `origin` parameter is used to differentiate between `WEB` and `DESKTOP` applications that share a common codebase.

The `platform` parameter is used to differentiate between `MAC`, `WINDOWS`, and `LINUX` and should be set when the
`origin` is set to `DESKTOP`. If you have a separate mobile web version of your applications set this to `MOBILE_WEB`

The `subproduct` parameter may be also of a function type and will be read every time before sending events.
While using it, keep in mind that you have to handle potential errors on your side (log them => fix them).
On our end we will send the event with empty subproduct if the provided `subproduct` getter throws an error.

The `historyReplaceFn` parameter is used to specify a custom method which modifies the current history entry. `historyReplaceFn` takes in a URL of type `string` and returns nothing (i.e. `void`). If a custom replace function is not specified, analytics client uses `window.history.replaceState`.

`flushBeforeUnload` Should only be used on products where users to not frequently visit. This prevents as much event loss being seen by these products.
Be aware that enabling this:

- May increase the number of duplicate events seen,
- May increase the time is takes the user to navigate away from the page,
- Will not work with XIDconsent being true.

`useLegacyUrl` Should only be used on products that do not have the Stargate Gateway setup (ie `/gateway/api/...` on your domain(s)).
This will default to your product using `https://api-private.atlassian.com` which may risk your product losing MAU due to strict cookie control by browsers.
https://hello.atlassian.net/wiki/spaces/I/pages/1217206437/api-private+is+broken+is+your+product+impacted

##### Arguments curently in Beta

`flushWaitInterval` Allows for consumers to specify how long we should wait after recieveing an event before sending off a batch of events.  
The number provided will be interprested as milliseconds.  
By default, this is set to 500ms.  
If you find you lose events due to users navigating away too quickly, you can reduce the wait time.
You can reduce this value down to 0 where we will attempt to send events as they come in.
In the future, `flushBeforeUnload` will be deprecated in favour of this field.  
Notes:

- Once we get 7 events, a batch will be sent immediately,
- We only send one request at a time,
- Any failed HTTP requests will result in backoff that will prevent events being sent immediately, and
- This currently only works when the `resilienceMechanism` is indexeddb.

`resilienceMechanism` lets you chose how events are persisted between sessions if they fail to be sent.
Valid options are provided on the enum `ResilienceMechanism` exported from analytics-web-client. These are:

- `ResilienceMechanism.LOCALSTORAGE`, this is the default and has been the only option in older versions of the client,
- `ResilienceMechanism.INDEXEDDB`, this will be the replacement for `LOCALSTORAGE` in the future,
- `ResilienceMechanism.MEMORY`, not recommended, events will not be persisted between sessions.

Memory is a fallback in case unexpected errors are thrown from Indexeddb, or if it is not available. We wil manage the detection and transition so you should not need to specify memory yourself.

#### Set tenant info

```javascript
analyticsClient.setTenantInfo(tenantType.CLOUD_ID, 'DUMMY-123');
```

We support the following `tenantTypes`:

- `CLOUD_ID` - Atlassian Cloud
- `ORG_ID` - Statuspage Organisation (for the Atlassian OrgId use the `setOrgInfo` API)
- `OPSGENIE_CUSTOMER_ID` - Opsgenie Customer ID
- `NONE` - Products without a tenant concept, e.g. Trello

#### Set org info (optional):

```javascript
analyticsClient.setOrgInfo('ORG-123');
```

Org info takes an Atlassian orgId as a parameter, if avaiable.
Please note this is unrelated to the ORG_ID tenant type which is specific to statuspage.

#### Set user info:

```javascript
analyticsClient.setUserInfo(userType.ATLASSIAN_ACCOUNT, '65544:12313');
```

We support the following `userTypes`:

- `ATLASSIAN_ACCOUNT`
- `HASHED_EMAIL`
- `TRELLO`
- `OPSGENIE`

#### Set subproduct:

```javascript
analyticsClient.setSubproduct('serviceDesk');
// OR make it dynamic
analyticsClient.setSubproduct(() => getSubproduct());
```

#### Set UI Viewed event attributes (optional):

```javascript
analyticsClient.setUIViewedAttributes({
  solutions: ['jiraServiceManagement', 'devOps'],
});

// These can be cleared with:
analyticsClient.clearUIViewedAttributes();
```

Are additional attributes which are added to UI Viewed events.
Please note:

- Attributes must be provided as a non array object
- Attributes will be overridden if they have the same name as generated `ui viewed` event attributes which may include
  `lastScreenEvent` or `embeddedIn*` names
- Setting new attributes does not trigger a new `ui viewed` event to be fired as throttling is not based on these
  attributes

#### Send identify events:

```javascript
analyticsClient.sendIdentifyEvent(userType.ATLASSIAN_ACCOUNT, '65544:12313');
```

#### Send screen events:

```javascript
analyticsClient.sendScreenEvent(
  {
    name: 'dashboard', // required
    attributes: {
      key1: 'value1',
    },
    containers: {
      // optional
      project: {
        id: '45', // required
        type: 'software', //optional
      },
    },
  },
  cb,
);

// Deprecated option:
analyticsClient.sendScreenEvent('dashboard', cb);
```

#### Send track events:

```javascript
analyticsClient.sendTrackEvent({
  containerType: 'project',
  containerId: '45',
  containers: {
    // optional
    project: {
      id: '45', // required
      type: 'software', //optional
    },
  },
  objectType: 'issue',
  objectId: '12',
  source: 'rapidboard', // required

  actionSubject: 'video', // required
  action: 'played', // required
  actionSubjectId: '1112223',
  attributes: {
    videoLength: 30,
  },
  tags: ['media'],
});
```

#### Send UI events:

```javascript
analyticsClient.sendUIEvent({
  containerType: 'project',
  containerId: '45',
  containers: {
    // optional
    project: {
      id: '45', // required
      type: 'software', //optional
    },
  },
  objectType: 'issue',
  objectId: '12',
  source: 'rapidboard', // required

  actionSubject: 'button', // required
  action: 'clicked', // required
  actionSubjectId: 'issueQuickCreateButton',
  attributes: {
    videoLength: 30,
  },
  tags: ['media'],
});
```

#### Send operational events:

```javascript
analyticsClient.sendOperationalEvent({
  containerType: 'project',
  containerId: '45',
  containers: {
    // optional
    project: {
      id: '45', // required
      type: 'software', //optional
    },
  },
  objectType: 'issue',
  objectId: '12',
  source: 'backlog', // required

  actionSubject: 'editor', // required
  action: 'initialised', // required
  actionSubjectId: 'commentEditor',
  attributes: {
    videoLength: 30,
  },
  tags: ['media'],
});
```

#### Waiting for events to finish sending:

```javascript
function onEventSent() { }

analyticsClient.sendIdentifyEvent('...', '...', onEventSent);

analyticsClient.sendScreenEvent('...', onEventSent);

analyticsClient.sendTrackEvent({...}, onEventSent);

analyticsClient.sendUIEvent({...}, onEventSent);

analyticsClient.sendOperationalEvent({...}, onEventSent);

```

#### Start sending UI Viewed events:

Please note UI Viewed events won't actually be sent until the tenant and user info has been set.

```javascript
analyticsClient.startUIViewedEvent();
```

#### Stop sending UI Viewed events:

```javascript
analyticsClient.stopUIViewedEvent();
```

#### Integrating with E-MAU:

```javascript
// Step 1 - Initialise the client
const analyticsClient = new AnalyticsWebClient({
  env: envType.DEV,
  product: 'jira',
  subproduct: 'software',
  version: '1.0.0',
  origin: originType.WEB,
  platform: platformType.WEB,
});

// Step 2 - Set the tenant and user info
// Note: Tenant and user info are not required since there are products like bitbucket with no concept of a tenant
// and there are products like jira and confluence that allow anonymous users to perform certain actions. However
// if tenant and user information exist it is very important that you include them as this information is crucial
// for analysts to be able to reconstruct user journeys.

analyticsClient.setTenantInfo(tenantType.CLOUD_ID, 'DUMMY-123');
analyticsClient.setUserInfo(userType.ATLASSIAN_ACCOUNT, '65544:12313');

// Step 3 - Set additional attributes to the UI Viewed event if required
// See above for usage of this function
analyticsClient.setUIViewedAttributes({
  solutions: ['jiraServiceManagement', 'devOps'],
});

// Step 4 - Start the UI Viewed event loop
analyticsClient.startUIViewedEvent();

// Step 5 - Change the subproduct anytime after initialisation if required
analyticsClient.setSubproduct('serviceDesk');

// Step 6 - Stop the UI Viewed event loop anytime after initialisation if required
analyticsClient.stopUIViewedEvent();
```

The `ui viewed` event is only sent if the user has a browser tab focused for at least 2 seconds, however it is
throttled for a maximum of once per hour. Throttling is done on a per user id, tenant id, product, subproduct basis.
You can delete the `awc.ui.viewed.last.sent` key from `localStorage` to reset the throttle. Please keep in mind that
Chrome might not consider the current tab active if you've opened up the developer tools.

### Sending UI Viewed events for Embedded Experiences

To send `ui viewed` events for embedded experience you need to set the embedded product when the experience is active
and clear it once the user navigates away or disables it. This will send a `ui viewed` event on behalf of the embedded
product following the same rules outlined above (2 seconds of activity with 1 hour throttle).

```javascript
// Set the embedded product directly or via a callback
analyticsClient.setEmbeddedProduct('someOtherProduct');
analyticsClient.setEmbeddedProduct(() => 'someOtherProduct');

// Clear the embedded product
analyticsClient.clearEmbeddedProduct();
```

#### Listening for UI Viewed events:

The `startUIViewedEvent` function accepts a callback that will be called every time a `ui viewed` event is sent.

```javascript
function onUIViewedEvent(event) {
  console.log(event);
}

analyticsClient.startUIViewedEvent(onUIViewedEvent);
```

#### Sending Apdex initialLoad events:

An initial load Apdex event only requires the `stopApdexEvent` to be called.
The starting point will be `performance.timing.navigationStart`.

```javascript
analyticsClient.stopApdexEvent({
  task: 'viewPage', // required
  taskId: '12',
  type: 'initialLoad', // required
  threshold: 1000,
  additionalAttributes: {
    hasfeatureFlag: true,
  },
});
```

#### Sending Apdex transition events:

```javascript
analyticsClient.startApdexEvent({
  task: 'someTransition', // required
  taskId: '34',
});

analyticsClient.stopApdexEvent({
  task: 'someTransition', // required
  taskId: '34',
  type: 'transition', // required
  threshold: 1000,
  additionalAttributes: {
    hasfeatureFlag: true,
  },
});
```

#### Sending Apdex events with custom start and stop times:

```javascript
analyticsClient.stopApdexEvent({
  task: 'viewPage', // required
  taskId: '12',
  type: 'initialLoad', // required
  startTime: 100,
});

analyticsClient.stopApdexEvent({
  task: 'someTransition', // required
  taskId: '34',
  type: 'transition', // required
  startTime: 100,
  stopTime: 1000,
});
```

#### Get Apdex start:

To check if there is an existing Apdex start event for a given task.
The API will return the latest timings object if there is, otherwise it will return `undefined`.

```javascript
analyticsClient.getApdexStart({
  task: 'someTransition', // required
  taskId: '34',
});
```

### _Experimental_: Delaying the processing of low-priority events

> This is an experimental feature and is currently only enabled for events that are registered to the `measurement` platform product.

It is possible to delay the processing of events that are low priority. This may be useful in critical sections such as page loads and transitions where performance is particularly important.

#### Mark the start and end of the critical section

The delay period is marked with calls to `startLowPriorityEventDelay` and `stopLowPriorityEventDelay`.

`startLowPriorityEventDelay` can be provided with a timeout, after which `stopLowPriorityEventDelay` will be called automatically.
This timeout has a maximum duration of 10s, which is also the default value that is used if no timeout is provided.

Any low-priority events that are fired in this period will be added to a delay queue, which will be flushed when `stopLowPriorityEventDelay` is called.

This queue can hold a maximum of 50 events. If this limit is reached, then subsequent low-priority events will be processed
immediately instead of delayed.

```javascript
analyticsClient.startLowPriorityEventDelay(5000); // optional timeout in milliseconds, defaults to 10000
analyticsClient.stopLowPriorityEventDelay();
```

#### Mark the events that can be affected

Events can be marked as low priority by setting the `highPriority` field on the event to `false`.
Events that do not have this field set or have it explicitly set to `true` will continue to fire immediately during the critical section.

The `sentWithDelay` tag will be attached to any events that were successfully delayed.

```javascript
analyticsClient.sendOperationalEvent({
  actionSubject: 'editor',
  action: 'initialised',
  highPriority: false,
});
```

#### _Experimental_: Compress the delayed events into a smaller subset of events

> This is an experimental feature. Please reach out to our team in the [#help-measurement](http://go.atlassian.com/mep-contact) Slack channel to discuss your use-case before proceeding.

It is possible to compress the events that are collected in the delay queue into a smaller subset. This can offer performance benefits, as there will be fewer events that need to be processed and sent to the server after compression.

Before performing any compression of events, you should _consider the implications for the downstream consumers of the involved events_.
The compressed events are newly created events with no implicit references to the original events. As a result, there are a few things you will need to consider:

- Consumers of the original events will be aware that there is a compressed version that they will also need to handle
- The format of the compressed event needs to be easy enough for these consumers to query in Amplitude and Socrates
- Any SignalFx metrics associated that would have been collected for the original events will be lost as a result of the compression

If you choose to proceed with compression after considering all of the above, you may do so by setting `delayQueueCompressors` option when initialising the analytics client. This option should be set to an array of `CompressionRule` instances which define the rules for compressing any accumulated events.
Each `CompressionRule` should be constructed with the following arguments:

- `predicate`: A function that accepts an event from the delay queue, and is expected to return a boolean indicating whether or not the event should be included in the compression. This predicate is run against all accumulated events, so it should be as lightweight and performant as possible.
- `compressFn`: A function that accepts an array of events that match the above predicate, and is expected to return an array of compressed events.

Each object returned from the `compressFn` is expected to contain all of the mandatory fields for an analytics event, as well as an additional `eventType` field that is set to either `operational`, `track` or `ui`.

All of these fields already exist on the input events, so a `CompressionRule` can simply return the input if there is nothing to compress.

If the `CompressionRule` throws an error, does not return the expected format, or returns any objects that do not contain all of the mandatory fields, then a warning will be logged and the client will fire all of the compatible events in their un-compressed format instead.

Below is an example of a `CompressionRule` that defines these values to collapses multiple `feature exposed` events into a single `features exposed` event:

```javascript
import AnalyticsWebClient, {
  envType,
  originType,
  tenantType,
  userType,
  eventType,
  platformType,
  CompressionRule,
} from '@atlassiansox/analytics-web-client';

const analyticsClient = new AnalyticsWebClient(
  {
    env: envType.DEV,
    product: 'jira',
  },
  {
    delayQueueCompressors: [
      new CompressionRule(
        event => {
          return (
            event.eventType === 'operational' &&
            event.actionSubject === 'feature' &&
            event.action === 'exposed' &&
            event.tags &&
            event.tags.includes('measurement')
          );
        },
        featureExposedEvents => {
          return featureExposedEvents.reduce((acc, event) => {
            // This is an example of how the events can be grouped together
            // based on some criteria. In this case, we are grouping them
            // based on a common source value, so that each compressed event
            // is a summary of what was fired from that source.
            let compressedEventForSource = acc.find(
              existingEvent => existingEvent.source === event.source,
            );

            if (!compressedEventForSource) {
              compressedEventForSource = {
                source: event.source,
                eventType: 'operational',
                actionSubject: 'features',
                action: 'exposed',
                tags: ['measurement'],
                attributes: {
                  features: [],
                },
              };
              acc.push(compressedEventForSource);
            }

            compressedEventForSource.attributes.features.push({
              flagKey: event.flagKey,
              value: event.value,
              reason: event.reason,
              ruleId: event.ruleId,
            });

            return acc;
          }, []);
        },
      ),
    ],
  },
);
```

## Working with Task Sessions

Task Sessions are identifiers used for tracking user activities through mulitple actions and pages. For more information, see [the specification.](https://hello.atlassian.net/wiki/spaces/ANALYTICS/pages/343017104/Task+Session+Tracking+Specification?title=Task+Session+Tracking+Specification)

#### Creating a Task Session:

```javascript
const myTaskSessionId = analyticsClient.task.createTaskSession(
  'my-task-session',
);
analyticsClient.sendTrackEvent(myTrackEvent);
```

Creates a task session and all analytics events fired on the current page will have the task session (along with the associated id) attached. This will last until the page is refreshed or `completeTaskSession('my-task-session)` is called.

#### Ending a Task Session:

```javascript
analyticsClient.task.completeTaskSession('my-task-session');
```

Ensures that no more analytics events will have that task session (and id) attached. Useful in single page apps. This can also be achieved by simply not persisting the task session between pages.

#### Persisting a Task Session between pages:

Generate a link to `/foo` which contains task sessions:

```javascript
const url = client.task.formatTaskSessionQueryString({
  uri: '/foo',
  taskSessions: ['my-task-session'],
});
```

Returns a string url which contains the task sessions as query parameters. Optionally accepts an array of task sessions to include, otherwise includes all task sessions. Used in conjunction with `stripQueryParameters()`:

```javascript
analyticsClient.task.stripQueryParameters();
```

Strips task session query parameters from the current page url and persists them as if they had been added by `createTaskSession`. Replaces the current url to remove task sessions query parameters.

## Distinguishing real events from synthetic events

Events generated through the use of [analytics-pollinator](https://bitbucket.org/atlassian/analytics-pollinator/src) have been tagged as synthetic events. The `tags` array field will contain `synthetic` (i.e. `tags: ['some-existing-tag', 'synthetic']`).

## Development

#### Install dependencies

```bash
bolt install
```

#### Run tests
From root directory of `atlassian-frontend` run:
```bash
bolt test packages/measurement/analytics-web-client/
```

#### Start test app

From root directory of `atlassian-frontend` run:
```bash
bolt w @atlassiansox/analytics-web-client start
```

or within the package directory itself via `yarn start`.

#### Run lint

From root directory of `atlassian-frontend` run (at this stage cannot lint on specific package):
```bash
bolt lint
```

#### Build bundles

From root directory of `atlassian-frontend` run:
```bash
bolt build @atlassiansox/analytics-web-client
```

#### Check bundle size
From root directory of `atlassian-frontend` run:
Use `bolt w @atlassiansox/analytics-web-client analyze-bundle` to see the breakdown of the bundle.

or simply `yarn analyze-bundle`.
#### Builds

Delegated to `atlassian frontend`. Tests and lint are checked on each branch before it can be landed on `Landkit`.

#### Versioning

We follow the Semver spec for versioning.

In Atlassian frontend, `analytics-web-client` will not be automatically released.

To release a new version, we need to create a changeset. Generating changeset is done from the root of `atlassian frontend`, you need to run:

```bash
bolt changeset
```

For each change impacting consumers of this package, add a new entry to `CHANGELOG.md` which corresponds to the version in the `package.json` file which will be merged.

You can opt-out of the changeset check by prefixing your branchname with no-changeset/. However, these cases should be limited to situations when we only: 
- Update dev dependencies
- Add tests or examples
- Update examples
- Update internal documentation

For more details, https://developer.atlassian.com/cloud/framework/atlassian-frontend/development/07-versioning/ provides a good reference.
## Support

If you have any issues with this client, please contact the MEP team via the [help desk](http://go.atlassian.com/mep-help) or [#help-measurement](http://go.atlassian.com/mep-contact) in Slack.

If you have questions around build pipelines or tooling feel free to consult [Atlassian Frontend Docs](http://go.atlassian.com/af-docs) or #atlassian-frontend in Slack.
