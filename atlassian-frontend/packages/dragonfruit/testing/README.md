# Package Dragonfruit Testing

This package contains testing utilities that help run tests in other
Dragonfruit packages.

For GraphQL testing please refer to the `dragonfruit/graphql` package.

## CompassTestProvider

Previously when creating storyboard examples, developers needed to wrap their
examples in a number of providers:

- Mocked Provider
- MockedTenantInfoProvider
- SmartLinksProvider
- FlagsProvider
- IntlProvider

To make creating storyboards more simple, we have created `CompassTestProvider`:

```tsx
export function CompassTestProvider(props: CompassProviderProps) {
  const { children, locale, smartLinksProviderClient } = props;

  return (
    <MockedTenantInfoProvider>
      <SmartLinksProvider client={smartLinksProviderClient}>
        <FlagsProvider>
          <CompassIntlProvider locale={locale || 'en'}>
            {children}
          </CompassIntlProvider>
        </FlagsProvider>
      </SmartLinksProvider>
    </MockedTenantInfoProvider>
  );
}
```

Now all you have to do is wrap your storyboards with `CompassTestProvider`:

```tsx
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};
```
