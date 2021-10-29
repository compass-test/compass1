import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMockClient } from 'mock-apollo-client';
import React, { ComponentProps, Suspense } from 'react';
import { IntlProvider } from 'react-intl';

import { temporarilySilenceActAndAtlaskitDeprecationWarnings } from '@atlassian/aux-test-utils';

import { LabelPicker } from '../src/LabelPicker';
import { LabelPickerQuery } from '../src/LabelPickerQuery';

temporarilySilenceActAndAtlaskitDeprecationWarnings();

const client = createMockClient();
const LABELS = [
  {
    id: '4469949120',
    name: '90-day-plan',
    prefix: 'global',
  },
  {
    id: '4226777175',
    name: 'competitive-analyses',
    prefix: 'global',
  },
];
client.setRequestHandler(
  LabelPickerQuery,
  ({ searchText }) =>
    new Promise((resolve) => {
      resolve({
        data: {
          labelSearch: {
            suggestedLabels: LABELS.filter(({ name }) => name === searchText),
            otherLabels: LABELS.filter(
              ({ name }) =>
                !searchText.length ||
                (name.length > searchText.length &&
                  name.indexOf(searchText) !== -1),
            ),
          },
        },
      });
    }),
);

const LabelPickerFixture = (props: ComponentProps<typeof LabelPicker>) => (
  <Suspense fallback="loading">
    <IntlProvider locale="en">
      <LabelPicker client={client} {...props} />
    </IntlProvider>
  </Suspense>
);

it('should render LabelPicker with placeholder text', async () => {
  const { findByText } = render(<LabelPickerFixture />);

  expect(await findByText('Select a label')).toBeTruthy();
});

it('should render LabelPicker with defaultValue text', async () => {
  const { findByText, getByText } = render(
    <LabelPickerFixture
      defaultValue={[
        {
          id: '4226777175',
          name: 'competitive-analyses',
          prefix: 'global',
        },
        {
          id: '803700737',
          name: 'kb-how-to-article',
          prefix: 'global',
        },
      ]}
      isMulti
    />,
  );

  expect(await findByText('competitive-analyses')).toBeTruthy();
  expect(getByText('kb-how-to-article')).toBeTruthy();
});

it('should render creatable LabelPicker', async () => {
  const onChange = jest.fn();
  const { findAllByText, findByText } = render(
    <LabelPickerFixture isCreatable onChange={onChange} />,
  );
  const inputValue = 'facebook';

  // 1. Type into the input:
  userEvent.type(
    await findByText(
      (_, element) =>
        element.tagName.toLowerCase() === 'input' &&
        element.getAttribute('type') === 'text',
    ),
    inputValue,
  );
  // 2. Click the "create new ..." option:
  //
  // FIXME: Though formatCreateLabel gets invoked, the "create new ..." option
  // does not take its return value in account atm so a more specific text
  // search like `Create "{inputValue}"` does not work.
  let inputValueElements = await findAllByText(inputValue);
  expect(inputValueElements).toHaveLength(2);
  userEvent.click(inputValueElements[1]);
  // 3. The new option should have been created:
  expect(await findByText(inputValue)).toBeTruthy();
  expect(onChange.mock.calls[onChange.mock.calls.length - 1]).toMatchObject([
    {
      id: '',
      name: inputValue,
      prefix: 'global',
    },
    { action: 'create-option' },
  ]);
});
