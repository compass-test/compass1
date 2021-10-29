import React, { SyntheticEvent } from 'react';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/custom-theme-button';
import { Checkbox } from '@atlaskit/checkbox';
import { RadioGroup } from '@atlaskit/radio';
import {
  mockCreateTeam,
  mockGetCollaborators,
  mockGetTeams,
  mockInviteTeamMembers,
  resetFetchMock,
} from '@atlassian/ptc-test-utils';

import PeopleMenu from '../src';

import { mockBrowsePermissions, withIntlProvider } from './helpers';
import { AtlassianNavExample } from './helpers/AtlassianNavExample';
import * as styled from './helpers/styled';
import { darkTheme } from './helpers/themes';

const MOCK_CLOUD_ID = 'test-cloud-id';
const MOCK_USER_ID = 'test-user-id';
const MOCK_PRODUCT = 'confluence';
const MOCK_ORG_ID = 'test-org-id';

const optionsRadioNetwork = [
  {
    name: 'Normal',
    label: 'Normal',
    value: 'normal',
  },
  { name: 'Slow', label: 'Slow', value: 'slow' },
];

const optionsRadioRequest = [
  {
    name: 'Succeed to get people and teams',
    label: 'Succeed to get people and teams',
    value: 'success',
  },
  {
    name: 'Fail to load people',
    label: 'Fail to load people',
    value: 'failToLoadPeople',
  },
  {
    name: 'Fail to load teams',
    label: 'Fail to load teams',
    value: 'failToLoadTeams',
  },
  {
    name: 'Fail to load people and teams',
    label: 'Fail to load people and teams',
    value: 'failToLoadPeopleAndTeams',
  },
];

const optionsRadioSubProduct = [
  {
    name: 'jira-servicedesk',
    label: 'jira-servicedesk',
    value: 'jira-servicedesk',
  },
  {
    name: 'jira-software',
    label: 'jira-software',
    value: 'jira-software',
  },
  {
    name: 'jira-core',
    label: 'jira-core',
    value: 'jira-core',
  },
  {
    name: 'not informed',
    label: 'not informed',
    value: undefined,
  },
];

const optionsBrowsePermissions = [
  {
    name: 'No value provided',
    label: 'No value provided',
    value: 'noValueProvided',
  },
  {
    name: 'Promise returning false',
    label: 'Promise returning false',
    value: 'returnFalse',
  },
  {
    name: 'Promise returning true',
    label: 'Promise returning true',
    value: 'returnTrue',
  },
  {
    name: 'Promise throws error',
    label: 'Promise throws error',
    value: 'throwError',
  },
];

interface State {
  networkSpeed: 'normal' | 'slow' | string;
  statusRequest:
    | 'success'
    | 'failToLoadPeople'
    | 'failToLoadTeams'
    | 'failToLoadPeopleAndTeams'
    | string;
  isHighlighted: boolean;
  enableInvite: boolean;
  enableImprovedInvite: boolean;
  enablePreFetchingByHovering: boolean;
  enableInviteProductSelect: boolean;
  isDarkTheme: boolean;
  shouldPreFetch: boolean;
  browsePermissions: string;
  isOpen: boolean;
}

type CheckBoxStateName =
  | 'isHighlighted'
  | 'enableInvite'
  | 'enableImprovedInvite'
  | 'enablePreFetchingByHovering'
  | 'enableInviteProductSelect'
  | 'shouldPreFetch'
  | 'isDarkTheme';

type RadioBoxStateName =
  | 'networkSpeed'
  | 'statusRequest'
  | 'browsePermissions'
  | 'subProduct';

const SLOW_TIMEOUT = 5000;

class ExampleWithMockedData extends React.PureComponent<{}, State> {
  state = {
    networkSpeed: 'normal',
    statusRequest: 'success',
    isHighlighted: false,
    enableInvite: false,
    enableImprovedInvite: false,
    enablePreFetchingByHovering: true,
    enableInviteProductSelect: false,
    isDarkTheme: false,
    isOpen: false,
    shouldPreFetch: false,
    browsePermissions: 'noValueProvided',
    subProduct: undefined,
  };

