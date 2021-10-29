import React, { Suspense } from 'react';
import {
  render,
  waitForElement,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import Range from '..';
import { Form } from '../../form';
import { RangeProps } from '@atlaskit/range/range';
import {
  temporarilySilenceActAndAtlaskitDeprecationWarnings,
  createMockHandler,
} from '@atlassian/aux-test-utils';

temporarilySilenceActAndAtlaskitDeprecationWarnings();

const RangeComponent = (props: Partial<RangeProps> = {}) => (
  <Suspense fallback="loading">
    <Range label={'a'} name={'a'} testId={'range'} {...props} />
  </Suspense>
);

const onSubmit = createMockHandler('onSubmit');
const mockDispatch = jest.fn();
const FormComponent = () => {
  return (
    <Suspense fallback="loading">
      <Form
        forgeDoc={{
          type: 'Form',
          key: 'Form.0',
          props: {
            submitButtonText: 'submit',
            onSubmit,
          },
          children: [
            {
              type: 'Range',
              key: 'Range.0',
              props: {
                label: 'range',
                name: 'range',
                testId: 'range',
              },
              children: [],
            },
          ],
        }}
        dispatch={mockDispatch}
        render={(forgeDoc) => {
          if (forgeDoc.type === 'Range') {
            // @ts-ignore
            return <Range {...forgeDoc.props} key={forgeDoc.key} />;
          }
        }}
      />
    </Suspense>
  );
};

describe('Range component', () => {
  afterEach(cleanup);

  test('renders', async () => {
    const { getByTestId } = render(<RangeComponent />);
    const range = await waitForElement(() => getByTestId('range'));
    expect(range).toBeInTheDocument();
  });

  test('range props emit when submit and form is pristine', async () => {
    const { container, getByTestId } = render(<FormComponent />);
    // await for suspense to resolve
    await waitForElement(() => getByTestId('range'));
    const form = container.querySelector('form') as HTMLFormElement;

    fireEvent.submit(form);

    expect(mockDispatch).toBeCalled();
    expect(mockDispatch).toHaveBeenCalledWith({
      args: [{ range: 0 }],
      handler: onSubmit,
      type: 'event',
      extensionData: {},
    });
  });

  test('range props emit when submit and form is dirty', async () => {
    const { container, getByTestId } = render(<FormComponent />);
    // await for suspense to resolve
    const range = await waitForElement(() => getByTestId('range'));
    const form = container.querySelector('form') as HTMLFormElement;

    fireEvent.change(range, { target: { value: 23 } });
    fireEvent.submit(form);

    expect(mockDispatch).toHaveBeenCalledWith({
      args: [{ range: 23 }],
      handler: onSubmit,
      type: 'event',
      extensionData: {},
    });
  });
});
