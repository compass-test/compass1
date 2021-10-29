# @atlassian/confluence-monitoring-client

This package serves as a lightweight abstraction over Confluence's current monitoring solution.
This "monitoring solution" is [cc-fe-telemetry](https://microscope.prod.atl-paas.net/services/cc-fe-telemetry) service. It was built to replicate some of the functionality intended to be covered by [METAL](https://developer.atlassian.com/platform/metal/introduction/getting-started/), and the thinking is that once METAL matures enough, `cc-fe-telemetry` will be replaced by it.

### API

The API is exposed via `MonitoringClient` interface, you can refer to in-code interface documentation.
The implementation of this interface is exposed via `ConfluenceMonitoringClient`.

### Usage

Below you can find the intended integration points of `MonitoringClient` into your application, as well as expected usage patterns:

```javascript
// client.ts
export const monitoringClient = new ConfluenceMonitoringClient(
  '<cc-fe-telemetry URL>',
);

// router.ts
export const router = new Router({
  onRouteChange({ newRouteName }) {
    monitoringClient.captureTransition(newRouteName);
  },
  onBootstrap({ appInfo: { releaseId, environment } }) {
    // this will merge with existing context
    monitoringClient.updateGlobalTags({ releaseId, environment });
  },
  onFeatureFlagLoad({ flagName, flagValue }) {
    // the return result will override existing context
    monitoringClient.updateGlobalTags(oldContext => ({
      ...oldContext,
      featureFlags: {
        ...oldContext.featureFlags,
        flagName: String(flagValue),
      },
    }));
  },
});

// app.ts
export const app = new App({
  onError(error: Error) {
    monitoringClient.captureErrorOccurrence(error, {
      ownerTeamName: 'Core',
      tag1: 'value1',
      tag2: 'value2',
    });
  },
});

// button-component.ts
export const buttonComponent = new Component({
  componentName: 'TheFanciestOfButtons',
  onRenderStart() {
    this.state.renderStart = performance.now();
  },
  onRenderEnd() {
    const renderDuration = performance.now() - this.state.renderStart;
    monitoringClient.submitPerformanceMetric(
      this.componentName,
      renderDuration,
      {
        ownerTeamName: 'Foundations',
        tag2: 'value2',
      },
    );
  },
});

// operation-result-component.ts
export const operationResultComponent = new Component({
  componentName: 'OperationResult',
  onRenderComplete() {
    monitoringClient.incrementCounter(
      `${this.componentName}:${this.props.operationName}`,
      {
        ownerTeamName: 'Core',
        operationResult: String(this.props.operationResult),
      },
    );
  },
});
```
