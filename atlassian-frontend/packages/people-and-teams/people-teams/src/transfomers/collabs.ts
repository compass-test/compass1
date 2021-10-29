import {
  CollaborationGraphEntity,
  CollaborationGraphResponse,
  ENTITY_TYPE,
  User,
  UserStatus,
} from '../types';

const userMapper = (user: CollaborationGraphEntity): User | null => {
  const { userProfile, entityType } = user;

  if (!userProfile || entityType !== ENTITY_TYPE.USER) {
    return null;
  }

  return {
    id: user.id,
    fullName: userProfile.name,
    nickname: userProfile.nickname,
    email: userProfile.email,
    avatarUrl: userProfile.picture,
    collaborationGraphScore: user.score,
    status: userProfile.account_status as UserStatus,
  };
};

export const transformCollabsDataToUsers = (
  data?: CollaborationGraphResponse,
): User[] => {
  if (!data) {
    return [];
  }

  const { collaborationGraphEntities = [] } = data;
  return (
    (collaborationGraphEntities
      .map(userMapper)
      .filter((item: any) => item) as User[]) || []
  );
};
