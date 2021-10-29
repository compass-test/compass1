import React, { useCallback, useState } from 'react';

import { ErrorMessage } from '@atlaskit/form';
import AddIcon from '@atlaskit/icon/glyph/add';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import InlineEdit from '@atlaskit/inline-edit';
import Textfield from '@atlaskit/textfield';
import * as colors from '@atlaskit/theme/colors';
import { Capabilities, Environment } from '@atlassian/pipelines-models';

import { CreateEnvironment } from '../types';
import validateEnvironmentName from '../utils/validateEnvironmentName';

import {
  AddEnvironmentWrapper,
  AddIconWrapper,
  ErrorIconWrapper,
  ReadViewContainer,
} from './styled';

type Props = {
  capabilities: Capabilities;
  createEnvironment: CreateEnvironment;
  environmentTypes: { [type: string]: Environment[] };
  maxDeploymentEnvironments: number;
  type: string;
};

const AddEnvironment: React.FC<Props> = ({
  capabilities,
  createEnvironment,
  environmentTypes,
  maxDeploymentEnvironments,
  type,
}) => {
  const [name, setName] = useState('');

  const validate = useCallback(
    (name: string) => {
      const environments = Object.keys(environmentTypes).reduce(
        (reducer: Environment[], key) => reducer.concat(environmentTypes[key]),
        [],
      );
      const allowedEnvironments =
        maxDeploymentEnvironments > capabilities.allowedEnvironments
          ? maxDeploymentEnvironments
          : capabilities.allowedEnvironments;
      const error = validateEnvironmentName(
        name,
        environments,
        allowedEnvironments,
      );
      return error;
    },
    [environmentTypes, maxDeploymentEnvironments, capabilities],
  );

  const onConfirm = useCallback(() => {
    if (!validate(name)) {
      createEnvironment(name, type);
      setName('');
    }
  }, [name, type, validate, createEnvironment, setName]);

  const onNameChange = useCallback((event) => setName(event.target.value), []);
  return (
    <AddEnvironmentWrapper>
      <InlineEdit
        defaultValue={name}
        editView={({ errorMessage, ...fieldProps }) => (
          <>
            <Textfield
              {...fieldProps}
              name="environment_name"
              value={name}
              onChange={onNameChange}
              placeholder="Environment name"
              elemAfterInput={
                fieldProps.isInvalid && (
                  <ErrorIconWrapper>
                    <ErrorIcon label="error" primaryColor={colors.R400} />
                  </ErrorIconWrapper>
                )
              }
              autoComplete="off"
              maxLength={30}
              autoFocus
            />
            {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
          </>
        )}
        readView={() => (
          <ReadViewContainer>
            <AddIconWrapper>
              <AddIcon label="add" />
            </AddIconWrapper>
            add environment
          </ReadViewContainer>
        )}
        onConfirm={onConfirm}
        validate={() => validate(name)}
        keepEditViewOpenOnBlur
      />
    </AddEnvironmentWrapper>
  );
};

export default React.memo(AddEnvironment);
