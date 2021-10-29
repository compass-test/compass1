import React, { createContext, useContext } from 'react';

import { ProfileClient } from '@atlaskit/profilecard';

export type ProfileClientContextProps = {
  client: ProfileClient;
};

const defaultClient = new ProfileClient({
  url: '/gateway/api/directory/graphql',
});

const ProfileClientContext = createContext<ProfileClientContextProps>({
  client: defaultClient,
});

export const useProfileClient = () => {
  const { client } = useContext(ProfileClientContext);
  return client;
};

type ProfileClientContextProviderProps = {
  profileClient?: ProfileClient;
};

export const ProfileClientContextProvider: React.FC<ProfileClientContextProviderProps> = ({
  children,
  profileClient,
}) => {
  return (
    <ProfileClientContext.Provider
      value={{ client: profileClient ?? defaultClient }}
    >
      {children}
    </ProfileClientContext.Provider>
  );
};
