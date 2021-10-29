import React, { ComponentType } from 'react';
import { AnalyticsWebClientInterface, MaybePromise } from './lib/types';
import { PluginCollection } from '@atlassiansox/cross-flow-base-types';
import { CrossFlowProvider } from './lib/CrossFlowProvider';

export {
  useCrossFlow,
  withCrossFlow,
  Journeys,
  Targets,
  Reasons,
} from './index';

interface StartProps {
  cloudId?: string;
  analyticsClient: MaybePromise<AnalyticsWebClientInterface>;
  locale: string;
  plugins?: PluginCollection;
}

export const StartProvider: ComponentType<StartProps> = (props) => {
  return <CrossFlowProvider {...props} originProduct="start" />;
};

export default StartProvider;
