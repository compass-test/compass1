import React from 'react';

import { render } from '@testing-library/react';

import {
  OPERATIONAL_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  UI_EVENT_TYPE,
} from '@atlassian/analytics-bridge';

import { integrationsKeys, testProps } from '../common/constants';
import {
  createUserSegmentationBasedIntegrationList,
  saveIntegrationListToLocalStorage,
  sendIntegrationsInstallRequests,
} from '../services/integrations';

import { IntegrationsSurvey } from './index';

jest.mock('../services/integrations', () => ({
  createUserSegmentationBasedIntegrationList: jest.fn(),
  sendIntegrationsInstallRequests: jest.fn(),
  saveIntegrationListToLocalStorage: jest.fn(),
}));

const testId = 'integrations-survey-1';
const checkboxTestId = `${testId}-request-to-admin-checkbox--hidden-checkbox`;
const props = { ...testProps, testId };

const flushPromises = () => new Promise(setImmediate);

describe('IntegrationsSurvey', () => {
  beforeEach(() => {
    (createUserSegmentationBasedIntegrationList as jest.Mock).mockResolvedValue(
      undefined,
    );
  });

  it('should accept a test id, and render correctly', async () => {
    const { findByTestId } = render(<IntegrationsSurvey {...props} />);
    expect(await findByTestId(testId)).toBeInTheDocument();
  });

  it('should render the request to admin text and checkbox for the nth user', async () => {
    const { findByText, findByTestId } = render(
      <IntegrationsSurvey {...props} />,
    );

    expect(
      await findByText('Notify your admin about these tools'),
    ).toBeInTheDocument();

    expect(await findByTestId(checkboxTestId)).toBeInTheDocument();
  });

  it('should not render the checkbox and text for the admin', async () => {
    const { findByText, findByTestId } = render(
      <IntegrationsSurvey {...props} isSiteAdmin />,
    );

    await expect(
      findByText('Notify your admin about these tools'),
    ).rejects.toThrow();

    await expect(findByTestId(checkboxTestId)).rejects.toThrow();
  });

  it('should handle press next when end user and no errors', async () => {
    (saveIntegrationListToLocalStorage as jest.Mock).mockImplementation(
      () => true,
    );

    (sendIntegrationsInstallRequests as jest.Mock).mockImplementation(
      async () => {
        // KURO-712 we select two apps but only request non connect only ones
        return [{ status: 'fulfilled' }];
      },
    );

    const fireAnalytics = jest.fn();

    const { findByText, findByTestId, findByLabelText } = render(
      <IntegrationsSurvey {...props} fireAnalytics={fireAnalytics} />,
    );

    const checkbox = await findByText('Notify your admin about these tools');
    expect(checkbox).toBeInTheDocument();
    checkbox.click();

    expect(await findByTestId(checkboxTestId)).toBeInTheDocument();

    const slackBtn = await findByLabelText('Slack');
    slackBtn.click();
    const teamsBtn = await findByLabelText('Microsoft Teams');
    teamsBtn.click();

    const nextBtn = await findByTestId(
      'integrations-survey-presentational-next-button',
    );
    nextBtn.click();

    await flushPromises();
    const { fireAnalytics: _, ...expectedProps } = testProps;

    expect(sendIntegrationsInstallRequests).toBeCalledWith({
      ...expectedProps,
      integrationList: ['microsoft-teams'],
    });

    expect(fireAnalytics).toHaveBeenNthCalledWith(
      1,
      expect.anything(),
      UI_EVENT_TYPE,
      {
        action: 'toggled',
        actionSubject: 'checkbox',
        actionSubjectId: 'sendInstallationRequest',
        attributes: {
          isChecked: true,
        },
      },
    );

    expect(fireAnalytics).toHaveBeenNthCalledWith(
      2,
      expect.anything(),
      UI_EVENT_TYPE,
      {
        action: 'clicked',
        actionSubject: 'toggleButton',
        actionSubjectId: 'integrationPicker',
        attributes: {
          isSelected: true,
          integration: integrationsKeys.SLACK,
        },
      },
    );

    expect(fireAnalytics).toHaveBeenNthCalledWith(
      3,
      expect.anything(),
      UI_EVENT_TYPE,
      {
        action: 'clicked',
        actionSubject: 'toggleButton',
        actionSubjectId: 'integrationPicker',
        attributes: {
          isSelected: true,
          integration: integrationsKeys.MICROSOFT_TEAMS,
        },
      },
    );

    // KURO-712 SLACK request only non connect only app
    expect(fireAnalytics).toHaveBeenNthCalledWith(
      4,
      expect.anything(),
      TRACK_EVENT_TYPE,
      {
        action: 'settled',
        actionSubject: 'integrationsSurveyApi.allRequestSettled',
        attributes: {
          duration: expect.anything(),
          integrations: [integrationsKeys.MICROSOFT_TEAMS],
        },
      },
    );

    // KURO-712 SLACK send track event for non connect only app
    expect(fireAnalytics).toHaveBeenNthCalledWith(
      5,
      expect.anything(),
      TRACK_EVENT_TYPE,
      {
        action: 'requested',
        actionSubject: 'app',
        actionSubjectId: integrationsKeys.MICROSOFT_TEAMS,
        attributes: {
          source: 'jiraOnboarding',
        },
      },
    );
  });

  it('should handle press next when end user and not send track events when api errors out', async () => {
    (saveIntegrationListToLocalStorage as jest.Mock).mockImplementation(
      () => true,
    );

    (sendIntegrationsInstallRequests as jest.Mock).mockImplementation(
      async () => {
        // KURO-712 we select two apps but receive an error for one
        return [{ status: 'fulfilled' }, { status: 'rejected' }];
      },
    );

    const fireAnalytics = jest.fn();

    const { findByText, findByTestId, findByLabelText } = render(
      <IntegrationsSurvey {...props} fireAnalytics={fireAnalytics} />,
    );

    const checkbox = await findByText('Notify your admin about these tools');
    expect(checkbox).toBeInTheDocument();
    checkbox.click();

    expect(await findByTestId(checkboxTestId)).toBeInTheDocument();

    const slackBtn = await findByLabelText('Sentry');
    slackBtn.click();
    const teamsBtn = await findByLabelText('Microsoft Teams');
    teamsBtn.click();

    const nextBtn = await findByTestId(
      'integrations-survey-presentational-next-button',
    );
    nextBtn.click();

    await flushPromises();
    const { fireAnalytics: _, ...expectedProps } = testProps;

    expect(sendIntegrationsInstallRequests).toBeCalledWith({
      ...expectedProps,
      integrationList: [
        integrationsKeys.MICROSOFT_TEAMS,
        integrationsKeys.SENTRY,
      ],
    });

    expect(fireAnalytics).toHaveBeenNthCalledWith(
      1,
      expect.anything(),
      UI_EVENT_TYPE,
      {
        action: 'toggled',
        actionSubject: 'checkbox',
        actionSubjectId: 'sendInstallationRequest',
        attributes: {
          isChecked: true,
        },
      },
    );

    expect(fireAnalytics).toHaveBeenNthCalledWith(
      2,
      expect.anything(),
      UI_EVENT_TYPE,
      {
        action: 'clicked',
        actionSubject: 'toggleButton',
        actionSubjectId: 'integrationPicker',
        attributes: {
          isSelected: true,
          integration: integrationsKeys.SENTRY,
        },
      },
    );

    expect(fireAnalytics).toHaveBeenNthCalledWith(
      3,
      expect.anything(),
      UI_EVENT_TYPE,
      {
        action: 'clicked',
        actionSubject: 'toggleButton',
        actionSubjectId: 'integrationPicker',
        attributes: {
          isSelected: true,
          integration: integrationsKeys.MICROSOFT_TEAMS,
        },
      },
    );

    // KURO-712 SLACK request only non connect only app
    expect(fireAnalytics).toHaveBeenNthCalledWith(
      4,
      expect.anything(),
      TRACK_EVENT_TYPE,
      {
        action: 'settled',
        actionSubject: 'integrationsSurveyApi.allRequestSettled',
        attributes: {
          duration: expect.anything(),
          integrations: [
            integrationsKeys.MICROSOFT_TEAMS,
            integrationsKeys.SENTRY,
          ],
        },
      },
    );

    // KURO-712 SLACK send track event for non connect only app
    expect(fireAnalytics).toHaveBeenNthCalledWith(
      5,
      expect.anything(),
      TRACK_EVENT_TYPE,
      {
        action: 'requested',
        actionSubject: 'app',
        actionSubjectId: integrationsKeys.MICROSOFT_TEAMS,
        attributes: {
          source: 'jiraOnboarding',
        },
      },
    );

    expect(fireAnalytics).toHaveBeenNthCalledWith(
      6,
      expect.anything(),
      OPERATIONAL_EVENT_TYPE,
      {
        action: 'failed',
        actionSubject: 'jiraSoftwareOnboarding.integrationsSurveyApiError',
        attributes: {
          endpointSource: 'sendIntegrationsInstallRequests',
          integrationsSelected: [
            integrationsKeys.MICROSOFT_TEAMS,
            integrationsKeys.SENTRY,
          ],
        },
      },
    );
  });

  it('should check the checkbox if checkboxDefaultValue prop is true', async () => {
    const { findByTestId } = render(
      <IntegrationsSurvey {...props} checkboxDefaultValue />,
    );
    const checkbox = await findByTestId(checkboxTestId);
    expect((checkbox as HTMLInputElement).checked).toEqual(true);
  });

  it('should not check the checkbox if checkboxDefaultValue prop is false', async () => {
    const { findByTestId } = render(
      <IntegrationsSurvey {...props} checkboxDefaultValue={false} />,
    );
    const checkbox = await findByTestId(checkboxTestId);
    expect((checkbox as HTMLInputElement).checked).toEqual(false);
  });
});
