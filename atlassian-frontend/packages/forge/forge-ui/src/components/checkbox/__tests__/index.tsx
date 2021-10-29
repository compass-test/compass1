import React, { Suspense } from 'react';
import { render, waitForElement } from '@testing-library/react';
import { CheckboxGroup, CheckboxGroupFn } from '..';

const BASIC_OPTIONS = [
  {
    key: 'Checkbox1',
    label: 'checked',
    value: 'checked',
    defaultChecked: true,
  },
  { key: 'Checkbox2', label: 'unchecked', value: 'unchecked' },
];

test('should render checkboxGroup', async () => {
  const { getByLabelText } = render(
    <Suspense fallback={<div>...loading</div>}>
      <CheckboxGroup
        name="checkbox-group"
        label="test"
        options={BASIC_OPTIONS}
      />
    </Suspense>,
  );
  const checkboxChecked = (await waitForElement(() =>
    getByLabelText('checked'),
  )) as HTMLInputElement;
  const checkboxUnchecked = (await waitForElement(() =>
    getByLabelText('unchecked'),
  )) as HTMLInputElement;

  expect(checkboxChecked).toBeTruthy();
  expect(checkboxChecked.checked).toBe(true);
  expect(checkboxUnchecked).toBeTruthy();
});

test('to have description', async () => {
  const checkboxGroup = render(
    <Suspense fallback={<div>...loading</div>}>
      <CheckboxGroup
        name="foo"
        label="bar"
        description="description"
        options={BASIC_OPTIONS}
      />
    </Suspense>,
  );

  expect(await checkboxGroup.findByText('description')).toBeTruthy();
});

test('to map legend to label', async () => {
  const group = CheckboxGroupFn({
    // boilerplate
    Components: {} as any,
    dispatch: jest.fn(),
    render: jest.fn(),
    renderChildren: jest.fn(),

    // actually needed for test
    type: 'CheckboxGroup',
    props: {
      name: 'foo',
      legend: 'bar',
      description: 'description',
      options: BASIC_OPTIONS,
    },
    children: [],
  });

  expect(group && group.props.label).toBe('bar');
});
