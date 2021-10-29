# Abstract Host Plugins

Abstract plugins are plugins that have to be implemented differently in each product.

The framework provides:

- **Type definitions** to ensure consistent implementations and to allow portable plugins
  to depend on abstract plugin interfaces.

- **Delegates**, which make it easier to implement the plugins in each product.
  Delegates are functions with a signature similar to plugins, but expect extra
  arguments with implementation-specific data or behaviour.

## Plugins

### Analytics

Provides methods to send analytics.

### Feature Flag

Reads feature flags from LaunchDarkly. Has a Multivariate and a Boolean version.

### Language

Reads the current language/locale used by the current user. This is useful for cohorting.

## Notes

When adding a new Abstract Plugin, remember to re-export delegates or any helper functions
(like `useDelegateAnalytics`).

## More Information

- [What are plugins](../../docs/03-plugins.tsx)
- [How to write plugins](../../docs/04-writing-plugins.tsx)
