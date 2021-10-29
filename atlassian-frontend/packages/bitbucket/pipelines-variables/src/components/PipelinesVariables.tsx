import React from 'react';

import Button from '@atlaskit/button';
import Spinner from '@atlaskit/spinner';

import { Variable } from '../types';

import PipelinesVariablesRow from './PipelinesVariablesRow';
import { Header, LoadMore, Section, Wrapper } from './styled';

type Props = {
  createVariable: (variable: Variable) => void;
  deleteVariable: (variable: Variable) => void;
  updateVariable: (previousVariable: Variable, variable: Variable) => void;
  isFetchingVariables: boolean;
  isReadOnly: boolean;
  variables: Variable[];
  fetchNextVariablesPage?: () => void;
  hasNextVariablesPage?: boolean;
  testIsCreatingVariable?: boolean;
};

const PipelinesVariables: React.FC<Props> = ({
  createVariable,
  deleteVariable,
  updateVariable,
  fetchNextVariablesPage,
  isFetchingVariables,
  isReadOnly,
  hasNextVariablesPage,
  variables,
  testIsCreatingVariable,
}) => {
  return (
    <Wrapper>
      <Header>
        <table>
          <tbody>
            <PipelinesVariablesRow
              isCreateVariableRow
              variable={variables[0] || {}}
              variables={variables}
              createVariable={createVariable}
              isReadOnly={isReadOnly}
              testIsCreatingVariable={testIsCreatingVariable}
            />
          </tbody>
        </table>
      </Header>
      <Section>
        <table>
          <thead>
            <tr />
          </thead>
          <tbody>
            {variables.map((variable) => (
              <PipelinesVariablesRow
                variable={variable}
                variables={variables}
                key={`variable_row_${variable.key}`}
                updateVariable={updateVariable}
                deleteVariable={deleteVariable}
                isReadOnly={isReadOnly}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>
                {isFetchingVariables ? (
                  <Spinner size="small" />
                ) : (
                  `You haven't added any variables yet.`
                )}
              </td>
            </tr>
          </tfoot>
        </table>
        {hasNextVariablesPage && fetchNextVariablesPage && (
          <LoadMore>
            <Button
              isDisabled={isFetchingVariables}
              appearance="link"
              onClick={() => fetchNextVariablesPage()}
            >
              Load more...
            </Button>
            {isFetchingVariables && <Spinner size="small" />}
          </LoadMore>
        )}
      </Section>
    </Wrapper>
  );
};

export default React.memo(PipelinesVariables);
