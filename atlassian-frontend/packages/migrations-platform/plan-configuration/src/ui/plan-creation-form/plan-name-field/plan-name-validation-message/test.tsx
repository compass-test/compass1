import React from 'react';

import { render } from '@testing-library/react';

import {
  PlanNameFieldDuplicateValidationMessage,
  PlanNameFieldEmptyValidationMessage,
  PlanNameFieldRunningValidationMessage,
  PlanNameFieldValidValidationMessage,
} from './examples';

describe('<PlanNameValidationMessage>', () => {
  it('should render validation running message when the validation is in progress', () => {
    const { getByText } = render(<PlanNameFieldRunningValidationMessage />);
    expect(getByText('Validating...')).toBeInTheDocument();
  });

  it('should render valid plan message when the plan name is valid', () => {
    const { getByText } = render(<PlanNameFieldValidValidationMessage />);
    expect(getByText('This name is available to use.')).toBeInTheDocument();
  });

  it('should render empty error message when there is a no plan name', () => {
    const { getByText } = render(<PlanNameFieldEmptyValidationMessage />);
    expect(getByText('Add a name for your migration.')).toBeInTheDocument();
  });

  it('should render duplicate error message when there is a duplicate validation error ', () => {
    const { getByText } = render(<PlanNameFieldDuplicateValidationMessage />);
    expect(
      getByText('You have already used this name, try a different one.'),
    ).toBeInTheDocument();
  });
});
