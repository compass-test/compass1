import React from 'react';
import Button from '@atlaskit/button';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, act } from '@testing-library/react';
import { useFeature } from '../../';

jest.mock('../../../../feature-flags.tsx', () => ({
  testFlagInitialFalse: false,
  testFlagInitialTrue: true,
}));

describe('useFeature', () => {
  beforeEach(() => {
    window.localStorage.setItem('ff-testFlagInitialTrue', 'true');
    window.localStorage.setItem('ff-testFlagInitialFalse', 'false');
  });
  afterEach(() => {
    window.localStorage.clear();
  });

  it('should hide a component if feature flag is set to false', () => {
    const FlaggedComponent = () => {
      // @ts-ignore (using mocked flag)
      const showButton = useFeature('testFlagInitialFalse');
      if (showButton) {
        return <Button testId="flagged-button">Hello</Button>;
      }
      return null;
    };

    const { queryByTestId } = render(<FlaggedComponent />);
    expect(queryByTestId('flagged-button')).not.toBeInTheDocument();
  });

  it('should show a feature if feature flag is set to true', async () => {
    const FlaggedComponent = () => {
      // @ts-ignore (using mocked flag)
      const showButton = useFeature('testFlagInitialTrue');
      if (showButton) {
        return <Button testId="flagged-button">Hello</Button>;
      }
      return null;
    };
    const { queryByTestId } = render(<FlaggedComponent />);
    expect(queryByTestId('flagged-button')).toBeInTheDocument();
  });

  it('should show a feature if feature flag is toggled to true', async () => {
    const FlaggedComponent = () => {
      // @ts-ignore (using mocked flag)
      const showButton = useFeature('testFlagInitialFalse');
      if (showButton) {
        return <Button testId="flagged-button">Hello</Button>;
      }
      return null;
    };
    const { queryByTestId } = render(<FlaggedComponent />);

    act(() => {
      window.localStorage.setItem('ff-testFlagInitialFalse', 'true');
      // A limitation of listening to storage events is that they only fire when
      // storage is shared across multiple documents, eg. when you have two tabs
      // open. For the purposes of the test we will simulate having two tabs open
      // by firing the event manually (the data doesn't need to be in the event,
      // our hook is just listening for the event type & key to see if it needs to run)
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'ff-testFlagInitialFalse',
        }),
      );
    });

    expect(queryByTestId('flagged-button')).toBeInTheDocument();
  });

  it('should hide a feature if feature flag is toggled to false', async () => {
    const FlaggedComponent = () => {
      // @ts-ignore (using mocked flag)
      const showButton = useFeature('testFlagInitialTrue');
      if (showButton) {
        return <Button testId="flagged-button">Hello</Button>;
      }
      return null;
    };
    const { queryByTestId } = render(<FlaggedComponent />);

    act(() => {
      window.localStorage.setItem('ff-testFlagInitialTrue', 'false');
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'ff-testFlagInitialTrue',
        }),
      );
    });

    expect(queryByTestId('flagged-button')).not.toBeInTheDocument();
  });

  it('should toggle a flag to hide and then show something sequentially', async () => {
    const FlaggedComponent = () => {
      // @ts-ignore (using mocked flag)
      const showButton = useFeature('testFlagInitialTrue');
      if (showButton) {
        return <Button testId="flagged-button">Hello</Button>;
      }
      return null;
    };
    const { queryByTestId } = render(<FlaggedComponent />);

    expect(queryByTestId('flagged-button')).toBeInTheDocument();

    act(() => {
      window.localStorage.setItem('ff-testFlagInitialTrue', 'false');
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'ff-testFlagInitialTrue',
        }),
      );
    });

    expect(queryByTestId('flagged-button')).not.toBeInTheDocument();

    act(() => {
      window.localStorage.setItem('ff-testFlagInitialTrue', 'true');
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'ff-testFlagInitialTrue',
        }),
      );
    });

    expect(queryByTestId('flagged-button')).toBeInTheDocument();
  });

  it('can handling toggle multiple feature flags', async () => {
    const TwoFeatureFlaggedComponents = () => {
      // @ts-ignore (using mocked flag)
      const showButtonOne = useFeature('testFlagInitialTrue');
      // @ts-ignore (using mocked flag)
      const showButtonTwo = useFeature('testFlagInitialFalse');

      return (
        <>
          {showButtonOne && <Button testId="button-one">Button One</Button>}
          {showButtonTwo && <Button testId="button-two">Button two</Button>}
        </>
      );
    };
    const { queryByTestId } = render(<TwoFeatureFlaggedComponents />);

    expect(queryByTestId('button-one')).toBeInTheDocument();
    expect(queryByTestId('button-two')).not.toBeInTheDocument();

    act(() => {
      window.localStorage.setItem('ff-testFlagInitialTrue', 'false');
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'ff-testFlagInitialTrue',
        }),
      );
      window.localStorage.setItem('ff-testFlagInitialFalse', 'true');
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'ff-testFlagInitialFalse',
        }),
      );
    });

    expect(queryByTestId('button-one')).not.toBeInTheDocument();
    expect(queryByTestId('button-two')).toBeInTheDocument();
  });
});
