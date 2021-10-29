import { WithCrossFlowProps } from '@atlassiansox/cross-flow-component-support';
import { State } from '../types';

// We must explicitly type the return type of this function to avoid the TS2742 typescript error when generating declaration files
export const getCrossFlowApi = (
  state: State,
): WithCrossFlowProps['crossFlow'] => state.external.crossFlow;
