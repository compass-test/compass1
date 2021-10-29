import { fireEvent, waitForElement } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import {
  defaultPermsApiClient,
  defaultInviteApiClient,
} from '../../../../../src/clients';
import { messages } from '../../../../components/i18n/messages';
import {
  renderInvitePeople,
  waitForFormToLoad,
  fillAndSubmitForm,
  cloudId,
  mockSiteUrl,
} from './_helpers';

import {
  triggerAnalyticsForSucceededInviteRequest,
  triggerAnalyticsForAccessRequested,
  triggerAnalyticsForClickAddMoreButton,
  triggerAnalyticsForClickCancelButton,
  triggerAnalyticsForClickInviteButton,
  triggerAnalyticsForFailedInviteRequest,
  triggerAnalyticsForUserInvited,
  triggerAnalyticsForSucceededGetAvailableProducts,
  triggerAnalyticsForFailedGetAvailableProducts,
  triggerAnalyticsForOpenProductSelectDropdown,
  triggerAnalyticsSLOInviteSuccess,
  triggerAnalyticsSLOInviteFail,
  triggerAnalyticsForInviteFormLoaded,
} from '../../../../components/analytics';
import { getProductTitle } from '../../../../utils';

jest.mock('../../../../components/analytics', () => {
  return {
    ...jest.requireActual<Object>('../../../../components/analytics'),
    triggerAnalyticsForSucceededInviteRequest: jest.fn(),
    triggerAnalyticsForAccessRequested: jest.fn(),
    triggerAnalyticsForClickAddMoreButton: jest.fn(),
    triggerAnalyticsForClickCancelButton: jest.fn(),
    triggerAnalyticsForClickInviteButton: jest.fn(),
    triggerAnalyticsForFailedInviteRequest: jest.fn(),
    triggerAnalyticsForUserInvited: jest.fn(),
    triggerAnalyticsForSucceededGetAvailableProducts: jest.fn(),
    triggerAnalyticsForFailedGetAvailableProducts: jest.fn(),
    triggerAnalyticsForOpenProductSelectDropdown: jest.fn(),
    triggerAnalyticsForRenderProductSelect: jest.fn(),
    triggerAnalyticsSLOInviteSuccess: jest.fn(),
    triggerAnalyticsSLOInviteFail: jest.fn(),
    triggerAnalyticsForInviteFormLoaded: jest.fn(),
  };
});

const mockEvent: any = {
  context: [],
  update: jest.fn(() => mockEvent),
  fire: jest.fn(() => mockEvent),
  clone: jest.fn(() => mockEvent),
};

