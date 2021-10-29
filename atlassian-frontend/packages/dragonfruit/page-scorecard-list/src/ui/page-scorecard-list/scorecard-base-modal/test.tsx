import React from 'react';

import { act, render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  AccountStatus,
  CompassComponentType,
  CompassScorecard,
  CompassScorecardImportance,
  fake,
} from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import ScorecardBaseModal from './main';

describe('ScorecardBaseModal', () => {
  let result: RenderResult;

  const nameFieldTestId = 'form-test-name-field';
  const nameErrorTestId = `${nameFieldTestId}-error`;
  const descriptionFieldTestId = 'form-test-description-field';
  const submitButtonTestId =
    'dragonfruit-scorecards.scorecard-form.form-submit';
  const cancelButtonTestId =
    'dragonfruit-scorecards.scorecard-form.form-cancel';

  const fakeCompassScorecard = fake<CompassScorecard>({
    owner: {
      accountId: '1234',
      accountStatus: AccountStatus.ACTIVE,
      name: 'test',
      picture: null,
    },
    id: 'fake-scorecard-id',
    name: 'Product happiness',
    description: 'A production happiness scorecard',
    criterias: [],
    componentType: CompassComponentType.APPLICATION,
    importance: CompassScorecardImportance.RECOMMENDED,
    changeMetadata: {},
  });

  beforeEach(() => {
    result = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <ScorecardBaseModal
            onCancel={() => {}}
            onSubmit={() => {}}
            testId="form-test"
            mutationCallback={() => {}}
            scorecard={fakeCompassScorecard() as CompassScorecard}
            isModalOpen={true}
          />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );
  });

  it('should have a cancel and submit button', async () => {
    await result.findByTestId(nameFieldTestId);
    await result.findByTestId(descriptionFieldTestId);
    const submitButton = await result.findByTestId(submitButtonTestId);
    const cancelButton = await result.findByTestId(cancelButtonTestId);

    expect(submitButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it('should render the name editor with the scorecard name', async () => {
    const nameField = await result.findByTestId(nameFieldTestId);
    await result.findByTestId(descriptionFieldTestId);
    await result.findByTestId(submitButtonTestId);
    await result.findByTestId(cancelButtonTestId);

    expect(nameField).toBeInTheDocument();
    expect(nameField?.getAttribute('value')).toEqual('Product happiness');
  });

  it('should render the description editor with the scorecard description', async () => {
    await result.findByTestId(nameFieldTestId);
    const descriptionField = await result.findByTestId(descriptionFieldTestId);
    await result.findByTestId(submitButtonTestId);
    await result.findByTestId(cancelButtonTestId);

    expect(descriptionField).toBeInTheDocument();
    expect(descriptionField!.innerText).toEqual(
      'A production happiness scorecard',
    );
  });

  it('should render name error if submitted with blank name', async () => {
    const nameField = await result.findByTestId(nameFieldTestId);
    await result.findByTestId(descriptionFieldTestId);
    const submitButton = await result.findByTestId(submitButtonTestId);
    await result.findByTestId(cancelButtonTestId);

    act(() => {
      userEvent.clear(nameField!);
      userEvent.click(submitButton!);
    });

    const nameError = await result.findByTestId(nameErrorTestId);
    expect(nameError).toBeInTheDocument();
    expect(nameError!.innerText).toEqual('Add a name for this scorecard.');
  });
});
