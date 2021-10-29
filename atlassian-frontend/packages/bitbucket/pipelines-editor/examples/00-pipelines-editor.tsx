import React from 'react';

import { forceReRender } from '@storybook/react';

import { Variable } from '@atlassian/pipelines-variables';

import { variables } from '../src/common/variables-mock';
import { config1 } from '../src/common/yml-mock';
import PipelinesEditor from '../src/components/PipelinesEditor';

// eslint-disable-next-line
import '!!style-loader!css-loader!codemirror/lib/codemirror.css';
// eslint-disable-next-line
import '!!style-loader!css-loader!codemirror/addon/hint/show-hint.css';

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

export default () => (
  <div style={{ width: '1000px' }} data-testid="pipelines-editor">
    <PipelinesEditor
      code={config1}
      maxStepDuration={240}
      environments={[['test'], ['staging'], ['production']]}
      variables={['foo']}
      onChange={(props) => {
        // eslint-disable-next-line no-console
        console.log('open', props);
      }}
      variablesProps={{
        createVariable,
        deleteVariable,
        updateVariable,
        isFetchingVariables: false,
        isReadOnly: false,
        variables: tempVariables,
        environments: {
          ddevUuid: 'DDEV',
          stagingUuid: 'Staging',
          prodUuid: 'Production',
        },
        environmentVariables: {
          ddevUuid: tempVariables,
          stagingUuid: tempVariables,
          prodUuid: tempVariables,
        },
      }}
    />
  </div>
);
