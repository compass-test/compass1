import { testCollaboratorsData } from '@atlassian/ptc-test-utils';

import { transformCollabsDataToUsers } from '../../../transfomers/collabs';
import { CollaborationGraphResponse } from '../../../types/CollaborationGraph';

describe('transformCollabsDataToUsers', () => {
  it('should transform data correctly', () => {
    const users = transformCollabsDataToUsers(
      testCollaboratorsData as CollaborationGraphResponse,
    );

    expect(users.length).toEqual(
      testCollaboratorsData.collaborationGraphEntities.length,
    );
  });
});
