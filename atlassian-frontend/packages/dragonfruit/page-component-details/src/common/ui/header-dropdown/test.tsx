import React from 'react';

import { screen } from '@testing-library/dom';
import { act, render, RenderResult } from '@testing-library/react';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import HeaderDropdown from './main';

jest.mock('@atlassian/analytics-bridge', () => ({
  ...jest.requireActual<Object>('@atlassian/analytics-bridge'),
  fireUIAnalytics: jest.fn(),
}));

describe('HeaderDropdown', () => {
  describe('apply scorecard', () => {
    let result: RenderResult;

    beforeEach(() => {
      jest.resetAllMocks();

      result = render(
        <ApolloAutoMockProvider>
          <CompassTestProvider>
            <HeaderDropdown
              componentName={'abc'}
              componentId={'abc123'}
              componentManaged={true}
              externalSourceURL={'https://example.com'}
            />
          </CompassTestProvider>
        </ApolloAutoMockProvider>,
      );
    });

    it('should have apply scorecard link', () => {
      const dropdownButton = result.getByTestId(
        'pollinator.header-dropdown-menu--trigger',
      );
      dropdownButton.click();

      const applyScorecardLink = result.getByTestId(
        'dragonfruit.header-dropdown.apply-scorecard-to-component-id',
      );

      expect(applyScorecardLink).toBeInTheDocument();
      expect(applyScorecardLink.textContent).toContain('Apply scorecard');
    });

    it('should fireUIAnalytics on click of apply scorecard link', () => {
      const dropdownButton = result.getByTestId(
        'pollinator.header-dropdown-menu--trigger',
      );
      dropdownButton.click();

      const applyScorecardLink = result.getByTestId(
        'dragonfruit.header-dropdown.apply-scorecard-to-component-id',
      );

      applyScorecardLink.click();
      expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
      expect(fireUIAnalytics).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.objectContaining({
            action: 'clicked',
            actionSubject: 'link',
          }),
        }),
        'applyScorecard',
        expect.objectContaining({
          componentId: 'abc123',
          componentName: 'abc',
          componentManaged: true,
        }),
      );
    });

    it('should open apply scorecard modal on click of apply scorecard link', () => {
      const dropdownButton = result.getByTestId(
        'pollinator.header-dropdown-menu--trigger',
      );
      dropdownButton.click();

      const applyScorecardLink = result.getByTestId(
        'dragonfruit.header-dropdown.apply-scorecard-to-component-id',
      );
      applyScorecardLink.click();

      const applyScorecardModal = result.getByTestId(
        'apply-scorecard-modal-test-id',
      );
      expect(applyScorecardModal).toBeInTheDocument();
    });
  });

  describe('managed component', () => {
    const managedHeaderDropdown = (
      <ApolloAutoMockProvider>
        <CompassTestProvider>
          <HeaderDropdown
            componentName={'abc'}
            componentId={'abc123'}
            componentManaged={true}
            externalSourceURL={'https://example.com'}
          />
        </CompassTestProvider>
      </ApolloAutoMockProvider>
    );

    it('should render an external link', () => {
      const { getByTestId } = render(managedHeaderDropdown);
      const dropdownButton = getByTestId(
        'pollinator.header-dropdown-menu--trigger',
      );
      dropdownButton.click();

      const externalLink = getByTestId(
        'dragonfruit.header-dropdown.external-link',
      );
      expect(externalLink).not.toBeNull();
      expect(externalLink.textContent).toContain('Edit in compass.yml');

      delete window.open;
      window.open = jest.fn();
      externalLink.click();
      expect(window.open).toHaveBeenCalledWith(
        'https://example.com',
        '_blank',
        'noopener,noreferrer',
      );
    });

    it('should be able to copy the ID', () => {
      const { getByTestId } = render(managedHeaderDropdown);
      const dropdownButton = getByTestId(
        'pollinator.header-dropdown-menu--trigger',
      );
      dropdownButton.click();

      const copyId = getByTestId(
        'dragonfruit.header-dropdown.copy-component-id',
      );
      expect(copyId).not.toBeNull();
      expect(copyId.textContent).toContain('Copy ID');
    });
  });

  describe('unmanaged component', () => {
    const unmanagedHeaderDropdown = (
      <ApolloAutoMockProvider>
        <CompassTestProvider>
          <HeaderDropdown
            componentName={'def'}
            componentId={'abc123'}
            componentManaged={false}
            externalSourceURL={null}
          />
        </CompassTestProvider>
      </ApolloAutoMockProvider>
    );

    it('does not render an external link', () => {
      const { getByTestId, queryByTestId } = render(unmanagedHeaderDropdown);
      const dropdownButton = getByTestId(
        'pollinator.header-dropdown-menu--trigger',
      );
      dropdownButton.click();

      const externalLink = queryByTestId(
        'dragonfruit.header-dropdown.external-link',
      );
      expect(externalLink).toBeNull();
    });

    it('copies an ID successfully and displays a flag', async () => {
      const { getByTestId } = render(unmanagedHeaderDropdown);
      const dropdownButton = getByTestId(
        'pollinator.header-dropdown-menu--trigger',
      );
      dropdownButton.click();

      const copyId = getByTestId(
        'dragonfruit.header-dropdown.copy-component-id',
      );
      expect(copyId).not.toBeNull();
      expect(copyId.textContent).toContain('Copy ID');

      Object.assign(navigator, {
        clipboard: {
          writeText: () => {},
        },
      });

      jest.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();

      act(() => {
        copyId.click();
      });

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('abc123');
      await screen.findByText('ID copied!');
    });
  });
});
