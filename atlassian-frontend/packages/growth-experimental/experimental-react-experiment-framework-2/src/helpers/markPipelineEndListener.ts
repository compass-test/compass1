import { ExperimentCore } from '../core/types';
import { mark } from './mark';

export interface ExperimentPipelineEndListeners {
  pipelineEndListeners: ((finalPipeline: any) => void)[];
}

export const markPipelineEndListener = <
  Pipeline extends ExperimentCore & Partial<ExperimentPipelineEndListeners>
>(
  callback: (finalPipeline: Pipeline) => void,
  pipeline: Pipeline,
): Pipeline & Partial<ExperimentPipelineEndListeners> => {
  const isStandalone = !(pipeline.meta && pipeline.meta.pipelineModeEnabled);
  if (isStandalone) {
    callback(pipeline);
    return pipeline;
  }
  return mark(
    {
      pipelineEndListeners: (pipeline.pipelineEndListeners || []).concat(
        callback,
      ),
    },
    pipeline,
  );
};
