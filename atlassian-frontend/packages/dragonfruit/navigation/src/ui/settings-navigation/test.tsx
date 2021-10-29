import React from 'react';

import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { DiProvider, injectable } from 'react-magnetic-di';

import { getPublicPath } from '@atlassian/dragonfruit-utils';

import { SettingsNavigation } from './index';

describe('Settings navigation', () => {
  describe('testId property', () => {
    test('Should be found by data-testid', async () => {
      const navTestId = 'dragonfruit-navigations.ui.settings-navigation';
      const scorecardTestId =
        'dragonfruit-navigations.ui.settings-navigation.scorecards';

      const getPublicPathMock = () => 'testing';

      const getPublicPathDI = injectable(getPublicPath, getPublicPathMock);
      const { getByTestId } = render(
        <DiProvider use={[getPublicPathDI]}>
          <IntlProvider locale="en">
            <SettingsNavigation />
          </IntlProvider>
        </DiProvider>,
      );
      expect(getByTestId(navTestId)).toBeTruthy();
      expect(getByTestId(scorecardTestId)).toBeTruthy();
    });
  });

  test('Should display a link to the Apps page', async () => {
    const { getByText, getByTestId } = render(
      <IntlProvider locale="en">
        <SettingsNavigation />
      </IntlProvider>,
    );
    expect(getByText('Apps')).toBeTruthy();
    expect(
      getByTestId(
        'dragonfruit-navigations.ui.settings-navigation.apps-link-icon',
      ),
    ).toBeTruthy();
  });
});
