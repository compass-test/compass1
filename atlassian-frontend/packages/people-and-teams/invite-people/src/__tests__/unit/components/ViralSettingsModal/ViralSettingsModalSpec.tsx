import React from 'react';
import {
  render,
  fireEvent,
  wait,
  waitForElement,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import ViralSettingsModal from '../../../../components/ViralSettingsModal/ViralSettingsModal';
import { messages } from '../../../../components/i18n/messages';
import {
  triggerAnalyticsForViralSettingsModalViewed,
  triggerAnalyticsForClickedInfoModalCloseButton,
  triggerAnalyticsForClickedInfoModalClosed,
  triggerAnalyticsForClickedInfoModalButton,
} from '../../../../components/analytics';

jest.mock('../../../../components/analytics', () => {
  return {
    ...jest.requireActual<Object>('../../../../components/analytics'),
    triggerAnalyticsForViralSettingsModalViewed: jest.fn(),
    triggerAnalyticsForClickedInfoModalCloseButton: jest.fn(),
    triggerAnalyticsForClickedInfoModalButton: jest.fn(),
    triggerAnalyticsForClickedInfoModalClosed: jest.fn(),
  };
});

describe('SelectProduct', () => {
  const renderViralSettingsModal = () =>
    render(
      <IntlProvider messages={{}} locale="en">
        <ViralSettingsModal
          selectedProductLabel="Jira Software"
          viralSettingsByDomain={{}}
          onOpenInviteChange={() => {}}
          onDomainChange={() => {}}
          openInviteIsChecked={false}
          showOpenInvite={false}
        />
      </IntlProvider>,
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render an info icon button', async () => {
    const { getByTestId } = renderViralSettingsModal();
    expect(
      getByTestId('testId-invite-people-viral-settings-modal-trigger-button'),
    ).toBeInTheDocument();
  });

  it('should open the modal when clicked on the info icon button', async () => {
    const { getByTestId, queryByText } = renderViralSettingsModal();

    fireEvent.click(
      getByTestId('testId-invite-people-viral-settings-modal-trigger-button'),
    );
    expect(triggerAnalyticsForClickedInfoModalButton).toHaveBeenCalledTimes(1);
    await waitForElement(() =>
      getByTestId('testId-invite-people-viral-settings-modal'),
    );

    await wait(() =>
      expect(triggerAnalyticsForViralSettingsModalViewed).toHaveBeenCalledTimes(
        1,
      ),
    );

    expect(
      queryByText(messages.viralSettingsModalTitle.defaultMessage),
    ).toBeInTheDocument();

    expect(
      queryByText(
        messages.viralSettingsModalDescription.defaultMessage.replace(
          '{selectedProduct}',
          'Jira Software',
        ),
      ),
    ).toBeInTheDocument();

    expect(
      getByTestId('testId-invite-people-viral-settings-modal-close-button'),
    ).toBeInTheDocument();
  });
  it('should close the modal when the closed button is clicked', async () => {
    const { getByTestId } = renderViralSettingsModal();
    fireEvent.click(
      getByTestId('testId-invite-people-viral-settings-modal-trigger-button'),
    );

    await waitForElement(() =>
      getByTestId('testId-invite-people-viral-settings-modal'),
    );

    fireEvent.click(
      getByTestId('testId-invite-people-viral-settings-modal-close-button'),
    );
    expect(
      triggerAnalyticsForClickedInfoModalCloseButton,
    ).toHaveBeenCalledTimes(1);
    await waitForElementToBeRemoved(() =>
      getByTestId('testId-invite-people-viral-settings-modal'),
    );

    await wait(() =>
      expect(triggerAnalyticsForClickedInfoModalClosed).toHaveBeenCalledTimes(
        1,
      ),
    );
  });
});
