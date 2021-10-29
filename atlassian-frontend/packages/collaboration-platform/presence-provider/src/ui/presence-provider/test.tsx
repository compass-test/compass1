import React from 'react';

import { render } from '@testing-library/react';

import { PresenceParticipant } from '../../types';

import { PresenceProvider } from './index';

const mockName = 'Homer Simpson';
const mocksessionId = 'mock-session-id';

const mockGetUser = (): Promise<PresenceParticipant> =>
  Promise.resolve({
    sessionId: mocksessionId,
    avatar: '',
    name: mockName,
  });

jest.mock('../../controllers/event-manager', () => {
  const useEventManager = () => ({
    participants: [{ name: mockName }],
  });
  return { useEventManager };
});

jest.mock('../../controllers/provider', () => {
  const usePresenceProvider = () => ({ getMySessionId: () => mocksessionId });
  return { usePresenceProvider };
});

describe('PresenceProvider', () => {
  it('should render children with participants as React "render prop', () => {
    const { getByTestId } = render(
      <PresenceProvider
        spaceKey="mock-spaceKey"
        presenceServerUrl="mock-presenceServerUrl"
        getUser={mockGetUser}
        initialData={{ accountId: 'mock-account-id' }}
      >
        {({ participants, sessionId }) => (
          <div data-testid="provider-children">
            <span data-testid="provider-children-name">
              {participants && participants[0].name}
            </span>
            <span data-testid="provider-children-sessionid">{sessionId}</span>
          </div>
        )}
      </PresenceProvider>,
    );
    expect(getByTestId('provider-children').tagName.toLowerCase()).toBe('div');
    expect(getByTestId('provider-children-name').innerText).toBe(mockName);
    expect(getByTestId('provider-children-sessionid').innerText).toBe(
      mocksessionId,
    );
  });
});
