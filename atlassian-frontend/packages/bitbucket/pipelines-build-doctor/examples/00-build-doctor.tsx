import React from 'react';

import { Diagnosis } from '@atlassian/pipelines-models';

import BuildDoctor from '../src';

export default () => {
  return (
    <div
      data-testid="pipelines-build-doctor"
      style={{
        width: '600px',
        height: '400px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      }}
    >
      <BuildDoctor
        defaultDiagnosis={
          new Diagnosis({
            logMatches: 'Error: EACCES: permission denied',
            links: [
              {
                name: 'Known NPM issue',
                url:
                  'https://bitbucket.org/site/master/issues/16846/npm-error-eacces-permission-denied',
              },
            ],
          })
        }
        logLines={['foo', 'Error: EACCES: permission denied']}
      />
    </div>
  );
};
