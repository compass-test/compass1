import React from 'react';

import { render } from '@testing-library/react';

import {
  AppsMigrationTaskCardNoSelection,
  AppsMigrationTaskCardNotMigrating,
  AppsMigrationTaskCardWithMultipleApps,
  AppsMigrationTaskCardWithOneApp,
} from './examples';
import messages from './messages';

describe('<AppsMigrationTaskCard />', () => {
  it('should show correct description when nothing selected', () => {
    const { getByText } = render(<AppsMigrationTaskCardNoSelection />);

    expect(
      getByText(messages.noSelectionText.defaultMessage!),
    ).toBeInTheDocument();
  });

  it('should show correct description and button when not migrating apps', () => {
    const { getByText, getByTestId } = render(
      <AppsMigrationTaskCardNotMigrating />,
    );
    expect(getByText('0 apps')).toBeInTheDocument();
    expect(
      getByText(messages.notMigratingText.defaultMessage!),
    ).toBeInTheDocument();

    expect(getByTestId('buttonEdit')).toBeInTheDocument();
  });

  it('should show correct selection description when single app selected', () => {
    const { getByText } = render(<AppsMigrationTaskCardWithOneApp />);

    expect(getByText('1 app')).toBeInTheDocument();
    expect(
      getByText(messages.selectedAppsDescription.defaultMessage!),
    ).toBeInTheDocument();
  });

  it('should show correct selection description when there are more than 1 apps', () => {
    const { getByText } = render(<AppsMigrationTaskCardWithMultipleApps />);

    expect(getByText('5 apps')).toBeInTheDocument();
    expect(
      getByText(messages.selectedAppsDescription.defaultMessage!),
    ).toBeInTheDocument();
  });
});
