import { ExperimentCore } from '../core/types';

type RequiredUpstream = ExperimentCore;

type ExtenderFunc<Extensions, Upstream> = (pipeline: Upstream) => Extensions;
type Extender<Extensions, Upstream> =
  | Extensions
  | ExtenderFunc<Extensions, Upstream>;

export const usePluginExtend = <
  Upstream extends RequiredUpstream,
  Extensions extends {}
>(
  extensions: Extender<Extensions, Upstream>,
) =>
  function useExtend(pipeline: Upstream): Upstream & Extensions {
    return {
      ...pipeline,
      ...(typeof extensions === 'function'
        ? (extensions as ExtenderFunc<Extensions, Upstream>)(pipeline)
        : extensions),
    };
  };
