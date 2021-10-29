import React, { Suspense } from 'react';
import { render, waitForElement } from '@testing-library/react';
import { RadioGroup } from '..';

const label = 'Radio group';

test('should render radio group from children', async () => {
  const options = [
    { name: 'radio', label: 'One', value: '1' },
    { name: 'radio', label: 'Two', value: '2' },
  ];

  const { getByDisplayValue, getByText } = render(
    <Suspense fallback={<div>...loading</div>}>
      <RadioGroup name="Radio group" label={label} options={options} />
    </Suspense>,
  );
  const radioGroup = (await waitForElement(() =>
    getByText(label),
  )) as HTMLInputElement;
  expect(radioGroup).toBeTruthy();
  const radio1 = getByDisplayValue('1') as HTMLInputElement;
  expect(radio1.checked).toBe(false);
  const radio2 = getByDisplayValue('2') as HTMLInputElement;
  expect(radio2.checked).toBe(false);
});

test('should render radio group with no children', async () => {
  const { getByText } = render(
    <Suspense fallback={<div>...loading</div>}>
      <RadioGroup name="Radio group" label={label} options={[]} />
    </Suspense>,
  );
  const radioGroup = (await waitForElement(() =>
    getByText(label),
  )) as HTMLInputElement;
  expect(radioGroup).toBeTruthy();
});

test('should render radio group with defaultChecked checked', async () => {
  const options = [
    { name: 'radio', label: 'One', value: '1' },
    { name: 'radio', label: 'Two', value: '2' },
  ];

  const { getByDisplayValue, getByText } = render(
    <Suspense fallback={<div>...loading</div>}>
      <RadioGroup
        name="Radio group"
        label={label}
        options={options}
        defaultValue="2"
      />
    </Suspense>,
  );
  const radioGroup = (await waitForElement(() =>
    getByText(label),
  )) as HTMLInputElement;
  expect(radioGroup).toBeTruthy();
  const radio1 = getByDisplayValue('1') as HTMLInputElement;
  expect(radio1.checked).toBe(false);
  const radio2 = getByDisplayValue('2') as HTMLInputElement;
  expect(radio2.checked).toBe(true);
});

test('to have description', async () => {
  const radioGroup = render(
    <Suspense fallback={<div>...loading</div>}>
      <RadioGroup
        name="Radio group"
        label={label}
        options={[]}
        description="description"
      />
    </Suspense>,
  );

  expect(await radioGroup.findByText('description')).toBeTruthy();
});
