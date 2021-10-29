/**
 * This file tests only some functionality of the InviteeList - in that it's "sending"
 * emails to the correct set of addresses, in the presence and absence of Product Select.
 * This file does _not_ exhaustively test the component itself.
 *
 * The component itself should have a comprehensive test suite that deals with form validation.
 */
import { waitForElement, fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import { renderHook, act } from '@testing-library/react-hooks';
import {
  defaultThirdPartyInvitesClient,
  defaultAccountInfoClient,
  defaultPermsApiClient,
  defaultInviteApiClient,
  defaultOpenInviteClient,
  defaultHaveISeenItClient,
} from '../../../../clients';
import { InvitePeopleProps } from '../../../..';
import { useViralSettings } from '../../../../components/ViralSettings/ViralSettings';
import {
  GOOGLE_SERVICE,
  MICROSOFT_SERVICE,
  SLACK_SERVICE,
} from '../../../../components/ThirdParty/constants';
import {
  triggerAnalyticsForExposedViralSettings,
  triggerAnalyticsForExposedViralOptionsDefaultToChecked,
  triggerAnalyticsForRenderUserInvitesCheckbox,
  triggerAnalyticsForRenderDirectAccessCheckbox,
  triggerAnalyticsForClickedUserInvitesCheckbox,
  triggerAnalyticsForClickedDirectAccessCheckbox,
  triggerAnalyticsForApprovedDomainsSettingsSuccess,
  triggerAnalyticsForUserInviteSettingsSuccess,
  triggerAnalyticsForHISIFlagCreated,
  triggerAnalyticsForHISIFlagCreateFailed,
  triggerAnalyticsForHISIFlagFetched,
  triggerAnalyticsForHISIFlagFetchFailed,
} from '../../../../components/analytics';
import { getConnectedSlackWorkSpace } from '../../../../components/ThirdParty/localStorageUtils';
import {
  GetOpenInviteStateResponse,
  GetDirectAccessSettingSuccessResponse,
  GetFlagResponse,
} from '../../../../types';
import { messages } from '../../../../components/i18n';
import {
  cloudId,
  resourceAri,
  renderInvitePeople,
  getUserPicker,
  waitForFormToLoad,
  submitForm,
} from './_helpers';

import {
  ViralSettingsCohort,
  Cohort,
  ViralSettingsHookProps,
} from '../../../../types';

jest.mock('../../../../components/analytics', () => {
  return {
    ...jest.requireActual<Object>('../../../../components/analytics'),
    triggerAnalyticsForSucceededInviteRequest: jest.fn(),
    triggerAnalyticsForUserInvited: jest.fn(),
    triggerAnalyticsForExposedViralSettings: jest.fn(),
    triggerAnalyticsForExposedViralOptionsDefaultToChecked: jest.fn(),
    triggerAnalyticsForRenderUserInvitesCheckbox: jest.fn(),
    triggerAnalyticsForRenderDirectAccessCheckbox: jest.fn(),
    triggerAnalyticsForClickedUserInvitesCheckbox: jest.fn(),
    triggerAnalyticsForClickedDirectAccessCheckbox: jest.fn(),
    triggerAnalyticsForApprovedDomainsSettingsSuccess: jest.fn(),
    triggerAnalyticsForUserInviteSettingsSuccess: jest.fn(),
    triggerAnalyticsForHISIFlagCreated: jest.fn(),
    triggerAnalyticsForHISIFlagCreateFailed: jest.fn(),
    triggerAnalyticsForHISIFlagFetched: jest.fn(),
    triggerAnalyticsForHISIFlagFetchFailed: jest.fn(),
  };
});

const mockEvent: any = {
  context: [],
  update: jest.fn(() => mockEvent),
  fire: jest.fn(() => mockEvent),
  clone: jest.fn(() => mockEvent),
};

const nextTick = () => new Promise((resolve) => setTimeout(resolve, 0));

const openInviteEnabledResponse: GetOpenInviteStateResponse = {
  response: {
    mode: 'REQUEST_ACCESS',
    getOpenInvite: true,
  },
  cached: false,
};
const getDirectAccessSettingDefaultResponse: GetDirectAccessSettingSuccessResponse = {
  response: {
    domain: 'domain.com',
    role: 'ari:cloud:jira-software::role/product/member',
    desPromotionEligible: true,
    getAccessSuccessReponse: true,
  },
  cached: false,
};
const getDirectAccessSettingPromotionFalse: GetDirectAccessSettingSuccessResponse = {
  response: {
    domain: 'domain.com',
    role: 'ari:cloud:jira-software::role/product/member',
    desPromotionEligible: false,
    getAccessSuccessReponse: true,
  },
  cached: false,
};
const getFlagDefaultResponse: GetFlagResponse = {
  response: { status: false, lastSeenDate: null },
  cached: false,
};
const getFlagHaveSeenResponse: GetFlagResponse = {
  response: { status: true, lastSeenDate: null },
  cached: false,
};

jest.mock('../../../../../src/clients', () => {
  const actual = jest.requireActual('../../../../../src/clients');
  return {
    ...actual,
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
      getDirectAccessSetting: jest.fn(),
      updateDirectAccessSettings: jest.fn(),
      clearDESCache: jest.fn(),
    },
    defaultOpenInviteClient: {
      getOpenInviteState: jest.fn(),
      enableOpenInvite: jest.fn(),
      clearCache: jest.fn(),
    },
    defaultHaveISeenItClient: {
      getFlag: jest.fn(),
      postFlag: jest.fn(),
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
const renderInvitePeopleWithDefaultSelect = (
  props?: Partial<InvitePeopleProps>,
) => renderInvitePeople({ userRole: 'admin', ...props });

const renderInvitePeopleWithCreatableSelect = (
  props?: Partial<InvitePeopleProps>,
) =>
  renderInvitePeople({
    userRole: 'admin',
    enableInviteeList: true,
    viralSettingsCohort: ViralSettingsCohort.VARIATION,
    viralOptionsDefaultToCheckedFeatureFlag: {
      value: false,
      explanation: { kind: 'SIMPLE_EVAL' },
    },
    ...props,
  });

const renderInviteWithUserPicker = (props?: Partial<InvitePeopleProps>) =>
  renderInvitePeopleWithCreatableSelect({
    thirdPartyInvitesCohort: Cohort.EXPERIMENT,
    ...props,
  });

const renderInvitePeopleWithCreatableSelectAndDefaultToChecked = (
  props?: Partial<InvitePeopleProps>,
) =>
  renderInvitePeopleWithCreatableSelect({
    viralOptionsDefaultToCheckedFeatureFlag: {
      value: true,
      explanation: { kind: 'SIMPLE_EVAL' },
    },
    ...props,
  });

const renderInviteWithUserPickerAndDefaultToChecked = (
  props?: Partial<InvitePeopleProps>,
) =>
  renderInviteWithUserPicker({
    viralOptionsDefaultToCheckedFeatureFlag: {
      value: true,
      explanation: { kind: 'SIMPLE_EVAL' },
    },
    ...props,
  });

const checkOpenInviteDisplay = async (
  renderFunc: Function,
  fireFocusEvent: Function,
) => {
  renderFunc({
    resourceAri,
  });

  await waitForFormToLoad();
  fireFocusEvent();
  await nextTick();
  expect(defaultOpenInviteClient.getOpenInviteState).toHaveBeenCalled();
  await waitForElement(() =>
    screen.getByTestId('testId-invite-people-viral-settings-title'),
  );
  expect(
    await screen.getByTestId(
      'testId-invite-people-viral-settings-open-invite--checkbox-label',
    ),
  ).toBeInTheDocument();
};

const fillCreateableSelect = async (emailAddrs: string) => {
  await waitForElement(() =>
    screen.getByTestId('testId-invite-people-invitee-list'),
  );
  const inviteeList = screen
    .getByTestId('testId-invite-people-invitee-list')
    .querySelectorAll('.inviteeselect__input input')[0];
  fireEvent.focus(inviteeList);
  fireEvent.change(inviteeList, {
    target: { value: emailAddrs },
  });
  fireEvent.blur(inviteeList);
};

const fillUserPicker = async (emailAddrs: string) => {
  await waitForElement(() =>
    screen.getByTestId('testId-invite-people-invitee-list'),
  );
  const input = await waitForElement(() =>
    screen.getByLabelText(
      messages.inviteeListLabelThirdPartyNoIntegrations.defaultMessage,
    ),
  );
  fireEvent.focus(input);
  fireEvent.change(input, {
    target: { value: emailAddrs },
  });

  const emailOption = screen
    .getByTestId('testId-invite-people-invitee-list')
    .querySelectorAll('.fabric-user-picker__option--is-focused')[0];
  fireEvent.click(emailOption);
};

const checkCheckbox = async (testId: string) => {
  const checkBoxParent = screen.getByTestId(testId);
  fireEvent.click(checkBoxParent);
};

const selectAllProducts = async () => {
  await waitForElement(() =>
    screen.getByTestId('testId-invite-people-select-product'),
  );
  const productSelect = screen
    .getByTestId('testId-invite-people-select-product')
    .querySelectorAll('.select__input input')[0];

  fireEvent.focus(productSelect);
  fireEvent.keyDown(productSelect, {
    key: 'ArrowDown',
    code: 'ArrowDown',
    which: 40,
  });
  await waitForElement(() => screen.getByText('Select all'));
  fireEvent.click(screen.getByText('Jira Service-Desk'));
  fireEvent.focus(productSelect);
  fireEvent.keyDown(productSelect, {
    key: 'ArrowDown',
    code: 'ArrowDown',
    which: 40,
  });
  fireEvent.click(screen.getByText('Jira Software'));
};

const uncheckViralSettingsCheckboxesAndSubmit = async (
  ari: string,
  domain: string,
) => {
  renderInvitePeopleWithCreatableSelectAndDefaultToChecked({
    resourceAri,
  });
  await waitForElement(() =>
    screen.getByTestId('testId-invite-people-invitee-list'),
  );
  const fireFocusEvent = () =>
    fireEvent.focus(
      screen
        .getByTestId('testId-invite-people-invitee-list')
        .querySelectorAll('.inviteeselect__input input')[0],
    );
  fireFocusEvent();
  await fillCreateableSelect(`test@${domain}`);
  await nextTick();
  await checkCheckbox(
    'testId-invite-people-viral-settings-open-invite--hidden-checkbox',
  );
  await checkCheckbox(
    `testId-invite-people-viral-settings-direct-access-${domain}--hidden-checkbox`,
  );
  await nextTick();
  await submitForm(true);
};

describe('Viral Settings', () => {
  beforeEach(() => {
    (defaultThirdPartyInvitesClient.getExistingIntegrations as jest.Mock).mockResolvedValue(
      {
        connectedIntegrations: [],
        enabledIntegrations: [SLACK_SERVICE, GOOGLE_SERVICE, MICROSOFT_SERVICE],
      },
    );
    (defaultThirdPartyInvitesClient.fetchSlackWorkspaces as jest.Mock).mockResolvedValue(
      [{ id: 'workspace-1' }],
    );
    (defaultInviteApiClient.getDirectAccessSetting as jest.Mock).mockResolvedValue(
      getDirectAccessSettingDefaultResponse,
    );
    (defaultOpenInviteClient.getOpenInviteState as jest.Mock).mockResolvedValue(
      openInviteEnabledResponse,
    );
    (defaultInviteApiClient.updateDirectAccessSettings as jest.Mock).mockResolvedValue(
      {
        success: true,
        updateDirectAccessSettings: true,
      },
    );
    (defaultOpenInviteClient.enableOpenInvite as jest.Mock).mockResolvedValue({
      success: true,
      enableOpenInvite: true,
    });
    (getConnectedSlackWorkSpace as jest.Mock).mockReturnValue(null);
    (defaultAccountInfoClient.getAccountInfo as jest.Mock).mockResolvedValue({
      account_id: 'account-id',
      email: 'email@email.com',
    });

    mockUserAgent(null);
    window.open = jest.fn();
    (defaultPermsApiClient.getUserRole as jest.Mock).mockResolvedValue('admin');
    (defaultInviteApiClient.inviteUsers as jest.Mock).mockResolvedValue({
      invited: [{ id: 'test--1', email: 'test--1@atl.fake' }],
      accessRequested: [],
      error: [],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('ViralOptionsDefaultToChecked exposure event', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('check viralOptionsDefaultToChecked exposure event is fired with creatableSelect', async () => {
      renderInvitePeopleWithCreatableSelect({
        resourceAri,
      });
      await waitForFormToLoad();

      expect(
        triggerAnalyticsForExposedViralOptionsDefaultToChecked,
      ).toBeCalledTimes(1);
    });
    it('check viralOptionsDefaultToChecked exposure event is fired with userpicker', async () => {
      renderInviteWithUserPicker({
        resourceAri,
      });
      await waitForFormToLoad();

      expect(
        triggerAnalyticsForExposedViralOptionsDefaultToChecked,
      ).toBeCalledTimes(1);
    });
    it('check viralOptionsDefaultToChecked exposure event is not fired (non-admin user)', async () => {
      renderInvitePeopleWithDefaultSelect({
        resourceAri,
      });
      await waitForFormToLoad();

      expect(
        triggerAnalyticsForExposedViralOptionsDefaultToChecked,
      ).toBeCalledTimes(0);
    });

    it('check viralOptionsDefaultToChecked exposure event is not fired (non-admin user) for default select checked', async () => {
      renderInvitePeopleWithDefaultSelect({
        resourceAri,
        userRole: 'basic',
        viralOptionsDefaultToCheckedFeatureFlag: {
          value: true,
          explanation: { kind: 'SIMPLE_EVAL' },
        },
      });
      await waitForFormToLoad();
      expect(
        triggerAnalyticsForExposedViralOptionsDefaultToChecked,
      ).toBeCalledTimes(0);
    });
  });
  describe('ViralSettings exposure event', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('check viralSettings exposure event is fired with creatableSelect', async () => {
      const { getByTestId } = renderInvitePeopleWithCreatableSelect({
        resourceAri,
      });
      await waitForElement(() => getByTestId('testId-invite-people-form'));
      expect(triggerAnalyticsForExposedViralSettings).toBeCalledTimes(1);
    });
    it('check viralSettings exposure event is fired with userpicker', async () => {
      const { getByTestId } = renderInviteWithUserPicker({
        resourceAri,
      });
      await waitForElement(() => getByTestId('testId-invite-people-form'));
      expect(triggerAnalyticsForExposedViralSettings).toBeCalledTimes(1);
    });
    it('check viralSettings exposure event is not fired (non-admin user)', async () => {
      const {
        getByTestId: defaultSelect,
      } = renderInvitePeopleWithDefaultSelect({
        resourceAri,
      });
      await waitForElement(() => defaultSelect('testId-invite-people-form'));
      const {
        getByTestId: defaultSelectBasicUser,
      } = renderInvitePeopleWithDefaultSelect({
        resourceAri,
        userRole: 'basic',
        viralSettingsCohort: ViralSettingsCohort.VARIATION,
      });
      await waitForElement(() =>
        defaultSelectBasicUser('testId-invite-people-form'),
      );
      expect(triggerAnalyticsForExposedViralSettings).toBeCalledTimes(0);
    });
    it('check viral settings is not visible by default', async () => {
      renderInvitePeopleWithCreatableSelect({
        resourceAri,
        userRole: 'basic',
      });
      await waitForFormToLoad();

      fireEvent.focus(
        screen
          .getByTestId('testId-invite-people-invitee-list')
          .querySelectorAll('.inviteeselect__input input')[0],
      );
      await nextTick();
      expect(defaultOpenInviteClient.getOpenInviteState).not.toHaveBeenCalled();
      expect(
        defaultInviteApiClient.getDirectAccessSetting,
      ).not.toHaveBeenCalled();
    });
  });
  describe('ViralSettings OpenInvite checkboxes', () => {
    beforeEach(() => {
      (defaultOpenInviteClient.getOpenInviteState as jest.Mock).mockResolvedValue(
        openInviteEnabledResponse,
      );
    });
    afterEach(() => {
      (defaultOpenInviteClient.getOpenInviteState as jest.Mock).mockReset();
      (defaultHaveISeenItClient.getFlag as jest.Mock).mockReset();
      jest.clearAllMocks();
    });
    it('focus on CreatableSelect and validate the open invite checkbox is visible', async () => {
      (defaultOpenInviteClient.getOpenInviteState as jest.Mock).mockResolvedValue(
        openInviteEnabledResponse,
      );
      const fireFocusEvent = () =>
        fireEvent.focus(
          screen
            .getByTestId('testId-invite-people-invitee-list')
            .querySelectorAll('.inviteeselect__input input')[0],
        );
      await checkOpenInviteDisplay(
        renderInvitePeopleWithCreatableSelect,
        fireFocusEvent,
      );
      expect(
        triggerAnalyticsForRenderUserInvitesCheckbox,
      ).toHaveBeenCalledTimes(1);
    });
    it('focus on UserPicker and validate the open invite checkbox is visible', async () => {
      (defaultOpenInviteClient.getOpenInviteState as jest.Mock).mockResolvedValue(
        openInviteEnabledResponse,
      );

      const fireFocusEvent = async () => {
        const userPicker = await getUserPicker();
        fireEvent.focus(userPicker);
      };
      await checkOpenInviteDisplay(renderInviteWithUserPicker, fireFocusEvent);
      expect(
        triggerAnalyticsForRenderUserInvitesCheckbox,
      ).toHaveBeenCalledTimes(1);
    });
    it('should not render direct access checkbox or open invite checkbox when multiple products are selected', async () => {
      const inviteCapabilitiesResponse = [
        {
          name: 'Jira Software',
          id: 'jira-software',
          ari:
            'ari:cloud:jira-software::site/0125594b-5d14-4f19-ba76-9c8840d22e99',
        },
        {
          name: 'Jira Service-Desk',
          id: 'jira-servicedesk',
          ari:
            'ari:cloud:jira-servicedesk::site/0125594b-5d14-4f19-ba76-9c8840d22e99',
        },
        {
          name: 'Confluence',
          id: 'confluence',
          ari:
            'ari:cloud:confluence::site/0125594b-5d14-4f19-ba76-9c8840d22e99',
        },
      ];
      (defaultOpenInviteClient.getOpenInviteState as jest.Mock).mockResolvedValue(
        openInviteEnabledResponse,
      );
      (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue(
        inviteCapabilitiesResponse,
      );
      (defaultInviteApiClient.getDirectAccessSetting as jest.Mock).mockResolvedValue(
        getDirectAccessSettingDefaultResponse,
      );
      renderInviteWithUserPicker({
        resourceAri,
      });
      act(async () => {
        await fillUserPicker('test@domain.com');
      });
      await waitForElement(() =>
        screen.getByTestId('testId-invite-people-viral-settings'),
      );
      expect(
        screen.getByTestId(
          'testId-invite-people-viral-settings-direct-access-domain.com--checkbox-label',
        ),
      ).toBeInTheDocument();
      expect(
        screen.queryByTestId(
          'testId-invite-people-viral-settings-open-invite--checkbox-label',
        ),
      ).toBeInTheDocument();
      await selectAllProducts();
      expect(
        screen.queryByTestId(
          'testId-invite-people-viral-settings-direct-access-domain.com--checkbox-label',
        ),
      ).toBeNull();
      expect(
        screen.queryByTestId(
          'testId-invite-people-viral-settings-open-invite--checkbox-label',
        ),
      ).toBeNull();
    });
    it('should not render checkboxes without focus', async () => {
      (defaultOpenInviteClient.getOpenInviteState as jest.Mock).mockResolvedValue(
        openInviteEnabledResponse,
      );

      (defaultInviteApiClient.getDirectAccessSetting as jest.Mock).mockResolvedValue(
        getDirectAccessSettingDefaultResponse,
      );
      const { queryByTestId } = renderInviteWithUserPicker({
        resourceAri,
      });
      expect(
        queryByTestId(
          'testId-invite-people-viral-settings-direct-access-domain.com--checkbox-label',
        ),
      ).toBeNull();
      expect(
        queryByTestId(
          'testId-invite-people-viral-settings-open-invite--checkbox-label',
        ),
      ).toBeNull();
      expect(
        triggerAnalyticsForRenderUserInvitesCheckbox,
      ).toHaveBeenCalledTimes(0);
      expect(
        triggerAnalyticsForClickedDirectAccessCheckbox,
      ).toHaveBeenCalledTimes(0);
    });
    describe('with viralOptionsDefaultToChecked', () => {
      it('focus on UserPicker and validate the open invite checkbox is checked when HISI returns not seen', async () => {
        (defaultOpenInviteClient.getOpenInviteState as jest.Mock).mockResolvedValue(
          openInviteEnabledResponse,
        );
        (defaultHaveISeenItClient.getFlag as jest.Mock).mockResolvedValue(
          getFlagDefaultResponse,
        );

        renderInviteWithUserPickerAndDefaultToChecked({
          resourceAri,
        });

        await waitForFormToLoad();
        const userPicker = await getUserPicker();
        fireEvent.focus(userPicker);

        const openInviteCheckbox = await waitForElement(() =>
          screen.getByTestId(
            'testId-invite-people-viral-settings-open-invite--hidden-checkbox',
          ),
        );
        expect(openInviteCheckbox.getAttribute('aria-checked')).toBe('true');
      });
      it('focus on UserPicker and validate the open invite checkbox is unchecked when HISI returns seen', async () => {
        (defaultOpenInviteClient.getOpenInviteState as jest.Mock).mockResolvedValue(
          openInviteEnabledResponse,
        );
        (defaultHaveISeenItClient.getFlag as jest.Mock).mockResolvedValue(
          getFlagHaveSeenResponse,
        );

        const { getByTestId } = renderInviteWithUserPickerAndDefaultToChecked({
          resourceAri,
        });

        await waitForFormToLoad();
        const userPicker = await getUserPicker();
        fireEvent.focus(userPicker);

        const openInviteCheckbox = await waitForElement(() =>
          getByTestId(
            'testId-invite-people-viral-settings-open-invite--hidden-checkbox',
          ),
        );
        expect(openInviteCheckbox.getAttribute('aria-checked')).toBe('false');
      });
    });
  });

  describe('ViralSettings DirectAccess checkbox', () => {
    describe('CreateableSelect', () => {
      const renderFn = renderInvitePeopleWithCreatableSelect;
      const fillUserForm = fillCreateableSelect;
      beforeEach(() => {
        (defaultOpenInviteClient.getOpenInviteState as jest.Mock).mockResolvedValue(
          openInviteEnabledResponse,
        );
      });
      afterEach(() => {
        (defaultOpenInviteClient.getOpenInviteState as jest.Mock).mockReset();
        (defaultInviteApiClient.getDirectAccessSetting as jest.Mock).mockReset();
        jest.clearAllMocks();
      });

      it('should render direct access checkbox when eligible domain has been entered', async () => {
        (defaultInviteApiClient.getDirectAccessSetting as jest.Mock).mockResolvedValue(
          getDirectAccessSettingDefaultResponse,
        );
        renderFn({
          resourceAri,
        });

        await fillUserForm('test@domain.com');

        expect(
          await waitForElement(() =>
            screen.getByTestId('testId-invite-people-viral-settings'),
          ),
        ).toBeInTheDocument();
        expect(
          screen.getByTestId(
            'testId-invite-people-viral-settings-direct-access-domain.com--checkbox-label',
          ),
        ).toBeInTheDocument();
        expect(
          triggerAnalyticsForRenderDirectAccessCheckbox,
        ).toHaveBeenCalledTimes(1);
        expect(
          triggerAnalyticsForRenderDirectAccessCheckbox,
        ).toHaveBeenCalledWith(
          { domain: 'domain.com', container: 'DEFAULT', value: false },
          expect.any(Function),
        );
      });

      it('should not render direct access checkbox when domain is not eligible', async () => {
        (defaultInviteApiClient.getDirectAccessSetting as jest.Mock).mockResolvedValue(
          getDirectAccessSettingPromotionFalse,
        );
        renderFn({
          resourceAri,
        });
        act(() => {
          fillUserForm('test@domain.com');
        });
        await waitForElement(() =>
          screen.getByTestId('testId-invite-people-viral-settings'),
        );
        expect(
          triggerAnalyticsForRenderDirectAccessCheckbox,
        ).toHaveBeenCalledTimes(0);
        expect(
          screen.queryByTestId(
            'testId-invite-people-viral-settings-direct-access-domain.com--checkbox-label',
          ),
        ).toBeNull();
      });

      it('should not render direct access checkbox when domain eligibility cannot be retrieved', async () => {
        (defaultInviteApiClient.getDirectAccessSetting as jest.Mock).mockResolvedValue(
          {
            errorMessage: `generic test error`,
            responseCode: 409,
          },
        );
        renderFn({
          resourceAri,
        });
        await fillUserForm('test@domain.com');
        await waitForElement(() =>
          screen.getByTestId('testId-invite-people-viral-settings'),
        );
        expect(
          screen.queryByTestId(
            'testId-invite-people-viral-settings-direct-access-domain.com--checkbox-label',
          ),
        ).toBeNull();
      });
    });
    describe('User picker', () => {
      const renderFn = renderInviteWithUserPicker;
      const fillUserForm = fillUserPicker;
      beforeEach(() => {
        (defaultOpenInviteClient.getOpenInviteState as jest.Mock).mockResolvedValue(
          openInviteEnabledResponse,
        );
      });
      afterEach(() => {
        (defaultOpenInviteClient.getOpenInviteState as jest.Mock).mockReset();
        (defaultInviteApiClient.getDirectAccessSetting as jest.Mock).mockReset();
        (defaultHaveISeenItClient.getFlag as jest.Mock).mockReset();
      });

      it('should render direct access checkbox when eligible domain has been entered', async () => {
        (defaultInviteApiClient.getDirectAccessSetting as jest.Mock).mockResolvedValue(
          getDirectAccessSettingDefaultResponse,
        );
        renderFn({
          resourceAri,
        });
        await fillUserForm('test@domain.com');

        expect(
          await waitForElement(() =>
            screen.getByTestId('testId-invite-people-viral-settings'),
          ),
        ).toBeInTheDocument();
        expect(
          screen.getByTestId(
            'testId-invite-people-viral-settings-direct-access-domain.com--checkbox-label',
          ),
        ).toBeInTheDocument();
      });

      it('should not render direct access checkbox when domain is not eligible', async () => {
        (defaultInviteApiClient.getDirectAccessSetting as jest.Mock).mockResolvedValue(
          getDirectAccessSettingPromotionFalse,
        );
        renderFn({
          resourceAri,
        });
        await fillUserForm('test@domain.com');
        await waitForElement(() =>
          screen.getByTestId('testId-invite-people-viral-settings'),
        ),
          expect(
            screen.queryByTestId(
              'testId-invite-people-viral-settings-direct-access-domain.com--checkbox-label',
            ),
          ).toBeNull();
      });

      it('should not render direct access checkbox when domain eligibility cannot be retrieved', async () => {
        (defaultInviteApiClient.getDirectAccessSetting as jest.Mock).mockResolvedValue(
          {
            errorMessage: `generic test error`,
            responseCode: 409,
          },
        );
        renderFn({
          resourceAri,
        });
        await fillUserForm('test@domain.com');
        await waitForElement(() =>
          screen.getByTestId('testId-invite-people-viral-settings'),
        );
        expect(
          screen.queryByTestId(
            'testId-invite-people-viral-settings-direct-access-domain.com--checkbox-label',
          ),
        ).toBeNull();
      });
      describe('with viralOptionsDefaultToChecked', () => {
        const renderFn = renderInviteWithUserPickerAndDefaultToChecked;

        it('should render the direct access checkbox checked when eligible domain has been entered and HISI returns not seen', async () => {
          (defaultInviteApiClient.getDirectAccessSetting as jest.Mock).mockResolvedValue(
            getDirectAccessSettingDefaultResponse,
          );
          (defaultHaveISeenItClient.getFlag as jest.Mock).mockResolvedValue(
            getFlagDefaultResponse,
          );
          renderFn({
            resourceAri,
          });
          await fillUserForm('test@domain.com');

          await waitForElement(() =>
            screen.getByTestId('testId-invite-people-viral-settings'),
          );

          const directAccessCheckbox = await waitForElement(() =>
            screen.getByTestId(
              'testId-invite-people-viral-settings-direct-access-domain.com--hidden-checkbox',
            ),
          );
          expect(directAccessCheckbox.getAttribute('aria-checked')).toBe(
            'true',
          );
        });
        it('should render the direct access checkbox unchecked when eligible domain has been entered and HISI returns seen', async () => {
          (defaultInviteApiClient.getDirectAccessSetting as jest.Mock).mockResolvedValue(
            getDirectAccessSettingDefaultResponse,
          );
          (defaultHaveISeenItClient.getFlag as jest.Mock).mockResolvedValue(
            getFlagHaveSeenResponse,
          );
          renderFn({
            resourceAri,
          });
          await fillUserForm('test@domain.com');

          await waitForElement(() =>
            screen.getByTestId('testId-invite-people-viral-settings'),
          );

          const directAccessCheckbox = await waitForElement(() =>
            screen.getByTestId(
              'testId-invite-people-viral-settings-direct-access-domain.com--hidden-checkbox',
            ),
          );

          expect(directAccessCheckbox.getAttribute('aria-checked')).toBe(
            'false',
          );
        });
      });
    });
  });
  describe('Viral Settings onSubmit', () => {
    afterEach(() => {
      (defaultOpenInviteClient.getOpenInviteState as jest.Mock).mockReset();
      (defaultInviteApiClient.getDirectAccessSetting as jest.Mock).mockReset();
      (defaultInviteApiClient.updateDirectAccessSettings as jest.Mock).mockReset();
      (defaultOpenInviteClient.enableOpenInvite as jest.Mock).mockReset();
      (defaultHaveISeenItClient.getFlag as jest.Mock).mockReset();
      (defaultHaveISeenItClient.postFlag as jest.Mock).mockReset();
    });
    it('should update OpenInvite and Domain Access when the checkboxes have been entered', async () => {
      (defaultInviteApiClient.updateDirectAccessSettings as jest.Mock).mockResolvedValue(
        {
          success: true,
          updateDirectAccessSettings: true,
        },
      );
      (defaultOpenInviteClient.enableOpenInvite as jest.Mock).mockResolvedValue(
        {
          success: true,
          enableOpenInvite: true,
        },
      );
      renderInvitePeopleWithCreatableSelect({
        resourceAri,
      });
      await waitForFormToLoad();

      const fireFocusEvent = () =>
        fireEvent.focus(
          screen
            .getByTestId('testId-invite-people-invitee-list')
            .querySelectorAll('.inviteeselect__input input')[0],
        );
      fireFocusEvent();
      await fillCreateableSelect('test@domain.com');
      await nextTick();
      await checkCheckbox(
        'testId-invite-people-viral-settings-open-invite--hidden-checkbox',
      );
      await checkCheckbox(
        'testId-invite-people-viral-settings-direct-access-domain.com--hidden-checkbox',
      );
      expect(
        triggerAnalyticsForClickedUserInvitesCheckbox,
      ).toHaveBeenCalledTimes(1);
      expect(
        triggerAnalyticsForClickedDirectAccessCheckbox,
      ).toHaveBeenCalledTimes(1);
      await nextTick();
      await submitForm(true);

      expect(
        defaultInviteApiClient.updateDirectAccessSettings,
      ).toHaveBeenCalledTimes(1);
      expect(defaultOpenInviteClient.enableOpenInvite).toHaveBeenCalledTimes(1);
      expect(
        triggerAnalyticsForUserInviteSettingsSuccess,
      ).toHaveBeenCalledTimes(1);
      expect(
        triggerAnalyticsForApprovedDomainsSettingsSuccess,
      ).toHaveBeenCalledTimes(1);
    });
    it('should not update OpenInvite or Domain Access when the checkboxes have not been entered', async () => {
      renderInvitePeopleWithCreatableSelect({
        resourceAri,
      });
      await waitForFormToLoad();

      const fireFocusEvent = () =>
        fireEvent.focus(
          screen
            .getByTestId('testId-invite-people-invitee-list')
            .querySelectorAll('.inviteeselect__input input')[0],
        );
      fireFocusEvent();
      await fillCreateableSelect('test@domain.com');
      await nextTick();
      await submitForm(true);
      expect(
        defaultInviteApiClient.updateDirectAccessSettings,
      ).toHaveBeenCalledTimes(0);
      expect(defaultOpenInviteClient.enableOpenInvite).toHaveBeenCalledTimes(0);
    });
    describe('with viralOptionsDefaultToChecked', () => {
      it('should post HISI flag when OpenInvite or Domain Access checkbox is unchecked on submit', async () => {
        (defaultHaveISeenItClient.getFlag as jest.Mock).mockResolvedValue(
          getFlagDefaultResponse,
        );
        (defaultHaveISeenItClient.postFlag as jest.Mock).mockResolvedValue('');
        const domain = 'domain.com';
        await uncheckViralSettingsCheckboxesAndSubmit(resourceAri, domain);

        expect(defaultHaveISeenItClient.postFlag).toHaveBeenCalledWith(
          `${cloudId}-confluence-viral-options-default-to-checked-open-invite`,
        );
        expect(defaultHaveISeenItClient.postFlag).toHaveBeenCalledWith(
          `${cloudId}-confluence-viral-options-default-to-checked-domain-${domain}`,
        );
        expect(triggerAnalyticsForHISIFlagCreated).toHaveBeenCalledTimes(2);
      });
      it('should trigger correct analytics event if HISI postFlag call fails', async () => {
        (defaultHaveISeenItClient.getFlag as jest.Mock).mockResolvedValue(
          getFlagDefaultResponse,
        );
        (defaultHaveISeenItClient.postFlag as jest.Mock).mockRejectedValue(
          new Error('Error while fetching flag'),
        );
        await uncheckViralSettingsCheckboxesAndSubmit(
          resourceAri,
          'domain.com',
        );

        expect(triggerAnalyticsForHISIFlagCreateFailed).toHaveBeenCalledTimes(
          2,
        );
      });

      it('should not post HISI flag when OpenInvite or Domain Access checkbox is checked on submit', async () => {
        (defaultHaveISeenItClient.getFlag as jest.Mock).mockResolvedValue({
          status: false,
        });
        renderInviteWithUserPickerAndDefaultToChecked({
          resourceAri,
        });
        await waitForFormToLoad();

        await fillUserPicker('test@domain.com');
        await nextTick();
        await submitForm(true);

        expect(defaultHaveISeenItClient.postFlag).toHaveBeenCalledTimes(0);
        expect(triggerAnalyticsForHISIFlagCreated).toHaveBeenCalledTimes(0);
      });
      it('should not post a HISI flag or trigger analytics when when viral settings checkboxes are not visible', async () => {
        const inviteCapabilitiesResponse = [
          {
            name: 'Jira Software',
            id: 'jira-software',
            ari:
              'ari:cloud:jira-software::site/0125594b-5d14-4f19-ba76-9c8840d22e99',
          },
          {
            name: 'Jira Service-Desk',
            id: 'jira-servicedesk',
            ari:
              'ari:cloud:jira-servicedesk::site/0125594b-5d14-4f19-ba76-9c8840d22e99',
          },
          {
            name: 'Confluence',
            id: 'confluence',
            ari:
              'ari:cloud:confluence::site/0125594b-5d14-4f19-ba76-9c8840d22e99',
          },
        ];
        (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue(
          inviteCapabilitiesResponse,
        );
        (defaultOpenInviteClient.getOpenInviteState as jest.Mock).mockResolvedValue(
          openInviteEnabledResponse,
        );
        (defaultInviteApiClient.getDirectAccessSetting as jest.Mock).mockResolvedValue(
          getDirectAccessSettingDefaultResponse,
        );

        renderInviteWithUserPickerAndDefaultToChecked({
          resourceAri,
        });
        await fillUserPicker('test@domain.com');
        await selectAllProducts();
        await nextTick();

        await submitForm(true);

        expect(defaultHaveISeenItClient.postFlag).toHaveBeenCalledTimes(0);
        expect(triggerAnalyticsForHISIFlagCreated).toHaveBeenCalledTimes(0);
        expect(triggerAnalyticsForHISIFlagCreateFailed).toHaveBeenCalledTimes(
          0,
        );
      });
    });
  });
});
describe('useViralSettings Hook', () => {
  beforeEach(() => {
    (defaultInviteApiClient.getDirectAccessSetting as jest.Mock).mockResolvedValue(
      getDirectAccessSettingDefaultResponse,
    );
    (defaultOpenInviteClient.getOpenInviteState as jest.Mock).mockResolvedValue(
      openInviteEnabledResponse,
    );
  });
  afterEach(() => {
    (defaultHaveISeenItClient.postFlag as jest.Mock).mockReset();
    (defaultHaveISeenItClient.getFlag as jest.Mock).mockReset();
    jest.clearAllMocks();
  });
  const defaultUseViralSettingsValues = {
    domains: ['domain.com'],
    createAnalyticsEvent: undefined,
    cloudId: 'cloudId',
    productId: 'jira',
    products: ['jira'],
    viralSettingsCohort: 'variation',
    role: 'admin',
    focusedSelect: true,
    selectEnabled: true,
    viralOptionsDefaultToCheckedFeatureFlagEnabled: false,
  };
  const renderViralSettingsHook = (values: ViralSettingsHookProps) =>
    renderHook(() => useViralSettings(values));
  it('should return showViralSettings as true when experiment conditions are met', () => {
    const { result } = renderViralSettingsHook(defaultUseViralSettingsValues);
    expect(result.current.showViralSettings).toBe(true);
  });
  it('should return showViralSettings as false when experiment conditions are not met', () => {
    const { result: noFocusedSelect } = renderViralSettingsHook({
      ...defaultUseViralSettingsValues,
      focusedSelect: false,
    });
    const { result: notVariationGroup } = renderViralSettingsHook({
      ...defaultUseViralSettingsValues,
      viralSettingsCohort: 'control',
    });
    const { result: selectNotEnabled } = renderViralSettingsHook({
      ...defaultUseViralSettingsValues,
      selectEnabled: false,
    });
    const { result: nonAdminUser } = renderViralSettingsHook({
      ...defaultUseViralSettingsValues,
      role: 'basic',
    });
    const { result: tooManyProductsSelected } = renderViralSettingsHook({
      ...defaultUseViralSettingsValues,
      products: ['jira', 'confluence'],
    });
    expect(noFocusedSelect.current.showViralSettings).toBe(false);
    expect(notVariationGroup.current.showViralSettings).toBe(false);
    expect(selectNotEnabled.current.showViralSettings).toBe(false);
    expect(nonAdminUser.current.showViralSettings).toBe(false);
    expect(tooManyProductsSelected.current.showViralSettings).toBe(false);
  });
  it('should fetch domain information when a domain is passed through', async () => {
    (defaultOpenInviteClient.getOpenInviteState as jest.Mock).mockResolvedValue(
      openInviteEnabledResponse,
    );
    const { result, waitForNextUpdate } = renderViralSettingsHook({
      ...defaultUseViralSettingsValues,
    });
    act(() => {
      expect(result.current.showViralSettings).toBe(true);
      waitForNextUpdate();
    });
    await nextTick();
    expect(result.current.showOpenInvite).toBe(true);
    expect(result.current.viralSettingsByDomain).toStrictEqual({
      'domain.com': {
        isChecked: false,
        desPromotionEligible: true,
      },
    });
  });

  it('should have showOpenInvite and viralSettingsByDomain enabled when HISI flag has not been created', async () => {
    (defaultOpenInviteClient.getOpenInviteState as jest.Mock).mockResolvedValue(
      openInviteEnabledResponse,
    );
    (defaultHaveISeenItClient.getFlag as jest.Mock).mockResolvedValue(
      getFlagDefaultResponse,
    );
    const { result, waitForNextUpdate } = renderViralSettingsHook({
      ...defaultUseViralSettingsValues,
      viralOptionsDefaultToCheckedFeatureFlagEnabled: true,
    });
    act(() => {
      expect(result.current.showViralSettings).toBe(true);
      waitForNextUpdate();
    });
    await nextTick();
    expect(result.current.showOpenInvite).toBe(true);
    expect(result.current.enableOpenInvite).toBe(true);
    expect(result.current.viralSettingsByDomain).toStrictEqual({
      'domain.com': {
        isChecked: true,
        desPromotionEligible: true,
      },
    });
    expect(triggerAnalyticsForHISIFlagFetched).toHaveBeenCalledWith(
      {
        cloudId: 'cloudId',
        flagKey: 'cloudId-jira-viral-options-default-to-checked-open-invite',
        product: 'jira',
        value: false,
      },
      expect.any(Function),
    );
    expect(triggerAnalyticsForHISIFlagFetched).toHaveBeenCalledWith(
      {
        cloudId: 'cloudId',
        domain: 'domain.com',
        flagKey:
          'cloudId-jira-viral-options-default-to-checked-domain-domain.com',
        product: 'jira',
        value: false,
      },
      expect.any(Function),
    );
  });
  it('should have showOpenInvite and viralSettingsByDomain disabled when HISI flag has been created', async () => {
    (defaultOpenInviteClient.getOpenInviteState as jest.Mock).mockResolvedValue(
      openInviteEnabledResponse,
    );
    (defaultHaveISeenItClient.getFlag as jest.Mock).mockResolvedValue(
      getFlagHaveSeenResponse,
    );

    const { result, waitForNextUpdate } = renderViralSettingsHook({
      ...defaultUseViralSettingsValues,
      viralOptionsDefaultToCheckedFeatureFlagEnabled: true,
    });
    act(() => {
      expect(result.current.showViralSettings).toBe(true);
      waitForNextUpdate();
    });
    await nextTick();
    expect(result.current.showOpenInvite).toBe(true);
    expect(result.current.enableOpenInvite).toBe(false);
    expect(result.current.viralSettingsByDomain).toStrictEqual({
      'domain.com': {
        isChecked: false,
        desPromotionEligible: true,
      },
    });
    expect(triggerAnalyticsForHISIFlagFetched).toHaveBeenCalledWith(
      {
        cloudId: 'cloudId',
        flagKey: 'cloudId-jira-viral-options-default-to-checked-open-invite',
        product: 'jira',
        value: true,
      },
      expect.any(Function),
    );
    expect(triggerAnalyticsForHISIFlagFetched).toHaveBeenCalledWith(
      {
        cloudId: 'cloudId',
        domain: 'domain.com',
        flagKey:
          'cloudId-jira-viral-options-default-to-checked-domain-domain.com',
        product: 'jira',
        value: true,
      },
      expect.any(Function),
    );
  });
  it('should have showOpenInvite and viralSettingsByDomain enabled when HISI getFlag call fails', async () => {
    (defaultOpenInviteClient.getOpenInviteState as jest.Mock).mockResolvedValue(
      openInviteEnabledResponse,
    );
    (defaultHaveISeenItClient.getFlag as jest.Mock).mockRejectedValue(
      new Error('Error while fetching flag'),
    );

    const { result, waitForNextUpdate } = renderViralSettingsHook({
      ...defaultUseViralSettingsValues,
      viralOptionsDefaultToCheckedFeatureFlagEnabled: true,
    });
    act(() => {
      expect(result.current.showViralSettings).toBe(true);
      waitForNextUpdate();
    });
    await nextTick();
    expect(result.current.showOpenInvite).toBe(true);
    expect(result.current.enableOpenInvite).toBe(true);
    expect(result.current.viralSettingsByDomain).toStrictEqual({
      'domain.com': {
        isChecked: true,
        desPromotionEligible: true,
      },
    });
    expect(triggerAnalyticsForHISIFlagFetchFailed).toHaveBeenCalledTimes(2);
  });
});
