import React from 'react';

import { fireEvent, render, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  fireTrackAnalytics,
  fireUIAnalytics,
} from '@atlassian/analytics-bridge';
import { useRecentComponents } from '@atlassian/dragonfruit-component-create-modal';
import { UI_INLINE_CREATE_COMPONENT } from '@atlassian/dragonfruit-feature-flags';
import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import {
  CompassTestProvider,
  MOCK_CLOUD_ID,
} from '@atlassian/dragonfruit-testing';

import { ComponentsTable } from './main';

const mockShowFlag = jest.fn();
jest.mock('@atlaskit/flag', () =>
  Object.assign({}, jest.requireActual('@atlaskit/flag'), {
    useFlags: () => ({
      showFlag: mockShowFlag,
    }),
  }),
);
jest.mock('@atlassian/analytics-bridge', () =>
  Object.assign({}, jest.requireActual('@atlassian/analytics-bridge'), {
    fireUIAnalytics: jest.fn(),
    fireTrackAnalytics: jest.fn(),
  }),
);

const mockAddComponent = jest.fn();
jest.mock('@atlassian/dragonfruit-component-create-modal', () =>
  Object.assign(
    {},
    jest.requireActual('@atlassian/dragonfruit-component-create-modal'),
    {
      useRecentComponents: jest.fn(),
    },
  ),
);

const flags = {
  [UI_INLINE_CREATE_COMPONENT]: true,
};
const inlineCreateTestId =
  'dragonfruit.component-list.inline-create-component.open-inline-form-button';
const inlineNameInputId =
  'dragonfruit.component-list.inline-create-component.name-field';
const inlineDescInputId =
  'dragonfruit.component-list.inline-create-component.description-field';
const inlineCancelButtonId =
  'dragonfruit.component-list.inline-create-component.cancel-button';
const inlineCreateButtonId =
  'dragonfruit.component-list.inline-create-component.submit-button';

const mockCreateComponent = jest.fn();

const resolvers = () => ({
  Mutation: { compass: () => ({ createComponent: mockCreateComponent }) },
});

const mockResults = [
  {
    component: {
      id: `ari:cloud:compass:${MOCK_CLOUD_ID}:component/m4t90ygjmsoae`,
      name: 'C1',
      ownerId: `ari:cloud:teams::team/mo9mw4g`,
      ownerName: 'Team 1',
      description: 'C1 desc',
      type: CompassComponentType.SERVICE,
    },
    link: 'something',
  },
  {
    component: {
      id: `ari:cloud:compass:${MOCK_CLOUD_ID}:component/24mtg9ts4r`,
      name: 'C2',
      ownerId: `ari:cloud:teams::team/23mf9g0ykhs4r`,
      ownerName: 'Team 9',
      description: 'descr22',
      type: CompassComponentType.SERVICE,
    },
    link: 'something different',
  },
];

const mockLocalComponents = [
  mockResults[1].component,
  {
    id: `ari:cloud:compass:${MOCK_CLOUD_ID}:component/mm3590hbzsed`,
    name: 'C3',
    ownerId: `ari:cloud:teams::team/24mf90tsf`,
    ownerName: 'Team 12',
    description: 'whoaaaa',
    type: CompassComponentType.SERVICE,
  },
];

