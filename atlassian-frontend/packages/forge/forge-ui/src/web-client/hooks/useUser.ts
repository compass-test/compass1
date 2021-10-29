import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';

interface UserQueryData {
  user: UserData;
}

export interface UserData {
  picture: string;
  accountId: string | undefined;
  name: string;
}

interface UserQueryVariables {
  accountId: string;
}

export const userQuery = gql`
  query forge_ui_userQuery($accountId: ID!) {
    user(accountId: $accountId) {
      name
      picture
    }
  }
`;

interface UsersQueryData {
  users: [UserData];
}

interface UsersQueryVariables {
  accountIds: string[];
}

export const usersQuery = gql`
  query forge_ui_usersQuery($accountIds: [ID!]!) {
    users(accountIds: $accountIds) {
      name
      accountId
      picture
    }
  }
`;

export const useUsers = (accountIds: string[], client?: ApolloClient<any>) => {
  const nonEmptyAccountIds = accountIds.filter((id) => !(id === ''));
  const { data } = useQuery<UsersQueryData, UsersQueryVariables>(usersQuery, {
    variables: {
      accountIds: nonEmptyAccountIds,
    },
    client,
  });

  let users: { [accountId: string]: UserData } = {};

  if (data && data.users) {
    users = data.users.reduce<{
      [accountId: string]: UserData;
    }>((prev, user) => {
      if (user.accountId) {
        prev[user.accountId] = {
          picture: user.picture,
          accountId: user.accountId,
          name: user.name,
        };
      }
      return prev;
    }, {});
  }

  return users;
};

export const useUser = (accountId: string, client?: ApolloClient<any>) => {
  const { data } = useQuery<UserQueryData, UserQueryVariables>(userQuery, {
    variables: {
      accountId,
    },
    skip: !accountId,
    client,
  });

  if (data && data.user) {
    const { picture, name } = data.user;
    return {
      name,
      picture,
    };
  }

  return {
    name: '',
    picture: '',
  };
};
