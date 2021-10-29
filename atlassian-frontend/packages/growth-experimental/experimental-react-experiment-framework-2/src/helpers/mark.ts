import { ExperimentCore } from '../core/types';

export const mark = <Extensions extends {}, Upstream extends ExperimentCore>(
  extensions: Extensions,
  pipeline: Upstream,
): Upstream & Extensions => ({
  ...pipeline,
  ...extensions,
});
