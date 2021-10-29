import React, { useEffect, useRef } from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';

import { HeightRetainingContainer } from '../height-retaining-container';

describe('HeightRetainingContainer', () => {
  const ContainerWithHeight = ({ height }: { height: number }) => {
    const ref = useRef<HTMLDivElement>(null);

    // This is a hack to mock `getBoundingClientRect` without modifying the element prototype
    // jsdom does no rendering so `getBoundingClientRect` always return {0,0,0,0} normally.
    useEffect(() => {
      Object.defineProperty(
        ref.current?.parentElement,
        'getBoundingClientRect',
        {
          value: () => ({ height }),
          writable: true,
        },
      );
    }, [height]);

    return <div ref={ref} />;
  };

  const Height100Container = () => <ContainerWithHeight height={100} />;
  const Height50Container = () => <ContainerWithHeight height={50} />;

  const getComponent = async (testId = 'height-retaining-container') => {
    return await screen.findByTestId(testId);
  };

  it('should not set min height on initial render (retain height is true)', async () => {
    render(
      <HeightRetainingContainer retainHeight data-testid="retain-height-true">
        <Height100Container />
      </HeightRetainingContainer>,
    );

    expect((await getComponent('retain-height-true')).style.minHeight).toEqual(
      'auto',
    );

    render(
      <HeightRetainingContainer
        retainHeight={false}
        data-testid="retain-height-false"
      >
        <Height100Container />
      </HeightRetainingContainer>,
    );

    expect((await getComponent('retain-height-false')).style.minHeight).toEqual(
      'auto',
    );
  });

  it('should not set min height if retainHeight is false and child changes', async () => {
    const { rerender } = render(
      <HeightRetainingContainer
        retainHeight={false}
        data-testid="height-retaining-container"
      >
        <Height100Container />
      </HeightRetainingContainer>,
    );

    rerender(
      <HeightRetainingContainer
        retainHeight={false}
        data-testid="height-retaining-container"
      >
        <Height50Container />
      </HeightRetainingContainer>,
    );

    expect((await getComponent()).style.minHeight).toEqual('auto');
  });

  it('should fix height if retainHeight is true when child changes', async () => {
    const { rerender } = render(
      <HeightRetainingContainer
        retainHeight
        data-testid="height-retaining-container"
      >
        <Height100Container />
      </HeightRetainingContainer>,
    );

    rerender(
      <HeightRetainingContainer
        retainHeight
        data-testid="height-retaining-container"
      >
        <Height50Container />
      </HeightRetainingContainer>,
    );

    expect((await getComponent()).style.minHeight).toEqual('100px');
  });

  it('should update min height if retainHeight is toggled off and on', async () => {
    const { rerender } = render(
      <HeightRetainingContainer
        retainHeight={false}
        data-testid="height-retaining-container"
      >
        <Height100Container />
      </HeightRetainingContainer>,
    );

    // This should retain the height of the previous render
    rerender(
      <HeightRetainingContainer
        retainHeight
        data-testid="height-retaining-container"
      >
        <Height100Container />
      </HeightRetainingContainer>,
    );

    expect((await getComponent()).style.minHeight).toEqual('100px');

    // This will reset the height
    rerender(
      <HeightRetainingContainer
        retainHeight={false}
        data-testid="height-retaining-container"
      >
        <Height50Container />
      </HeightRetainingContainer>,
    );

    // This should retain the height of the previous render
    rerender(
      <HeightRetainingContainer
        retainHeight
        data-testid="height-retaining-container"
      >
        <Height50Container />
      </HeightRetainingContainer>,
    );

    expect((await getComponent()).style.minHeight).toEqual('50px');
  });

  it('should use latest height of child when child changes height internally', async () => {
    const { rerender } = render(
      <HeightRetainingContainer
        retainHeight={false}
        data-testid="height-retaining-container"
      >
        <ContainerWithHeight height={100} />
      </HeightRetainingContainer>,
    );

    rerender(
      <HeightRetainingContainer
        retainHeight={false}
        data-testid="height-retaining-container"
      >
        <ContainerWithHeight height={50} />
      </HeightRetainingContainer>,
    );

    rerender(
      <HeightRetainingContainer
        retainHeight
        data-testid="height-retaining-container"
      >
        <ContainerWithHeight height={1000} />
      </HeightRetainingContainer>,
    );

    expect((await getComponent()).style.minHeight).toEqual('50px');
  });
});