  componentDidMount() {
    mockGetCollaborators();
    mockGetTeams(MOCK_USER_ID, MOCK_CLOUD_ID, MOCK_PRODUCT);
    mockCreateTeam(MOCK_CLOUD_ID, MOCK_PRODUCT);
    mockInviteTeamMembers(MOCK_CLOUD_ID, MOCK_PRODUCT);
  }

  componentDidUpdate() {
    const { networkSpeed, statusRequest } = this.state;

    resetFetchMock();
    mockCreateTeam(MOCK_CLOUD_ID, MOCK_PRODUCT);
    mockInviteTeamMembers(MOCK_CLOUD_ID, MOCK_PRODUCT);

    if (statusRequest === 'success') {
      mockGetCollaborators(networkSpeed === 'slow' ? SLOW_TIMEOUT : undefined);
      mockGetTeams(
        MOCK_USER_ID,
        MOCK_CLOUD_ID,
        MOCK_PRODUCT,
        undefined,
        networkSpeed === 'slow' ? SLOW_TIMEOUT : undefined,
      );
    }

    if (statusRequest === 'failToLoadPeople') {
      mockGetTeams(
        MOCK_USER_ID,
        MOCK_CLOUD_ID,
        MOCK_PRODUCT,
        undefined,
        networkSpeed === 'slow' ? SLOW_TIMEOUT : undefined,
      );
    }

    if (statusRequest === 'failToLoadTeams') {
      mockGetCollaborators(networkSpeed === 'slow' ? SLOW_TIMEOUT : undefined);
    }

    if (statusRequest === 'failToLoadPeopleAndTeams') {
      // should not mock
    }
  }

  onChangeRadioCheck = (stateName: RadioBoxStateName) => (
    event: SyntheticEvent<HTMLInputElement>,
  ) => {
    // @ts-ignore
    this.setState({
      [stateName]: event.currentTarget.value,
    });
  };

  onChangeCheckbox = (stateName: CheckBoxStateName) => (
    event: SyntheticEvent<HTMLInputElement>,
  ) => {
    // @ts-ignore
    this.setState({
      [stateName]: event.currentTarget.checked,
    });
  };

  handleClickOnItem = (id: string, type: string) => {
    console.log(`handleClickOnItem: id=${id} and type=${type}`);
  };

  handleClickOnPrimaryItem = () => {
    console.log('handleClickOnPrimaryItem');
  };

  handleClickOnCreateNewTeam = () => {
    console.log('handleClickOnCreateNewTeam');
  };

  handleClickOnViewPeopleDirectory = () => {
    console.log('handleClickOnViewPeopleDirectory');
  };

  handleOpenMenu = (event?: React.MouseEvent<HTMLElement>) => {
    if (event) {
      event.stopPropagation();
    }
    this.setState({
      isOpen: true,
    });
  };

