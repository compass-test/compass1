import React, { Suspense } from 'react';
import { render, waitForElement } from '@testing-library/react';
import { TextAreaProps } from '@atlassian/forge-ui-types';
import TextArea from '..';

const defaultProps: TextAreaProps = {
  label: 'TextArea',
  name: 'textarea',
};

test('should render textarea', async () => {
  const { getByLabelText } = render(
    <Suspense fallback={<div>...loading</div>}>
      <TextArea {...defaultProps} />
    </Suspense>,
  );
  const textarea = (await waitForElement(() =>
    getByLabelText(defaultProps.label),
  )) as HTMLTextAreaElement;
  expect(textarea.value).toBe('');
});

test('should render textarea with default value', async () => {
  const { getByLabelText } = render(
    <Suspense fallback={<div>...loading</div>}>
      <TextArea {...defaultProps} defaultValue="cheese" />
    </Suspense>,
  );
  const textarea = (await waitForElement(() =>
    getByLabelText(defaultProps.label),
  )) as HTMLTextAreaElement;
  expect(textarea.value).toBe('cheese');
});

test('should render textarea with placeholder value', async () => {
  const { getByPlaceholderText } = render(
    <Suspense fallback={<div>...loading</div>}>
      <TextArea {...defaultProps} placeholder="homer" />
    </Suspense>,
  );
  const textarea = (await waitForElement(() =>
    getByPlaceholderText('homer'),
  )) as HTMLTextAreaElement;
  expect(textarea.placeholder).toBe('homer');
});

test('should render textarea with description', async () => {
  const { findByText } = render(
    <Suspense fallback={<div>...loading</div>}>
      <TextArea {...defaultProps} description="description" />
    </Suspense>,
  );

  expect(await findByText('description')).toBeTruthy();
});
