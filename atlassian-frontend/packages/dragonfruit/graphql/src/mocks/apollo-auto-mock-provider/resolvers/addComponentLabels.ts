import { Ref } from '@graphql-tools/mock';

import {
  AddCompassComponentLabelsInput,
  AddCompassComponentLabelsPayload,
} from '../../../__generated__/graphql';
import { resolver } from '../../utils';

export const addComponentLabels = resolver<
  { input: AddCompassComponentLabelsInput },
  AddCompassComponentLabelsPayload
>((store) => ({ input }) => {
  // Assuming we can only add one label at at time on the UI
  const newLabel = {
    name: input.labelNames[0],
  };
  // Create a Label into the store
  store.set('CompassComponentLabel', newLabel.name, newLabel);

  // Get the new reference
  const newLabelRef = store.get('CompassComponentLabel', newLabel.name) as Ref<
    string
  >;
  const labelsRefs = store.get(
    'CompassComponent',
    input.componentId,
    'labels',
  ) as Ref<string>[];
  // Update the list of references
  labelsRefs.push(newLabelRef);

  store.set('CompassComponent', input.componentId, 'labels', labelsRefs);

  return {
    success: true,
    errors: null,
    addedLabels: [newLabel],
  };
});
