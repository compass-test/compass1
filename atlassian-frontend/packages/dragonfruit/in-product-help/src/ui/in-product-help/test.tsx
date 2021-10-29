import React from 'react';

import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';
import { CompassIntlProvider } from '@atlassian/dragonfruit-utils';

import { HelpProvider } from '../../controllers/help-context-controller';

import { HelpButton } from './help-button';

import { HelpMenu } from './index';

describe('<HelpMenu />', () => {
  let result: RenderResult;
  describe('Default menu', () => {
    beforeEach(() => {
      result = render(
        <CompassTestProvider>
          <HelpProvider>
            <div id="help-panel" />
            <HelpMenu />
          </HelpProvider>
        </CompassTestProvider>,
      );
    });
    it('clicking help button should bring up help panel with correct home entries', async () => {
      const navbarHelpButton = result.getByTestId(
        'dragonfruit.help.navbar-help-icon',
      );
      expect(navbarHelpButton).toBeInTheDocument();

      userEvent.click(navbarHelpButton);
      // Header
      expect(await result.findByText('Help')).toBeInTheDocument();
      // External Link
      expect(result.getByText('Read help articles')).toBeInTheDocument();
      // Footer
      expect(result.getByText('About Compass')).toBeInTheDocument();
    });
    it('clicking give feedback should open feedback collector', async () => {
      const navbarHelpButton = result.getByTestId(
        'dragonfruit.help.navbar-help-icon',
      );
      expect(navbarHelpButton).toBeInTheDocument();

      userEvent.click(navbarHelpButton);

      // Wait for help sidebar to load
      await result.findByText('Help');

      // Click give feedback button
      userEvent.click(result.getByText('Give feedback'));

      expect(await result.findByText('Send feedback')).toBeInTheDocument();
    });
  });
  describe('Specific article', () => {
    it('clicking on custom HelpButton should render the correct article', async () => {
      const helpButtonTestId = 'testId';
      const articleId = '7JbAjDn8PGS7Utw4uR7jtC';
      result = render(
        <CompassIntlProvider locale={'en'}>
          <HelpProvider>
            <div id="help-panel" />
            <HelpButton
              testId={helpButtonTestId}
              articleId="7JbAjDn8PGS7Utw4uR7jtC"
            />
            <HelpMenu />
          </HelpProvider>
        </CompassIntlProvider>,
      );
      const navbarHelpButton = result.getByTestId(
        'dragonfruit.help.navbar-help-icon',
      );
      // Load help menu first
      expect(navbarHelpButton).toBeInTheDocument();

      userEvent.click(navbarHelpButton);

      const helpButton = result.getByTestId(helpButtonTestId);
      expect(helpButton).toBeInTheDocument();

      userEvent.click(helpButton);

      // Header
      expect(result.getByText('Help')).toBeInTheDocument();
      // Only checking proper articleId in context
      // Home page is rendered even articleId is correct in test env
      expect(result.getByTestId(articleId)).toBeInTheDocument();
      // Footer
      expect(result.getByText('About Compass')).toBeInTheDocument();
    });
  });
});
