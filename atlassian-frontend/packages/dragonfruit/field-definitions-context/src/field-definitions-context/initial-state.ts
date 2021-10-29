import { ReducerState } from 'react';

import {
  CompassComponentType,
  CompassFieldType,
} from '@atlassian/dragonfruit-graphql';

import { FieldDefinitionsReducer } from '../field-definitions-store';

/**
 * Because this data is unlikely, we can provide a static starting state
 * to speed up load times.
 */
export const initialState: ReducerState<FieldDefinitionsReducer> = {
  componentTypes: {
    [CompassComponentType.SERVICE]: ['compass:tier'],
  },
  definitions: {
    'compass:tier': {
      id: 'compass:tier',
      name: 'Tier',
      type: CompassFieldType.ENUM,
      description:
        'The tier of a component reflects how important it is, the lower number the more important the component is',
      options: {
        values: ['1', '2', '3', '4'],
        default: ['4'],
      },
    },
  },
};