  handleCloseMenu = (event?: React.MouseEvent<HTMLElement>) => {
    if (event) {
      event.stopPropagation();
    }
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const {
      networkSpeed,
      statusRequest,
      isHighlighted,
      enableInvite,
      enableImprovedInvite,
      enablePreFetchingByHovering,
      enableInviteProductSelect,
      isDarkTheme,
      shouldPreFetch,
      browsePermissions,
      isOpen,
      subProduct,
    } = this.state;

    const browseUsersEnabled = mockBrowsePermissions(browsePermissions);

    return (
      <styled.ExampleWrapper>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <section style={{ marginRight: 16 }}>
            <h4>Network speed</h4>
            <RadioGroup
              options={optionsRadioNetwork}
              onChange={this.onChangeRadioCheck('networkSpeed')}
              value={networkSpeed}
            />
          </section>

          <section>
            <h4>Request status</h4>
            <RadioGroup
              options={optionsRadioRequest}
              onChange={this.onChangeRadioCheck('statusRequest')}
              value={statusRequest}
            />
          </section>
          <section>
            <h4>Subproduct</h4>
            <RadioGroup
              options={optionsRadioSubProduct}
              onChange={this.onChangeRadioCheck('subProduct')}
              value={subProduct}
            />
          </section>

          <section>
            <h4>Others</h4>
            <Checkbox
              label="isHighlighted"
              value="isHighlighted"
              name="isHighlighted"
              isChecked={isHighlighted}
              onChange={this.onChangeCheckbox('isHighlighted')}
            />
            <Checkbox
              label="enableInvite"
              value="enableInvite"
              name="enableInvite"
              isChecked={enableInvite}
              onChange={this.onChangeCheckbox('enableInvite')}
            />
            <Checkbox
              label="enableImprovedInvite"
              value="enableImprovedInvite"
              name="enableImprovedInvite"
              isChecked={enableImprovedInvite}
              onChange={this.onChangeCheckbox('enableImprovedInvite')}
            />
            <Checkbox
              label="enableInviteProductSelect"
              value="enableInviteProductSelect"
              name="enableInviteProductSelect"
              isChecked={enableInviteProductSelect}
              onChange={this.onChangeCheckbox('enableInviteProductSelect')}
            />
            <Checkbox
              label="try dark theme"
              value="isDarkTheme"
              name="isDarkTheme"
              isChecked={isDarkTheme}
              onChange={this.onChangeCheckbox('isDarkTheme')}
            />
            <Checkbox
              label="Should pre-fetch data"
              value="shouldPreFetch"
              name="shouldPreFetch"
              isChecked={shouldPreFetch}
              onChange={this.onChangeCheckbox('shouldPreFetch')}
            />
            <Checkbox
              label="enablePreFetchingByHovering"
              value="enablePreFetchingByHovering"
              name="enablePreFetchingByHovering"
              isChecked={enablePreFetchingByHovering}
              onChange={this.onChangeCheckbox('enablePreFetchingByHovering')}
            />
            <ButtonGroup>
              <Button onClick={this.handleOpenMenu}>Open menu</Button>
              <Button onClick={this.handleCloseMenu}>Close menu</Button>
            </ButtonGroup>
          </section>

          <section>
            <h4>Browse permissions</h4>
            <RadioGroup
              options={optionsBrowsePermissions}
              onChange={this.onChangeRadioCheck('browsePermissions')}
              value={browsePermissions}
            />
          </section>
        </div>

        <AtlassianNavExample
          theme={isDarkTheme ? darkTheme : undefined}
          peopleMenu={
            <PeopleMenu
              product={MOCK_PRODUCT}
              cloudId={MOCK_CLOUD_ID}
              orgId={MOCK_ORG_ID}
              userId={MOCK_USER_ID}
              isHighlighted={isHighlighted}
              isBrowseUsersEnabled={browseUsersEnabled}
              enableInvite={enableInvite}
              enableImprovedInvite={enableImprovedInvite}
              enableInviteProductSelect={enableInviteProductSelect}
              subProduct={subProduct}
              onClickedItem={this.handleClickOnItem}
              onClick={this.handleClickOnPrimaryItem}
              onClickCreateNewTeam={this.handleClickOnCreateNewTeam}
              onClickViewPeopleDirectoryLink={
                this.handleClickOnViewPeopleDirectory
              }
              pushRoute={(url: string) => {
                console.log(`Redirect to ${url}`);
              }}
              isOpen={isOpen}
              onOpen={this.handleOpenMenu}
              onClose={this.handleCloseMenu}
              shouldPreFetch={shouldPreFetch}
              enablePreFetchingByHovering={enablePreFetchingByHovering}
            />
          }
        />
      </styled.ExampleWrapper>
    );
  }
}

export default withIntlProvider(ExampleWithMockedData);
