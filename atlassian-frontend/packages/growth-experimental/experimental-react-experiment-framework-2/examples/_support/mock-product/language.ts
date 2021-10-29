import React from 'react';
import { ProductEnvContext } from './support/productEnv';
import { ExperimentCore } from '../../../src/core/types';
import { ExperimentLanguage } from '../../../src/abstract/language';

export const usePluginLanguage = <Upstream extends ExperimentCore>() =>
  function useLanguage(pipeline: Upstream): Upstream & ExperimentLanguage {
    return {
      language: React.useContext(ProductEnvContext).locale,
      ...pipeline,
    };
  };
