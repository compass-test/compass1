import React from 'react';

import { screen } from '@testing-library/dom';
import { fireEvent, render } from '@testing-library/react';
import faker from 'faker';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import InlineDescription from './index';

const renderDescriptionView = (isDisabled = false) => {
  return render(
    <CompassTestProvider>
      <ApolloAutoMockProvider>
        <InlineDescription
          componentId={faker.random.uuid()}
          description={faker.random.words(10)}
          placeholder={faker.random.word()}
          isDisabled={isDisabled}
        />
      </ApolloAutoMockProvider>
    </CompassTestProvider>,
  );
};

describe('InlineDescription', () => {
  it('should display the description and be able to click it', async () => {
    renderDescriptionView();

    const editDescription = screen.getByRole('button');
    fireEvent.click(editDescription);

    // Find the textbox that opens up
    const inlineEdit = screen.getByRole('textbox');
    expect(inlineEdit as HTMLElement).toBeInTheDocument();
  });

  it('should not display an edit state if clicked while disabled', async () => {
    renderDescriptionView(true);

    const editDescription = screen.getByRole('button');
    fireEvent.click(editDescription);

    // There should be no editing boxes while disabled
    const inlineEdit = screen.queryByRole('textbox');
    expect(inlineEdit).toBeNull();
  });
});
