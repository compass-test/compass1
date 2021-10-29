import React, { Suspense } from 'react';
import { render, waitForElement } from '@testing-library/react';
import { DatePickerProps } from '@atlassian/forge-ui-types';
import DatePicker from '..';

const defaultProps: DatePickerProps = {
  label: 'Calendar',
  name: 'calendar',
};

const setup = (props: Partial<DatePickerProps> = {}) => {
  return render(
    <Suspense fallback={<div>...</div>}>
      <DatePicker {...defaultProps} {...props} />
    </Suspense>,
  );
};

test('should render calendar with default time ', async () => {
  const date = '2019-10-08';
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const localeDateString = new Date(date).toLocaleDateString('en-US', options);
  const datepicker = setup({
    defaultValue: date,
  });
  const calendarLabel = await waitForElement(() =>
    datepicker.getByText(defaultProps.label),
  );
  expect(calendarLabel.textContent).toEqual('Calendar');
  expect(await datepicker.findAllByText(localeDateString)).toBeTruthy();
});

test('placeholder', async () => {
  const datepicker = setup({
    placeholder: 'my placeholder',
  });
  expect(await datepicker.findByText('my placeholder')).toBeTruthy();
});

test('to have description', async () => {
  const datepicker = setup({
    description: 'description',
  });
  expect(await datepicker.findByText('description')).toBeTruthy();
});
