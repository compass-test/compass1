import React from 'react';

import { mount, ReactWrapper } from 'enzyme';
import ReactDOM from 'react-dom';
import { act } from 'react-test-renderer';

import InlineEdit from '@atlaskit/inline-edit';
import Textfield from '@atlaskit/textfield';

import { Variable } from '../../../types';
import PipelinesVariables from '../../PipelinesVariables';
import PipelinesVariablesRow from '../../PipelinesVariablesRow';
import { ErrorMessageWrapper } from '../../styled';

class AddVariableFormHelper {
  component: ReactWrapper;

  constructor(component: ReactWrapper) {
    this.component = component;
  }

  findKeyTextField = () => {
    return this.component.find(Textfield).find('[name="key"]').first();
  };

  findValueTextField = () => {
    return this.component.find(Textfield).find('[name="value"]').first();
  };

  editKey = (value: string) => {
    const inputField = this.component.find('input[name="key"]').at(0);
    inputField.simulate('click');
    (ReactDOM.findDOMNode(inputField.instance()) as any).value = value;
    inputField.simulate('change');
    return this;
  };

  editValue = (value: string) => {
    const inputField = this.component.find('input[name="value"]').at(0);
    inputField.simulate('click');
    (ReactDOM.findDOMNode(inputField.instance()) as any).value = value;
    inputField.simulate('change');
    return this;
  };

  toggleSecure = () => {
    this.component.find('input[id="secured"]').first().simulate('change');
    return this;
  };

  submit = () => {
    this.component.find('button[type="submit"]').first().simulate('submit');
    return this;
  };

  expectKeyToBeInvalid = (message: string) => {
    expect((this.findKeyTextField().props() as any).isInvalid).toBeTruthy();
    expect(this.component.find(ErrorMessageWrapper).text()).toEqual(message);
    return this;
  };

  expectKeyToBeValid = () => {
    expect((this.findKeyTextField().props() as any).isInvalid).toBeFalsy();
    return this;
  };

  expectValueToBeValid = () => {
    expect((this.findValueTextField().props() as any).isInvalid).toBeFalsy();
    return this;
  };

  expectValueToBeInvalid = (message: string) => {
    expect((this.findValueTextField().props() as any).isInvalid).toBeTruthy();
    expect(this.component.find(ErrorMessageWrapper).text()).toEqual(message);
    return this;
  };
}

class InlineEditHelper {
  row: number;
  col: number;
  component: ReactWrapper;

  constructor(component: ReactWrapper, row: number, col: number) {
    this.component = component;
    this.row = row;
    this.col = col;
  }

  findInlineEdit = (row: number, col: number) => {
    return this.component
      .find(PipelinesVariablesRow)
      .at(row)
      .find(InlineEdit)
      .at(col);
  };

  confirm = () => {
    const inlineEdit = this.findInlineEdit(this.row, this.col);
    act(() => {
      (inlineEdit.props() as any).onConfirm({});
    });
    return this;
  };

  cancel = () => {
    const inlineEdit = this.findInlineEdit(this.row, this.col);
    const button = inlineEdit.find('button[aria-label="Cancel"]').at(0);
    button.simulate('click');
    return this;
  };

  click = () => {
    this.findInlineEdit(this.row, this.col).find('button').simulate('click');
    this.findInlineEdit(this.row, this.col).find('input').simulate('focus');
    return this;
  };

  edit = (value: string) => {
    // findInlineEdit(this.row, this.col).find('button').simulate('click');
    // Inline edit needs to be reloaded due to state changes.
    (ReactDOM.findDOMNode(
      this.findInlineEdit(this.row, this.col).find('input').instance(),
    ) as any).value = value;
    this.findInlineEdit(this.row, this.col).find('input').simulate('change');
    return this;
  };

  expectValidationError = (message: string) => {
    const inlineEdit = this.findInlineEdit(this.row, this.col);
    expect((inlineEdit.props() as any).validate()).toEqual(message);
    return this;
  };

