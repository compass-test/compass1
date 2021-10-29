import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { CompassComponentDataManager } from '@atlassian/dragonfruit-graphql';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import Actions from './main';

describe('Actions', () => {
  it('should render the actions menu', () => {
    const { getByTestId } = render(
      <CompassTestProvider>
        <Actions component={{ id: 'foo', name: 'foo' }} testId="actions" />
      </CompassTestProvider>,
    );

    const menu = getByTestId('actions.menu');

    expect(menu).toBeInTheDocument();
  });

  it('should trigger the delete function when the delete action is clicked', () => {
    const onDelete = jest.fn();

    const { getByTestId } = render(
      <CompassTestProvider>
        <Actions
          component={{ id: 'foo', name: 'foo' }}
          onDelete={onDelete}
          testId="actions"
        />
      </CompassTestProvider>,
    );

    const menu = getByTestId('actions.menu');

    fireEvent.click(menu);

    const deleteAction = getByTestId('actions.delete');

    fireEvent.click(deleteAction);

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith('foo');
  });

  it('should disable the remove action if component is managed externally', () => {
    const onDelete = jest.fn();
    const componentManager: CompassComponentDataManager = {
      ecosystemAppId: '1234',
    };

    const { getByTestId } = render(
      <CompassTestProvider>
        <Actions
          component={{ id: 'foo', name: 'foo', dataManager: componentManager }}
          onDelete={onDelete}
          testId="actions"
        />
      </CompassTestProvider>,
    );

    const menu = getByTestId('actions.menu');

    fireEvent.click(menu);

    const deleteAction = getByTestId('actions.delete');

    fireEvent.click(deleteAction);

    // Element should not be clickable so nothing should be called
    expect(onDelete).toHaveBeenCalledTimes(0);
  });
});
