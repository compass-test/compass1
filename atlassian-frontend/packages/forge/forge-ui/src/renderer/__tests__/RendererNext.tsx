import React, { Fragment, Suspense, useEffect, useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { temporarilySilenceActAndAtlaskitDeprecationWarnings } from '@atlassian/aux-test-utils';
import { ForgeDoc } from '@atlassian/forge-ui-types';
import RendererNext, { downgradeDispatch } from '../RendererNext';

temporarilySilenceActAndAtlaskitDeprecationWarnings();

const UNKNOWN = 'NotARealComponent';
const dispatchSpy = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Loader', () => {
  test('to render loading state when forgeDoc is not available', () => {
    const { getByTestId } = render(
      <RendererNext
        forgeDoc={undefined}
        loading={true}
        dispatch={dispatchSpy}
      />,
    );
    expect(getByTestId('forge-app-loading-spinner')).toBeTruthy();
  });

  test('to disappear when forgeDoc defined', async () => {
    const invokeSpy = jest.fn();
    const forgeDoc: ForgeDoc = {
      type: 'View',
      key: 'View.0',
      children: [
        {
          children: [],
          key: 'Button.1',
          props: {
            text: 'Hello World!',
          },
          type: 'Button',
        },
      ],
    };
    const { findByText, getByTestId } = render(
      <RendererNext
        forgeDoc={forgeDoc}
        loading={false}
        error={undefined}
        dispatch={invokeSpy}
      />,
    );
    expect(getByTestId('forge-app-loading-spinner')).toBeTruthy();
    // Wait for suspense to load
    const span = await findByText('Hello World!');
    expect(span).toBeTruthy();
  });

  test('customLoader shown instead of default', async () => {
    const { findByText } = render(
      <RendererNext
        loading={true}
        dispatch={dispatchSpy}
        loadingComponent={'Loading...' /* hello old friend... */}
      />,
    );
    expect(findByText('Loading...')).toBeTruthy();
  });

  test('customLoader shown until async component resolves', async () => {
    const mounted = jest.fn();
    const Button = ({ children }: { children: React.ReactNode }) => (
      <button data-testid="button">{children}</button>
    );
    let resolve = (_: any) => {};
    let AsyncButton = React.lazy(
      () =>
        new Promise((res) => {
          resolve = res;
        }),
    );

    const CustomLoader = () => {
      useEffect(mounted, []);
      return <div data-testid="loader">Loading...</div>;
    };

    const App = () => {
      const [forgeDoc, setForgeDoc] = useState<ForgeDoc | undefined>(undefined);
      return (
        <Fragment>
          <RendererNext
            loading={true}
            forgeDoc={forgeDoc}
            dispatch={dispatchSpy}
            loadingComponent={<CustomLoader />}
            components={() => ({
              Button: () => <AsyncButton>Button</AsyncButton>,
            })}
          />
          <button
            onClick={() => setForgeDoc({ type: 'Button', children: [] })}
            data-testid="set-forge-doc"
          />
        </Fragment>
      );
    };

    const { findByTestId } = render(<App />);

    // loader shown while forge doc is fetched
    await findByTestId('loader');

    const setForgeDoc = await findByTestId('set-forge-doc');
    fireEvent.click(setForgeDoc);

    // loader shown while async component is resolved
    resolve({ default: Button });

    // loader hidden, app rendered
    await findByTestId('button');

    // if this is called more than once, the loading component has been mounted multiple times
    // the user will see a janky spinner if this happens
    expect(mounted).toBeCalledTimes(1);
  });
});

test('correctly renders and overrides an existing component', async () => {
  const doc: ForgeDoc = {
    type: 'View',
    key: 'View.0',
    children: [
      {
        key: '0',
        type: 'Text',
        children: [],
        props: {
          content: 'Hello World!',
        },
      },
    ],
  };

  const { findByTestId } = render(
    <Suspense fallback={() => 'loading'}>
      <RendererNext
        forgeDoc={doc}
        loading={false}
        error={undefined}
        dispatch={dispatchSpy}
        components={(defaults) => ({
          ...defaults,
          Text: ({ forgeDoc }) => (
            <strong key={forgeDoc.key} data-testid="bold-message">
              {forgeDoc.props && forgeDoc.props.content}
            </strong>
          ),
        })}
      />
    </Suspense>,
  );
  const elem = await findByTestId('bold-message');

  expect(elem.innerText).toEqual('Hello World!');
});

