import React, { Suspense } from 'react';
import { render } from '@testing-library/react';
import { Select } from '..';

const options = [{ label: 'label', value: 'value' }];

test('renders with a placeholder from children', async () => {
  const { findByText } = render(
    <Suspense fallback={<div>loading</div>}>
      <Select
        label="Label"
        name="name"
        placeholder="placeholder"
        options={options}
      />
    </Suspense>,
  );
  expect(await findByText('placeholder')).toBeTruthy();
});

test('renders with a placeholder when no children', async () => {
  const { findByText } = render(
    <Suspense fallback={<div>loading</div>}>
      <Select
        label="Label"
        name="name"
        placeholder="placeholder"
        options={[]}
      />
    </Suspense>,
  );
  expect(await findByText('placeholder')).toBeTruthy();
});

test('renders with defaultSelected selected', async () => {
  const { findByText } = render(
    <Suspense fallback={<div>loading</div>}>
      <Select
        label="Label"
        name="name"
        options={options}
        defaultValue={options[0]}
      />
    </Suspense>,
  );
  expect(await findByText('label')).toBeTruthy();
});

test('renders with a placeholder from children with isMulti', async () => {
  const { findByText } = render(
    <Suspense fallback={<div>loading</div>}>
      <Select
        label="Label"
        name="name"
        placeholder="placeholder"
        isMulti
        options={options}
        defaultValue={options[0]}
      />
    </Suspense>,
  );
  expect(await findByText('label')).toBeTruthy();
});

test('renders with description', async () => {
  const { findByText } = render(
    <Suspense fallback={<div>loading</div>}>
      <Select
        label="Label"
        name="name"
        options={options}
        defaultValue={options[0]}
        description="helper text"
      />
    </Suspense>,
  );
  expect(await findByText('helper text')).toBeTruthy();
});
