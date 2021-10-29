import { createTimingChannel } from '@atlassian/commerce-events-telemetry-react/timing';

export const {
  StartTimeRecorder: FormStartTimeRecorder,
  StartTimeProvider: FormStartTimeProvider,
  useStartTimeRef: useFormStartTimeRef,
} = createTimingChannel();
