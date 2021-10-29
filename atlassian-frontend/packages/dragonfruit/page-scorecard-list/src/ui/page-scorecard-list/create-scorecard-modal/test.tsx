import React from 'react';

import { render, RenderResult } from '@testing-library/react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import CreateScorecardModal from './main';

describe('CreateScorecardModal', () => {
  let result: RenderResult;
  const nameFieldTestId = 'form-test-create-with-base-modal-name-field';
  const descriptionFieldTestId =
    'form-test-create-with-base-modal-description-field';
  const submitButtonTestId =
    'dragonfruit-scorecards.scorecard-form.form-submit';
  const cancelButtonTestId =
    'dragonfruit-scorecards.scorecard-form.form-cancel';

  beforeEach(() => {
    result = render(
      <CompassTestProvider locale={'en'}>
        <ApolloAutoMockProvider>
          <CreateScorecardModal
            onCancel={() => {}}
            onSubmit={() => {}}
            testId="form-test"
            isModalOpen={true}
          />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );
  });

  it('should have a cancel and submit button', async () => {
    const submitButton = await result.findByTestId(submitButtonTestId);
    const cancelButton = await result.findByTestId(cancelButtonTestId);

    expect(submitButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it('should render the name editor', async () => {
    const nameField = await result.findByTestId(nameFieldTestId);
    expect(nameField).toBeInTheDocument();
    expect(nameField?.getAttribute('value')).toEqual('');
  });

  it('should render the description editor', async () => {
    const descriptionField = await result.findByTestId(descriptionFieldTestId);
    expect(descriptionField).toBeInTheDocument();
    expect(descriptionField!.innerText).toEqual('');
  });
});
