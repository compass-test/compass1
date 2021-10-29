import {
  UpdateCompassComponentInput,
  UpdateCompassComponentPayload,
} from '../../../__generated__/graphql';
import { resolver } from '../../utils';

export const updateComponent = resolver<
  { input: UpdateCompassComponentInput },
  UpdateCompassComponentPayload
>((store) => ({ input }) => {
  store.set('CompassComponent', input.id, convertInputToData(input));
  return {
    success: true,
    // store.get returns a reference to the component, we're casting it to any so that it fits the payload
    componentDetails: store.get('CompassComponent', input.id) as any,
  };
});

/**
 * Not all fields cast directly from input data, into data that would make up a
 * CompassComponent. This function converts it as best it can.
 */
function convertInputToData(input: UpdateCompassComponentInput) {
  // Fields need to be mapped/converted
  const { fields, ...rest } = input;
  return {
    ...rest,
    ...(fields && {
      fields: fields.map((fieldInput) => ({
        __typename: 'CompassEnumField',
        definition: { id: fieldInput.definition },
        value: fieldInput.value.enum?.value,
      })),
    }),
  };
}
