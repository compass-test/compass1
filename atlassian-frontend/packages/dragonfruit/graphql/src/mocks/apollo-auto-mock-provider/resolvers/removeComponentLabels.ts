import { Ref } from '@graphql-tools/mock';

import {
  RemoveCompassComponentLabelsInput,
  RemoveCompassComponentLabelsPayload,
} from '../../../__generated__/graphql';
import { resolver } from '../../utils';

export const removeComponentLabels = resolver<
  { input: RemoveCompassComponentLabelsInput },
  RemoveCompassComponentLabelsPayload
>((store) => ({ input }) => {
  const labelsRefs = store.get(
    'CompassComponent',
    input.componentId,
    'labels',
  ) as Ref<string>[];

  // Remove the labelRef
  const newLabelsRefs = labelsRefs.filter(
    // Assuming we can only delete one at a time on the UI
    (labelRef) => {
      const labelName = store.get(labelRef, 'name');
      return labelName !== input.labelNames[0];
    },
  );

  store.set('CompassComponent', input.componentId, 'labels', newLabelsRefs);

  return {
    success: true,
    errors: null,
    removedLabelNames: input.labelNames,
  };
});
