This package is a collection of utils that help instument errors. The guide for using this in jira is
available [here](http://go.atlassian.com/jira-fe-monitoring-instrument) (However it concepts there are
mostly applicable outside of Jira too).

## Instrumenting expected failure

Fire error event at the exact time and place when you consider your user experience failed (when a
request failed, when an “error” screen appears, etc). Use fireErrorAnalytics method with the
following arguments:

```
import { fireErrorAnalytics } from '@atlassian/error-handling';

fireErrorAnalytics({
  meta: {
    id: string,
    packageName: string
  },
  event?: AnalyticsEvent,
  error?: Error,
  errorInfo?: ErrorInfo,
  attributes?: { [string]: string | boolean | number }
})
```

where:

`id` - name of the component/broken experience

`packageName` - name of the package the call originated from without @atlassian/jira prefix and in
camelCase (will be auto-filled by eslint from package.json)

`event` - usual product analytics event (see http://go/jira-analytics if you never experienced
analytics before). How to get that event is described in “Getting access to events“ section of the
@atlassian/jira-product-analytics library. Optional, but if not provided analytics will lose all
contextual data including source screen from the hierarchy above.

`error` - javascript error object. Optional, won’t go neither into analytics pipeline nor in
SignalFx, but if provided this error will be sent to Sentry.

`errorInfo` - error info that is provided by React componentDidCatch method

`attributes` - an object of additional analytics attributes. Optional, if provided will be merged
with other contextual analytics attributes

When fired, the event will be send to:

- `GasV3` pipeline (which will make it available via Splunk/Redash if it's registered via
  go/dataportal)
- `Sentry` (if an Error object is provided)
- `SignalFX` (if it's whitelisted via data portal)

## Instrumenting unexpected failures

Use `ReportErrors` for instumenting unexpected failures (like an error thrown within React
lifecy]cle). The component will:

- catch an error with Error boundary
- send it to Sentry
- send gasV3 analytics event

re-throw the error again (so that it can be reported again if needed by the consumers of your
component)
