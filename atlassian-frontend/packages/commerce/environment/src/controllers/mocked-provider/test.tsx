import React from 'react';

// FIXME: Needs Tangerine styling to avoid eslint ATM - Seems to be a bug
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';

import { useCommerceOverride } from '../use-commerce-override';

import { CommerceMockedEnvironment } from './index';

describe('MockedPlugin ', () => {
  const fn = jest.fn();
  const mockedFn = jest.fn();
  const factorProbe = () => {
    let overrideMock: any;
    let fetchMock: any;

    const Probe = () => {
      fetchMock = useCommerceOverride(fetch);
      overrideMock = useCommerceOverride(fn);
      return null;
    };
    return { fn, Probe, read: () => ({ overrideMock, fetchMock }) };
  };

  it('do nothing by default', async () => {
    const { Probe, read, fn } = factorProbe();
    render(
      <CommerceMockedEnvironment>
        <Probe />
      </CommerceMockedEnvironment>,
    );
    const { fetchMock, overrideMock } = read();
    expect(fetchMock).toBe(fetch);
    expect(overrideMock).toBe(fn);
  });

  it('mocks when told to', async () => {
    const { Probe, read, fn } = factorProbe();
    render(
      <CommerceMockedEnvironment overrides={[[fn, mockedFn]]}>
        <Probe />
      </CommerceMockedEnvironment>,
    );
    const { fetchMock, overrideMock } = read();
    expect(fetchMock).toBe(fetch);
    expect(overrideMock).toBe(mockedFn);
  });

  it('full mock case', async () => {
    const { Probe, read, fn } = factorProbe();
    render(
      <CommerceMockedEnvironment scenarios={[]} overrides={[[fn, mockedFn]]}>
        <Probe />
      </CommerceMockedEnvironment>,
    );
    const { fetchMock, overrideMock } = read();
    expect(fetchMock).not.toBe(fetch);
    expect(overrideMock).toBe(mockedFn);
  });
});
