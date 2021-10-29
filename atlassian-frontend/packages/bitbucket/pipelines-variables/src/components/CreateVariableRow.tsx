import React from 'react';

import Button from '@atlaskit/button';
import { ErrorMessage } from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';
import Tooltip from '@atlaskit/tooltip';

import { Variable } from '../types';

import { CreateFieldGroup, ErrorMessageWrapper, SecuredLabel } from './styled';

type Props = {
  onVariableKeyChange: (evt: any) => void;
  onVariableValueChange: (evt: any) => void;
  isReadOnly: boolean;
  variable: Variable;
  variableKey: string;
  variableKeyError?: any;
  variableValue: string;
  variableValueError?: any;
  variableOtherError?: any;
  isSecureToggled: boolean;
  setIsSecureToggled: (isSecureToggled: boolean) => void;
};

const PipelinesVariablesRow: React.FC<Props> = ({
  onVariableKeyChange,
  onVariableValueChange,
  isReadOnly,
  variable,
  variableKey,
  variableKeyError,
  variableValue,
  variableValueError,
  variableOtherError,
  isSecureToggled,
  setIsSecureToggled,
}) => {
  return (
    <>
      <CreateFieldGroup>
        <Textfield
          value={variableKey}
          onChange={onVariableKeyChange}
          name="key"
          placeholder="Name"
          isDisabled={variable.isSyncing && !variable.uuid}
          isInvalid={variableKeyError != null || variableOtherError != null}
          isReadOnly={isReadOnly}
        />
        {(variableKeyError || variableOtherError) && (
          <ErrorMessageWrapper>
            <ErrorMessage>
              {variableKeyError || variableOtherError}
            </ErrorMessage>
          </ErrorMessageWrapper>
        )}
      </CreateFieldGroup>
      <CreateFieldGroup>
        <Textfield
          value={variableValue}
          onChange={onVariableValueChange}
          name="value"
          placeholder="Value"
          isDisabled={variable.isSyncing && !variable.uuid}
          isInvalid={variableValueError != null}
          type={isSecureToggled ? 'password' : 'text'}
          isReadOnly={isReadOnly}
        />
        {variableValueError && (
          <ErrorMessageWrapper>
            <ErrorMessage>{variableValueError}</ErrorMessage>
          </ErrorMessageWrapper>
        )}
      </CreateFieldGroup>
      <CreateFieldGroup>
        <Tooltip
          content={'Secured variables are encrypted and masked in the logs'}
        >
          <SecuredLabel>
            <input
              className="checkbox"
              type="checkbox"
              name="secured"
              id="secured"
              disabled={variable.isSyncing || isReadOnly}
              checked={isSecureToggled}
              readOnly={isReadOnly}
              onChange={() => setIsSecureToggled(!isSecureToggled)}
            />
            Secured
          </SecuredLabel>
        </Tooltip>
        <Button isDisabled={variable.isSyncing || isReadOnly} type="submit">
          Add
        </Button>
      </CreateFieldGroup>
    </>
  );
};

export default React.memo(PipelinesVariablesRow);
