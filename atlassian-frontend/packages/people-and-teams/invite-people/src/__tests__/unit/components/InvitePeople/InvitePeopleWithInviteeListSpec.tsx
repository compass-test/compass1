/**
 * This file tests only some functionality of the InviteeList - in that it's "sending"
 * emails to the correct set of addresses, in the presence and absence of Product Select.
 * This file does _not_ exhaustively test the component itself.
 *
 * The component itself should have a comprehensive test suite that deals with form validation.
 */
import { fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import {
  defaultPermsApiClient,
  defaultInviteApiClient,
} from '../../../../clients';
import { InvitePeopleProps } from '../../../..';
import {
  renderInvitePeople,
  waitForFormToLoad,
  mockSiteUrl,
  cloudId,
  submitForm,
} from './_helpers';

import {
  triggerAnalyticsForSucceededInviteRequest,
  triggerAnalyticsForUserInvited,
} from '../../../../components/analytics';

jest.mock('../../../../components/analytics', () => {
  return {
    ...jest.requireActual<Object>('../../../../components/analytics'),
    triggerAnalyticsForSucceededInviteRequest: jest.fn(),
    triggerAnalyticsForUserInvited: jest.fn(),
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

const fillForm = (numEmails: number, emailAddrs?: string) => {
  // Generate N emails of the form test--$i@atl.fake, and append any passed in address as well.
  let addrs = Array.from(
    { length: numEmails },
    (_, i) => `test--${i + 1}@atl.fake`,
  ).join(', ');
  if (emailAddrs && emailAddrs.length) {
    addrs += ',' + addrs;
  }

  const inviteeList = screen
    .getByTestId('testId-invite-people-invitee-list')
    .querySelectorAll('.inviteeselect__input input')[0];
  fireEvent.focus(inviteeList);
  fireEvent.change(inviteeList, {
    target: { value: addrs },
  });
  fireEvent.blur(inviteeList);
};

const fillAndSubmitForm = async (
  waitForSubmit: boolean,
  numEmails: number,
  emailAddrs?: string,
) => {
  fillForm(numEmails, emailAddrs);
  await submitForm(waitForSubmit);
};

const clearForm = () => {
  const inviteeList = screen
    .getByTestId('testId-invite-people-invitee-list')
    .querySelectorAll('.inviteeselect__input input')[0];
  fireEvent.focus(inviteeList);
  fireEvent.change(inviteeList, {
    target: { value: [] },
  });
  fireEvent.blur(inviteeList);
};

const defaultProps: Partial<InvitePeopleProps> = {
  enableInviteeList: true,
};

describe('Invitee List Form Submit', () => {
  beforeEach(() => {
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

  it('invite to confluence, no product select', async () => {
    const ari = `ari:cloud:confluence::site/${cloudId}`;
    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue([
      {
        name: 'Confluence',
        id: 'confluence',
        ari: ari,
      },
    ]);

    renderInvitePeople({
      ...defaultProps,
      resourceAri: ari,
    });
    await waitForFormToLoad();

    await fillAndSubmitForm(true, 5);

    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledTimes(1);
    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledWith({
      users: expect.any(Array),
      // Need to append /wiki to the mockSiteUrl because we're explicitly setting the product to Confluence.
      continueUrl: expect.stringContaining(`${mockSiteUrl}/wiki?atlOrigin=`),
      resources: [ari],
      suppressInviteEmail: expect.any(Boolean),
    });
    expect(triggerAnalyticsForUserInvited).toHaveBeenCalledTimes(1);
    expect(triggerAnalyticsForSucceededInviteRequest).toHaveBeenCalledTimes(1);
  });

  it('invite to confluence, with product select', async () => {
    const ari = `ari:cloud:confluence::site/${cloudId}`;
    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue([
      {
        name: 'Confluence',
        id: 'confluence',
        ari: ari,
      },
    ]);

    renderInvitePeople({
      ...defaultProps,
      resourceAri: ari,
    });

    await waitForFormToLoad();

    await fillAndSubmitForm(true, 3);

    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledTimes(1);
    expect(defaultInviteApiClient.inviteUsers).toHaveBeenCalledWith({
      users: expect.any(Array),
      // Need to append /wiki to the mockSiteUrl because we're explicitly setting the product to Confluence.
      continueUrl: expect.stringContaining(`${mockSiteUrl}/wiki?atlOrigin=`),
      resources: [ari],
      suppressInviteEmail: expect.any(Boolean),
    });
    expect(triggerAnalyticsForUserInvited).toHaveBeenCalledTimes(1);
    expect(triggerAnalyticsForSucceededInviteRequest).toHaveBeenCalledTimes(1);
  });

  it('should not actually invite due to validation failure - invalid email address', async () => {
    const ari = `ari:cloud:confluence::site/${cloudId}`;
    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue([
      {
        name: 'Confluence',
        id: 'confluence',
        ari: ari,
      },
    ]);

    renderInvitePeople({
      ...defaultProps,
      resourceAri: ari,
    });
    await waitForFormToLoad();

    await fillAndSubmitForm(false, 0, 'malformed@email-addr!');

    expect(defaultInviteApiClient.inviteUsers).not.toHaveBeenCalled();
    expect(triggerAnalyticsForUserInvited).not.toHaveBeenCalled();
    expect(triggerAnalyticsForSucceededInviteRequest).not.toHaveBeenCalled();
  });

  it('should not actually invite due to validation failure - too many emails', async () => {
    const ari = `ari:cloud:confluence::site/${cloudId}`;
    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue([
      {
        name: 'Confluence',
        id: 'confluence',
        ari: ari,
      },
    ]);

    renderInvitePeople({
      ...defaultProps,
      resourceAri: ari,
    });
    await waitForFormToLoad();

    await fillAndSubmitForm(false, 12);

    expect(defaultInviteApiClient.inviteUsers).not.toHaveBeenCalled();
    expect(triggerAnalyticsForUserInvited).not.toHaveBeenCalled();
    expect(triggerAnalyticsForSucceededInviteRequest).not.toHaveBeenCalled();
  });

  it('should not invite when there are no emails', async () => {
    const ari = `ari:cloud:confluence::site/${cloudId}`;
    (defaultInviteApiClient.inviteCapabilities as jest.Mock).mockResolvedValue([
      {
        name: 'Confluence',
        id: 'confluence',
        ari: ari,
      },
    ]);

    renderInvitePeople({
      ...defaultProps,
      resourceAri: ari,
    });
    await waitForFormToLoad();

    await submitForm();
    fillForm(12);
    clearForm();
    await submitForm();

    expect(defaultInviteApiClient.inviteUsers).not.toHaveBeenCalled();
    expect(triggerAnalyticsForUserInvited).not.toHaveBeenCalled();
    expect(triggerAnalyticsForSucceededInviteRequest).not.toHaveBeenCalled();
  });
});
