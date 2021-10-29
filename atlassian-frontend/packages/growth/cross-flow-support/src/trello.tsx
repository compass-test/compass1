import React, { ComponentType } from 'react';
import { PluginCollection } from '@atlassiansox/cross-flow-base-types';
import { CrossFlowProvider } from './lib/CrossFlowProvider';
import { AnalyticsWebClientInterface, Environment } from './lib/types';
export {
  useCrossFlow,
  withCrossFlow,
  Journeys,
  Targets,
  Reasons,
} from './index';
export type { WithCrossFlowProps, TargetType } from './index';

interface TrelloCrossFlowProvider {
  analyticsClient: AnalyticsWebClientInterface;
  locale: string;
  edgePrefix: string;
  isAaMastered: boolean;
  env: Environment;
  plugins?: PluginCollection;
  onError: (error: Error) => void;
}

const TrelloCrossFlowProvider: ComponentType<TrelloCrossFlowProvider> = (
  props,
) => {
  const redirectToWac = !props.isAaMastered;
  return (
    <CrossFlowProvider
      {...props}
      originProduct="trello"
      redirectToWac={redirectToWac}
    />
  );
};

export default TrelloCrossFlowProvider;
