import React, { ComponentType } from 'react';
import { CrossFlowProvider } from './lib/CrossFlowProvider';
import { AnalyticsWebClientInterface, MaybePromise } from './lib/types';
import { PluginCollection } from '@atlassiansox/cross-flow-base-types';

interface AdminHubProps {
  cloudId?: string;
  analyticsClient: MaybePromise<AnalyticsWebClientInterface>;
  locale: string;
  plugins?: PluginCollection;
}

const AdminHubProvider: ComponentType<AdminHubProps> = (props) => {
  return <CrossFlowProvider {...props} originProduct="admin" />;
};

export default AdminHubProvider;
