import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import {
  PlanNameFieldDefaultWithoutName,
  PlanNameFieldWithLabel,
} from './examples';

describe('<PlanNameField />', () => {
  it('should render the default label if the "label" prop is not provided', () => {
    const { getByLabelText, getByPlaceholderText } = render(
      <PlanNameFieldDefaultWithoutName />,
    );
    expect(getByLabelText('Name your migration')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter a migration name')).toBeInTheDocument();
  });

  it('should render the label if the "label" prop is provided', () => {
    const { getByLabelText, getByPlaceholderText } = render(
      <PlanNameFieldWithLabel />,
    );
    expect(getByLabelText('My label')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter a migration name')).toBeInTheDocument();
  });

  it('should call the callback with the new value if the name changes', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <PlanNameFieldDefaultWithoutName onChange={onChange} />,
    );
    fireEvent.change(getByLabelText('Name your migration'), {
      target: { value: 'New Name' },
    });
    expect(onChange).toHaveBeenCalledWith('New Name');
  });

  it('should render correct validation message', () => {
    const { getByText } = render(<PlanNameFieldDefaultWithoutName />);
    expect(
      getByText('You have already used this name, try a different one.'),
    ).toBeInTheDocument();
  });
});
