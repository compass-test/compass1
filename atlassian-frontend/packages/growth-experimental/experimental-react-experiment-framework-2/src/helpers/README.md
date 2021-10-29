# Helpers

This directory contains helper functions that can be used in implementing portable helpers or in plugins that allow you to modify the pipeline directly such as `usePluginResolver()` or `usePluginExtend()`.

## Example

```typescript
useExperiment(
  // switch the cohort to not enrolled based on some condition
  usePluginResolver(pipeline => {
    if (!props.isSiteAdmin) {
      return markNotEnrolled('not-site-admin', pipeline);
    }
    return pipeline;
  }),
);
```

## More Information

- [What are plugins](../../docs/03-plugins.tsx)
