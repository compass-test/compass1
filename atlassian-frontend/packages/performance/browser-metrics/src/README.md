# Browser Metrics (beta)

Browser Metrics (BM) library is frontend performance reporting library.

It has built-in integrations with GasV3 and METAL clients' payloads therefore produced data can be easily consumed by common Atlassian tools like Splunk, Redash or Amplitude.

It offers tracking following types:

- page load (initial render and SPA transition)
- interactions (or inline response/result) - for in-app interactions
- custom - usually for submetrics

---

## Concepts

### Metric config

Each metric has its own config, which should be defined in `perf.config.js` ideally in top level of the component which is using it.

The ownership is set as first-class citizen as it is one of the critical feature in Performance Portal.

```javascript
metrics.pageLoad({
  key: 'home-page',
});
```

#### Common API

Every metric exposes following methods:

- `start`
- `stop`
- `mark`

#### Custom ranges

The breakdown of recorded time range (metric) is usually the most powerful way to narrow down potential performance problems.

Browser Metrics library supports custom time ranges based on marks and metric config.

```javascript
metrics.pageLoad({
    ...,
    timings: [
        { key: 'init', endMark: 'network_start' },
        { key: 'network', startMark: 'network_start', endMark: 'network_end' },
        { key: 'render', startMark: 'network_end' },
    ],
});
```

Such config would generate following payload

```json
{
  ...,
  "custom:timings": {
     "init": {"startTime": 0, "duration": "[network_start - 0]"},
     "network": {"startTime": "[network_start]", "duration": "[network_end - network_start]"}
     "render": {"startTime": "[network_end]", "duration": "[metric_stop - network_end]"}
  }
}
```

#### Include metric as custom range

The other approach to measuring breakdown metrics is to use `include` metrics.

```javascript
const navigationPerformance = metrics.custom(...);

metrics.pageLoad({
    ...,
    include: [navigationPerformance],
});
```

For examples for each type of measured metric please review examples in `measuring...` sections.

---

## Measuring page load

Initializing Browser Metrics automatically set initial page load.

The recommended way to start measuring SPA transitions is to plug `startPageLoad` method into in-app router library.

```javascript
const myHistory = createBrowserHistory();
myHistory.listen((param: HistoryLocation) => {
  browserMetrics.startPageLoad({ isInitial: false });
});
```

Method `stop` should be called when page reached `TTI` stage.

```javascript
// perf.config.js
const pageLoad = metrics.pageLoad({});

// view.js
pageLoad.stop();
```

## Measuring interactions

It is as simple as exposed common API. To start interaction (most likely at the user driven event e.g. `click`).

```javascript
// vanilla js
element.addEventListener('click', () => {
  interaction.start();
});

// react
const feedback = useCallback(() => {
  interaction.start();
});
return <button onClick={feedback}>click</button>;
```

The end of the interaction should be marked by calling `stop` method.

Usually end of interaction happens with visual effect (e.g. created card). It is important to trigger `stop` when interaction fully finished.
Even though it is much easier to plug callback into Redux it may hide long render time.

Upcoming helper React components should help with that task.

## Measuring page load via dependencies on other metrics

You can configure a `pageLoad` metric with the `until` option to describe other metrics that must all be stopped for the `pageLoad` to be considered "finished".

Using this option avoids needing to manually call the `pageLoad.stop()` method. The `pageLoad` will instead assume the stop time of the slowest `until` metric. 

You can pass either a single metric or array of metrics to `until`:

```javascript
const header = metric.pageSegmentLoad({key: 'header'});
const body = metric.pageSegmentLoad({key: 'body'});
const footer = metric.pageSegmentLoad({key: 'footer'});

// waits until all sub-metrics are stopped
const entirePage = metrics.pageLoad({
  key: 'entire-page',
  until: [header, body, footer]
});

entirePage.startPageLoad();
header.start();
header.stop();
body.start();
body.stop();
footer.start();
footer.stop();
```

Note, that you must explicitly call the `startPageLoad()` method on the "actual" `pageLoad` metric which defines the `until` config. In the above example, this is accomplished via invoking `entirePage.startPageLoad()`. Calling the generic library `browserMetrics.startPageLoad()` method alone is not sufficient.

In some cases, depending on how code is split up, the "actual" proper metric may not be immediately available at the beginning point of a page load or SPA transition. In this situation, invoke the generic `browserMetrics.startPageLoad()` _first_ to capture an accurate start time. Afterwards, when the "actual" metric is loaded, call its `startPageLoad()` method to activate the wait until functionality.

```js
// 1. call immediately upon navigation start
browserMetrics.startPageLoad();
// 2. later, after route specific JS has loaded, call the "actual" startPageLoad() to apply the until tracking
const entirePage = await import("./my-page/perf.config");
entirePage.startPageLoad();
```

---

## Global Config

Global config for Browser Metrics is quite extensive, however once configured it shouldn't trouble too much in the future.

### `info`

The section `info` contains all the information of application and current release.

### `events`

This section covers which custom data, feature flags or extra plugins be triggered for all or specific type of event.

### `endpoints`

Browser Metrics support two data pipelines:

- GasV3
- METAL (https://developer.atlassian.com/platform/metal/introduction/getting-started)

`eventPipelineClient` consumes configured `analytics-web-client` promise with exposed `sendOperationalEvent` method.
`metalClient` is a promise of configured `metal-client` with exposed `submit` method.

It is recommended to provide both to get full benefits of Browser Metrics and Performance Portal.

### `plugins`

The section of plugins configuration. There are supported 3 configs:

- `featureFlags` - client to retrieve FF values
- `resourceTimings` - to map/sanitize network calls
- `bundleEvalTimings` - to map JS bundles evaluation marks

### `ssr`

Simple config for SSR marks

### `debug`

Turning `debug` on will print extra information to the console.
