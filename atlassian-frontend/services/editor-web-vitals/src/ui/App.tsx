import React, { useCallback, useState, useContext, ComponentType } from 'react';
import { LazySuspense, lazyForPaint } from 'react-loosely-lazy';

import './App.css';
import { IDleDetectorContext } from './idle-detector/idle-detector';
import { Loader } from 'react-loosely-lazy/lib/cjs/lazy/loader';
import {
  LazyComponent,
  LazyOptions,
} from 'react-loosely-lazy/lib/cjs/lazy/types';
import {
  getAnalyticsClient,
  withAnalyticsProvider,
} from './analytics/AnalyticsProvider';

function clearAllEntries() {
  // eslint-disable-next-line compat/compat
  const entries = performance.getEntriesByType('measure');
  entries.forEach((entry) => {
    // eslint-disable-next-line compat/compat
    performance.clearMeasures(entry.name);
  });
  // eslint-disable-next-line compat/compat
  performance.clearMarks('all-metrics-start');
}

interface Metrics {
  loading: number;
  ttr: number;
}

function getPerformanceMetrics(): Metrics {
  // eslint-disable-next-line compat/compat
  return performance.getEntriesByType('measure').reduce<Metrics>(
    (acc, entry) => {
      switch (entry.name) {
        case 'loading-assets':
          return { ...acc, loading: entry.duration };
        case 'TTR':
          return { ...acc, ttr: entry.duration };
        default:
          return acc;
      }
    },
    {
      loading: 0,
      ttr: 0,
    },
  );
}

function useMeasuredCallback(fn: Function, deps: []) {
  const idleDetector = useContext(IDleDetectorContext);

  return useCallback((...args: any[]) => {
    idleDetector.onIdle((tti) => {
      const { loading, ttr } = getPerformanceMetrics();
      clearAllEntries();
      console.log('Loading - Parsing - Evaluating:', loading);
      console.log('TTR:', ttr);
      console.log('TTI:', tti);
    });
    // eslint-disable-next-line compat/compat
    performance.mark('all-metrics-start');
    fn(...args);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

function lazyForPaintMeasured<C extends ComponentType<any>>(
  loader: Loader<C>,
  opts?: LazyOptions,
): LazyComponent<C> {
  return lazyForPaint(async () => {
    const component = await loader();
    // eslint-disable-next-line compat/compat
    performance.mark('loading-assets::end');
    // eslint-disable-next-line compat/compat
    performance.measure(
      'loading-assets',
      'all-metrics-start',
      'loading-assets::end',
    );
    // eslint-disable-next-line compat/compat
    performance.clearMarks('loading-assets::end');
    return component;
  }, opts);
}

const LazyRenderer = lazyForPaintMeasured(async () => {
  const res = await import('./renderer/renderer');
  return res.Renderer;
});

const LazyEditor = lazyForPaintMeasured(async () => {
  const res = await import('./editor/editor');
  return res.Editor;
});

enum ShowStates {
  editor = 'Editor',
  renderer = 'Renderer',
  none = 'None',
}

function App() {
  const [show, setShow] = useState(ShowStates.none);

  const handleClear = useCallback(() => {
    setShow(ShowStates.none);
  }, []);

  const showRenderer = useMeasuredCallback(() => {
    setShow(ShowStates.renderer);
  }, []);

  const showEditor = useMeasuredCallback(() => {
    setShow(ShowStates.editor);
  }, []);

  return (
    <div className="App">
      <button onClick={handleClear}>Clear</button>
      <button onClick={showRenderer}>Click to render renderer</button>
      <button onClick={showEditor}>Click to render editor</button>
      <br />

      {show === ShowStates.renderer && (
        <LazySuspense fallback={null}>
          <LazyRenderer />
        </LazySuspense>
      )}

      {show === ShowStates.editor && (
        <LazySuspense fallback={null}>
          <LazyEditor />
        </LazySuspense>
      )}
    </div>
  );
}

export default withAnalyticsProvider(App, getAnalyticsClient());
