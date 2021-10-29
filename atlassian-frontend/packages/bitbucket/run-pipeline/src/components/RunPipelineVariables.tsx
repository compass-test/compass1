import React from 'react';

import { Field } from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';

import { SECURED_VAR_PREFIX } from '../const';

import { VariableKey, VariablesKeyColumn, VariablesWrapper } from './styled';

type Variable = {
  name: string;
  default?: string;
};

type Props = {
  variables: Variable[];
  isSecuredVariablesEnabled: boolean;
};

const RunPipelineVariables: React.FC<Props> = ({
  variables,
  isSecuredVariablesEnabled,
}) => {
  return (
    <VariablesWrapper>
      <h4>Variables</h4>
      <p>Set variable values for this run of your pipeline.</p>
      <table>
        <tbody>
          {variables.map((variable: Variable, index) => (
            <tr key={`variable_row_${index}`}>
              <VariablesKeyColumn>
                <VariableKey title={variable.name}>{variable.name}</VariableKey>
              </VariablesKeyColumn>
              <td>
                <Field name={variable.name}>
                  {({ fieldProps }) => (
                    <Textfield
                      defaultValue={variable.default || ''}
                      placeholder="value"
                      autoFocus
                      type={
                        isSecuredVariablesEnabled &&
                        !variable.default &&
                        variable.name.startsWith(SECURED_VAR_PREFIX)
                          ? 'password'
                          : undefined
                      }
                      {...fieldProps}
                    />
                  )}
                </Field>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </VariablesWrapper>
  );
};

export default React.memo(RunPipelineVariables);
