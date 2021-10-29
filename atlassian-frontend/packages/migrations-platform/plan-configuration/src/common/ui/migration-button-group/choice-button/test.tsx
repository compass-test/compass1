import React from 'react';

import { render, wait } from '@testing-library/react';
import userEvents from '@testing-library/user-event';

import { ChoiceButtonPrimary } from './examples';

const getUrlMock = jest
  .fn()
  .mockName('getUrlMock')
  .mockResolvedValue('fake-url/');

describe('<ChoiceButton />', () => {
  test('renders button', () => {
    const { container } = render(<ChoiceButtonPrimary getUrl={getUrlMock} />);

    expect(container.innerHTML).toMatchSnapshot();
  });

  test('renders button with custom text', () => {
    const { container } = render(
      <ChoiceButtonPrimary getUrl={getUrlMock}>
        Hello World
      </ChoiceButtonPrimary>,
    );

    expect(container.innerHTML).toMatchSnapshot();
  });

  test('shows modal on click', async () => {
    const { getByTestId } = render(<ChoiceButtonPrimary getUrl={getUrlMock} />);

    userEvents.click(getByTestId('choose-cloud-button'));
    await wait(() =>
      expect(getByTestId('footer-continue-button')).toBeInTheDocument(),
    );
  });
});
