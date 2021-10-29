import {
  createElement,
  Fragment,
  useLayoutEffect,
  useCallback,
  useMemo,
  FC,
} from 'react';
import { hook } from '../global/hook';
import { isFiberWithKeyInRoot } from '../fiber';
import { AnalysisListener, Analysis } from '../types';
import { analyze, Options as AnalyzerOptions } from '../analyzer';
import { log } from '../analyzer/logger';
import { requestIdleCallback } from '../util';

function randomString(): string {
  return Math.floor(Date.now() / Math.random()).toString(36);
}

interface Options extends AnalyzerOptions {
  immediate: boolean;
}

const defaults: Options = {
  immediate: false,
};

type Handler = (analysis: Analysis) => void;

export function useRenderAnalyzer(): FC;
export function useRenderAnalyzer(options: Partial<Options>): FC;
export function useRenderAnalyzer(handler: Handler): FC;
export function useRenderAnalyzer(
  options: Partial<Options>,
  handler: Handler,
): FC;
export function useRenderAnalyzer(...args: (Partial<Options> | Handler)[]): FC {
  const [{ immediate, ...analyzeOptions }, handler] = useArgs(args);
  const rand = useMemo(randomString, []);
  const key = `react-render-analyzer--${rand}`;

  const onCommit = useImmediateCallback(
    (commit) => {
      if (isFiberWithKeyInRoot(commit.root, key)) {
        const analysis = analyze(commit, analyzeOptions);
        if (analysis) {
          handler(analysis);
        }
      }
    },
    immediate,
    [handler],
  );

  useLayoutEffect(() => hook.subscribe(onCommit), [key, onCommit]);

  return ({ children }) => createElement(Fragment, { key }, children);
}

function useArgs(args: (Partial<Options> | Handler)[]): [Options, Handler] {
  const handler: Handler = log;

  switch (args.length) {
    case 0:
      return [{ ...defaults }, handler];

    case 1:
      if (typeof args[0] === 'function') {
        return [{ ...defaults }, args[0] as Handler];
      }
      return [{ ...defaults, ...args[0] } as Options, handler];

    default:
      return [{ ...defaults, ...args[0] }, args[1]] as [Options, Handler];
  }
}

function useImmediateCallback(
  callback: AnalysisListener,
  immediate: boolean,
  deps: unknown[],
): AnalysisListener {
  return useCallback(
    (commit) => {
      if (immediate) {
        callback(commit);
      } else {
        requestIdleCallback(() => {
          callback(commit);
        });
      }
    },
    [immediate, ...deps], // eslint-disable-line
  );
}
