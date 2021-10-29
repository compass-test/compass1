import {
  ExperimentCore,
  ExperimentError,
  ExperimentLoading,
} from '../core/types';
import React from 'react';
import { markLoading } from '../helpers/markLoading';
import { markError } from '../helpers/markError';

type RequiredUpstream = ExperimentCore & Partial<ExperimentLoading>;

type ExtenderFunc<Extensions, Upstream> = () => Promise<Extensions>;

type Options = {
  runWhenLoading?: boolean;
};

/*
 * Note: ALWAYS call this plugin with React.useCallback wrapping the
 * callback parameter.
 *
 * This plugin calls the callback again and re-renders each time the callback's
 * identity changes. If you don't use useCallback, it will keep re-rendering
 * in a loop.
 */
export const usePluginAsyncExtendCallback = <
  Extensions extends {},
  Upstream extends RequiredUpstream
>(
  // The callback should always come wrapped in React.useCallback
  extenderCallback: ExtenderFunc<Extensions, Upstream>,
  { runWhenLoading = false }: Options = {},
) =>
  function useAsyncExtendCallback(
    pipeline: Upstream,
  ): Partial<Extensions> & ExperimentLoading & ExperimentError {
    const extender = extenderCallback;
    const runWhenLoadingOption = runWhenLoading;

    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [extensions, setExtensions] = React.useState<Partial<Extensions>>({});
    const canLoad = runWhenLoadingOption || !pipeline.loading;
    const previousLoaderRef = React.useRef<typeof loader | null>(null);
    const loader = React.useCallback(() => {
      let cancelled = false;
      if (!canLoad) {
        return;
      }
      previousLoaderRef.current = loader;
      (async () => {
        setLoading(true);
        try {
          // We don't want to pass the pipeline to the callback because there's
          // no safe way to define useEffect dependencies for the whole pipeline.
          const result = await extender();
          if (cancelled) {
            return;
          }
          setExtensions(result);
        } catch (err) {
          if (cancelled) {
            return;
          }
          setError(err);
        }
        setLoading(false);
      })();
      return () => {
        cancelled = true;
      };
    }, [
      // We don't want to fire the callback again if it has the same identity.
      // This allows our consumers to cache/memo the callback using
      // React.useCallback() -- the ESLint Exhaustive Deps plugin will
      // safely track the callback's dependencies.
      extender,
      canLoad,
    ]);
    const willBeLoading = canLoad && previousLoaderRef.current !== loader;
    React.useEffect(() => loader(), [loader]);

    return {
      ...extensions,
      ...markError(error, markLoading(loading || willBeLoading, pipeline)),
    };
  };
