import React from 'react';

import { screen } from '@testing-library/dom';
import { fireEvent, render } from '@testing-library/react';
import faker from 'faker';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { InlineName } from './index';

const renderName = (isDisabled = false) => {
  return render(
    <CompassTestProvider>
      <ApolloAutoMockProvider>
        <InlineName
          componentId={faker.random.uuid()}
          componentName={faker.random.words(3)}
          isDisabled={isDisabled}
        />
      </ApolloAutoMockProvider>
    </CompassTestProvider>,
  );
};

describe('InlineName', () => {
  it('should display the name and be able to click it', async () => {
    renderName();

    const editName = screen.getByRole('button');
    fireEvent.click(editName);

    // There should be editing buttons while disabled
    const confirmButton = screen.getByRole('button', { name: /Save/i });
    expect(confirmButton as HTMLElement).toBeInTheDocument();
  });

  it('should not display an edit state if clicked while disabled', async () => {
    renderName(true);

    const editName = screen.getByRole('button');
    fireEvent.click(editName);

    // There should be no editing buttons while disabled
    const confirmButton = screen.queryByRole('button', { name: /Save/i });
    expect(confirmButton).toBeNull();
  });
});
