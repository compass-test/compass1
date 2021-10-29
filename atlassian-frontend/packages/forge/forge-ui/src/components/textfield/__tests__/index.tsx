import React, { Suspense } from 'react';
import { TextFieldProps } from '@atlassian/forge-ui-types';
import { render, fireEvent, cleanup } from '@testing-library/react';
import TextField from '../';
import AKForm from '@atlaskit/form';

const Component = (props: Partial<TextFieldProps> = {}) => {
  return (
    <Suspense fallback="loading">
      <TextField
        name={'username'}
        label={'username'}
        testId={'el'}
        {...props}
      />
    </Suspense>
  );
};

// todo - update to Forge form
const FormComponent = () => (
  <Suspense fallback="loading">
    <AKForm onSubmit={jest.fn()}>
      {({ formProps, dirty, submitting }) => (
        <form {...formProps} data-testid={'form'}>
          <TextField
            label="email"
            name="email"
            type={'email'}
            placeholder="Enter an email"
            testId={'email'}
          />
          <TextField
            label="number"
            name="number"
            type={'number'}
            placeholder="Enter a number"
            testId={'number'}
          />
        </form>
      )}
    </AKForm>
  </Suspense>
);

describe('TextField component', () => {
  afterEach(cleanup);

  test('is lazy loaded', async () => {
    const { findByLabelText, getByText } = render(Component());
    expect(getByText('loading')).toBeInTheDocument();
    await expect(await findByLabelText('username')).toBeInTheDocument();
  });

  test('to have with a label', async () => {
    const { getByLabelText } = render(
      Component({
        label: 'username label',
      }),
    );
    await expect(await getByLabelText('username label')).toBeInTheDocument();
  });

  test('to have a placeholder', async () => {
    const { findByPlaceholderText } = render(
      Component({ placeholder: 'my placeholder' }),
    );
    await expect(
      await findByPlaceholderText('my placeholder'),
    ).toBeInTheDocument();
  });

  test('to have a description', async () => {
    const { findByText } = render(Component({ description: 'description' }));
    await expect(await findByText('description')).toBeInTheDocument();
  });

  test('email invalidates as expected', () => {
    const { getByTestId } = render(<FormComponent />);
    const input = getByTestId('email') as HTMLInputElement;
    const form = getByTestId('form') as HTMLFormElement;

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Good Day' } });
    fireEvent.blur(input);
    fireEvent.submit(form);

    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  test('email validates as expected', () => {
    const { getByTestId } = render(<FormComponent />);
    const input = getByTestId('email') as HTMLInputElement;
    const form = getByTestId('form') as HTMLFormElement;

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'hello@atlassian.net' } });
    fireEvent.blur(input);
    fireEvent.submit(form);

    expect(input).not.toHaveAttribute('aria-invalid');
  });

  test('number invalidates as expected', () => {
    const { getByTestId } = render(<FormComponent />);
    const input = getByTestId('number') as HTMLInputElement;
    const form = getByTestId('form') as HTMLFormElement;

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Good Day' } });
    fireEvent.blur(input);
    fireEvent.submit(form);

    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  test('number validates as expected', () => {
    const { getByTestId } = render(<FormComponent />);
    const input = getByTestId('number') as HTMLInputElement;
    const form = getByTestId('form') as HTMLFormElement;

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '22' } });
    fireEvent.blur(input);
    fireEvent.submit(form);

    expect(input).not.toHaveAttribute('aria-invalid');
  });
});
