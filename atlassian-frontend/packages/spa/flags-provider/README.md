# Flags Controller

The Flags Controller helps with managing your Atlaskit Flags. It provides utility functions to show flags.

## Installation

```sh
yarn add @atlassian/flags-controller
```

## Usage

### General

- Providing an id will ensure that repeated calls to `showFlag` will not incur multiple flags.
- This component extends of Atlaskits Flag Props with slight modifications. This type is exported for your convenience.

### Provider

```javascript
import { FlagsProvider } from '@atlassian/flags-controller';

export const Entry: React.FC = () => (
  <FlagsProvider>
    <App />
  </FlagsProvider>
);
```

### Consumer with callback

```javascript
import { useFlags, FlagProps } from '@atlassian/flags-controller';

const Consumer: React.FC<Props> = props => {
  const { showFlag } = useFlags();
  const onClick = (): void => {
    const flag: FlagProps = {
      id: 'your-flag-identifier',
      title: 'title',
      description: 'description',
    };
    const dismissFlag = showFlag(flag);
  };
  return <Button onClick={onClick}>add flag</Button>;
};
```

### Consumer with useEffect

```javascript
import { useFlags, FlagId } from '@atlassian/flags-controller';

const refetch: React.FC<Props> = props => {
  const { loading, error } = props.useService();
  const { showFlag } = useFlags();

  useEffect(() => {
    if (error) {
      return showFlag({
        id: 'your-flag-identifier',
        title: 'Service failed',
        description: `${error.name}: ${error.message}`,
        appearance: 'error',
      });
    }
    return undefined;
  }, [error]);

  if (loading) {
    return <div>loading...</div>;
  }

  return props.children;
};
```

## Storybook

```javascript
import { withFlagsProvider } from '@atlassian/flags-controller';

export default { decorators: [withFlagsProvider] };
```
