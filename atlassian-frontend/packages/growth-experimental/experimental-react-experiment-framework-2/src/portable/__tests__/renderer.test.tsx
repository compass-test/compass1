import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { mount } from 'enzyme';

import { useExperiment } from '../../core';
import { usePluginRenderer, ErrorBoundary } from '../renderer';

const Throw = () => {
  throw new Error('should be caught');
};
beforeEach(() => {
  jest.clearAllMocks();
});

describe('usePluginRenderer', () => {
  test('should render component from render method', () => {
    const mockRenderer = jest.fn().mockReturnValue(42);

    const { result } = renderHook(() => {
      const experiment = useExperiment(usePluginRenderer(mockRenderer));

      return experiment.render();
    });

    expect(mockRenderer).toHaveBeenCalled();
    expect(result.current).toBe(42);
  });

  test('should render fallback component in an error boundary if an error occurs', async () => {
    const mockErrorHandler = jest.fn();
    const fallbackComponent = <span>fallback</span>;

    const experiment = useExperiment(
      usePluginRenderer(() => (
        <ErrorBoundary
          onError={mockErrorHandler}
          fallbackComponent={fallbackComponent}
        >
          <Throw />
          <span>experiment</span>
        </ErrorBoundary>
      )),
    );

    const wrapper = mount(<>{experiment.render()}</>);

    expect(mockErrorHandler).toHaveBeenCalled();
    expect(wrapper.find('ErrorBoundary')).toHaveLength(1);
    expect(wrapper.text().includes('fallback')).toBe(true);
    expect(wrapper.text().includes('experiment')).toBe(false);
  });

  test('should render correctly in an error boundary', () => {
    const mockErrorHandler = jest.fn();
    const fallbackComponent = <span>fallback</span>;

    const experiment = useExperiment(
      usePluginRenderer(() => (
        <ErrorBoundary
          onError={mockErrorHandler}
          fallbackComponent={fallbackComponent}
        >
          <span>experiment</span>
        </ErrorBoundary>
      )),
    );

    const wrapper = mount(<>{experiment.render()}</>);

    expect(mockErrorHandler).not.toHaveBeenCalled();
    expect(wrapper.find('ErrorBoundary')).toHaveLength(1);
    expect(wrapper.text().includes('fallback')).toBe(false);
    expect(wrapper.text().includes('experiment')).toBe(true);
  });
});