  expectEditViewValue = (value: string) => {
    this.component.update();
    const inlineEdit = this.findInlineEdit(this.row, this.col);
    expect((inlineEdit.props() as any).editView().props.value).toEqual(value);
    return this;
  };

  expectNoValidationError = () => {
    const inlineEdit = this.findInlineEdit(this.row, this.col);
    expect((inlineEdit.props() as any).isInvalid).toBeFalsy();
    return this;
  };

  expectReadViewValue = (value: string) => {
    const inlineEdit = this.findInlineEdit(this.row, this.col);
    expect((inlineEdit.props() as any).readView().props.children).toEqual(
      value,
    );
    return this;
  };

  expectReadViewToBeSecure = () => {
    const inlineEdit = this.findInlineEdit(this.row, this.col);
    expect((inlineEdit.props() as any).readView().props.children).toEqual(
      '••••••',
    );
    return this;
  };
}

const createVariableForm = (component: ReactWrapper) => {
  return new AddVariableFormHelper(component);
};

const variableKeyInlineEdit = (component: ReactWrapper, row = 1) => {
  return new InlineEditHelper(component, row, 0);
};

const variableValueInlineEdit = (component: ReactWrapper, row = 1) => {
  return new InlineEditHelper(component, row, 1);
};

describe('PipelinesVariables component', () => {
  const originalError = global.console.error;
  beforeAll(() => {
    // surpressees React warnings until it can be updated to 16.9+ to support async act
    global.console.error = jest.fn((...args) => {
      if (
        (typeof args[0] === 'string' &&
          args[0].includes('Warning: State updates from the useState()')) ||
        args[0].includes(
          'Warning: An update to %s inside a test was not wrapped in act',
        )
      ) {
        return;
      }
      return originalError.call(console, args);
    });
  });

  afterAll(() => {
    (global.console.error as any).mockRestore();
  });

  it('should create a new valid variable', () => {
    const createVariable = jest.fn();

    createVariableForm(
      mount(
        <PipelinesVariables
          createVariable={createVariable}
          deleteVariable={jest.fn()}
          updateVariable={jest.fn()}
          isFetchingVariables={false}
          isReadOnly={false}
          variables={[]}
        />,
      ),
    )
      .editKey('foo')
      .editValue('bar')
      .submit();

    expect(createVariable).toBeCalledWith({
      key: 'foo',
      secured: true,
      value: 'bar',
    });
  });

  it('should create a new valid unsecured variable', () => {
    const createVariable = jest.fn();

    createVariableForm(
      mount(
        <PipelinesVariables
          createVariable={createVariable}
          deleteVariable={jest.fn()}
          updateVariable={jest.fn()}
          isFetchingVariables={false}
          isReadOnly={false}
          variables={[]}
        />,
      ),
    )
      .editKey('foo')
      .editValue('bar')
      .toggleSecure()
      .submit();

    expect(createVariable).toBeCalledWith({
      key: 'foo',
      secured: false,
      value: 'bar',
    });
  });

  it('should mark form fields as required for a new variable', () => {
    createVariableForm(
      mount(
        <PipelinesVariables
          createVariable={jest.fn()}
          deleteVariable={jest.fn()}
          updateVariable={jest.fn()}
          isFetchingVariables={false}
          isReadOnly={false}
          variables={[]}
        />,
      ),
    )
      .submit()
      .expectKeyToBeInvalid('Please fill out this field.')
      .expectValueToBeValid()
      .editKey('xx')
      .submit()
      .expectValueToBeInvalid('Please fill out this field.');
  });

  it('should mark the variable key field as required when editing an existing variable', () => {
    variableKeyInlineEdit(
      mount(
        <PipelinesVariables
          createVariable={jest.fn()}
          deleteVariable={jest.fn()}
          updateVariable={jest.fn()}
          isFetchingVariables={false}
          isReadOnly={false}
          variables={[{ uuid: 'foo', key: 'foo', value: 'foo' } as Variable]}
        />,
      ),
    )
      .click()
      .expectEditViewValue('foo')
      .edit('')
      .expectValidationError('Please fill out this field.');
  });

  it('should reset the variable key field on cancel when editing a variable', () => {
    variableKeyInlineEdit(
      mount(
        <PipelinesVariables
          createVariable={jest.fn()}
          deleteVariable={jest.fn()}
          updateVariable={jest.fn()}
          isFetchingVariables={false}
          isReadOnly={false}
          variables={[{ uuid: 'foo', key: 'foo', value: 'bar' } as Variable]}
        />,
      ),
    )
      .click()
      .expectEditViewValue('foo')
      .edit('')
      .cancel()
      .expectReadViewValue('foo');
  });

  it('should reset the variable value field on cancel when editing a variable', () => {
    variableValueInlineEdit(
      mount(
        <PipelinesVariables
          createVariable={jest.fn()}
          deleteVariable={jest.fn()}
          updateVariable={jest.fn()}
          isFetchingVariables={false}
          isReadOnly={false}
          variables={[{ uuid: 'foo', key: 'foo', value: 'bar' } as Variable]}
        />,
      ),
    )
      .click()
      .expectEditViewValue('bar')
      .edit('')
      .expectValidationError('Please fill out this field.')
      .cancel()
      .expectReadViewValue('bar');
  });

  it('should validate the variable key field', () => {
    const component = mount(
      <PipelinesVariables
        createVariable={jest.fn()}
        deleteVariable={jest.fn()}
        updateVariable={jest.fn()}
        isFetchingVariables={false}
        isReadOnly={false}
        variables={[{ uuid: 'foo', key: 'foo', value: 'bar' } as Variable]}
      />,
    );

    createVariableForm(component)
      .editKey('[dsdf')
      .editValue('test')
      .submit()
      .expectKeyToBeInvalid(
        `Use letters, '_' or numbers, and don't start with a number.`,
      );

    variableKeyInlineEdit(component)
      .click()
      .edit('[[dsdf')
      .expectValidationError(
        `Use letters, '_' or numbers, and don't start with a number.`,
      );
  });

  it('should validate the variable value field is not empty when editing an existing variable', () => {
    variableValueInlineEdit(
      mount(
        <PipelinesVariables
          createVariable={jest.fn()}
          deleteVariable={jest.fn()}
          updateVariable={jest.fn()}
          isFetchingVariables={false}
          isReadOnly={false}
          variables={[{ uuid: 'foo', key: 'foo', value: 'foo' } as Variable]}
        />,
      ),
    )
      .click()
      .expectEditViewValue('foo')
      .edit('')
      .expectValidationError('Please fill out this field.');
  });

  it('should prevent a variable key being updated if the field is invalid', () => {
    const updateVariable = jest.fn();
    variableKeyInlineEdit(
      mount(
        <PipelinesVariables
          createVariable={jest.fn()}
          deleteVariable={jest.fn()}
          updateVariable={updateVariable}
          isFetchingVariables={false}
          isReadOnly={false}
          variables={[{ uuid: 'foo', key: 'foo', value: 'bar' } as Variable]}
        />,
      ),
    )
      .click()
      .expectEditViewValue('foo')
      .edit('')
      .confirm()
      .expectReadViewValue('foo');
    expect(updateVariable).toHaveBeenCalledTimes(0);
  });

  it('should prevent a variable value being updated if the field is invalid', () => {
    const updateVariable = jest.fn();
    variableValueInlineEdit(
      mount(
        <PipelinesVariables
          createVariable={jest.fn()}
          deleteVariable={jest.fn()}
          updateVariable={updateVariable}
          isFetchingVariables={false}
          isReadOnly={false}
          variables={[{ uuid: 'foo', key: 'foo', value: 'bar' } as Variable]}
        />,
      ),
    )
      .click()
      .expectEditViewValue('bar')
      .edit('')
      .confirm()
      .expectNoValidationError()
      .expectReadViewValue('bar');
    expect(updateVariable).toHaveBeenCalledTimes(0);
  });

  it('should render variables list with existing variables', () => {
    const component = mount(
      <PipelinesVariables
        createVariable={jest.fn()}
        deleteVariable={jest.fn()}
        updateVariable={jest.fn()}
        isFetchingVariables={false}
        isReadOnly={false}
        variables={
          [
            { uuid: 'foo', key: 'foo', value: 'foo' },
            { uuid: 'bar', key: 'bar', value: 'bar' },
            { uuid: 'baz', key: 'baz', value: null, secured: true } as any,
          ] as Variable[]
        }
      />,
    );

    const rows = component.find(PipelinesVariablesRow);
    expect(rows.length).toEqual(4);
    expect(rows.at(0).props().isCreateVariableRow).toBeTruthy();
    expect(rows.at(1).props().isCreateVariableRow).toBeFalsy();
    expect(rows.at(2).props().isCreateVariableRow).toBeFalsy();
    expect(rows.at(3).props().isCreateVariableRow).toBeFalsy();
  });

  it('editing a secured variable clears its value', () => {
    variableValueInlineEdit(
      mount(
        <PipelinesVariables
          createVariable={jest.fn()}
          deleteVariable={jest.fn()}
          updateVariable={jest.fn()}
          isFetchingVariables={false}
          isReadOnly={false}
          variables={[
            { uuid: 'foo', key: 'foo', value: null, secured: true } as any,
          ]}
        />,
      ),
    )
      .expectReadViewToBeSecure()
      .click()
      .expectEditViewValue('');
  });

  it('editing a secured variable without making changes does not update the variable', () => {
    const updateVariable = jest.fn();
    variableValueInlineEdit(
      mount(
        <PipelinesVariables
          createVariable={jest.fn()}
          deleteVariable={jest.fn()}
          updateVariable={updateVariable}
          isFetchingVariables={false}
          isReadOnly={false}
          variables={[
            {
              uuid: 'foo',
              key: 'foo',
              value: 'bar',
              secured: true,
            } as Variable,
          ]}
        />,
      ),
    )
      .expectReadViewToBeSecure()
      .click()
      .expectEditViewValue('')
      .confirm()
      .expectReadViewToBeSecure();
    expect(updateVariable).not.toBeCalled();
  });

  it('editing a secured variable updates the variable', () => {
    const updateVariable = jest.fn();
    variableValueInlineEdit(
      mount(
        <PipelinesVariables
          createVariable={jest.fn()}
          deleteVariable={jest.fn()}
          updateVariable={updateVariable}
          isFetchingVariables={false}
          isReadOnly={false}
          variables={[
            { uuid: 'foo', key: 'foo', value: null, secured: true } as any,
          ]}
        />,
      ),
    )
      .expectReadViewToBeSecure()
      .click()
      .expectEditViewValue('')
      .edit('baz')
      .confirm()
      .expectReadViewToBeSecure();

    expect(updateVariable).toBeCalledWith(
      { uuid: 'foo', key: 'foo', value: null, secured: true },
      {
        key: 'foo',
        value: 'baz',
      },
    );
  });

  it('should display specific server errors for a new variable', () => {
    const component = mount(
      <PipelinesVariables
        createVariable={jest.fn()}
        deleteVariable={jest.fn()}
        updateVariable={jest.fn()}
        isFetchingVariables={false}
        isReadOnly={false}
        variables={[{ key: 'foo', value: 'foo', isSyncing: true } as any]}
        testIsCreatingVariable
      />,
    );

    component.setProps({
      variables: [
        {
          key: 'foo',
          value: 'foo',
          isSyncing: false,
          error: {
            data: { arguments: { 'key.invalid': 'bar', key: 'foo' } },
            message: 'foo',
            detail: 'bar',
          },
        },
      ],
    });
    component.update();

    createVariableForm(component)
      .expectKeyToBeInvalid('foo')
      .expectValueToBeValid();
  });

  it('should display generic server errors for a new variable', () => {
    const component = mount(
      <PipelinesVariables
        createVariable={jest.fn()}
        deleteVariable={jest.fn()}
        updateVariable={jest.fn()}
        isFetchingVariables={false}
        isReadOnly={false}
        variables={[{ key: 'foo', value: 'foo', isSyncing: true } as any]}
        testIsCreatingVariable
      />,
    );

    component.setProps({
      variables: [
        {
          key: 'foo',
          value: 'foo',
          isSyncing: false,
          error: { data: { arguments: {} }, message: 'foo', detail: 'bar' },
        },
      ],
    });
    component.update();

    createVariableForm(component)
      .expectKeyToBeInvalid('bar')
      .expectValueToBeValid();
  });

  it('should map a duplicate variable server error message to a human friendly message', () => {
    const component = mount(
      <PipelinesVariables
        createVariable={jest.fn()}
        deleteVariable={jest.fn()}
        updateVariable={jest.fn()}
        isFetchingVariables={false}
        isReadOnly={false}
        variables={[{ key: 'foo', value: 'foo', isSyncing: true } as any]}
        testIsCreatingVariable
      />,
    );

    component.setProps({
      variables: [
        {
          key: 'foo',
          value: 'foo',
          isSyncing: false,
          error: {
            data: { arguments: {}, key: 'variable-service.variable.duplicate' },
            message: 'foo',
            detail: 'bar',
          },
        },
      ],
    });
    component.update();

    createVariableForm(component).expectKeyToBeInvalid(
      `A variable with that name already exists. Choose a new one or reload the page to see any recent updates.`,
    );
  });

  it('should map a variable not found server error message to a human friendly message', () => {
    const component = mount(
      <PipelinesVariables
        createVariable={jest.fn()}
        deleteVariable={jest.fn()}
        updateVariable={jest.fn()}
        isFetchingVariables={false}
        isReadOnly={false}
        variables={[{ key: 'foo', value: 'foo', isSyncing: true } as any]}
        testIsCreatingVariable
      />,
    );

    component.setProps({
      variables: [
        {
          key: 'foo',
          value: 'foo',
          isSyncing: false,
          error: {
            data: { arguments: {}, key: 'variable-service.variable.not-found' },
            message: 'foo',
            detail: 'bar',
          },
        },
      ],
    });
    component.update();

    createVariableForm(component).expectKeyToBeInvalid(
      `That variable no longer exists. Reload the page to see the recent updates.`,
    );
  });

  it('should update the key of an existing secured variable', () => {
    const updateVariable = jest.fn();
    variableKeyInlineEdit(
      mount(
        <PipelinesVariables
          createVariable={jest.fn()}
          deleteVariable={jest.fn()}
          updateVariable={updateVariable}
          isFetchingVariables={false}
          isReadOnly={false}
          variables={[
            {
              uuid: 'foo',
              key: 'foo',
              value: 'bar',
              secured: true,
            } as Variable,
          ]}
        />,
      ),
    )
      .click()
      .expectEditViewValue('foo')
      .edit('baz')
      .confirm();

    // Ensure we updated the variable correctly.
    expect(updateVariable).toBeCalledWith(
      { key: 'foo', secured: true, uuid: 'foo', value: 'bar' },
      {
        key: 'baz',
      },
    );
  });

  it('should update the value of an existing secured variable', () => {
    const updateVariable = jest.fn();
    variableValueInlineEdit(
      mount(
        <PipelinesVariables
          createVariable={jest.fn()}
          deleteVariable={jest.fn()}
          updateVariable={updateVariable}
          isFetchingVariables={false}
          isReadOnly={false}
          variables={[
            {
              uuid: 'foo',
              key: 'foo',
              value: 'bar',
              secured: true,
            } as Variable,
          ]}
        />,
      ),
    )
      .click()
      .expectEditViewValue('')
      .edit('baz')
      .confirm()
      .expectReadViewValue('••••••');

    // Ensure we updated the variable correctly.
    expect(updateVariable).toBeCalledWith(
      { key: 'foo', secured: true, uuid: 'foo', value: 'bar' },
      {
        key: 'foo',
        value: 'baz',
      },
    );
  });
});
