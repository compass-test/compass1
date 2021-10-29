import { ExperimentCore, ExperimentError, ExperimentErrorType } from './types';
import { ExperimentPipelineEndListeners } from '../helpers/markPipelineEndListener';
import { markAndHandleError } from '../helpers/markAndHandleError';

export function useExperiment<
  Out1 extends object,
  Out2 extends object,
  Out3 extends object,
  Out4 extends object,
  Out5 extends object,
  Out6 extends object,
  Out7 extends object,
  Out8 extends object,
  Out9 extends object,
  Out10 extends object,
  Out11 extends object,
  Out12 extends object,
  Out13 extends object,
  Out14 extends object,
  Out15 extends object,
  Out16 extends object,
  Out17 extends object,
  Out18 extends object,
  Out19 extends object,
  Out20 extends object
>(
  plugin1?: (pipeline: ExperimentCore & {}) => Out1,
  plugin2?: (pipeline: ExperimentCore & Out1) => Out2,
  plugin3?: (pipeline: ExperimentCore & Out1 & Out2) => Out3,
  plugin4?: (pipeline: ExperimentCore & Out1 & Out2 & Out3) => Out4,
  plugin5?: (pipeline: ExperimentCore & Out1 & Out2 & Out3 & Out4) => Out5,
  plugin6?: (
    pipeline: ExperimentCore & Out1 & Out2 & Out3 & Out4 & Out5,
  ) => Out6,
  plugin7?: (
    pipeline: ExperimentCore & Out1 & Out2 & Out3 & Out4 & Out5 & Out6,
  ) => Out7,
  plugin8?: (
    pipeline: ExperimentCore & Out1 & Out2 & Out3 & Out4 & Out5 & Out6 & Out7,
  ) => Out8,
  plugin9?: (
    pipeline: ExperimentCore &
      Out1 &
      Out2 &
      Out3 &
      Out4 &
      Out5 &
      Out6 &
      Out7 &
      Out8,
  ) => Out9,
  plugin10?: (
    pipeline: ExperimentCore &
      Out1 &
      Out2 &
      Out3 &
      Out4 &
      Out5 &
      Out6 &
      Out7 &
      Out8 &
      Out9,
  ) => Out10,
  plugin11?: (
    pipeline: ExperimentCore &
      Out1 &
      Out2 &
      Out3 &
      Out4 &
      Out5 &
      Out6 &
      Out7 &
      Out8 &
      Out9 &
      Out10,
  ) => Out11,
  plugin12?: (
    pipeline: ExperimentCore &
      Out1 &
      Out2 &
      Out3 &
      Out4 &
      Out5 &
      Out6 &
      Out7 &
      Out8 &
      Out9 &
      Out10 &
      Out11,
  ) => Out12,
  plugin13?: (
    pipeline: ExperimentCore &
      Out1 &
      Out2 &
      Out3 &
      Out4 &
      Out5 &
      Out6 &
      Out7 &
      Out8 &
      Out9 &
      Out10 &
      Out11 &
      Out12,
  ) => Out13,
  plugin14?: (
    pipeline: ExperimentCore &
      Out1 &
      Out2 &
      Out3 &
      Out4 &
      Out5 &
      Out6 &
      Out7 &
      Out8 &
      Out9 &
      Out10 &
      Out11 &
      Out12 &
      Out13,
  ) => Out14,
  plugin15?: (
    pipeline: ExperimentCore &
      Out1 &
      Out2 &
      Out3 &
      Out4 &
      Out5 &
      Out6 &
      Out7 &
      Out8 &
      Out9 &
      Out10 &
      Out11 &
      Out12 &
      Out13 &
      Out14,
  ) => Out15,
  plugin16?: (
    pipeline: ExperimentCore &
      Out1 &
      Out2 &
      Out3 &
      Out4 &
      Out5 &
      Out6 &
      Out7 &
      Out8 &
      Out9 &
      Out10 &
      Out11 &
      Out12 &
      Out13 &
      Out14 &
      Out15,
  ) => Out16,
  plugin17?: (
    pipeline: ExperimentCore &
      Out1 &
      Out2 &
      Out3 &
      Out4 &
      Out5 &
      Out6 &
      Out7 &
      Out8 &
      Out9 &
      Out10 &
      Out11 &
      Out12 &
      Out13 &
      Out14 &
      Out15 &
      Out16,
  ) => Out17,
  plugin18?: (
    pipeline: ExperimentCore &
      Out1 &
      Out2 &
      Out3 &
      Out4 &
      Out5 &
      Out6 &
      Out7 &
      Out8 &
      Out9 &
      Out10 &
      Out11 &
      Out12 &
      Out13 &
      Out14 &
      Out15 &
      Out17,
  ) => Out18,
  plugin19?: (
    pipeline: ExperimentCore &
      Out1 &
      Out2 &
      Out3 &
      Out4 &
      Out5 &
      Out6 &
      Out7 &
      Out8 &
      Out9 &
      Out10 &
      Out11 &
      Out12 &
      Out13 &
      Out14 &
      Out15 &
      Out17 &
      Out18,
  ) => Out19,
  plugin20?: (
    pipeline: ExperimentCore &
      Out1 &
      Out2 &
      Out3 &
      Out4 &
      Out5 &
      Out6 &
      Out7 &
      Out8 &
      Out9 &
      Out10 &
      Out11 &
      Out12 &
      Out13 &
      Out14 &
      Out15 &
      Out17 &
      Out18 &
      Out19,
  ) => Out20,
): Out1 &
  Out2 &
  Out3 &
  Out4 &
  Out5 &
  Out6 &
  Out7 &
  Out8 &
  Out9 &
  Out10 &
  Out11 &
  Out12 &
  Out13 &
  Out14 &
  Out15 &
  Out16 &
  Out17 &
  Out18 &
  Out19 &
  Out20 &
  ExperimentError;