describe('ComponentsTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRecentComponents as any).mockImplementation(() => [
      { localComponents: mockLocalComponents },
      { addComponent: mockAddComponent },
    ]);
  });

  test('render empty state components table', async () => {
    (useRecentComponents as any).mockImplementation(() => [
      { localComponents: [] },
      { addComponent: mockAddComponent },
    ]);
    const { getByText, queryByText } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider resolvers={resolvers}>
          <CompassTestProvider flags={flags}>
            <ComponentsTable
              componentType={CompassComponentType.SERVICE}
              emptyState={<div>Currently an empty table</div>}
              loading={false}
              showOwner={true}
              showInlineCreate={true}
            />
          </CompassTestProvider>
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    expect(getByText(/Name/i)).toBeInTheDocument();
    expect(getByText(/Description/i)).toBeInTheDocument();
    expect(getByText(/Owner team/i)).toBeInTheDocument();
    expect(getByText(/Currently an empty table/i)).toBeInTheDocument();
    expect(queryByText(/Create component/i)).toBeNull();
  });

  test('render components table with results', async () => {
    const { getByText, queryByText } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider resolvers={resolvers}>
          <CompassTestProvider flags={flags}>
            <ComponentsTable
              componentType={CompassComponentType.SERVICE}
              emptyState={<div>Currently an empty table</div>}
              loading={false}
              results={mockResults}
              showOwner={true}
              showInlineCreate={true}
            />
          </CompassTestProvider>
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    expect(queryByText(/Currently an empty table/i)).toBeNull();
    mockResults.map((res) => {
      expect(getByText(res.component.name)).toBeInTheDocument();
      expect(getByText(res.component.description)).toBeInTheDocument();
      expect(getByText(res.component.ownerName)).toBeInTheDocument();
    });
    expect(getByText(/Name/i)).toBeInTheDocument();
    expect(getByText(/Description/i)).toBeInTheDocument();
    expect(getByText(/Owner team/i)).toBeInTheDocument();
    expect(getByText(/Create component/i)).toBeInTheDocument();
  });

  test('click inline create component', async () => {
    const { getByTestId, getAllByText, getByText, queryByText } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider resolvers={resolvers}>
          <CompassTestProvider flags={flags}>
            <ComponentsTable
              componentType={CompassComponentType.SERVICE}
              emptyState={<div>Currently an empty table</div>}
              loading={false}
              results={mockResults}
              showOwner={true}
              showInlineCreate={true}
            />
          </CompassTestProvider>
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    fireEvent.click(getByTestId(inlineCreateTestId));

    await wait(() =>
      expect(getByTestId(inlineNameInputId)).toBeInTheDocument(),
    );

    expect(queryByText(/Currently an empty table/i)).toBeNull();
    mockResults.map((res) => {
      expect(getByText(res.component.name)).toBeInTheDocument();
      expect(getByText(res.component.description)).toBeInTheDocument();
      expect(getByText(res.component.ownerName)).toBeInTheDocument();
    });

    expect(getAllByText(/Name/i).length).toEqual(2);
    expect(getAllByText(/Description/i).length).toEqual(2);
    expect(getAllByText(/Owner team/i).length).toEqual(2);
    expect(getAllByText(/Select.../i).length).toEqual(1);

    expect(fireUIAnalytics).toHaveBeenCalledWith(
      expect.anything(),
      'inlineCreateComponent',
      { componentType: 'SERVICE' },
    );
  });

  test('add local components to list appropriately', async () => {
    const { getByText, queryByText } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider resolvers={resolvers}>
          <CompassTestProvider flags={flags}>
            <ComponentsTable
              componentType={CompassComponentType.SERVICE}
              emptyState={<div>Currently an empty table</div>}
              loading={false}
              results={mockResults}
              showOwner={true}
              showInlineCreate={true}
            />
          </CompassTestProvider>
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    expect(queryByText(/Currently an empty table/i)).toBeNull();
    mockResults.map((res) => {
      expect(getByText(res.component.name)).toBeInTheDocument();
      expect(getByText(res.component.description)).toBeInTheDocument();
      expect(getByText(res.component.ownerName)).toBeInTheDocument();
    });

    expect(getByText(mockLocalComponents[1].name)).toBeInTheDocument();
    expect(getByText(mockLocalComponents[1].description)).toBeInTheDocument();
    expect(getByText(mockLocalComponents[1].ownerName)).toBeInTheDocument();
  });

  test('create component via inline', async () => {
    mockCreateComponent.mockReturnValue({
      success: true,
      componentDetails: {
        id: `ari:cloud:compass:${MOCK_CLOUD_ID}:component/m94jt5gssdzz`,
      },
    });

    const { getByTestId } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider resolvers={resolvers}>
          <CompassTestProvider flags={flags}>
            <ComponentsTable
              componentType={CompassComponentType.SERVICE}
              emptyState={<div>Currently an empty table</div>}
              loading={false}
              results={mockResults}
              showOwner={true}
              showInlineCreate={true}
            />
          </CompassTestProvider>
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    fireEvent.click(getByTestId(inlineCreateTestId));

    await wait(() =>
      expect(getByTestId(inlineNameInputId)).toBeInTheDocument(),
    );

    userEvent.type(getByTestId(inlineNameInputId), 'My Awesome Component Name');
    userEvent.type(
      getByTestId(inlineDescInputId),
      'My Awesome Component Description',
    );

    fireEvent.click(getByTestId(inlineCreateButtonId));

    await wait(() => expect(mockCreateComponent).toHaveBeenCalled());
    expect(mockCreateComponent.mock.calls[0][0]).toMatchObject({
      cloudId: MOCK_CLOUD_ID,
      input: {
        description: 'My Awesome Component Description',
        name: 'My Awesome Component Name',
        type: 'SERVICE',
      },
    });
    expect(mockAddComponent).toHaveBeenCalledWith({
      id:
        'ari:cloud:compass:7550aec5-71ad-43de-8402-8f7d2d37398c:component/m94jt5gssdzz',
      name: 'My Awesome Component Name',
      description: 'My Awesome Component Description',
      ownerId: undefined,
      ownerName: undefined,
      type: 'SERVICE',
    });
    expect(fireUIAnalytics).toHaveBeenCalledWith(
      expect.anything(),
      'inlineCreateComponent',
      { componentType: 'SERVICE' },
    );
    expect(fireUIAnalytics).toHaveBeenCalledWith(
      expect.anything(),
      'createButton clicked',
      'inlineCreateComponent',
      { componentType: 'SERVICE' },
    );
    expect(fireTrackAnalytics).toHaveBeenCalledWith(
      expect.anything(),
      'inlineComponent created',
      'inlineCreateComponent',
      { componentType: 'SERVICE' },
    );
  });

  test('handle create component error', async () => {
    mockCreateComponent.mockImplementation(() => {
      throw new Error('Something went wrong!');
    });

    const { getByTestId } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider resolvers={resolvers}>
          <CompassTestProvider flags={flags}>
            <ComponentsTable
              componentType={CompassComponentType.SERVICE}
              emptyState={<div>Currently an empty table</div>}
              loading={false}
              results={mockResults}
              showOwner={true}
              showInlineCreate={true}
            />
          </CompassTestProvider>
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    fireEvent.click(getByTestId(inlineCreateTestId));

    await wait(() =>
      expect(getByTestId(inlineNameInputId)).toBeInTheDocument(),
    );

    userEvent.type(getByTestId(inlineNameInputId), 'My Awesome Component Name');
    userEvent.type(
      getByTestId(inlineDescInputId),
      'My Awesome Component Description',
    );

    fireEvent.click(getByTestId(inlineCreateButtonId));

    await wait(() => expect(mockCreateComponent).toHaveBeenCalled());
    expect(mockCreateComponent.mock.calls[0][0]).toMatchObject({
      cloudId: MOCK_CLOUD_ID,
      input: {
        description: 'My Awesome Component Description',
        name: 'My Awesome Component Name',
        type: 'SERVICE',
      },
    });
    expect(fireUIAnalytics).toHaveBeenCalledWith(
      expect.anything(),
      'inlineCreateComponent',
      { componentType: 'SERVICE' },
    );
    expect(fireUIAnalytics).toHaveBeenCalledWith(
      expect.anything(),
      'createButton clicked',
      'inlineCreateComponent',
      { componentType: 'SERVICE' },
    );
    expect(fireTrackAnalytics).not.toHaveBeenCalledWith(
      expect.anything(),
      'inlineComponent created',
      'inlineCreateComponent',
      { componentType: 'SERVICE' },
    );
    expect(mockShowFlag).toHaveBeenCalledWith({
      description:
        'An error occured while creating your component. Please try again.',
      icon: expect.anything(),
      isAutoDismiss: true,
      testId: 'dragonfruit.component-list.inline-create-component.error-flag',
      title: 'Error creating component',
    });
  });

  test('cancel inline create form', async () => {
    const { getByTestId } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider resolvers={resolvers}>
          <CompassTestProvider flags={flags}>
            <ComponentsTable
              componentType={CompassComponentType.SERVICE}
              emptyState={<div>Currently an empty table</div>}
              loading={false}
              results={mockResults}
              showOwner={true}
              showInlineCreate={true}
            />
          </CompassTestProvider>
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    fireEvent.click(getByTestId(inlineCreateTestId));

    await wait(() =>
      expect(getByTestId(inlineNameInputId)).toBeInTheDocument(),
    );

    userEvent.type(getByTestId(inlineNameInputId), 'My Awesome Component Name');
    userEvent.type(
      getByTestId(inlineDescInputId),
      'My Awesome Component Description',
    );

    fireEvent.click(getByTestId(inlineCancelButtonId));

    await wait(() =>
      expect(getByTestId(inlineCreateTestId)).toBeInTheDocument(),
    );

    expect(mockCreateComponent).not.toHaveBeenCalled();

    expect(fireUIAnalytics).toHaveBeenCalledWith(
      expect.anything(),
      'inlineCreateComponent',
      { componentType: 'SERVICE' },
    );
    expect(fireUIAnalytics).toHaveBeenCalledWith(
      expect.anything(),
      'cancelInlineCreateComponent',
      { componentType: 'SERVICE' },
    );
  });
});
