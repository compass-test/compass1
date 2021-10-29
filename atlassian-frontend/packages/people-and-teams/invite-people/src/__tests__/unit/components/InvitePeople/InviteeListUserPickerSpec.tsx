import { fireEvent } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/dom';
import selectEvent from 'react-select-event';
import { InvitePeopleProps } from '../../../..';
import { Cohort } from '../../../../types';
import {
  GOOGLE_SERVICE,
  MICROSOFT_SERVICE,
  SLACK_SERVICE,
} from '../../../../components/ThirdParty/constants';
import {
  defaultInviteApiClient,
  defaultThirdPartyInvitesClient,
  defaultAccountInfoClient,
} from '../../../../clients';
import { getConnectedSlackWorkSpace } from '../../../../components/ThirdParty/localStorageUtils';
import {
  renderInvitePeople,
  waitForFormToLoad,
  getUserPicker,
  cloudId,
  mockSiteUrl,
  mockShowFlags,
  mockOnSend,
} from './_helpers';

const defaultProps: Partial<InvitePeopleProps> = {
  thirdPartyInvitesCohort: Cohort.EXPERIMENT,
  userRole: 'admin',
};

jest.mock('../../../../../src/clients', () => {
  return {
    defaultThirdPartyInvitesClient: {
      getExistingIntegrations: jest.fn(),
      search: jest.fn(),
      fetchSlackWorkspaces: jest.fn(),
      fetchSlackUsers: jest.fn(),
    },
    defaultAccountInfoClient: {
      getAccountInfo: jest.fn(),
    },
    defaultInviteApiClient: {
      inviteUsers: jest.fn(),
      inviteCapabilities: jest.fn(),
      clearDESCache: jest.fn(),
    },
    defaultOpenInviteClient: {
      clearCache: jest.fn(),
    },
    defaultHaveISeenItClient: {
      clearCache: jest.fn(),
    },
  };
});

jest.mock('../../../../components/ThirdParty/localStorageUtils', () => {
  return {
    disconnectSlackWorkSpace: jest.fn(),
    getConnectedSlackWorkSpace: jest.fn(),
    setConnectedSlackWorkSpace: jest.fn(),
  };
});

describe('Invite People With User Picker', () => {
  beforeEach(() => {
    (defaultThirdPartyInvitesClient.getExistingIntegrations as jest.Mock).mockResolvedValue(
      {
        connectedIntegrations: [],
        enabledIntegrations: [SLACK_SERVICE, GOOGLE_SERVICE, MICROSOFT_SERVICE],
      },
    );
    (defaultThirdPartyInvitesClient.fetchSlackWorkspaces as jest.Mock).mockResolvedValue(
      [],
    );
    (defaultAccountInfoClient.getAccountInfo as jest.Mock).mockResolvedValue({
      account_id: 'account-id',
      email: 'email@email.com',
    });
    (getConnectedSlackWorkSpace as jest.Mock).mockReturnValue(null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send call invite endpoint with emails selected in UserPicker', async () => {
    renderInvitePeople(defaultProps);
    await waitForFormToLoad();

    const input = await getUserPicker();

    fireEvent.change(input, { target: { value: 'testing@email.com' } });
    selectEvent.openMenu(input);
    let options = await screen.getAllByText('testing@email.com');
    expect(options).toHaveLength(2);
    fireEvent.click(options[1]);

    fireEvent.change(input, { target: { value: 'testing2@email.com' } });
    selectEvent.openMenu(input);
    options = await screen.getAllByText('testing2@email.com');
    expect(options).toHaveLength(2);
    fireEvent.click(options[1]);

    const submitBtn = screen
      .getByTestId('testId-invite-people-form')
      .querySelectorAll('button[type="submit"]')[0];

    fireEvent.click(submitBtn);

    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledTimes(1);
    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledWith({
      users: [
        {
          email: 'testing@email.com',
        },
        {
          email: 'testing2@email.com',
        },
      ],
      continueUrl: expect.stringContaining(`${mockSiteUrl}/wiki?atlOrigin=`),
      resources: [`ari:cloud:confluence::site/${cloudId}`],
      suppressInviteEmail: expect.any(Boolean),
    });

    await waitFor(() => {
      expect(mockOnSend).toHaveBeenCalledTimes(1);
      expect(mockShowFlags).toHaveBeenCalledTimes(1);
    });
  });
});
