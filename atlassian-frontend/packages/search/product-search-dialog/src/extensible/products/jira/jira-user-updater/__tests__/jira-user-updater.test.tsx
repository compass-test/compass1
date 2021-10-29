import React from 'react';
import { mount } from 'enzyme';
import { JiraUserUpdater } from '..';
import { useJiraCurrentUser } from '../../../../../jira/clients';
import { useUserContext } from '../../../../../common/user-context';

const mockDefaultUser = {
  name: 'some-user',
  email: 'some-email@email.com',
};

const mockJiraUser = {
  name: 'some-user',
  email: 'some-email@email.com',
  hasSoftwareAccess: true,
};

const mockSetUser = jest.fn();

jest.mock('../../../../../common/user-context', () => ({
  useUserContext: jest.fn(() => ({
    user: mockDefaultUser,
    setUser: mockSetUser,
  })),
}));

jest.mock('../../../../../jira/clients', () => ({
  useJiraCurrentUser: jest.fn(() => mockJiraUser),
}));

describe('<JiraUserUpdater />', () => {
  it('Consumes the UserContext to get user and setUser', () => {
    mount(<JiraUserUpdater />);

    expect(useUserContext).toBeCalled();
    expect(useUserContext).toReturnWith({
      user: mockDefaultUser,
      setUser: mockSetUser,
    });
  });

  it('Gets user information from Jira client', () => {
    mount(<JiraUserUpdater />);

    expect(useJiraCurrentUser).toHaveBeenCalledWith(mockDefaultUser);
    expect(useJiraCurrentUser).toReturnWith(mockJiraUser);
  });

  it('Sets UserContext value with user information from Jira client', () => {
    mount(<JiraUserUpdater />);

    expect(mockSetUser).toHaveBeenCalledWith(mockJiraUser);
  });
});
