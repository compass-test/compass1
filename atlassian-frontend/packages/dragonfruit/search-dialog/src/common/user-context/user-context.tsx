import React, { useContext, FunctionComponent } from 'react';

export interface UserDetails {
  id?: string;
  name?: string;
  email?: string;
  avatarUrl?: string;
  hasSoftwareAccess?: boolean;
}

const UserContext = React.createContext<UserDetails>({
  id: undefined,
  name: undefined,
  email: undefined,
  avatarUrl: undefined,
  hasSoftwareAccess: undefined,
});

export const UserProvider: FunctionComponent<UserDetails> = ({
  id,
  name,
  email,
  children,
  avatarUrl,
  hasSoftwareAccess,
}) => (
  <UserContext.Provider
    value={{ id, name, email, avatarUrl, hasSoftwareAccess }}
  >
    {children}
  </UserContext.Provider>
);

export function useUser() {
  return useContext(UserContext);
}
