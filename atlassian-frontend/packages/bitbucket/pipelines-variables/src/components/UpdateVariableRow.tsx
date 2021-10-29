import React, { useMemo } from 'react';

import Button from '@atlaskit/button';
import IconRemove from '@atlaskit/icon/glyph/editor/remove';
import LockFilledIcon from '@atlaskit/icon/glyph/lock-filled';
import InlineEdit from '@atlaskit/inline-edit';
import Textfield from '@atlaskit/textfield';
import Tooltip from '@atlaskit/tooltip';

import { SECURE_VARIABLE_MASK } from '../const';
import { Variable } from '../types';

import UnrestrictedLockIcon from './assets/UnrestrictedLockIcon';
import {
  LockIconWrapper,
  ReadViewContainer,
  UpdateFieldGroup,
  VariableRowButtons,
} from './styled';

type Props = {
  onVariableKeyChange: (evt: any) => void;
  onVariableValueChange: (evt: any) => void;
  onVariableUpdate: (evt: any) => void;
  onDeleteVariableClick: (evt: any) => void;
  isReadOnly: boolean;
  variable: Variable;
  variableKey: string;
  variableKeyError?: any;
  variableValue: string;
  variableValueError?: any;
};

const PipelinesVariablesRow: React.FC<Props> = ({
  onVariableKeyChange,
  onVariableValueChange,
  onVariableUpdate,
  onDeleteVariableClick,
  isReadOnly,
  variable,
  variableKey,
  variableKeyError,
  variableValue,
  variableValueError,
}) => {
  const securedValue = useMemo(
    () => (variable.secured ? SECURE_VARIABLE_MASK : variable.value),
    [variable],
  );

  return (
    <>
      <UpdateFieldGroup>
        {isReadOnly ? (
          <ReadViewContainer>{variable.key}</ReadViewContainer>
        ) : (
          <InlineEdit
            editView={(fieldProps) => (
              <Textfield
                {...fieldProps}
                name="key"
                value={variableKey}
                onChange={onVariableKeyChange}
                placeholder="Name"
                isDisabled={variable.isSyncing}
                isCompact
                autoFocus
              />
            )}
            readView={() => (
              <ReadViewContainer isDisabled={variable.isSyncing}>
                {variable.key}
              </ReadViewContainer>
            )}
            defaultValue={variableKey}
            onConfirm={onVariableUpdate}
            validate={() => variableKeyError}
            readViewFitContainerWidth
            keepEditViewOpenOnBlur
          />
        )}
      </UpdateFieldGroup>
      <UpdateFieldGroup>
        {isReadOnly ? (
          <ReadViewContainer>{securedValue}</ReadViewContainer>
        ) : (
          <InlineEdit
            editView={(fieldProps) => (
              <Textfield
                {...fieldProps}
                name="value"
                value={
                  variable.secured && variableValue === SECURE_VARIABLE_MASK
                    ? ''
                    : variableValue
                }
                onChange={onVariableValueChange}
                placeholder="Value"
                isDisabled={variable.isSyncing}
                autoComplete="off"
                isCompact
                autoFocus
              />
            )}
            readView={() => (
              <ReadViewContainer isDisabled={variable.isSyncing}>
                {securedValue}
              </ReadViewContainer>
            )}
            defaultValue={variableValue}
            onConfirm={onVariableUpdate}
            hideActionButtons={false}
            validate={() => variableValueError}
            readViewFitContainerWidth
            keepEditViewOpenOnBlur
          />
        )}
      </UpdateFieldGroup>
      <VariableRowButtons>
        <Tooltip content={variable.secured ? 'Secured' : 'Unsecured'}>
          <LockIconWrapper>
            {variable.secured ? (
              <LockFilledIcon label="Unsecured" size="medium" />
            ) : (
              <UnrestrictedLockIcon />
            )}
          </LockIconWrapper>
        </Tooltip>
        <div data-button-delete>
          <Button
            isDisabled={variable.isSyncing || isReadOnly}
            onClick={onDeleteVariableClick}
            appearance="subtle"
            spacing="none"
            iconAfter={<IconRemove label="Remove" />}
          />
        </div>
      </VariableRowButtons>
    </>
  );
};

export default React.memo(PipelinesVariablesRow);
