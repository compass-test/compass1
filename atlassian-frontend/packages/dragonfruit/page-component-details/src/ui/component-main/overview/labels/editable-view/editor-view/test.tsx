import React from 'react';

import { screen } from '@testing-library/dom';
import { act, fireEvent, render, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  MOCKED_SEARCH_LABELS,
  MOCKED_SEARCH_LABELS_QUERY,
} from '../../../../../../common/mocks';
import { createLabels } from '../../../../../../common/utils/labels';

import { ComponentLabelsEditor } from './index';

const COMPONENT_ID = 'fakeId';

const renderEditor = (componentId: string, labelCount: number) => {
  const mutationFn = jest.fn(() => ({
    success: true,
  }));

  const resolvers = () => ({
    Mutation: {
      compass: () => ({
        addComponentLabels: mutationFn,
      }),
    },
  });

  const renderResult = render(
    <ApolloAutoMockProvider resolvers={resolvers}>
      <CompassTestProvider>
        <ComponentLabelsEditor
          labels={createLabels(labelCount)}
          componentId={componentId}
        />
      </CompassTestProvider>
    </ApolloAutoMockProvider>,
  );

  return {
    renderResult,
    mutationFn,
  };
};

const addLabel = (labelName: string) => {
  const valueContainer = document.querySelector(
    '.labels_editor__value-container',
  );
  if (valueContainer) {
    act(() => {
      userEvent.click(valueContainer);
    });

    const labelsInput = document.querySelector('#labels_editor_input');

    if (labelsInput) {
      act(() => {
        userEvent.type(labelsInput, labelName);
      });

      act(() => {
        fireEvent.keyDown(labelsInput, { key: 'Enter', code: 'Enter' });
      });
    }
  }
};

const verifyMutationCall = async (
  componentId: string,
  labelName: string,
  mutationFn: any,
) => {
  await wait(() => expect(mutationFn).toHaveBeenCalled());
  expect(mutationFn).toBeCalledTimes(1);

  // get the first argument of the first call
  const input = mutationFn.mock.calls[0][0].input;

  expect(input).toEqual({
    componentId,
    labelNames: [labelName],
  });
};

describe('ComponentLabelsEditor', () => {
  test('should add a new label', async () => {
    const labelName = 'newlabel';

    const { mutationFn } = renderEditor(COMPONENT_ID, 3);
    addLabel(labelName);

    await verifyMutationCall(COMPONENT_ID, labelName, mutationFn);
  });

  test('should add label with only valid values', async () => {
    const labelName = 'MY NEW LABEL';

    const { mutationFn } = renderEditor(COMPONENT_ID, 3);
    addLabel(labelName);

    await verifyMutationCall(COMPONENT_ID, 'my-new-label', mutationFn);
  });

  describe('when full', () => {
    test('should not add label', async () => {
      const labelName = 'newlabel';

      const { mutationFn } = renderEditor(COMPONENT_ID, 10);
      addLabel(labelName);

      await new Promise((r) => setTimeout(r, 500));
      expect(mutationFn).toBeCalledTimes(0);
    });
  });

  describe('autocomplete', () => {
    test('should call the search query on keypress', async () => {
      const queryFn = jest.fn().mockReturnValue({
        nodes: MOCKED_SEARCH_LABELS,
      });

      const resolvers = () => ({
        CompassComponentLabelsQueryResult: {
          __resolveType: () => 'CompassSearchComponentLabelsConnection',
        },
        Query: {
          compass: () => ({
            searchComponentLabels: queryFn,
          }),
        },
      });

      render(
        <ApolloAutoMockProvider resolvers={resolvers}>
          <CompassTestProvider>
            <ComponentLabelsEditor labels={[]} componentId={COMPONENT_ID} />
          </CompassTestProvider>
        </ApolloAutoMockProvider>,
      );

      // wait for the dropdown to load
      await wait(() => screen.getByText(MOCKED_SEARCH_LABELS[0].name));

      const labelsInput = document.querySelector('#labels_editor_input');

      // type into the search
      if (labelsInput) {
        act(() => {
          userEvent.type(labelsInput, 'a');
        });
      }

      await wait(() => expect(queryFn).toHaveBeenCalledTimes(2));

      // check query was called with correct search values
      const variables = queryFn.mock.calls[1][0];
      expect(variables.query).toEqual({
        first: 15,
        query: 'a',
      });
    });

    test('should be able to add labels from the dropdown', async () => {
      const mutationFn = jest.fn().mockReturnValue({ success: true });

      const resolvers = () => ({
        Mutation: {
          compass: () => ({
            addComponentLabels: mutationFn,
          }),
        },
      });

      render(
        <ApolloAutoMockProvider
          mocks={MOCKED_SEARCH_LABELS_QUERY}
          resolvers={resolvers}
        >
          <CompassTestProvider>
            <ComponentLabelsEditor labels={[]} componentId={COMPONENT_ID} />
          </CompassTestProvider>
        </ApolloAutoMockProvider>,
      );

      const optionLabelName = MOCKED_SEARCH_LABELS[1].name;

      // wait for the dropdown to load
      await wait(() => screen.getByText(optionLabelName));

      const labelsInput = document.querySelector('#labels_editor_input');

      // use keypress to select the second option
      if (labelsInput) {
        act(() => {
          fireEvent.keyDown(labelsInput, {
            key: 'ArrowDown',
            code: 'ArrowDown',
          });
        });

        act(() => {
          fireEvent.keyDown(labelsInput, { key: 'Enter', code: 'Enter' });
        });
      }

      await wait(() => expect(mutationFn).toHaveBeenCalledTimes(1));

      // check add mutation was called with correct value
      const variables = mutationFn.mock.calls[0][0];
      expect(variables.input).toEqual({
        componentId: COMPONENT_ID,
        labelNames: [optionLabelName],
      });
    });
  });
});
