import { v4 as uuid } from 'uuid';

import {
  CompassCreateTeamCheckinInput,
  CompassCreateTeamCheckinPayload,
  CompassTeamCheckin,
} from '../../../__generated__/graphql';
import { resolver } from '../../utils';

export const createTeamCheckin = resolver<
  { input: CompassCreateTeamCheckinInput },
  CompassCreateTeamCheckinPayload
>((store) => ({ input }) => {
  // Generate a random ID for the team checkin
  const id = uuid();

  // Passing `cloudId` forward here causes `store.set` to hang indefinitely.
  // Uncertain why this is the case, but that's why we're plucking the value off
  // here and only passing forward the "rest" of the input.
  const { cloudId, ...rest } = input;

  store.set('CompassTeamCheckin', id, {
    id,
    ...rest,
  });

  return {
    success: true,
    errors: null,
    createdTeamCheckin: store.get(
      'CompassTeamCheckin',
      id,
    ) as CompassTeamCheckin,
  };
});
