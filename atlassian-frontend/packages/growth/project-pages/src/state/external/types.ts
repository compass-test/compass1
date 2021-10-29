import { WithCrossFlowProps } from '@atlassiansox/cross-flow-component-support';

export type ExternalState = WithCrossFlowProps & {
  onGetFeatureFlagValue: Function;
};
