import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { NavProvider, useNav } from './index';

const STEPS = [() => <p>0</p>, () => <p>1</p>, () => <p>2</p>];

const Page = () => {
  const { pageComponent: Page } = useNav();
  return <Page />;
};

const Controls = () => {
  const { next, back } = useNav();
  return (
    <>
      <button onClick={back}>Back</button>
      <button onClick={next}>Next</button>
    </>
  );
};

it('allows navigating forward and backward', () => {
  const screen = render(
    <NavProvider initialSteps={STEPS}>
      <Page />
      <Controls />
    </NavProvider>,
  );

  const back = screen.getByText(/back/i);
  const next = screen.getByText(/next/i);

  expect(screen.getByText('0')).toBeInTheDocument();
  // Cannot go before first step
  fireEvent.click(back);
  expect(screen.getByText('0')).toBeInTheDocument();
  fireEvent.click(next);
  expect(screen.getByText('1')).toBeInTheDocument();
  fireEvent.click(next);
  expect(screen.getByText('2')).toBeInTheDocument();
  // Cannot go beyond last step
  fireEvent.click(next);
  expect(screen.getByText('2')).toBeInTheDocument();
  fireEvent.click(back);
  expect(screen.getByText('1')).toBeInTheDocument();
  fireEvent.click(back);
  expect(screen.getByText('0')).toBeInTheDocument();
});
