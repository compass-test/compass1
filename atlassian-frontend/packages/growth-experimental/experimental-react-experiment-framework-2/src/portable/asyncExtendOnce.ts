import {
  ExperimentCore,
  ExperimentError,
  ExperimentLoading,
} from '../core/types';
import React from 'react';
import { markLoading } from '../helpers/markLoading';
import { markError } from '../helpers/markError';

type RequiredUpstream = ExperimentCore & Partial<ExperimentLoading>;

type ExtenderFunc<Extensions, Upstream> = (
  pipeline: Upstream,
) => Promise<Extensions>;

type Options = {
  runWhenLoading?: boolean;
};

export const usePluginAsyncExtendOnce = <
  Extensions extends {},
  Upstream extends RequiredUpstream
>(
  extender: ExtenderFunc<Extensions, Upstream>,
  { runWhenLoading = false }: Options = {},
) =>
  function useAsyncExtendOnce(
    pipeline: Upstream,
  ): Partial<Extensions> & ExperimentLoading & ExperimentError {
    const extenderCallback = extender;
    const runWhenLoadingOption = runWhenLoading;
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [callbackCalled, setCallbackCalled] = React.useState(false);
    const [extensions, setExtensions] = React.useState<Partial<Extensions>>({});
    React.useEffect(() => {
      if (callbackCalled || (pipeline.loading && !runWhenLoadingOption)) {
        return;
      }
      (async () => {
        setCallbackCalled(true);
        setLoading(true);
        let result: Extensions;
        try {
          result = await extenderCallback(pipeline);
          setExtensions(result);
        } catch (err) {
          setError(err);
        }
        setLoading(false);
      })();
    }, [
      callbackCalled,
      extenderCallback,
      pipeline,
      pipeline.loading,
      runWhenLoadingOption,
    ]);

    return {
      ...extensions,
      ...markError(error, markLoading(loading, pipeline)),
    };
  };