export function useExperiment(...plugins: any[]): any {
  const pipelineSeed = createPipelineSeed();
  const combinedPipeline: typeof pipelineSeed = plugins.reduce(
    (pipeline, plugin, index) => {
      let result: ExperimentCore & Partial<ExperimentError> = {};
      const currentPluginPipeline = {
        ...pipeline,
        meta: {
          ...pipeline.meta,
          currentPlugin: {
            index,
          },
        },
      };
      try {
        result = plugin(currentPluginPipeline);
        if (result.error && !result.error.handled) {
          throw result.error;
        }
      } catch (error) {
        result = {
          ...markAndHandleError(error, { ...currentPluginPipeline, ...result }),
          ...result,
        };
      }
      return {
        ...currentPluginPipeline,
        ...result,
      };
    },
    pipelineSeed,
  );
  const finalPipeline = {
    ...combinedPipeline,
    meta: {
      ...combinedPipeline.meta,
      currentPlugin: null,
    },
  };

  // TODO should end-listeners receive correct .currentPlugin?
  notifyPipelineEndListeners(finalPipeline);
  delete finalPipeline.meta;
  return finalPipeline;
}

function notifyPipelineEndListeners(
  finalPipeline: Partial<ExperimentPipelineEndListeners>,
) {
  const listeners = finalPipeline.pipelineEndListeners || [];
  for (const listener of listeners) {
    listener(finalPipeline);
  }
}

type SeededPipeline = ExperimentCore &
  ExperimentError &
  Partial<ExperimentPipelineEndListeners>;

function createPipelineSeed(): SeededPipeline {
  return {
    meta: {
      pipelineModeEnabled: true,
      currentPlugin: {
        index: -1,
      },
    },
    error: null,
    errorHandler: (
      error: ExperimentErrorType | Error,
      pipeline: SeededPipeline,
    ) => {
      throw (error as ExperimentErrorType).rawError || error;
    },
  };
}
