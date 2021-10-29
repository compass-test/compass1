import { fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
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

import { beginThirdPartyOauth } from '../../../../components/ThirdParty/utils';
import {
  triggerAnalyticsForExposedINFI,
  triggerAnalyticsSLOThirdPartyInitFail,
  triggerAnalyticsSLOThirdPartyInitSuccess,
} from '../../../../components/analytics';
import {
  renderInvitePeople,
  mockShowFlags,
  waitForFormToLoad,
} from './_helpers';
jest.mock('../../../../components/analytics', () => {
  return {
    ...jest.requireActual<Object>('../../../../components/analytics'),
    triggerAnalyticsForExposedINFI: jest.fn(),
    triggerAnalyticsSLOThirdPartyInitSuccess: jest.fn(),
    triggerAnalyticsSLOThirdPartyInitFail: jest.fn(),
  };
});

const defaultProps: Partial<InvitePeopleProps> = {
  thirdPartyInvitesCohort: Cohort.EXPERIMENT,
  userRole: 'basic',
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

const mockUserAgent = (value: string | null) => {
  Object.defineProperty(navigator, 'userAgent', {
    value,
    configurable: true,
  });
};

describe('Third Party Invites', () => {
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

  it('should send SLO event if cohort is fasee but third party prop is true', async () => {
    (defaultThirdPartyInvitesClient.fetchSlackWorkspaces as jest.Mock).mockResolvedValue(
      [{ id: 'workspace-1' }],
    );
    renderInvitePeople({
      ...defaultProps,
      thirdPartyInvitesCohort: undefined,
      enableThirdParty: true,
    });
    await waitForFormToLoad();

    expect(triggerAnalyticsForExposedINFI).toBeCalledTimes(0);
    expect(triggerAnalyticsSLOThirdPartyInitSuccess).toBeCalledTimes(1);
  });

  it('should not send SLO event if cohort and third party prop are false', async () => {
    (defaultThirdPartyInvitesClient.fetchSlackWorkspaces as jest.Mock).mockResolvedValue(
      [{ id: 'workspace-1' }],
    );
    renderInvitePeople({
      ...defaultProps,
      thirdPartyInvitesCohort: undefined,
      enableThirdParty: false,
    });
    await waitForFormToLoad();

    expect(triggerAnalyticsForExposedINFI).toBeCalledTimes(0);
    expect(triggerAnalyticsSLOThirdPartyInitSuccess).toBeCalledTimes(0);
  });

  it('should send exposed event', async () => {
    (defaultThirdPartyInvitesClient.fetchSlackWorkspaces as jest.Mock).mockResolvedValue(
      [{ id: 'workspace-1' }],
    );
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
      undefined,
      [],
    );
    expect(triggerAnalyticsSLOThirdPartyInitSuccess).toBeCalledTimes(1);
  });

  it('should not send exposed event for undefined cohort', async () => {
    renderInvitePeople({
      ...defaultProps,
      thirdPartyInvitesCohort: undefined,
    });
    await waitForFormToLoad();

    expect(triggerAnalyticsForExposedINFI).toBeCalledTimes(0);
  });

  it('should roll out if there is an error and report exposed event with error', async () => {
    (defaultThirdPartyInvitesClient.getExistingIntegrations as jest.Mock).mockRejectedValue(
      new Error('error'),
    );
    renderInvitePeople(defaultProps);
    await waitForFormToLoad();

    expect(triggerAnalyticsForExposedINFI).toBeCalledTimes(1);
    expect(triggerAnalyticsForExposedINFI).toBeCalledWith(
      expect.any(Function),
      'confluence',
      Cohort.EXPERIMENT,
      'not-enrolled',
      [],
      [],
      undefined,
      ['error'],
    );
    expect(triggerAnalyticsSLOThirdPartyInitFail).toBeCalledTimes(1);
    expect(triggerAnalyticsSLOThirdPartyInitFail).toBeCalledWith(
      expect.any(Function),
      'Error: error',
    );
  });

  it('should roll out if device is not desktop', async () => {
    mockUserAgent('Android');
    renderInvitePeople(defaultProps);
    await waitForFormToLoad();

    expect(triggerAnalyticsForExposedINFI).toBeCalledTimes(1);
    expect(triggerAnalyticsForExposedINFI).toBeCalledWith(
      expect.any(Function),
      'confluence',
      Cohort.EXPERIMENT,
      'not-enrolled',
      [],
      [],
      undefined,
      ['notDesktop'],
    );
  });

  it('should call inf api to fetch integrations and slack workspaces', async () => {
    renderInvitePeople(defaultProps);
    await waitForFormToLoad();

    expect(
      defaultThirdPartyInvitesClient.getExistingIntegrations,
    ).toBeCalledTimes(1);
    expect(defaultThirdPartyInvitesClient.fetchSlackWorkspaces).toBeCalledTimes(
      1,
    );
  });

  it('should show connect teammates if no integrations are set up', async () => {
    renderInvitePeople(defaultProps);
    await waitForFormToLoad();

    expect(
      screen.getByText(messages.thirdPartyConnectTeammates.defaultMessage),
    ).toBeInTheDocument();
  });

  it('should show connect more teammates if some integrations are set up', async () => {
    (defaultThirdPartyInvitesClient.getExistingIntegrations as jest.Mock).mockResolvedValue(
      {
        connectedIntegrations: [MICROSOFT_SERVICE],
        enabledIntegrations: [SLACK_SERVICE, GOOGLE_SERVICE, MICROSOFT_SERVICE],
      },
    );
    renderInvitePeople(defaultProps);
    await waitForFormToLoad();

    expect(
      screen.getByText(messages.thirdPartyConnect.defaultMessage),
    ).toBeInTheDocument();
  });

  it('should show connected integration button', async () => {
    (defaultThirdPartyInvitesClient.getExistingIntegrations as jest.Mock).mockResolvedValue(
      {
        connectedIntegrations: [MICROSOFT_SERVICE],
        enabledIntegrations: [SLACK_SERVICE, GOOGLE_SERVICE, MICROSOFT_SERVICE],
      },
    );
    renderInvitePeople(defaultProps);
    await waitForFormToLoad();

    expect(
      screen.getByText(messages.microsoftThirdPartyButton.defaultMessage),
    ).toBeInTheDocument();
  });

  it('should not show google integration button for gmail accounts', async () => {
    (defaultThirdPartyInvitesClient.getExistingIntegrations as jest.Mock).mockResolvedValue(
      {
        connectedIntegrations: [],
        enabledIntegrations: [SLACK_SERVICE, GOOGLE_SERVICE, MICROSOFT_SERVICE],
      },
    );
    (defaultAccountInfoClient.getAccountInfo as jest.Mock).mockResolvedValue({
      account_id: 'account-id',
      email: 'test_email@gmail.com',
    });

    renderInvitePeople(defaultProps);
    await waitForFormToLoad();

    expect(
      screen.queryByText(messages.googleThirdPartyButton.defaultMessage),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(messages.microsoftThirdPartyButton.defaultMessage),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(messages.slackThirdPartyButton.defaultMessage),
    ).toBeInTheDocument();
  });

  it('should not show google integration button for googlemail accounts', async () => {
    (defaultThirdPartyInvitesClient.getExistingIntegrations as jest.Mock).mockResolvedValue(
      {
        connectedIntegrations: [],
        enabledIntegrations: [SLACK_SERVICE, GOOGLE_SERVICE, MICROSOFT_SERVICE],
      },
    );
    (defaultAccountInfoClient.getAccountInfo as jest.Mock).mockResolvedValue({
      account_id: 'account-id',
      email: 'test_email@googlemail.com',
    });

    renderInvitePeople(defaultProps);
    await waitForFormToLoad();

    expect(
      screen.queryByText(messages.googleThirdPartyButton.defaultMessage),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(messages.microsoftThirdPartyButton.defaultMessage),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(messages.slackThirdPartyButton.defaultMessage),
    ).toBeInTheDocument();
  });

  it('should show google integration button for non-gmail accounts', async () => {
    (defaultThirdPartyInvitesClient.getExistingIntegrations as jest.Mock).mockResolvedValue(
      {
        connectedIntegrations: [],
        enabledIntegrations: [SLACK_SERVICE, GOOGLE_SERVICE, MICROSOFT_SERVICE],
      },
    );
    (defaultAccountInfoClient.getAccountInfo as jest.Mock).mockResolvedValue({
      account_id: 'account-id',
      email: 'test_email@mail.com',
    });

    renderInvitePeople(defaultProps);
    await waitForFormToLoad();

    expect(
      screen.queryByText(messages.googleThirdPartyButton.defaultMessage),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(messages.microsoftThirdPartyButton.defaultMessage),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(messages.slackThirdPartyButton.defaultMessage),
    ).toBeInTheDocument();
  });

  it('should not show any connect prompts if all integerations are set up', async () => {
    (defaultThirdPartyInvitesClient.getExistingIntegrations as jest.Mock).mockResolvedValue(
      {
        connectedIntegrations: [MICROSOFT_SERVICE, GOOGLE_SERVICE],
        enabledIntegrations: [SLACK_SERVICE, GOOGLE_SERVICE, MICROSOFT_SERVICE],
      },
    );
    (defaultThirdPartyInvitesClient.fetchSlackWorkspaces as jest.Mock).mockResolvedValue(
      [
        {
          id: '1',
          name: 'workspace-1',
        },
      ],
    );
    (defaultThirdPartyInvitesClient.fetchSlackUsers as jest.Mock).mockResolvedValue(
      [],
    );
    (getConnectedSlackWorkSpace as jest.Mock).mockReturnValue('1');

    renderInvitePeople(defaultProps);
    await waitForFormToLoad();

    expect(
      screen.queryByText(messages.thirdPartyConnect.defaultMessage),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(messages.thirdPartyConnectTeammates.defaultMessage),
    ).not.toBeInTheDocument();
  });

  it('should start auth flow for correct service when clicking connect button for non-slack provider', async () => {
    renderInvitePeople(defaultProps);
    await waitForFormToLoad();

    fireEvent.click(
      screen.getByText(messages.googleThirdPartyButton.defaultMessage),
    );

    expect(beginThirdPartyOauth).toBeCalledTimes(1);
    expect(beginThirdPartyOauth).toHaveBeenCalledWith(
      GOOGLE_SERVICE,
      false,
      expect.any(Function),
    );
  });

  it('should refresh integerations and show flag after oauth flow completes successfully', async () => {
    (beginThirdPartyOauth as jest.Mock).mockImplementation(
      (
        _serviceKey: string,
        _thirdPartyApiV2: boolean,
        callback: (success: boolean) => void,
      ) => {
        callback(true);
      },
    );
    renderInvitePeople(defaultProps);
    await waitForFormToLoad();

    fireEvent.click(
      screen.getByText(messages.googleThirdPartyButton.defaultMessage),
    );

    expect(
      defaultThirdPartyInvitesClient.getExistingIntegrations,
    ).toBeCalledTimes(2);
    expect(mockShowFlags).toHaveBeenCalledWith(
      getSuccessIntegrationFlag(GOOGLE_SERVICE),
    );
  });

  it('should show slack disconnection form and disconnect when clicked and show flag', async () => {
    (defaultThirdPartyInvitesClient.fetchSlackWorkspaces as jest.Mock).mockResolvedValue(
      [
        {
          id: '1',
          name: 'workspace-1',
        },
      ],
    );
    (defaultThirdPartyInvitesClient.fetchSlackUsers as jest.Mock).mockResolvedValue(
      [],
    );
    (getConnectedSlackWorkSpace as jest.Mock).mockReturnValue('1');

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
    (defaultThirdPartyInvitesClient.fetchSlackWorkspaces as jest.Mock).mockResolvedValue(
      [
        {
          id: '1',
          name: 'workspace-1',
        },
        {
          id: '2',
          name: 'workspace-2',
        },
      ],
    );
    (defaultThirdPartyInvitesClient.fetchSlackUsers as jest.Mock).mockResolvedValue(
      [],
    );

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
    (defaultThirdPartyInvitesClient.fetchSlackWorkspaces as jest.Mock).mockResolvedValue(
      [
        {
          id: '1',
          name: 'workspace-1',
        },
      ],
    );

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

  it('should open tab with marketplace app if no slack workspaces are connected', async () => {
    renderInvitePeople(defaultProps);
    await waitForFormToLoad();

    fireEvent.click(
      screen.getByText(messages.slackThirdPartyButton.defaultMessage),
    );

    expect(window.open).toHaveBeenCalledWith(CONFLUENCE_SLACK_URL);
  });
});
