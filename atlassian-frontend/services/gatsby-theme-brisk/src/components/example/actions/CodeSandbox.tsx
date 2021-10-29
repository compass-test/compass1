import React from 'react';
import CodeSandboxer from 'react-codesandboxer';

import Icon from '@atlaskit/icon';

import CodeSandboxLogo from './CodeSandboxLogo';
import ExampleAction from './ExampleAction';

const indexFile = `import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';

import Example from './example';

ReactDOM.render(
  <Example />,
  document.getElementById('root')
);
`;

// TODO: These types can probably brought in from `react-codesandboxer` or `codesandboxer`
// when types are working properly in constellation.
//
// At the moment type information doesn't seem to be available from either of these packages.
export interface CodeSandboxProps {
  /** The git path to the example inside of the repo provided in `gitInfo`. */
  examplePath: string;

  /**
   * The source of the example.
   *
   * By providing this directly an extra network request can be avoided
   * to improve loading times.
   */
  example?: string;

  /** Used to name the sandbox. */
  exampleName?: string;

  /** Used to resolve dependencies and make sure they're added to the sandbox. */
  pkgJSON: {
    name: string;
    version: string;
    dependencies: object;
    devDependencies: object;
    peerDependencies: object;
  };

  /**
   * Information for the git repository which contains this example.
   * This repo will be queried to resolve relative imports.
   *
   * By default this will be the atlassian-frontend-mirror.
   */
  gitInfo?: {
    account: string;
    repository: string;
    branch?: string;
    host: 'bitbucket' | 'github';
  };

  /**
   * This is passed directly into the CodeSandboxer instance.
   * It is used to replace relative imports with their corresponding package.
   *
   * See:
   * <https://github.com/codesandbox/codesandboxer/tree/master/packages/react-codesandboxer#importreplacements-arraystring-string>
   */
  importReplacements?: Array<[string, string]>;
}

const afpGitInfo = {
  account: 'atlassian',
  repository: 'atlassian-frontend-mirror',
  branch: 'master',
  host: 'bitbucket',
};

const CodeSandbox: React.FC<CodeSandboxProps> = (props) => {
  const {
    examplePath,
    example,
    pkgJSON,
    gitInfo = afpGitInfo,
    exampleName,
    importReplacements,
  } = props;

  return (
    <CodeSandboxer
      gitInfo={gitInfo}
      examplePath={examplePath}
      example={example} // Can avoid an extra fetch by providing the souce directly
      importReplacements={importReplacements}
      pkgJSON={pkgJSON}
      dependencies={{
        [pkgJSON.name]: pkgJSON.version,
        '@atlaskit/css-reset': 'latest',
        'styled-components': '3.2.6', // Need to specify as it is a peer dependency (often of a transitive dependency)
      }}
      providedFiles={{
        'index.tsx': {
          content: indexFile, // Need to provide so we can add the css reset
        },
      }}
      name={exampleName}
    >
      {() => (
        <ExampleAction
          icon={<Icon glyph={CodeSandboxLogo} label="" />}
          label="Open CodeSandbox"
        />
      )}
    </CodeSandboxer>
  );
};

export default CodeSandbox;
