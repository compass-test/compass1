import React from 'react';

import { render } from '@testing-library/react';

import {
  AppNameValueBasic,
  AppNameValueBasicWhenLoading,
  AppNameValueWithLogo,
  AppNameValueWithLogoWhenLoading,
} from './examples';

describe('<AppNameValue />', () => {
  it('should show the loading spinner', () => {
    const { queryByLabelText } = render(<AppNameValueBasicWhenLoading />);

    expect(queryByLabelText('Loading…')).toBeInTheDocument();
  });

  describe('given having an app logo', () => {
    it('should show the app name and the actual app logo', () => {
      const { queryByAltText, queryByText } = render(<AppNameValueWithLogo />);

      expect(queryByText('Jira Workflow Toolbox')).toBeInTheDocument();
      expect(queryByAltText('Jira Workflow Toolbox')).toBeInTheDocument();
    });

    describe('given the component is loading', () => {
      it('should not show the app name and the fallback app logo', () => {
        const { queryByAltText, queryByText } = render(
          <AppNameValueWithLogoWhenLoading />,
        );

        expect(queryByText('Jira Workflow Toolbox')).not.toBeInTheDocument();
        expect(queryByAltText('Jira Workflow Toolbox')).not.toBeInTheDocument();
      });
    });
  });

  describe('given not providing app logo', () => {
    it('should show the app name and the fallback app logo', () => {
      const { queryByText, queryByLabelText } = render(<AppNameValueBasic />);

      expect(queryByText('Jira Workflow Toolbox')).toBeInTheDocument();
      expect(queryByLabelText('No logo')).toBeInTheDocument();
    });

    describe('given the component is loading', () => {
      it('should not show the app name and the fallback app logo', () => {
        const { queryByText, queryByLabelText } = render(
          <AppNameValueBasicWhenLoading />,
        );

        expect(queryByText('Jira Workflow Toolbox')).not.toBeInTheDocument();
        expect(queryByLabelText('No logo')).not.toBeInTheDocument();
      });
    });
  });
});
