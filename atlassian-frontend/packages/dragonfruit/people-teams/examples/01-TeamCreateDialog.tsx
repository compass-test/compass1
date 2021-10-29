import React from 'react';

import Button from '@atlaskit/button/custom-theme-button';
import { Checkbox } from '@atlaskit/checkbox';
import { RadioGroup } from '@atlaskit/radio';
import {
  mockCreateTeam,
  mockGetRecommendations,
  mockInviteTeamMembers,
  resetFetchMock,
  testProposedMembersData,
} from '@atlassian/ptc-test-utils';

import TeamCreateDialog from '../src/components/TeamCreateDialog';
import { Team } from '../src/types';
import { InvitedUser } from '../src/types/user';

import {
  SectionWrapper,
  withAnalyticsLogger,
  withIntlProvider,
} from './helpers';

const TEST_CLOUD_ID = 'test-cloud-id';
const TEST_ORG_ID = 'test-org-id';
const TEST_CURRENT_USER_ID = 'test-current-user-id';
const TEST_PRODUCT = 'confluence';

interface State {
  hasProposedMembers: boolean;
  isOpenDialog: boolean;
  statusRequest:
    | 'success'
    | 'failToCreateTeam'
    | 'failToInviteMembers'
    | string;
}

const optionsRadioRequest = [
  {
    name: 'Succeed to create team and invite members',
    label: 'Succeed to create team and invite members',
    value: 'success',
  },
  {
    name: 'Fail to create team ',
    label: 'Fail to create team ',
    value: 'failToCreateTeam',
  },
  {
    name: 'Fail to invite members',
    label: 'Fail to invite members',
    value: 'failToInviteMembers',
  },
];

class ExampleWithMockedData extends React.PureComponent<{}, State> {
  state = {
    hasProposedMembers: false,
    isOpenDialog: false,
    statusRequest: 'success',
  };

  componentDidMount() {
    mockGetRecommendations();
  }

  componentDidUpdate() {
    const { statusRequest } = this.state;

    resetFetchMock();

    mockGetRecommendations();
    if (statusRequest === 'success') {
      mockCreateTeam(TEST_CLOUD_ID, TEST_PRODUCT);
      mockInviteTeamMembers(TEST_CLOUD_ID, TEST_PRODUCT);
    }

    if (statusRequest === 'failToCreateTeam') {
      mockInviteTeamMembers(TEST_CLOUD_ID, TEST_PRODUCT);
    }

    if (statusRequest === 'failToInviteMembers') {
      mockCreateTeam(TEST_CLOUD_ID, TEST_PRODUCT);
    }
  }

  handleCreateTeamSuccess = (team: Team, invitedMembers: InvitedUser[]) => {
    console.log('- handleCreateTeamSuccess:');
    console.log(' + team:', team);
    console.log(' + invitedMembers:', invitedMembers);
  };

  handleCreateTeamFailed = (error: Error, invitedMembers: InvitedUser[]) => {
    console.log('- handleCreateTeamFailed:');
    console.log(' + error', error);
    console.log(' + invitedMembers', invitedMembers);
  };

  handleInviteMembersSuccess = (
    teamData: Team,
    invitedMembers: InvitedUser[],
  ) => {
    console.log('- handleInviteMembersSuccess:');
    console.log(' + teamData', teamData);
    console.log(' + invitedMembers', invitedMembers);
  };

  handleInviteMembersFailed = (
    teamData: Team,
    invitedMembers: InvitedUser[],
    error: Error,
  ) => {
    console.log('- handleInviteMembersFailed:');
    console.log(' + teamData', teamData);
    console.log(' + invitedMembers', invitedMembers);
    console.log(' + error', error);
  };

  handleChangeCheckBox = (stateName: keyof State) => (
    event: React.SyntheticEvent<HTMLInputElement>,
  ) => {
    // @ts-ignore
    this.setState({
      [stateName]: event.currentTarget.checked,
    });
  };

  handleClickCreateTeam = () => {
    this.setState({
      isOpenDialog: true,
    });
  };

  handleCloseDialog = () => {
    this.setState({
      isOpenDialog: false,
    });
  };

  onChangeRadioStatusRequest = (
    event: React.SyntheticEvent<HTMLInputElement>,
  ) => {
    this.setState({
      statusRequest: event.currentTarget.value,
    });
  };

  render() {
    const { hasProposedMembers, isOpenDialog, statusRequest } = this.state;

    return (
      <div>
        <SectionWrapper>
          <ul style={{ margin: '20px' }}>
            <li>
              <p>
                Because we mocked request by URL pattern and we have a fixed set
                of data, so returned data will not match your input in UI
              </p>
            </li>
            <li>
              <p>
                Open Chrome Dev Console to see how analytics events are sent.
              </p>
            </li>
          </ul>
        </SectionWrapper>
        <SectionWrapper>
          <section>
            <h4>Request status</h4>
            <RadioGroup
              options={optionsRadioRequest}
              onChange={this.onChangeRadioStatusRequest}
              value={statusRequest}
            />
          </section>

          <section>
            <h4>Props</h4>
            <Checkbox
              label="has some proposed members"
              value="hasInitialValues"
              name="hasInitialValues"
              onChange={this.handleChangeCheckBox('hasProposedMembers')}
            />
          </section>
        </SectionWrapper>

        <Button onClick={this.handleClickCreateTeam}>Start a new team</Button>

        {isOpenDialog && (
          <TeamCreateDialog
            cloudId={TEST_CLOUD_ID}
            orgId={TEST_ORG_ID}
            principalId={TEST_CURRENT_USER_ID}
            product="confluence"
            onCreateTeamSuccess={this.handleCreateTeamSuccess}
            onCreateTeamFailed={this.handleCreateTeamFailed}
            onInviteMembersSuccess={this.handleInviteMembersSuccess}
            onInviteMembersFailed={this.handleInviteMembersFailed}
            maxSelectedMembers={5} // default value is 10
            proposedMembers={
              hasProposedMembers ? testProposedMembersData : undefined
            }
            onClose={this.handleCloseDialog}
          />
        )}
      </div>
    );
  }
}

export default withIntlProvider(withAnalyticsLogger(ExampleWithMockedData));
