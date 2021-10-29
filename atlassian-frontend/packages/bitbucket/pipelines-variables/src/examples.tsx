import React from 'react';

import { forceReRender } from '@storybook/react';

import { variables } from './common/variables-mock';
import { Variable } from './types';

import PipelinesVariables, { PipelinesVariablesRow } from './index';

let tempVariables = variables;

const createVariable = (v: Variable) => {
  tempVariables = [
    {
      ...v,
      isSyncing: true,
      uuid: '',
      ...(v.key === 'BAX'
        ? {
            error: {
              data: {
                arguments: {},
                key: 'variable-service.variable.not-found',
              },
              detail: 'server error',
            },
          }
        : {}),
    },
  ].concat(tempVariables);
  forceReRender();
  setTimeout(() => {
    tempVariables = tempVariables.map((v) => {
      v.uuid = `var-${tempVariables.length}`;
      v.isSyncing = false;
      return v;
    });
    forceReRender();
  }, 1000);
};

const updateVariable = (v: Variable, newVariable: Variable) => {
  tempVariables = tempVariables.map((_v) => {
    if (_v.key === v.key) {
      _v = { ...v, ...newVariable };
    }
    return _v;
  });
  forceReRender();
};

const deleteVariable = (v: Variable) => {
  tempVariables = tempVariables.filter((_v) => _v.key !== v.key);
  forceReRender();
};

const fetchNextVariablesPage = () => {
  tempVariables = tempVariables.concat(
    tempVariables.map((v) => ({
      ...v,
      key: `${v.key}_new`,
      value: `${v.value}_new`,
      uuid: `${v.uuid}_new`,
    })),
  );
  forceReRender();
};

export const PipelinesVariablesExample = () => {
  return (
    <div style={{ width: '650px' }}>
      <PipelinesVariables
        createVariable={createVariable}
        deleteVariable={deleteVariable}
        updateVariable={updateVariable}
        isFetchingVariables={false}
        isReadOnly={false}
        variables={tempVariables}
      />
    </div>
  );
};

export const PipelinesVariablesReadOnlyExample = () => {
  return (
    <div style={{ width: '650px' }}>
      <PipelinesVariables
        createVariable={createVariable}
        deleteVariable={deleteVariable}
        updateVariable={updateVariable}
        isFetchingVariables={false}
        isReadOnly
        variables={tempVariables}
      />
    </div>
  );
};

export const PipelinesVariablesLoadingExample = () => {
  return (
    <div style={{ width: '650px' }}>
      <PipelinesVariables
        createVariable={createVariable}
        deleteVariable={deleteVariable}
        updateVariable={updateVariable}
        isFetchingVariables
        isReadOnly={false}
        variables={[]}
      />
    </div>
  );
};

export const PipelinesVariablesLoadMoreExample = () => {
  return (
    <div style={{ width: '650px' }}>
      <PipelinesVariables
        createVariable={createVariable}
        deleteVariable={deleteVariable}
        updateVariable={updateVariable}
        isReadOnly={false}
        isFetchingVariables={false}
        fetchNextVariablesPage={fetchNextVariablesPage}
        hasNextVariablesPage
        variables={tempVariables}
      />
    </div>
  );
};

export const CreateVariablesRowExample = () => (
  <div>
    <PipelinesVariablesRow
      isCreateVariableRow
      isReadOnly={false}
      variable={{} as Variable}
      variables={[]}
      createVariable={createVariable}
      updateVariable={() => {}}
    />
  </div>
);

export default {
  title: 'pipelines-variables',
};
