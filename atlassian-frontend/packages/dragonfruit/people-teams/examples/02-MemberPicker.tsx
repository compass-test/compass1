import React, { SyntheticEvent } from 'react';

import { Checkbox } from '@atlaskit/checkbox';
import { OptionData } from '@atlaskit/user-picker';
import {
  mockGetRecommendations,
  testProposedMembersData,
} from '@atlassian/ptc-test-utils';

import MemberPicker from '../src/components/MemberPicker';

import { withAnalyticsLogger, withIntlProvider } from './helpers';

const TEST_CLOUD_ID = 'test-cloud-id';
const TEST_TEAM_ID = 'test-team-id';
const TEST_CURRENT_USER_ID = 'test-current-user-id';

interface State {
  hasInitialValues: boolean;
}

class ExampleWithMockedData extends React.PureComponent<{}, State> {
  state = {
    hasInitialValues: false,
  };

  handleSelectionChange = (
    selectedUsers: OptionData[],
    data: { hasError: boolean; isDisabled: boolean },
  ) => {
    console.log('=handleSelectionChange: ');
    console.log(' - selectedUsers: ', selectedUsers);
    console.log(' - data: ', data);
  };

  componentDidMount() {
    mockGetRecommendations();
  }

  filterUsers = (users: OptionData[]): OptionData[] => {
    return users.filter((user) => user.id !== TEST_CURRENT_USER_ID);
  };

  onChangeCheckBox = (stateName: keyof State) => (
    event: SyntheticEvent<HTMLInputElement>,
  ) => {
    this.setState({
      [stateName]: event.currentTarget.checked,
    });
  };

  render() {
    const { hasInitialValues } = this.state;

    return (
      <>
        <ul style={{ margin: '20px' }}>
          <li>
            <p>Add more than 10 users to see an error message</p>
          </li>
        </ul>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            margin: '20px 0',
          }}
        >
          <section>
            <h4>Props</h4>
            <Checkbox
              label="hasInitialValues (refresh and check this box)"
              value="hasInitialValues"
              name="hasInitialValues"
              onChange={this.onChangeCheckBox('hasInitialValues')}
            />
          </section>
        </div>

        <MemberPicker
          cloudId={TEST_CLOUD_ID}
          teamId={TEST_TEAM_ID}
          onChange={this.handleSelectionChange}
          filterUsers={this.filterUsers}
          initialValues={hasInitialValues ? testProposedMembersData : undefined}
        />
      </>
    );
  }
}

export default withIntlProvider(withAnalyticsLogger(ExampleWithMockedData));
