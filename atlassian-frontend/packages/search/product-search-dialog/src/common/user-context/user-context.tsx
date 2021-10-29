import React, { useContext, FunctionComponent, useState } from 'react';

export interface UserDetails {
  id?: string;
  name?: string;
  email?: string;
  avatarUrl?: string;
  hasSoftwareAccess?: boolean;
}

interface UserContext {
  user: UserDetails;
  setUser: (user: UserDetails) => void;
}

interface Props {
  user?: UserDetails;
}

const UserContext = React.createContext<UserContext>({
  user: {},
  setUser: (user: UserDetails) => {},
});

export const UserProvider: FunctionComponent<Props> = ({
  user: initialUser,
  children,
}) => {
  const [user, setUser] = useState<UserDetails>(initialUser || {});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  return useContext(UserContext);
}
