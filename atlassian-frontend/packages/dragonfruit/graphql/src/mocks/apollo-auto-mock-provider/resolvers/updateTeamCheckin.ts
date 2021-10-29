import {
  CompassTeamCheckin,
  CompassUpdateTeamCheckinInput,
  CompassUpdateTeamCheckinPayload,
} from '../../../__generated__/graphql';
import { resolver } from '../../utils';

export const updateTeamCheckin = resolver<
  { input: CompassUpdateTeamCheckinInput },
  CompassUpdateTeamCheckinPayload
>((store) => ({ input }) => {
  // Generate a time stamp for the change metadata
  const now = new Date();

  store.set('CompassTeamCheckin', input.id, {
    mood: input.mood,
    response1: input.response1,
    response2: input.response2,
    response3: input.response3,
    changeMetadata: {
      lastUserModificationAt: now.toISOString(),
    },
  });

  return {
    success: true,
    updatedTeamCheckin: store.get(
      'CompassTeamCheckin',
      input.id,
    ) as CompassTeamCheckin,
  };
});