test('<ModalDialog><Form /></ModalDialog> swaps props around and does not render Form', async () => {
  const modalFormAux: ForgeDoc = {
    type: 'View',
    key: 'View.0',
    children: [
      {
        type: 'ModalDialog',
        key: 'modalKey',
        props: {
          onClose: {
            componentKey: 'modalKey',
            prop: 'onClose',
          },
          header: 'Form modal',
        },
        children: [
          {
            type: 'Form',
            key: 'formKey',
            props: {
              onSubmit: {
                componentKey: 'formKey',
                prop: 'onSubmit',
              },
              submitButtonText: 'Submit me',
            },
            children: [
              {
                type: 'TextField',
                key: 'textFieldKey',
                props: {
                  name: 'textFieldName',
                  label: 'textFieldLabel',
                },
                children: [],
              },
            ],
          },
        ],
      },
    ],
  };
  const { findByLabelText, getByTestId } = render(
    <RendererNext
      forgeDoc={modalFormAux}
      loading={false}
      error={undefined}
      dispatch={dispatchSpy}
      components={(defaults) => ({
        ...defaults,
        Form: () => {
          throw new Error('Form behaviour should be handled by ModalDialog');
        },
      })}
    />,
  );

  const textField = await findByLabelText('textFieldLabel');
  fireEvent.change(textField, { target: { value: 'some input' } });
  const form = getByTestId('form') as HTMLFormElement;
  fireEvent.submit(form);

  expect(dispatchSpy).toHaveBeenCalledWith({
    type: 'event',
    args: [
      {
        textFieldName: 'some input',
      },
    ],
    extensionData: {},
    handler: {
      componentKey: 'formKey',
      prop: 'onSubmit',
    },
  });
});

describe.each([
  ['User* is provided', true],
  ['User* is not provided', false],
])('User* and Avatar* components', (isUserProvidedMessage, isUserProvided) => {
  test.each([
    [isUserProvided ? 'User' : 'Avatar', 'User'],
    [isUserProvided ? 'User' : 'Avatar', 'Avatar'],
    [isUserProvided ? 'UserGroup' : 'AvatarStack', 'UserGroup'],
    [isUserProvided ? 'UserGroup' : 'AvatarStack', 'AvatarStack'],
  ])(
    `correctly uses %s when ${isUserProvidedMessage} by product and %s is provided in forge doc`,
    async (expectedComponentUsed, forgeDocComponent) => {
      const doc: ForgeDoc = {
        type: 'View',
        key: 'View.0',
        children: [
          {
            key: '0',
            type: forgeDocComponent,
            children: [],
            props: {
              content: 'Hello World!',
            },
          },
        ],
      };

      const createMessageToMatch = (component: string) =>
        `This definition was matched with ${component}`;

      const { findByText } = render(
        <Suspense fallback={() => 'loading'}>
          <RendererNext
            forgeDoc={doc}
            loading={false}
            error={undefined}
            dispatch={dispatchSpy}
            components={(defaults) => ({
              ...defaults,
              ...(isUserProvided
                ? {
                    User: () => createMessageToMatch('User'),
                    UserGroup: () => createMessageToMatch('UserGroup'),
                  }
                : {}),
              Avatar: () => createMessageToMatch('Avatar'),
              AvatarStack: () => createMessageToMatch('AvatarStack'),
            })}
          />
        </Suspense>,
      );
      await expect(
        findByText(createMessageToMatch(expectedComponentUsed)),
      ).resolves.toBeDefined();
    },
  );
});

test('correctly reports an unknown component', async () => {
  const consoleErrorSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {});
  const unknownAux: ForgeDoc = {
    type: 'View',
    key: 'View.0',
    children: [
      {
        type: UNKNOWN,
        children: [],
      },
    ],
  };
  const { findByText } = render(
    <RendererNext
      forgeDoc={unknownAux}
      dispatch={dispatchSpy}
      loading={false}
      error={undefined}
    />,
  );
  expect(
    await findByText(
      `Error rendering app - encountered unknown component ${UNKNOWN}.`,
    ),
  ).toBeTruthy();
  expect(consoleErrorSpy.mock.calls[0][0]).toEqual(
    expect.stringContaining(
      'Error rendering app - encountered unknown component NotARealComponent',
    ),
  );
  consoleErrorSpy.mockRestore();
});

test('renders an error panel when an error is passed into the renderer', async () => {
  const { findByText } = render(
    <RendererNext
      dispatch={dispatchSpy}
      loading={false}
      error={'Oh no an error occurred'}
    />,
  );
  expect(await findByText(`Oh no an error occurred`)).toBeTruthy();
  expect(await findByText(`Refresh app`)).toBeTruthy();
});

describe('DowngradeDispatch', () => {
  test('checks that memoization of dispatch works', () => {
    const downgradedDispatch1 = downgradeDispatch(dispatchSpy);
    const downgradedDispatch2 = downgradeDispatch(dispatchSpy);

    expect(downgradedDispatch1).toBe(downgradedDispatch2);
  });
});
