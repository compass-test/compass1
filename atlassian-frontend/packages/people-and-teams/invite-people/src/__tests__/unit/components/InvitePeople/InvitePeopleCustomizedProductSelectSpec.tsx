import { fireEvent, waitForElement } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { defaultInviteApiClient } from '../../../../clients';
import { triggerAnalyticsForOpenProductSelectDropdown } from '../../../../components/analytics';
import { messages } from '../../../../components/i18n/messages';
import {
  renderInvitePeople,
  cloudId,
  waitForFormToLoad,
  fillAndSubmitForm,
} from './_helpers';

jest.mock('../../../../components/analytics', () => {
  return {
    ...jest.requireActual<Object>('../../../../components/analytics'),
    triggerAnalyticsForOpenProductSelectDropdown: jest.fn(),
  };
});

const mockEvent: any = {
  context: [],
  update: jest.fn(() => mockEvent),
  fire: jest.fn(() => mockEvent),
  clone: jest.fn(() => mockEvent),
};

const inviteCapabilitiesResponse = [
  {
    name: 'Jira Software',
    id: 'jira-software',
    ari: 'ari:cloud:jira-software::site/0125594b-5d14-4f19-ba76-9c8840d22e99',
  },
  {
    name: 'Jira Service Management',
    id: 'jira-servicedesk',
    ari:
      'ari:cloud:jira-servicedesk::site/0125594b-5d14-4f19-ba76-9c8840d22e99',
  },
  {
    name: 'Jira Work Management',
    id: 'jira-core',
    ari: 'ari:cloud:jira-core::site/0125594b-5d14-4f19-ba76-9c8840d22e99',
  },
  {
    name: 'Confluence',
    id: 'confluence',
    ari: 'ari:cloud:confluence::site/0125594b-5d14-4f19-ba76-9c8840d22e99',
  },
];

const productOptions = inviteCapabilitiesResponse.map(({ name, id }) => ({
  label: name,
  value: id,
}));

const selectProductsLabel = messages.selectProducts.defaultMessage;

const openMenu = (input: HTMLElement) => {
  fireEvent.focus(input);
  fireEvent.keyDown(input, {
    key: 'ArrowDown',
    keyCode: 40,
    code: 40,
  });
};

const resourceAri = (productId: string) =>
  `ari:cloud:${productId}::site/${cloudId}`;

