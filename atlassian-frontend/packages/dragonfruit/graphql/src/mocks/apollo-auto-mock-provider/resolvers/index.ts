import { Resolvers } from '../../types';

import { addComponentLabels } from './addComponentLabels';
import { createComponent } from './createComponent';
import { createTeamCheckin } from './createTeamCheckin';
import { removeComponentLabels } from './removeComponentLabels';
import { updateComponent } from './updateComponent';
import { updateTeamCheckin } from './updateTeamCheckin';

export const defaultResolvers: Resolvers = (store) => ({
  Mutation: {
    compass: () => ({
      updateComponent: updateComponent(store),
      createComponent: createComponent(store),
      // Labels
      addComponentLabels: addComponentLabels(store),
      removeComponentLabels: removeComponentLabels(store),
      // Team checkins
      createTeamCheckin: createTeamCheckin(store),
      updateTeamCheckin: updateTeamCheckin(store),
    }),
  },
});
