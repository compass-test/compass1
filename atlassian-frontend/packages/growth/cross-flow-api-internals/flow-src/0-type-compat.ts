/* eslint-disable */
/* prettier-ignore */

// original TypeScript implementation
import {
  Reasons,
  useCrossFlow,
  withCrossFlow,
  WithCrossFlowProps,
  CrossFlowContextType,
  Journeys,
  Targets,
  TargetType,
  ReasonType,
  CompletionStatus,
  Options,
} from '../src';

// converted from Flow declarations
import {
  Reasons as flow_Reasons,
  useCrossFlow as flow_useCrossFlow,
  withCrossFlow as flow_withCrossFlow,
  WithCrossFlowProps as flow_WithCrossFlowProps,
  CrossFlowContextType as flow_CrossFlowContextType,
  Journeys as flow_Journeys,
  Targets as flow_Targets,
  TargetType as flow_TargetType,
  ReasonType as flow_ReasonType,
  CompletionStatus as flow_CompletionStatus,
  Options as flow_Options,
} from './generated-index';

// let tsc check compatibility in both directions TS <-> Flow
export const assertReason: typeof Reasons = {} as typeof flow_Reasons;
export const assertReason_rev: typeof flow_Reasons = {} as typeof Reasons;

export const assertReasonType: ReasonType = {} as flow_ReasonType;
export const assertReasontType_rev: flow_ReasonType = {} as ReasonType;

export const assertJourneys: typeof Journeys = flow_Journeys;
export const assertJourneys_rev: typeof flow_Journeys = Journeys;

export const assertTargets: typeof Targets = flow_Targets;
export const assertTargets_rev: typeof flow_Targets = Targets;

export const assertTargetType: TargetType = {} as flow_TargetType;
export const assertTargetType_rev: flow_TargetType = {} as TargetType;

export const assertOptions: Options = {} as flow_Options;
export const assertOptions_rev: flow_Options = {} as Options;

export const assertCompletionStatus: CompletionStatus = {} as flow_CompletionStatus;
export const assertCompletionStatus_rev: flow_CompletionStatus = {} as CompletionStatus;

export const assertCrossFlowContextType: CrossFlowContextType = {} as flow_CrossFlowContextType;
export const assertCrossFlowContextType_rev: flow_CrossFlowContextType = {} as CrossFlowContextType;

export const assertWithCrossFlowProps: WithCrossFlowProps = {} as flow_WithCrossFlowProps;
export const assertWithCrossFlowProps_rev: flow_WithCrossFlowProps = {} as WithCrossFlowProps;

export const assertUseCrossFlow: typeof useCrossFlow = flow_useCrossFlow;
export const assertUseCrossFlow_rev: typeof flow_useCrossFlow = useCrossFlow;

export const assertWithCrossFlow: typeof withCrossFlow = flow_withCrossFlow;
export const assertWithCrossFlow_rev: typeof flow_withCrossFlow = withCrossFlow;