const defaultProps = {
  resourceAri: resourceAri('confluence'),
  enableCustomizedProductSelect: true,
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

describe('Customized Product Selector in Invite People', () => {
  beforeEach(() => {
    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue(
      inviteCapabilitiesResponse,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('InvitePeople analytics', () => {
    it('should trigger analytics event with the correct attributes when user open the product select menu', async () => {
      renderInvitePeople({
        ...defaultProps,
        userRole: 'trusted',
      });

      await waitForFormToLoad();

      openMenu(screen.getByLabelText(selectProductsLabel));

      expect(triggerAnalyticsForOpenProductSelectDropdown).toHaveBeenCalled();
      expect(triggerAnalyticsForOpenProductSelectDropdown).toHaveBeenCalledWith(
        {
          userRole: 'trusted',
          productOptions: [
            'jira-software',
            'jira-servicedesk',
            'jira-core',
            'confluence',
          ],
          selectedProducts: ['confluence'],
          source: 'peopleMenu',
        },
        expect.any(Function),
      );
    });

    it('should only invite to confluence when confluence is only product option selected', async () => {
      renderInvitePeople({
        ...defaultProps,
        userRole: 'admin',
      });

      await waitForFormToLoad();
      await fillAndSubmitForm();

      expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledTimes(1);
      expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledWith({
        users: expect.any(Array),
        continueUrl: expect.stringContaining(
          'https://hello.atlassian.net/wiki?atlOrigin=',
        ),
        resources: [
          'ari:cloud:confluence::site/0125594b-5d14-4f19-ba76-9c8840d22e99',
        ],
        suppressInviteEmail: expect.any(Boolean),
      });
    });

    it('should only invite to jira software even though jira core is selected', async () => {
      renderInvitePeople({
        ...defaultProps,
        userRole: 'admin',
        resourceAri: resourceAri('jira'),
        subProduct: 'software',
      });

      await waitForFormToLoad();
      await fillAndSubmitForm();

      expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledTimes(1);
      expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledWith({
        users: expect.any(Array),
        continueUrl: expect.stringContaining(
          'https://hello.atlassian.net?atlOrigin=',
        ),
        resources: [
          'ari:cloud:jira-software::site/0125594b-5d14-4f19-ba76-9c8840d22e99',
        ],
        suppressInviteEmail: expect.any(Boolean),
      });
    });

    it('should invite to jira core when jira core is the only product option selected', async () => {
      (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue(
        [
          {
            name: 'Jira Work Management',
            id: 'jira-core',
            ari:
              'ari:cloud:jira-core::site/0125594b-5d14-4f19-ba76-9c8840d22e99',
          },
          {
            name: 'Confluence',
            id: 'confluence',
            ari:
              'ari:cloud:confluence::site/0125594b-5d14-4f19-ba76-9c8840d22e99',
          },
        ],
      );

      renderInvitePeople({
        ...defaultProps,
        userRole: 'admin',
        resourceAri: resourceAri('jira'),
        subProduct: 'core',
      });

      await waitForFormToLoad();
      await fillAndSubmitForm();

      expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledTimes(1);
      expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledWith({
        users: expect.any(Array),
        continueUrl: expect.stringContaining(
          'https://hello.atlassian.net?atlOrigin=',
        ),
        resources: [
          'ari:cloud:jira-core::site/0125594b-5d14-4f19-ba76-9c8840d22e99',
        ],
        suppressInviteEmail: expect.any(Boolean),
      });
    });
  });

  describe('Product Selector', () => {
    it('should not be rendered when user is basic', async () => {
      renderInvitePeople({
        ...defaultProps,
        userRole: 'basic',
      });

      await waitForFormToLoad();

      expect(
        screen.queryByLabelText(selectProductsLabel),
      ).not.toBeInTheDocument();
    });

    it('should be rendered when user is not basic', async () => {
      renderInvitePeople({
        ...defaultProps,
        userRole: 'admin',
      });

      await waitForFormToLoad();

      expect(screen.queryByLabelText(selectProductsLabel)).toBeInTheDocument();
    });

    describe.each([
      ['Invite Capabilities API', undefined],
      ['productOptions prop', productOptions],
    ])('Product Options fetched from %s', (label, productOptions) => {
      it('should have all available options', async () => {
        renderInvitePeople({
          ...defaultProps,
          userRole: 'admin',
          productOptions,
        });

        await waitForFormToLoad();

        openMenu(screen.getByLabelText(selectProductsLabel));

        const selectMenu = await waitForElement(() =>
          screen
            .getByTestId('test-id-invite-people-select-product-customized')
            .querySelector('.select__menu'),
        );

        expect(selectMenu).toHaveTextContent(/Confluence/);
        expect(selectMenu).toHaveTextContent(/Jira Software/);
        expect(selectMenu).toHaveTextContent(/Jira Work Management/);
        expect(selectMenu).toHaveTextContent(/Jira Service Management/);
      });

      it('should preselect Confluence when productId is confluence', async () => {
        renderInvitePeople({
          ...defaultProps,
          userRole: 'admin',
          resourceAri: resourceAri('confluence'),
          productOptions,
        });

        await waitForFormToLoad();

        const control = await waitForElement(() =>
          screen
            .getByTestId('test-id-invite-people-select-product-customized')
            .querySelector('.select__control'),
        );

        expect(control).toHaveTextContent(/Confluence/);
        expect(control).not.toHaveTextContent(/Jira Software/);
      });

      it('should preselect Jira Software and Jira Work Management when product is jira software', async () => {
        renderInvitePeople({
          ...defaultProps,
          userRole: 'admin',
          resourceAri: resourceAri('jira'),
          subProduct: 'software',
          productOptions,
        });
        await waitForFormToLoad();

        const control = await waitForElement(() =>
          screen
            .getByTestId('test-id-invite-people-select-product-customized')
            .querySelector('.select__control'),
        );

        expect(control).toHaveTextContent(/Jira Software/);
        expect(control).toHaveTextContent(/Jira Work Management/);
        expect(control).not.toHaveTextContent(/Jira Service Management/);
        expect(control).not.toHaveTextContent(/Confluence/);
      });

      it('should preselect Jira Work Management when product is JWM', async () => {
        renderInvitePeople({
          ...defaultProps,
          userRole: 'admin',
          resourceAri: resourceAri('jira'),
          subProduct: 'core',
          productOptions,
        });
        await waitForFormToLoad();

        const control = await waitForElement(() =>
          screen
            .getByTestId('test-id-invite-people-select-product-customized')
            .querySelector('.select__control'),
        );

        expect(control).not.toHaveTextContent(/Jira Software/);
        expect(control).not.toHaveTextContent(/Jira Service Management/);
        expect(control).toHaveTextContent(/Jira Work Management/);
      });
    });
  });
});
