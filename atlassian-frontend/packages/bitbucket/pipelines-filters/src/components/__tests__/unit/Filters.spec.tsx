import React from 'react';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Avatar from '@atlaskit/avatar';
import AvatarGroup from '@atlaskit/avatar-group';
import Select from '@atlaskit/select';
import Textfield from '@atlaskit/textfield';
import * as colors from '@atlaskit/theme/colors';

import { branches } from '../../../mocks/branches';
import { pipelinesDefinitions } from '../../../mocks/pipelinesDefinitions';
import { statuses } from '../../../mocks/statuses';
import { triggerTypes } from '../../../mocks/triggerTypes';
import { users } from '../../../mocks/users';
import { FiltersProps } from '../../../types';
import Filters from '../../Filters';
import { SearchFilter } from '../../SearchFilter';
import { UsersFilter } from '../../UsersFilter';

describe('<Filters />', () => {
  const defaultProps = {
    onUpdateFilter: jest.fn(),
    url: undefined,
    pipelineDefinitions: pipelinesDefinitions,
    getBranches: jest.fn().mockReturnValue(Promise.resolve(branches)),
    onBranchChange: jest.fn(),
    parseFilterPathParam: jest.fn(),
    getFilterQuery: jest.fn(),
    users: users,
    triggerTypes: triggerTypes,
    statuses: statuses,
    showSearchFilter: true,
    showUsersFilter: true,
  };

  configure({ adapter: new Adapter() });

  beforeEach(() => jest.clearAllMocks());

  function render(props: FiltersProps) {
    return mount(<Filters {...props} />);
  }

  it('should render Filters component', () => {
    const wrapper = render({ ...defaultProps });

    expect(wrapper.find(Select).at(0).exists()).toBeTruthy();
    expect(wrapper.find(Select).at(1).exists()).toBeTruthy();
    expect(wrapper.find(Select).at(2).exists()).toBeTruthy();
  });

  it('should call parseFilterPathParam if url prop is defined', () => {
    const url =
      '/home#!/results/page/1/filters/[status=PASSED,SUCCESSFUL&triggerType=Push]';
    const component = render({
      ...defaultProps,
      url: url,
    });
    expect(component.prop('parseFilterPathParam')).toHaveBeenCalledWith(url);
  });

  it('should trigger filter change on search', () => {
    const handleFilterChange = jest.fn();
    const searchFilter = mount(
      <SearchFilter handleFilterChange={handleFilterChange} search="" />,
    );
    const input = searchFilter.find(Textfield);
    expect(input.exists()).toBeTruthy();
    input.prop('onChange')({
      target: { value: 'build search' },
    });
    expect(searchFilter.prop('handleFilterChange')).toBeCalledWith(
      'build search',
    );
  });

  it('should trigger user change on click', () => {
    const onUserAvatarClick = jest.fn();
    const usersFilter = mount(
      <UsersFilter users={users} onUserAvatarClick={onUserAvatarClick} />,
    );
    const avatar = usersFilter
      .find(AvatarGroup)
      .find(Avatar)
      .at(1)
      .find('button');
    expect(avatar.exists()).toBeTruthy();
    avatar.simulate('click');
    expect(
      usersFilter.find(UsersFilter).prop('onUserAvatarClick'),
    ).toHaveBeenCalledWith('{22222}');
  });

  it('should set selected user', () => {
    const onUserAvatarClick = jest.fn();
    const usersFilter = mount(
      <UsersFilter
        selectedUser={'{22222}'}
        users={users}
        onUserAvatarClick={onUserAvatarClick}
      />,
    );
    const avatar = usersFilter.find(AvatarGroup).find(Avatar).at(1);
    expect(avatar.prop('borderColor')).toEqual(colors.B300);
  });
});
