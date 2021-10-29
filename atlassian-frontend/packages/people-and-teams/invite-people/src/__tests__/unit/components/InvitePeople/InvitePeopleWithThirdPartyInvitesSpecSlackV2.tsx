import { fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { slackServiceFactory, SlackService } from '@atlassian/integrations';
import {
  defaultThirdPartyInvitesClient,
  defaultAccountInfoClient,
} from '../../../../clients';
import { messages } from '../../../../components/i18n';
import { Cohort, InvitePeopleProps } from '../../../../types';
import {
  GOOGLE_SERVICE,
  MICROSOFT_SERVICE,
  SLACK_SERVICE,
  CONFLUENCE_SLACK_URL,
} from '../../../../components/ThirdParty/constants';
import {
  getSlackDisconnectedFlag,
  getSuccessIntegrationFlag,
} from '../../../../components/Flags/getFlag';
import {
  disconnectSlackWorkSpace,
  getConnectedSlackWorkSpace,
  setConnectedSlackWorkSpace,
} from '../../../../components/ThirdParty/localStorageUtils';

import { triggerAnalyticsForExposedINFI } from '../../../../components/analytics';
import {
  renderInvitePeople,
  mockShowFlags,
  waitForFormToLoad,
} from './_helpers';
jest.mock('../../../../components/analytics', () => {
  return {
    ...jest.requireActual<Object>('../../../../components/analytics'),
    triggerAnalyticsForExposedINFI: jest.fn(),
  };
});

const mockSlackService: SlackService = {
  abort: jest.fn(),
  isSlackEnabled: jest.fn(),
  getTeams: jest.fn(),
  getUsers: jest.fn(),
  getConsent: jest.fn(),
};

const defaultProps: Partial<InvitePeopleProps> = {
  thirdPartyInvitesCohort: Cohort.EXPERIMENT,
  thirdPartySlackv2Enabled: true,
  userRole: 'basic',
};

jest.mock('../../../../../src/clients', () => {
  return {
    defaultThirdPartyInvitesClient: {
      getExistingIntegrations: jest.fn(),
      search: jest.fn(),
    },
    defaultAccountInfoClient: {
      getAccountInfo: jest.fn(),
    },
    defaultPermsApiClient: {
      getUserRole: jest.fn(),
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

jest.mock('../../../../components/ThirdParty/utils', () => {
  const utils = jest.requireActual('../../../../components/ThirdParty/utils');
  return {
    ...utils,
    beginThirdPartyOauth: jest.fn(),
  };
});

jest.mock('@atlassian/integrations', () => {
  const integrations = jest.requireActual('@atlassian/integrations');
  return {
    ...integrations,
    slackServiceFactory: jest.fn(),
  };
});

const mockUserAgent = (value: string | null) => {
  Object.defineProperty(navigator, 'userAgent', {
    value,
    configurable: true,
  });
};

describe('Third Party Invites', () => {
  beforeEach(() => {
    (slackServiceFactory as jest.Mock).mockReturnValue(mockSlackService);
    (defaultThirdPartyInvitesClient.getExistingIntegrations as jest.Mock).mockResolvedValue(
      {
        connectedIntegrations: [],
        enabledIntegrations: [SLACK_SERVICE, GOOGLE_SERVICE, MICROSOFT_SERVICE],
      },
    );
    (mockSlackService.getTeams as jest.Mock).mockResolvedValue({
      ok: true,
      result: [],
    });
    (mockSlackService.isSlackEnabled as jest.Mock).mockResolvedValue({
      ok: true,
      result: true,
    });
    (getConnectedSlackWorkSpace as jest.Mock).mockReturnValue(null);
    (defaultAccountInfoClient.getAccountInfo as jest.Mock).mockResolvedValue({
      account_id: 'account-id',
      email: 'email@email.com',
    });

    mockUserAgent(null);
    window.open = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send exposed event', async () => {
    (mockSlackService.getTeams as jest.Mock).mockResolvedValue({
      ok: true,
      result: [{ id: 'workspace-1' }],
    });
    renderInvitePeople(defaultProps);
    await waitForFormToLoad();

    expect(triggerAnalyticsForExposedINFI).toBeCalledTimes(1);
    expect(triggerAnalyticsForExposedINFI).toBeCalledWith(
      expect.any(Function),
      'confluence',
      Cohort.EXPERIMENT,
      Cohort.EXPERIMENT,
      [SLACK_SERVICE, GOOGLE_SERVICE, MICROSOFT_SERVICE],
      ['workspace-1'],
      true,
      [],
    );
  });

  it('should cohort out of third party if workspace fetch fails', async () => {
    (mockSlackService.getTeams as jest.Mock).mockResolvedValue({
      ok: false,
      aborted: true,
    });
    renderInvitePeople(defaultProps);
    await waitForFormToLoad();

    expect(triggerAnalyticsForExposedINFI).toBeCalledTimes(1);
    expect(triggerAnalyticsForExposedINFI).toBeCalledWith(
      expect.any(Function),
      'confluence',
      Cohort.EXPERIMENT,
      Cohort.NOT_ENROLLED,
      [],
      [],
      true,
      ['error'],
    );

    expect(
      screen.queryByText(messages.thirdPartyConnectTeammates.defaultMessage),
    ).not.toBeInTheDocument();
  });

  it('should call inf api to fetch integrations and slack workspaces', async () => {
    renderInvitePeople(defaultProps);
    await waitForFormToLoad();

    expect(
      defaultThirdPartyInvitesClient.getExistingIntegrations,
    ).toBeCalledTimes(1);
    expect(mockSlackService.getTeams).toBeCalledTimes(1);
  });

  it('should not show any connect prompts if all integerations are set up', async () => {
    (defaultThirdPartyInvitesClient.getExistingIntegrations as jest.Mock).mockResolvedValue(
      {
        connectedIntegrations: [MICROSOFT_SERVICE, GOOGLE_SERVICE],
        enabledIntegrations: [SLACK_SERVICE, GOOGLE_SERVICE, MICROSOFT_SERVICE],
      },
    );
    (mockSlackService.getTeams as jest.Mock).mockResolvedValue({
      ok: true,
      result: [{ id: 'workspace-1' }],
    });
    (mockSlackService.getUsers as jest.Mock).mockResolvedValue({
      ok: true,
      result: [],
    });
    (getConnectedSlackWorkSpace as jest.Mock).mockReturnValue('workspace-1');

    renderInvitePeople(defaultProps);
    await waitForFormToLoad();

    expect(
      screen.queryByText(messages.thirdPartyConnect.defaultMessage),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(messages.thirdPartyConnectTeammates.defaultMessage),
    ).not.toBeInTheDocument();
  });

  it('should show slack disconnection form and disconnect when clicked and show flag', async () => {
    (mockSlackService.getTeams as jest.Mock).mockResolvedValue({
      ok: true,
      result: [{ id: 'workspace-1' }],
    });
    (mockSlackService.getUsers as jest.Mock).mockResolvedValue({
      ok: true,
      result: [],
    });
    (getConnectedSlackWorkSpace as jest.Mock).mockReturnValue('workspace-1');

    renderInvitePeople(defaultProps);
    await waitForFormToLoad();

    fireEvent.click(
      screen.getByText(messages.slackThirdPartyButton.defaultMessage),
    );

    fireEvent.click(
      screen.getAllByText(
        messages.slackWorkspacesDialogDisconnectSlack.defaultMessage,
      )[0],
    );

    expect(
      screen.getByText(
        messages.slackWorkspacesDisconnectDialogBody.defaultMessage,
      ),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText(messages.disconnectButton.defaultMessage));

    expect(disconnectSlackWorkSpace).toHaveBeenCalledTimes(1);
    expect(mockShowFlags).toHaveBeenCalledWith(getSlackDisconnectedFlag());
  });

  it('should show slack connect form and connect when clicking done and show flag', async () => {
    (mockSlackService.getTeams as jest.Mock).mockResolvedValue({
      ok: true,
      result: [
        { id: 'workspace-1', name: 'workspace-1' },
        { id: 'workspace-2', name: 'workspace-2' },
      ],
    });
    (mockSlackService.getUsers as jest.Mock).mockResolvedValue({
      ok: true,
      result: [],
    });

    renderInvitePeople(defaultProps);
    await waitForFormToLoad();

    fireEvent.click(
      screen.getByText(messages.slackThirdPartyButton.defaultMessage),
    );

    fireEvent.click(
      screen.getByText(messages.slackWorkspacesDoneButton.defaultMessage),
    );

    expect(setConnectedSlackWorkSpace).toHaveBeenCalledTimes(1);
    expect(mockShowFlags).toHaveBeenCalledWith(
      getSuccessIntegrationFlag(SLACK_SERVICE, 'workspace-1'),
    );
  });

  it('should connect to slack workspace straight away if only one exists and show flag', async () => {
    (mockSlackService.getTeams as jest.Mock).mockResolvedValue({
      ok: true,
      result: [{ id: 'workspace-1', name: 'workspace-1' }],
    });
    (mockSlackService.getUsers as jest.Mock).mockResolvedValue({
      ok: true,
      result: [],
    });

    renderInvitePeople(defaultProps);
    await waitForFormToLoad();

    fireEvent.click(
      screen.getByText(messages.slackThirdPartyButton.defaultMessage),
    );

    expect(setConnectedSlackWorkSpace).toHaveBeenCalledTimes(1);
    expect(mockShowFlags).toHaveBeenCalledWith(
      getSuccessIntegrationFlag(SLACK_SERVICE, 'workspace-1'),
    );
  });

  it('should call slack consent if no slack workspacee is connected', async () => {
    renderInvitePeople(defaultProps);
    await waitForFormToLoad();

    fireEvent.click(
      screen.getByText(messages.slackThirdPartyButton.defaultMessage),
    );

    expect(mockSlackService.getConsent).toHaveBeenCalledTimes(1);
  });

  it('should open tab with marketplace app if no slack workspaces are connected and slack is disabled on site', async () => {
    (mockSlackService.isSlackEnabled as jest.Mock).mockResolvedValue({
      ok: true,
      result: false,
    });

    renderInvitePeople(defaultProps);
    await waitForFormToLoad();

    fireEvent.click(
      screen.getByText(messages.slackThirdPartyButton.defaultMessage),
    );

    expect(window.open).toHaveBeenCalledWith(CONFLUENCE_SLACK_URL);
  });
});
