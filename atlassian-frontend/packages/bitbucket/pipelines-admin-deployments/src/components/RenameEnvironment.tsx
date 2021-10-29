import React, { useCallback, useState } from 'react';

import { ErrorMessage } from '@atlaskit/form';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import InlineEdit from '@atlaskit/inline-edit';
import Textfield from '@atlaskit/textfield';
import * as colors from '@atlaskit/theme/colors';
import { Capabilities, Environment } from '@atlassian/pipelines-models';

import { UpdateEnvironment } from '../types';
import validateEnvironmentName from '../utils/validateEnvironmentName';

import {
  ErrorIconWrapper,
  RenameEnvironmentTitle,
  RenameEnvironmentWrapper,
  RenameReadViewContainer,
} from './styled';

type Props = {
  capabilities: Capabilities;
  environment: Environment;
  environments: Environment[];
  maxDeploymentEnvironments: number;
  updateEnvironment: UpdateEnvironment;
};

const RenameEnvironment: React.FC<Props> = ({
  capabilities,
  environment,
  environments,
  maxDeploymentEnvironments,
  updateEnvironment,
}) => {
  const [name, setName] = useState(environment.name);

  const validate = useCallback(
    (name: string) => {
      const allowedEnvironments =
        maxDeploymentEnvironments > capabilities.allowedEnvironments
          ? maxDeploymentEnvironments
          : capabilities.allowedEnvironments;
      const error = validateEnvironmentName(
        name,
        environments.filter((e: Environment) => environment.uuid !== e.uuid),
        allowedEnvironments,
      );
      return error;
    },
    [environments, environment, maxDeploymentEnvironments, capabilities],
  );

  const onRenameConfirm = useCallback(() => {
    if (!validate(name) && environment.name !== name) {
      updateEnvironment(environment.uuid, { name });
    }
  }, [environment, name, validate, updateEnvironment]);

  const onNameChange = useCallback((event) => setName(event.target.value), []);

  return (
    <RenameEnvironmentWrapper>
      <RenameEnvironmentTitle>Environment name:</RenameEnvironmentTitle>
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
          <RenameReadViewContainer>{environment.name}</RenameReadViewContainer>
        )}
        onConfirm={onRenameConfirm}
        hideActionButtons={environment.name === name}
        validate={() => validate(name)}
        keepEditViewOpenOnBlur
        readViewFitContainerWidth
      />
    </RenameEnvironmentWrapper>
  );
};

export default React.memo(RenameEnvironment);
