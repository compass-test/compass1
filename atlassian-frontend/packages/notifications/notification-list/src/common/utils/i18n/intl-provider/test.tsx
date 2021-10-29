import React from 'react';

import { render } from '@testing-library/react';
import { injectIntl } from 'react-intl';

import { createMockProviders } from '../../test-helpers';
import messages from '../messages';

import NotificationIntlProvider from './index';

const MockComponent = injectIntl(({ intl }) => (
  <div>{intl.formatMessage(messages.markAllAsRead)}</div>
));

const renderWithLocale = (locale: string) => {
  const { MockProviders, onAnalyticEventFired } = createMockProviders({
    locale,
    shouldTrackAnalyticsPayload: (payload) => {
      return payload.actionSubject === 'i18nMessages';
    },
  });
  const renderResult = render(
    <MockProviders>
      <NotificationIntlProvider>
        <MockComponent />
      </NotificationIntlProvider>
    </MockProviders>,
  );
  return { renderResult, onAnalyticEventFired };
};

describe('NotificationIntlProvider', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  it('should load a new locale and display content only after locale has loaded', async () => {
    jest.mock('../../../../i18n/es', () => ({
      __esModule: true,
      default: {
        'fabric.notificationList.markAllAsRead': 'Marcar todo como leído',
      },
    }));
    const {
      renderResult: { container },
      onAnalyticEventFired,
    } = renderWithLocale('es');
    expect(container.textContent).toEqual('');
    await Promise.resolve();
    await Promise.resolve();
    expect(container.textContent).toEqual('Marcar todo como leído');
    expect(onAnalyticEventFired).toHaveBeenCalledTimes(0);
  });

  it('should show fallback English locale messages if loading a new locale fails', async () => {
    jest.mock('../../../../i18n/es', () => {
      throw new Error('ES i18n failed to load');
    });
    const {
      renderResult: { container },
      onAnalyticEventFired,
    } = renderWithLocale('es');
    expect(container.textContent).toEqual('');
    await Promise.resolve();
    await Promise.resolve();
    expect(container.textContent).toEqual('Mark all as read');
    expect(onAnalyticEventFired).toHaveBeenCalledTimes(1);
    expect(onAnalyticEventFired).toHaveBeenCalledWith({
      action: 'fetchFailed',
      actionSubject: 'i18nMessages',
      attributes: {
        locale: 'es',
      },
      eventType: 'operational',
      tenantIdType: 'none',
    });
  });

  it('should not load any locale if English locale is provided', async () => {
    const {
      renderResult: { container },
      onAnalyticEventFired,
    } = renderWithLocale('en');
    expect(container.textContent).toEqual('Mark all as read');
    await Promise.resolve();
    await Promise.resolve();
    expect(container.textContent).toEqual('Mark all as read');
    expect(onAnalyticEventFired).toHaveBeenCalledTimes(0);
  });
});
