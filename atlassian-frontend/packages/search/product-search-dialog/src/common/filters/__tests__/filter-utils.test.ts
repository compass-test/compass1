import {
  createPeopleFilters,
  createAssigneeFilters,
} from '../../../__tests__/__fixtures__/mock-filters';
import { UserDetails } from '../../../common/user-context/user-context';
import { attemptPrependCurrentUserToFilters } from '../filter-utils';

const dummyUser: UserDetails = {
  id: '1234',
  name: 'some user',
  email: 'suser@atlassian.com',
  avatarUrl: 'path/to/avatar',
  hasSoftwareAccess: true,
};

describe('attemptPrependCurrentUserToFilters', () => {
  it('prepends the given user to an array of people filters', () => {
    let peopleFilters = createPeopleFilters(4);

    expect(
      attemptPrependCurrentUserToFilters(dummyUser, peopleFilters).map(
        (f) => f.id,
      ),
    ).toEqual([dummyUser.id, ...peopleFilters.map((f) => f.id)]);
  });

  it('prepends the given user to an array of assignee filters', () => {
    let assigneeFilters = createAssigneeFilters(4);

    expect(
      attemptPrependCurrentUserToFilters(dummyUser, assigneeFilters).map(
        (f) => f.id,
      ),
    ).toEqual([dummyUser.id, ...assigneeFilters.map((f) => f.id)]);
  });

  it('returns the original list of filters if the given user is not well formed', () => {
    let peopleFilters = createPeopleFilters(4);
    dummyUser.id = undefined;

    expect(
      attemptPrependCurrentUserToFilters(dummyUser, peopleFilters),
    ).toEqual(peopleFilters);
  });
});
