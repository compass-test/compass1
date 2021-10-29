import React, { useCallback, useEffect, useState } from 'react';

import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';
import Button from '@atlaskit/button/standard-button';
import ModalDialog, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from '@atlaskit/modal-dialog';

import { SECURE_VARIABLE_MASK, VALID_VARIABLE_NAME } from '../const';
import { Variable } from '../types';
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';

import CreateVariableRow from './CreateVariableRow';
import { RowWrapper } from './styled';
import UpdateVariableRow from './UpdateVariableRow';

type Props = WithAnalyticsEventsProps & {
  isCreateVariableRow?: boolean;
  isReadOnly: boolean;
  variable: Variable;
  variables: Variable[];
  createVariable?: (variable: Variable) => void;
  onCreateVariable?: () => void;
  deleteVariable?: (variable: Variable) => void;
  onDeleteVariable?: () => void;
  updateVariable?: (previousVariable: Variable, variable: Variable) => void;
  testIsCreatingVariable?: boolean;
};

const PipelinesVariablesRow: React.FC<Props> = React.memo(
  ({
    isCreateVariableRow,
    isReadOnly,
    variable,
    variables,
    createVariable,
    onCreateVariable,
    deleteVariable,
    onDeleteVariable,
    updateVariable,
    testIsCreatingVariable,
  }) => {
    const [variableKey, setVariableKey] = useState(
      !isCreateVariableRow ? variable.key : '',
    );
    const [variableValue, setVariableValue] = useState(
      !isCreateVariableRow
        ? variable.secured
          ? SECURE_VARIABLE_MASK
          : variable.value
        : '',
    );
    const [variableKeyError, setVariableKeyError] = useState(null);
    const [variableValueError, setVariableValueError] = useState(null);
    const [variableOtherError, setVariableOtherError] = useState(null);
    const [isSecureToggled, setIsSecureToggled] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCreatingVariable, setIsCreatingVariable] = useState(
      testIsCreatingVariable || false,
    );

    const resetState = useCallback(() => {
      setVariableKey(!isCreateVariableRow ? variable.key : '');
      setVariableValue(
        !isCreateVariableRow
          ? variable.secured
            ? SECURE_VARIABLE_MASK
            : variable.value
          : '',
      );
      setVariableKeyError(null);
      setVariableValueError(null);
      setVariableOtherError(null);
      setIsSecureToggled(true);
      setIsCreatingVariable(testIsCreatingVariable || false);
    }, [
      isCreateVariableRow,
      testIsCreatingVariable,
      variable.key,
      variable.secured,
      variable.value,
    ]);

    const mapToFriendlyError = useCallback((error: any) => {
      const errorKey = error.data && error.data.key ? error.data.key : null;
      if (errorKey === 'variable-service.variable.duplicate') {
        return `A variable with that name already exists. Choose a new one or reload the page to see any recent updates.`;
      } else if (errorKey === 'variable-service.variable.not-found') {
        return `That variable no longer exists. Reload the page to see the recent updates.`;
      }
      return error.detail;
    }, []);

    const parseErrors = useCallback(() => {
      let reportedErrors = false;
      const args =
        variable.error && variable.error.data && variable.error.data.arguments
          ? variable.error.data.arguments
          : ([] as any);
      if (variable.error) {
        Object.keys(args).forEach((key: any) => {
          const inputFieldName = key.split('.')[0];
          if (inputFieldName) {
            if (key === 'key') {
              setVariableKeyError(args[key]);
              reportedErrors = true;
            } else if (key === 'value') {
              setVariableValueError(args[key]);
              reportedErrors = true;
            }
          }
        });
        if (!reportedErrors && variable.error.detail) {
          setVariableOtherError(mapToFriendlyError(variable.error));
        }
      }
    }, [mapToFriendlyError, variable.error]);

    useEffect(() => {
      if (!variable.isSyncing && isCreatingVariable) {
        parseErrors();
        if (!variable.error) {
          resetState();
        }
      }
    }, [variable, variables, isCreatingVariable, parseErrors, resetState]);

    const validateKey = useCallback(
      (key: string) => {
        let error: any = null;
        if (
          (isCreateVariableRow ||
            variable.key.toLowerCase() !== key.toLowerCase()) &&
          variables.some((v) => v.key.toLowerCase() === key.toLowerCase())
        ) {
          error = 'Variable name must be unique.';
        } else if (key === '') {
          error = 'Please fill out this field.';
        } else if (!key.match(VALID_VARIABLE_NAME)) {
          error = `Use letters, '_' or numbers, and don't start with a number.`;
        }
        setVariableKeyError(error);
        return !error;
      },
      [isCreateVariableRow, variable, variables],
    );

    const validateValue = useCallback((value: string) => {
      let error: any = null;
      if (value === '') {
        error = 'Please fill out this field.';
      }
      setVariableValueError(error);
      return !error;
    }, []);

    const checkValidity = useCallback(() => {
      return validateKey(variableKey) && validateValue(variableValue);
    }, [validateKey, validateValue, variableKey, variableValue]);

    const hasFormChanged = useCallback(() => {
      return (
        variable.key !== variableKey ||
        (!variable.secured && variableValue !== variable.value) ||
        (variable.secured && variableValue !== SECURE_VARIABLE_MASK)
      );
    }, [variable, variableKey, variableValue]);

    const getVariableData = useCallback(() => {
      const variable: any = {
        key: variableKey,
        value: variableValue,
      };

      if (isCreateVariableRow) {
        variable.secured = isSecureToggled;
      }

      // Delete variable value if it hasn't changed.
      if (!isCreateVariableRow && variable.value === SECURE_VARIABLE_MASK) {
        delete variable.value;
      }

      return variable;
    }, [variableKey, variableValue, isCreateVariableRow, isSecureToggled]);

    const onVariableFocus = useCallback(
      (evt: any) => {
        const targetEl = evt.target as HTMLInputElement;
        if (targetEl.classList.contains('button-remove')) {
          return;
        }

        if (
          !isCreateVariableRow &&
          targetEl instanceof HTMLInputElement &&
          targetEl.name === 'value' &&
          variable.secured
        ) {
          setVariableValue('');
        }
      },
      [isCreateVariableRow, variable],
    );

    const onFormBlur = useCallback((event: any) => {
      if (event.target.name === 'key') {
        setVariableKeyError(null);
      } else if (event.target.name === 'value') {
        setVariableValueError(null);
      }
    }, []);

    const onVariableKeyChange = useCallback(
      (event: any) => {
        const key = event.target.value;
        setVariableKey(key);
        validateKey(key);
      },
      [validateKey],
    );

    const onVariableValueChange = useCallback(
      (event: any) => {
        const value = event.target.value;
        setVariableValue(value);
        validateValue(value);
      },
      [validateValue],
    );

    const onVariableUpdate = useCallback(
      (event: any) => {
        if (hasFormChanged() && checkValidity() && updateVariable) {
          updateVariable(variable, getVariableData());
        } else {
          resetState();
        }
      },
      [
        checkValidity,
        getVariableData,
        hasFormChanged,
        resetState,
        updateVariable,
        variable,
      ],
    );

    const onDeleteVariableClick = useCallback(() => {
      setIsDeleteModalOpen(false);
      if (deleteVariable) {
        deleteVariable(variable);
        if (onDeleteVariable) {
          onDeleteVariable();
        }
      }
    }, [deleteVariable, onDeleteVariable, variable]);

    const onVariableCreate = useCallback(
      (event: any) => {
        event.preventDefault();
        if (checkValidity() && createVariable) {
          setIsCreatingVariable(true);
          createVariable(getVariableData());
          if (onCreateVariable) {
            onCreateVariable();
          }
        }
      },
      [checkValidity, createVariable, getVariableData, onCreateVariable],
    );

    return (
      <RowWrapper data-not-create={!isCreateVariableRow}>
        <td colSpan={3}>
          {isCreateVariableRow ? (
            <form
              onSubmit={onVariableCreate}
              onFocus={onVariableFocus}
              autoComplete="off"
              onBlur={onFormBlur}
            >
              <CreateVariableRow
                onVariableKeyChange={onVariableKeyChange}
                onVariableValueChange={onVariableValueChange}
                isReadOnly={isReadOnly}
                variable={variable}
                variableKey={variableKey}
                variableKeyError={variableKeyError}
                variableValue={variableValue}
                variableValueError={variableValueError}
                variableOtherError={variableOtherError}
                isSecureToggled={isSecureToggled}
                setIsSecureToggled={setIsSecureToggled}
              />
            </form>
          ) : (
            <div className="form">
              <UpdateVariableRow
                onVariableKeyChange={onVariableKeyChange}
                onVariableValueChange={onVariableValueChange}
                onVariableUpdate={onVariableUpdate}
                onDeleteVariableClick={() => setIsDeleteModalOpen(true)}
                isReadOnly={isReadOnly}
                variable={variable}
                variableKey={variableKey}
                variableKeyError={variableKeyError}
                variableValue={variableValue}
                variableValueError={variableValueError}
              />
            </div>
          )}
          <ModalTransition>
            {isDeleteModalOpen && (
              <ModalDialog
                onClose={() => setIsDeleteModalOpen(false)}
                isBlanketHidden
              >
                <ModalHeader>
                  <ModalTitle appearance="danger">Delete variable</ModalTitle>
                </ModalHeader>

                <ModalBody>
                  <p>
                    This will permanently remove variable{' '}
                    <strong>{variable.key}</strong>. Are you sure you’d like to
                    delete it?
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    appearance="subtle"
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    appearance="primary"
                    autoFocus
                    onClick={onDeleteVariableClick}
                  >
                    Delete
                  </Button>
                </ModalFooter>
              </ModalDialog>
            )}
          </ModalTransition>
        </td>
      </RowWrapper>
    );
  },
);

export { PipelinesVariablesRow as PipelinesVariablesRowWithoutAnalytics };
const createAndFireEventOnBitbucket = createAndFireEvent('bitbucket');

export default withAnalyticsContext({
  attributes: {
    componentName: 'reports',
    packageName,
    packageVersion,
  },
})(
  withAnalyticsEvents({
    onCreateVariable: createAndFireEventOnBitbucket({
      action: 'created',
      actionSubject: 'variable',
    }),
    onDeleteVariable: createAndFireEventOnBitbucket({
      action: 'deleted',
      actionSubject: 'variable',
    }),
  })(PipelinesVariablesRow),
);
