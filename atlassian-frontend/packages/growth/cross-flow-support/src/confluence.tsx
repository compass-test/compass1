import React, { ComponentType } from 'react';
import { PluginCollection } from '@atlassiansox/cross-flow-base-types';
import { CrossFlowProvider } from './lib/CrossFlowProvider';
import { AnalyticsWebClientInterface, MaybePromise } from './lib/types';
export {
  useCrossFlow,
  withCrossFlow,
  Journeys,
  Targets,
  Reasons,
} from './index';
export type { WithCrossFlowProps, TargetType } from './index';

interface ConfluenceProps {
  cloudId: string;
  analyticsClient: MaybePromise<AnalyticsWebClientInterface>;
  locale: string;
  plugins?: PluginCollection;
}

const ConfluenceProvider: ComponentType<ConfluenceProps> = (props) => {
  return <CrossFlowProvider {...props} originProduct="confluence" />;
};

export default ConfluenceProvider;
