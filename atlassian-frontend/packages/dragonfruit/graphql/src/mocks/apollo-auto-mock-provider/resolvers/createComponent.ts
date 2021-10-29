import { v4 as uuid } from 'uuid';

import {
  CreateCompassComponentInput,
  CreateCompassComponentPayload,
} from '../../../__generated__/graphql';
import { resolver } from '../../utils';

export const createComponent = resolver<
  { cloudId: string; input: CreateCompassComponentInput },
  CreateCompassComponentPayload
>((store) => ({ input }) => {
  // Generate a random ID for the component
  const id = uuid();

  store.set('CompassComponent', id, { id, ...input });

  return {
    success: true,
    errors: null,
    // store.get returns a reference to the component, we're casting it to any so that it fits the payload
    componentDetails: store.get('CompassComponent', id) as any,
  };
});