jest.mock('../../../../../src/clients', () => {
  return {
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

const resourceAri = (productId: string) =>
  `ari:cloud:${productId}::site/${cloudId}`;

const jiraResourceAri = resourceAri('jira');
const compassResourceAri = resourceAri('compass');
const platformResourceAri = resourceAri('platform');

const makeInviteProduct = (productId: string) => ({
  name: getProductTitle(productId),
  id: productId,
  ari: resourceAri(productId),
});

const makeInviteResponse = (productIds: string[]) =>
  productIds.map((productId) => makeInviteProduct(productId));

const makeProductOption = (productId: string) => ({
  label: getProductTitle(productId),
  value: productId,
});

const makeProductOptions = (productIds: string[]) =>
  productIds.map((productId) => makeProductOption(productId));

describe('InvitePeople', () => {
  beforeEach(() => {
    (defaultPermsApiClient.getUserRole as jest.Mock).mockResolvedValue('basic');
    (triggerAnalyticsForInviteFormLoaded as any).mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render spinner when the invite component loads', async () => {
    renderInvitePeople();
    expect(
      screen.getByTestId('testId-invite-people-spinner'),
    ).toBeInTheDocument();
  });

  it('should call perms API if user role is not passed', async () => {
    renderInvitePeople();
    expect(defaultPermsApiClient.getUserRole).toBeCalledTimes(1);
  });

  it('should NOT call perms API if user role is passed', async () => {
    renderInvitePeople({ userRole: 'admin' });
    expect(defaultPermsApiClient.getUserRole).toBeCalledTimes(0);
  });

  it('should call invite capabilities API if the user is an admin or trusted user', async () => {
    renderInvitePeople({ userRole: 'admin' });
    expect(defaultInviteApiClient.inviteCapabilities).toBeCalledTimes(1);
  });

  it('should call invite capabilities API if the user role is basic and the sub-product is unknown', async () => {
    renderInvitePeople({
      userRole: 'basic',
    });
    expect(defaultInviteApiClient.inviteCapabilities).toBeCalledTimes(1);
  });

  it('should NOT call invite capabilities API if the sub-product is known and the user role is basic', async () => {
    renderInvitePeople({
      userRole: 'basic',
      subProduct: 'software',
    });
    expect(defaultInviteApiClient.inviteCapabilities).toBeCalled();
  });

  it('should NOT call invite capabilities API if product options is passed', async () => {
    renderInvitePeople({
      productOptions: [makeProductOption('confluence')],
    });
    expect(defaultInviteApiClient.inviteCapabilities).toBeCalledTimes(0);
  });

  it('should render the invite component', async () => {
    renderInvitePeople();
    await waitForFormToLoad();
  });

  it('should render the invite component with the product select UI if the user is an admin or trusted user', async () => {
    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue([
      makeInviteProduct('jira-software'),
      makeInviteProduct('confluence'),
    ]);
    renderInvitePeople({
      userRole: 'admin',
    });
    await waitForFormToLoad();

    await waitForElement(() =>
      screen.getByTestId('testId-invite-people-select-product'),
    );
    expect(
      screen.getByTestId('testId-invite-people-select-product'),
    ).toBeInTheDocument();
  });

  it('should render the invite component with the product select UI if  the user role is basic, the product is Jira, and the sub-product is unknown', async () => {
    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue([
      makeInviteProduct('jira-software'),
      makeInviteProduct('confluence'),
    ]);
    renderInvitePeople({
      userRole: 'basic',
      resourceAri: jiraResourceAri,
    });
    await waitForFormToLoad();

    await waitForElement(() =>
      screen.getByTestId('testId-invite-people-select-product'),
    );
    expect(
      screen.getByTestId('testId-invite-people-select-product'),
    ).toBeInTheDocument();
  });

  it('Product select UI should show only Jira products as selected options if the user role is basic, the product is Jira, and the sub-product is unknown', async () => {
    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue([
      makeInviteProduct('jira-software'),
      makeInviteProduct('confluence'),
      makeInviteProduct('jira-servicedesk'),
    ]);
    renderInvitePeople({
      userRole: 'basic',
      resourceAri: jiraResourceAri,
    });
    await waitForFormToLoad();

    await waitForElement(() =>
      screen.getByTestId('testId-invite-people-select-product'),
    );
    expect(
      screen.getByTestId('testId-invite-people-select-product'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Jira Software')).toBeInTheDocument();
    expect(screen.queryByText('Jira Service Management')).toBeInTheDocument();
    expect(screen.queryByText('Confluence')).not.toBeInTheDocument();
  });

  it('Product select UI should show only Confluence as a selected option if the user role is trusted and the product is Confluence', async () => {
    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue([
      makeInviteProduct('jira-software'),
      makeInviteProduct('confluence'),
      makeInviteProduct('jira-servicedesk'),
    ]);
    renderInvitePeople({
      userRole: 'trusted',
    });
    await waitForFormToLoad();

    await waitForElement(() =>
      screen.getByTestId('testId-invite-people-select-product'),
    );
    expect(
      screen.getByTestId('testId-invite-people-select-product'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Confluence')).toBeInTheDocument();
    expect(screen.queryByText('Jira')).not.toBeInTheDocument();
  });

  it('Product select UI should show all available options and no pre-selected option if product and sub-product are unknown', async () => {
    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue([
      makeInviteProduct('jira-software'),
      makeInviteProduct('confluence'),
      makeInviteProduct('jira-servicedesk'),
    ]);
    renderInvitePeople({
      userRole: 'trusted',
      resourceAri: platformResourceAri,
    });
    await waitForFormToLoad();

    await waitForElement(() =>
      screen.getByTestId('testId-invite-people-select-product'),
    );
    expect(
      screen.getByTestId('testId-invite-people-select-product'),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(messages.selectPlaceholder.defaultMessage),
    ).toBeInTheDocument();
  });

  it('should NOT render the invite component with the product select UI if  the user role is basic, and the product is Confluence', async () => {
    renderInvitePeople({
      userRole: 'basic',
    });
    await waitForFormToLoad();
    expect(
      screen.queryByTestId('testId-invite-people-select-product'),
    ).not.toBeInTheDocument();
  });

  it('should NOT render the invite component with the product select UI if  the user role is basic, the product is Jira, and the sub-product is known', async () => {
    renderInvitePeople({
      resourceAri: jiraResourceAri,
      userRole: 'basic',
      subProduct: 'software',
    });
    await waitForFormToLoad();
    expect(
      screen.queryByTestId('testId-invite-people-select-product'),
    ).not.toBeInTheDocument();
  });

  it('should NOT render the invite component with the product select UI if the invite capabilities returns only one product', async () => {
    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue([
      makeInviteProduct('jira-software'),
    ]);
    renderInvitePeople({
      resourceAri: jiraResourceAri,
    });
    await waitForFormToLoad();

    expect(
      screen.queryByTestId('testId-invite-people-select-product'),
    ).not.toBeInTheDocument();
  });

  it('should render 3 text fields by default', async () => {
    renderInvitePeople();
    await waitForFormToLoad();
    expect(screen.getAllByLabelText('Email address').length).toEqual(3);
  });

  it('should render submit button and a cancel button', async () => {
    renderInvitePeople();
    await waitForFormToLoad();
    expect(
      screen
        .getByTestId('testId-invite-people-form')
        .querySelectorAll('button[type="submit"]').length,
    ).toEqual(1);
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  });

  it('should not render the cancel button if `hideCancelButton` is passed', async () => {
    renderInvitePeople({
      hideCancelButton: true,
    });
    await waitForFormToLoad();
    expect(screen.queryByText(/cancel/i)).not.toBeInTheDocument();
  });

  it('should change copy based on the user role: Admin ', async () => {
    renderInvitePeople({
      userRole: 'admin',
    });

    await waitForFormToLoad();
    expect(screen.getByText(/invite teammates/i)).toBeInTheDocument();
    expect(
      screen
        .getByTestId('testId-invite-people-form')
        .querySelectorAll('button[type="submit"]')[0].textContent,
    ).toEqual('Invite teammates');
  });

  it('should change copy based on the user role: Basic ', async () => {
    renderInvitePeople({
      userRole: 'basic',
    });

    await waitForFormToLoad();
    expect(screen.getByText(/add teammates/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        'People you add will receive an invite automatically or after your site admin has approved the request.',
      ),
    ).toBeInTheDocument();
    expect(
      screen
        .getByTestId('testId-invite-people-form')
        .querySelectorAll('button[type="submit"]')[0].textContent,
    ).toEqual('Add teammates');
  });

  it('should change copy if perms API returns user role: ADMIN ', async () => {
    (defaultPermsApiClient.getUserRole as jest.Mock).mockResolvedValue('admin');

    renderInvitePeople();
    await waitForFormToLoad();

    expect(screen.getByText(/invite teammates/i)).toBeInTheDocument();
    expect(
      screen
        .getByTestId('testId-invite-people-form')
        .querySelectorAll('button[type="submit"]')[0].textContent,
    ).toEqual('Invite teammates');
  });

  it('should add another input text field when the user clicks on `add more`', async () => {
    renderInvitePeople();
    await waitForFormToLoad();

    const addMore = screen.getByText(/\+ add more/i);
    fireEvent.click(addMore);

    const input = screen.getAllByLabelText('Email address');
    expect(input).toHaveLength(4);
  });

  it('should remove `add more` button once the limit is reached', async () => {
    renderInvitePeople({
      maxNumberOfInputs: 4,
    });

    await waitForFormToLoad();

    const addMore = screen.getByText(/\+ add more/i);
    expect(addMore).toBeInTheDocument();

    fireEvent.click(addMore);

    const input = screen.getAllByLabelText('Email address');

    expect(input).toHaveLength(4);
    expect(screen.queryByText(/\+ add more/i)).not.toBeInTheDocument();
  });

  it('should show an error message if the user clicks on submit button and all input fields are empty', async () => {
    renderInvitePeople();
    await waitForFormToLoad();

    const submitButton = screen
      .getByTestId('testId-invite-people-form')
      .querySelectorAll('button[type="submit"]')[0];

    fireEvent.click(submitButton);
    expect(
      screen.getByText(/Please add at least one email address/i),
    ).toBeInTheDocument();
  });

  it('should show an error message if the user clicks on submit button and product selection is empty', async () => {
    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue([
      makeInviteProduct('jira-software'),
      makeInviteProduct('confluence'),
      makeInviteProduct('jira-servicedesk'),
    ]);
    renderInvitePeople({
      userRole: 'trusted',
      resourceAri: platformResourceAri,
    });
    await waitForFormToLoad();

    await waitForElement(() =>
      screen.getByTestId('testId-invite-people-select-product'),
    );
    expect(
      screen.queryByText(messages.selectPlaceholder.defaultMessage),
    ).toBeInTheDocument();

    await fillAndSubmitForm(false);

    expect(
      screen.getByText(messages.noProductSelectedMessage.defaultMessage),
    ).toBeInTheDocument();
  });

  it('should invite to Confluence when product is confluence', async () => {
    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue([
      makeInviteProduct('confluence'),
    ]);

    renderInvitePeople();
    await waitForFormToLoad();

    await fillAndSubmitForm();

    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledTimes(1);
    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledWith({
      users: expect.any(Array),
      continueUrl: expect.stringContaining(
        'https://hello.atlassian.net/wiki?atlOrigin=',
      ),
      resources: [`ari:cloud:confluence::site/${cloudId}`],
      suppressInviteEmail: expect.any(Boolean),
    });
  });

  it('should call the invite API with the correct product when product is jira and subproduct is known', async () => {
    renderInvitePeople({
      resourceAri: jiraResourceAri,
      subProduct: 'core',
    });

    await waitForFormToLoad();

    await fillAndSubmitForm();

    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledTimes(1);
    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledWith({
      users: expect.any(Array),
      continueUrl: expect.stringContaining(`${mockSiteUrl}?atlOrigin=`),
      resources: [`ari:cloud:jira-core::site/${cloudId}`],
      suppressInviteEmail: expect.any(Boolean),
    });
  });

  it('should call the invite API with the correct product when product is jira, subproduct is unknown', async () => {
    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue([
      makeInviteProduct('jira-software'),
      makeInviteProduct('confluence'),
    ]);
    renderInvitePeople({
      resourceAri: jiraResourceAri,
    });

    await waitForFormToLoad();
    await fillAndSubmitForm();

    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledTimes(1);
    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledWith({
      users: expect.any(Array),
      continueUrl: expect.stringContaining(`${mockSiteUrl}?atlOrigin=`),
      resources: [`ari:cloud:jira-software::site/${cloudId}`],
      suppressInviteEmail: expect.any(Boolean),
    });
  });

  it('should call the invite API with the correct product when product is jira, subproduct is unknown and invite capabilities client fails', async () => {
    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue(
      [],
    );
    renderInvitePeople({
      resourceAri: jiraResourceAri,
    });

    await waitForFormToLoad();
    await fillAndSubmitForm();

    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledTimes(1);
    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledWith({
      users: expect.any(Array),
      continueUrl: expect.stringContaining(`${mockSiteUrl}?atlOrigin=`),
      resources: [jiraResourceAri],
      suppressInviteEmail: expect.any(Boolean),
    });
  });

  it('should call the invite API with the correct product when product is compass, subproduct is unknown and invite capabilities client fails', async () => {
    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue(
      [],
    );

    renderInvitePeople({
      resourceAri: compassResourceAri,
    });

    await waitForFormToLoad();
    await fillAndSubmitForm();

    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledTimes(1);
    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledWith({
      users: expect.any(Array),
      continueUrl: expect.stringContaining(`${mockSiteUrl}/compass?atlOrigin=`),
      resources: [compassResourceAri],
      suppressInviteEmail: expect.any(Boolean),
    });
  });

  it('should call the invite API with the correct product when product is compass, subproduct is unknown and site has jira software', async () => {
    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue([
      makeInviteProduct('jira-software'),
      makeInviteProduct('compass'),
    ]);
    renderInvitePeople({
      resourceAri: compassResourceAri,
    });

    await waitForFormToLoad();
    await fillAndSubmitForm();

    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledTimes(1);
    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledWith({
      users: expect.any(Array),
      continueUrl: expect.stringContaining(`${mockSiteUrl}/compass?atlOrigin=`),
      resources: [compassResourceAri],
      suppressInviteEmail: expect.any(Boolean),
    });
  });

  it('should call the invite API with the correct product when product is compass, subproduct is unknown and has 2 jira products', async () => {
    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue([
      makeInviteProduct('jira-software'),
      makeInviteProduct('jira-servicedesk'),
      makeInviteProduct('compass'),
    ]);
    renderInvitePeople({
      resourceAri: compassResourceAri,
    });

    await waitForFormToLoad();
    await fillAndSubmitForm();

    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledTimes(1);
    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledWith({
      users: expect.any(Array),
      continueUrl: expect.stringContaining(`${mockSiteUrl}/compass?atlOrigin=`),
      resources: [compassResourceAri],
      suppressInviteEmail: expect.any(Boolean),
    });
  });

  it('should call the invite API with the correct product when product is compass, subproduct is unknown and has 2 jira products, and user is admin', async () => {
    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue([
      makeInviteProduct('jira-software'),
      makeInviteProduct('jira-servicedesk'),
      makeInviteProduct('compass'),
    ]);
    renderInvitePeople({
      resourceAri: compassResourceAri,
      userRole: 'admin',
    });

    await waitForFormToLoad();
    await fillAndSubmitForm();

    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledTimes(1);
    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledWith({
      users: expect.any(Array),
      continueUrl: expect.stringContaining(`${mockSiteUrl}/compass?atlOrigin=`),
      resources: [compassResourceAri],
      suppressInviteEmail: expect.any(Boolean),
    });
  });

  it('should call the invite API with the correct product when invite capabilities return jira-software', async () => {
    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue([
      makeInviteProduct('jira-software'),
      makeInviteProduct('confluence'),
    ]);
    renderInvitePeople({
      resourceAri: jiraResourceAri,
    });

    await waitForFormToLoad();
    await fillAndSubmitForm();

    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledTimes(1);
    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledWith({
      users: expect.any(Array),
      continueUrl: expect.stringContaining(`${mockSiteUrl}?atlOrigin=`),
      resources: [`ari:cloud:jira-software::site/${cloudId}`],
      suppressInviteEmail: expect.any(Boolean),
    });
  });

  it('should call the invite API with the correct product when invite capabilities return multiple jira products', async () => {
    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue([
      makeInviteProduct('jira-software'),
      makeInviteProduct('jira-core'),
      makeInviteProduct('jira-servicedesk'),
    ]);
    renderInvitePeople({
      resourceAri: jiraResourceAri,
    });

    await waitForFormToLoad();
    await fillAndSubmitForm();

    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledTimes(1);
    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledWith({
      users: expect.any(Array),
      continueUrl: expect.stringContaining(`${mockSiteUrl}?atlOrigin=`),
      resources: [
        `ari:cloud:jira-software::site/${cloudId}`,
        `ari:cloud:jira-servicedesk::site/${cloudId}`,
      ],
      suppressInviteEmail: expect.any(Boolean),
    });
  });

  it('should call the invite API with the correct product when invite capabilities return jira-core only', async () => {
    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue([
      makeInviteProduct('jira-core'),
    ]);
    renderInvitePeople({
      resourceAri: jiraResourceAri,
    });

    await waitForFormToLoad();
    await fillAndSubmitForm();

    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledTimes(1);
    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledWith({
      users: expect.any(Array),
      continueUrl: expect.stringContaining(`${mockSiteUrl}?atlOrigin=`),
      resources: [`ari:cloud:jira-core::site/${cloudId}`],
      suppressInviteEmail: expect.any(Boolean),
    });
  });
});

describe('InvitePeople analytics', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should trigger analytics event when user clicks on `add more` button', async () => {
    renderInvitePeople();
    await waitForFormToLoad();

    await waitForElement(() => screen.getByText(/\+ add more/i));
    fireEvent.click(screen.getByText(/\+ add more/i));

    expect(triggerAnalyticsForClickAddMoreButton).toHaveBeenCalled();
  });

  it('should trigger analytics event when user clicks on `Cancel` button', async () => {
    renderInvitePeople();
    await waitForFormToLoad();

    await waitForElement(() => screen.getByText(/cancel/i));
    fireEvent.click(screen.getByText(/cancel/i));

    expect(triggerAnalyticsForClickCancelButton).toHaveBeenCalled();
  });

  it('should trigger analytics event when user clicks on `Add` button', async () => {
    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue([
      makeInviteProduct('confluence'),
    ]);
    renderInvitePeople({ userRole: 'basic' });
    await waitForFormToLoad();

    await fillAndSubmitForm();

    expect(triggerAnalyticsForClickInviteButton).toHaveBeenCalled();
    expect(triggerAnalyticsForClickInviteButton).toHaveBeenCalledWith(
      expect.any(Function),
      {
        formError: undefined,
        product: 'confluence',
        numberOfEmails: 1,
        numberOfUniqueEmails: 1,
        invitedProducts: ['confluence'],
        source: 'peopleMenu',
      },
    );
  });

  it('should trigger analytics event with the correct attributes when user open the product select menu', async () => {
    const inviteCapabilitiesResponse = [
      makeInviteProduct('jira-software'),
      makeInviteProduct('jira-servicedesk'),
      makeInviteProduct('confluence'),
    ];

    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue(
      inviteCapabilitiesResponse,
    );

    renderInvitePeople({
      userRole: 'trusted',
    });
    await waitForFormToLoad();

    const productSelect = screen
      .getByTestId('testId-invite-people-select-product')
      .querySelectorAll('.select__input input')[0];

    fireEvent.focus(productSelect);
    fireEvent.keyDown(productSelect, {
      key: 'ArrowDown',
      code: 'ArrowDown',
      which: 40,
    });

    expect(triggerAnalyticsForOpenProductSelectDropdown).toHaveBeenCalled();
    expect(triggerAnalyticsForOpenProductSelectDropdown).toHaveBeenCalledWith(
      {
        userRole: 'trusted',
        productOptions: ['jira-software', 'jira-servicedesk', 'confluence'],
        selectedProducts: ['confluence'],
        source: 'peopleMenu',
      },
      expect.any(Function),
    );
  });

  it('should trigger analytics event with the correct attributes when user clicks on `Add` button', async () => {
    const inviteCapabilitiesResponse = [
      makeInviteProduct('jira-software'),
      makeInviteProduct('jira-servicedesk'),
      makeInviteProduct('confluence'),
    ];

    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue(
      inviteCapabilitiesResponse,
    );

    renderInvitePeople({
      userRole: 'trusted',
      resourceAri: jiraResourceAri,
    });
    await waitForFormToLoad();
    await fillAndSubmitForm();

    expect(triggerAnalyticsForClickInviteButton).toHaveBeenCalled();
    expect(triggerAnalyticsForClickInviteButton).toHaveBeenCalledWith(
      expect.any(Function),
      {
        formError: undefined,
        product: 'jira',
        numberOfEmails: 1,
        numberOfUniqueEmails: 1,
        invitedProducts: ['jira-software', 'jira-servicedesk'],
        source: 'peopleMenu',
      },
    );
  });

  describe('invite api calls', () => {
    beforeEach(() => {
      (defaultInviteApiClient.inviteUsers as jest.Mock).mockClear();
      (triggerAnalyticsForAccessRequested as any).mockReset();
      (triggerAnalyticsForFailedInviteRequest as any).mockReset();
      (triggerAnalyticsSLOInviteFail as any).mockReset();
      (triggerAnalyticsSLOInviteSuccess as any).mockReset();
    });

    it('should trigger analytics event when invite api call failed', async () => {
      const mockError: Error & { status?: number } = new Error('network error');
      mockError.status = 500;

      (defaultInviteApiClient.inviteUsers as jest.Mock).mockImplementation(
        () => {
          throw mockError;
        },
      );

      renderInvitePeople({ userRole: 'basic' });
      await waitForFormToLoad();
      await fillAndSubmitForm();

      expect(triggerAnalyticsForFailedInviteRequest).toHaveBeenCalledTimes(1);
      expect(triggerAnalyticsSLOInviteFail).toHaveBeenCalledTimes(1);
      expect(triggerAnalyticsForFailedInviteRequest).toHaveBeenCalledWith(
        expect.any(Function),
        'peopleMenu',
        ['confluence'],
        'basic',
        mockError.name,
        mockError.message,
      );
      expect(triggerAnalyticsSLOInviteFail).toHaveBeenCalledWith(
        expect.any(Function),
        'peopleMenu',
        mockError.name,
        mockError.message,
        mockError.status,
      );
    });

    it('should trigger analytics event when invite api call succeeded', async () => {
      const invitedUsers = [
        {
          id: 'user+1',
          email: 'user+1@atlassian.com',
        },
      ];

      const accessRequestedUsers = [
        {
          id: 'user+2',
          email: 'user+2@atlassian.com',
        },
      ];

      const notInvitedUsers = [
        {
          email: 'user+3@atlassian.com',
          error: {
            code: 'error code',
            message: 'error message',
          },
        },
      ];

      (defaultInviteApiClient.inviteUsers as jest.Mock).mockResolvedValue({
        invited: invitedUsers,
        accessRequested: accessRequestedUsers,
        error: notInvitedUsers,
      });

      renderInvitePeople({ userRole: 'basic' });
      await waitForFormToLoad();
      await fillAndSubmitForm();

      expect(triggerAnalyticsForUserInvited).toHaveBeenCalledTimes(1);
      expect(triggerAnalyticsForUserInvited).toHaveBeenCalledWith(
        expect.any(Function),
        'peopleMenu',
        expect.objectContaining({
          originIdGenerated: expect.any(String),
          originProduct: 'confluence',
          originLibrary: expect.any(String),
        }),
        invitedUsers[0].id,
        ['confluence'],
        'basic',
      );

      expect(triggerAnalyticsForAccessRequested).toHaveBeenCalledTimes(1);
      expect(triggerAnalyticsForAccessRequested).toHaveBeenCalledWith(
        expect.any(Function),
        'peopleMenu',
        expect.objectContaining({
          originIdGenerated: expect.any(String),
          originProduct: 'confluence',
          originLibrary: expect.any(String),
        }),
        accessRequestedUsers[0].id,
        ['confluence'],
        'basic',
      );

      expect(triggerAnalyticsForSucceededInviteRequest).toHaveBeenCalledTimes(
        1,
      );
      expect(triggerAnalyticsForSucceededInviteRequest).toHaveBeenCalledWith(
        expect.any(Function),
        'peopleMenu',
        ['confluence'],
        'basic',
        {
          invited: [invitedUsers[0].id],
          accessRequested: [accessRequestedUsers[0].id],
          error: [
            {
              code: notInvitedUsers[0].error.code,
              message: notInvitedUsers[0].error.message,
            },
          ],
        },
      );
      expect(triggerAnalyticsSLOInviteSuccess).toHaveBeenCalledTimes(1);
      expect(triggerAnalyticsSLOInviteSuccess).toHaveBeenCalledWith(
        expect.any(Function),
        'peopleMenu',
      );
    });

    it('should trigger analytics event when invite api call return failure', async () => {
      (defaultInviteApiClient.inviteUsers as jest.Mock).mockResolvedValue({
        failure: {
          code: 'licence-exceeded',
          message: 'licence-exceeded',
        },
      });

      renderInvitePeople({ userRole: 'basic' });
      await waitForFormToLoad();
      await fillAndSubmitForm();

      expect(triggerAnalyticsForFailedInviteRequest).toHaveBeenCalledTimes(1);
      expect(triggerAnalyticsForFailedInviteRequest).toHaveBeenCalledWith(
        expect.any(Function),
        'peopleMenu',
        ['confluence'],
        'basic',
        'licence-exceeded',
        'licence-exceeded',
      );
      expect(triggerAnalyticsSLOInviteSuccess).toHaveBeenCalledTimes(1);
      expect(triggerAnalyticsSLOInviteSuccess).toHaveBeenCalledWith(
        expect.any(Function),
        'peopleMenu',
      );
    });
  });

  describe('invite capabilities api calls', () => {
    beforeEach(() => {
      (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockClear();
      (triggerAnalyticsForSucceededGetAvailableProducts as any).mockReset();
      (triggerAnalyticsForFailedGetAvailableProducts as any).mockReset();
    });

    it('should trigger analytics event when invite capabilities api call failed', async () => {
      const mockError = new Error('network error');

      (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockImplementation(
        () => {
          throw mockError;
        },
      );

      renderInvitePeople({
        userRole: 'basic',
        resourceAri: jiraResourceAri,
      });
      await waitForFormToLoad();

      expect(
        triggerAnalyticsForFailedGetAvailableProducts,
      ).toHaveBeenCalledTimes(1);
      expect(
        triggerAnalyticsForFailedGetAvailableProducts,
      ).toHaveBeenCalledWith(expect.any(Function), jiraResourceAri);
    });

    it('should trigger analytics event when invite capabilities api call succeeded', async () => {
      (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue(
        [makeInviteProduct('jira-software'), makeInviteProduct('confluence')],
      );

      renderInvitePeople({
        userRole: 'basic',
        resourceAri: jiraResourceAri,
      });
      await waitForFormToLoad();

      expect(
        triggerAnalyticsForSucceededGetAvailableProducts,
      ).toHaveBeenCalledTimes(1);
      expect(
        triggerAnalyticsForSucceededGetAvailableProducts,
      ).toHaveBeenCalledWith(expect.any(Function), jiraResourceAri, [
        `ari:cloud:jira-software::site/${cloudId}`,
        `ari:cloud:confluence::site/${cloudId}`,
      ]);
    });

    it('should trigger analytics event when invite capabilities api returns no products', async () => {
      (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue(
        [],
      );

      renderInvitePeople({
        userRole: 'admin',
        resourceAri: jiraResourceAri,
      });
      await waitForFormToLoad();

      expect(
        triggerAnalyticsForFailedGetAvailableProducts,
      ).toHaveBeenCalledTimes(1);
      expect(
        triggerAnalyticsForFailedGetAvailableProducts,
      ).toHaveBeenCalledWith(expect.any(Function), jiraResourceAri);
    });
  });
});

describe('Invite people description', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show description to basic user', async () => {
    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue([
      makeInviteProduct('jira-software'),
      makeInviteProduct('confluence'),
      makeInviteProduct('jira-servicedesk'),
    ]);
    renderInvitePeople({
      userRole: 'basic',
      resourceAri: resourceAri('confluence'),
    });
    await waitForFormToLoad();

    expect(
      screen.queryByText(
        'People you add will receive an invite automatically or after your site admin has approved the request.',
      ),
    ).toBeInTheDocument();
  });
});

describe('Jira subproduct special cases', () => {
  const mockInviteOrOptions = (invite: boolean, productIds: string[]) => {
    let productOptions;
    if (invite) {
      (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue(
        makeInviteResponse(productIds),
      );
    } else {
      productOptions = makeProductOptions(productIds);
    }
    return productOptions;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });
  describe.each([
    ['Invite Capabilities API', true],
    ['productOptions prop', false],
  ])('Product Options fetched from %s', (label, useApi) => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('When subproduct is unknown, should only preselect JSW and JSD even if Jira Core exists', async () => {
      const productOptions = mockInviteOrOptions(useApi, [
        'jira-core',
        'jira-software',
        'confluence',
        'jira-servicedesk',
      ]);
      renderInvitePeople({
        userRole: 'basic',
        resourceAri: jiraResourceAri,
        productOptions,
      });
      await waitForFormToLoad();

      await waitForElement(() =>
        screen.getByTestId('testId-invite-people-select-product'),
      );

      expect(screen.queryByText('Jira Software')).toBeInTheDocument();
      expect(screen.queryByText('Jira Service Management')).toBeInTheDocument();
      expect(
        screen.queryByText('Jira Work Management'),
      ).not.toBeInTheDocument();
    });

    it('When subproduct is unknown, should preselect Jira Core if it is the only jira product', async () => {
      const productOptions = mockInviteOrOptions(useApi, [
        'jira-core',
        'confluence',
      ]);

      renderInvitePeople({
        userRole: 'basic',
        resourceAri: jiraResourceAri,
        productOptions,
      });
      await waitForFormToLoad();

      await waitForElement(() =>
        screen.getByTestId('testId-invite-people-select-product'),
      );

      expect(screen.queryByText('Jira Work Management')).toBeInTheDocument();
      expect(screen.queryByText('Confluence')).not.toBeInTheDocument();
    });

    it('For Admin/TU: When subproduct is jira-core and there are other Jira products, should preselect all other jira product except jira core', async () => {
      const productOptions = mockInviteOrOptions(useApi, [
        'jira-core',
        'jira-software',
        'jira-servicedesk',
        'confluence',
      ]);

      renderInvitePeople({
        userRole: 'admin',
        resourceAri: jiraResourceAri,
        subProduct: 'core',
        productOptions,
      });
      await waitForFormToLoad();

      await waitForElement(() =>
        screen.getByTestId('testId-invite-people-select-product'),
      );

      expect(
        screen.queryByText('Jira Work Management'),
      ).not.toBeInTheDocument();
      expect(screen.queryByText('Jira Software')).toBeInTheDocument();
      expect(screen.queryByText('Jira Service Management')).toBeInTheDocument();
    });
  });
});

describe('InvitePeople callback props', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call the `experimental_onInviteCompletedHandler` passing the bulk invite response after the invite if it is available', async () => {
    const invitedUsers = [
      {
        id: 'user+1',
        email: 'user+1@atlassian.com',
      },
    ];

    const accessRequestedUsers = [
      {
        id: 'user+2',
        email: 'user+2@atlassian.com',
      },
    ];

    const notInvitedUsers = [
      {
        email: 'user+3@atlassian.com',
        error: {
          code: 'error code',
          message: 'error message',
        },
      },
    ];

    (defaultInviteApiClient.inviteUsers as jest.Mock).mockResolvedValue({
      invited: invitedUsers,
      accessRequested: accessRequestedUsers,
      error: notInvitedUsers,
    });

    const experimental_onInviteCompletedHandler = jest.fn();

    renderInvitePeople({
      userRole: 'basic',
      experimental_onInviteCompletedHandler,
    });
    await waitForFormToLoad();
    await fillAndSubmitForm();

    expect(experimental_onInviteCompletedHandler).toHaveBeenCalledTimes(1);
    expect(experimental_onInviteCompletedHandler).toHaveBeenCalledWith({
      invited: [
        {
          id: 'user+1',
          email: 'user+1@atlassian.com',
        },
      ],
      accessRequested: [
        {
          id: 'user+2',
          email: 'user+2@atlassian.com',
        },
      ],
      error: [
        {
          email: 'user+3@atlassian.com',
          error: {
            code: 'error code',
            message: 'error message',
          },
        },
      ],
    });
  });
});
