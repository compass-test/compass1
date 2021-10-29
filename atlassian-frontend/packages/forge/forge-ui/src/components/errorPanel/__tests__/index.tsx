import React, { Suspense } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { temporarilySilenceActAndAtlaskitDeprecationWarnings } from '@atlassian/aux-test-utils';
import ErrorPanel from '../errorPanel';
import { ModalErrorPanel } from '..';

temporarilySilenceActAndAtlaskitDeprecationWarnings();

it('fires an initialize effect on clicking the refresh app button', async () => {
  const dispatchSpy = jest.fn();
  const error = new Error('Unexpected Error');
  const { getByText, findByText } = render(
    <Suspense fallback={<div>loading</div>}>
      <ErrorPanel error={error} dispatch={dispatchSpy} />
    </Suspense>,
  );

  expect(getByText('loading')).toBeTruthy();
  const refreshAppButton = await findByText('Refresh app');
  // Event bubbles to button
  fireEvent.click(refreshAppButton);
  expect(dispatchSpy).toHaveBeenCalled();
});

it('fires an initialize effect on clicking the refresh app button in ModalDialog mode', async () => {
  const dispatchSpy = jest.fn();
  const error = new Error('Unexpected Error');
  const { getByText, findByText } = render(
    <Suspense fallback={<div>loading</div>}>
      <ModalErrorPanel
        error={error}
        dispatch={dispatchSpy}
        onClose={jest.fn()}
      />
    </Suspense>,
  );

  expect(getByText('loading')).toBeTruthy();
  const refreshAppButton = await findByText('Refresh app');
  // Event bubbles to button
  fireEvent.click(refreshAppButton);
  expect(dispatchSpy).toHaveBeenCalled();
});

it('unmounts when closing in ModalDialog mode', async () => {
  const tearDownSpy = jest.fn();
  const error = new Error('Unexpected Error');
  const { getByText, findByText } = render(
    <Suspense fallback={<div>loading</div>}>
      <ModalErrorPanel
        error={error}
        dispatch={jest.fn()}
        onClose={tearDownSpy}
      />
    </Suspense>,
  );

  await getByText('Unexpected Error');
  const closeModalButton = await findByText('Close');
  fireEvent.click(closeModalButton);
  expect(tearDownSpy).toHaveBeenCalled();
});
