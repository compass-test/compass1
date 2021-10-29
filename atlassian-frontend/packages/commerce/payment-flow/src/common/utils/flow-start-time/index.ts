import { createTimingChannel } from '@atlassian/commerce-events-telemetry-react/timing';

export const {
  StartTimeProvider: FlowStartTimeProvider,
  StartTimeRecorder: FlowStartTimeRecorder,
  useStartTimeRef: useFlowStartTimeRef,
} = createTimingChannel();
