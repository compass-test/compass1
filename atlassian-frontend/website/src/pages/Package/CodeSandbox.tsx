import React from 'react';
import CodeSandboxer from 'react-codesandboxer';
import { replaceSrc } from '@atlaskit/docs';

const repoUrl = (inPublicMirror: boolean): string =>
  inPublicMirror
    ? 'https://bitbucket.org/atlassian/design-system-mirror'
    : 'https://bitbucket.org/atlassian/atlassian-frontend';

const packagesPath = (inPublicMirror: boolean) =>
  inPublicMirror ? '' : 'packages/';

const getExampleUrl = (
  groupId: string,
  packageId: string,
  exampleId: string,
  inPublicMirror: boolean,
) =>
  `${repoUrl(inPublicMirror)}/raw/HEAD/${packagesPath(
    inPublicMirror,
  )}${groupId}/${packageId}/examples/${exampleId}`;

const getExamplePath = (
  groupId: string,
  packageId: string,
  exampleId: string,
  inPublicMirror: boolean,
) =>
  `${packagesPath(
    inPublicMirror,
  )}${groupId}/${packageId}/examples/${exampleId}`;

const baseFiles = (
  groupId: string,
  packageId: string,
  exampleId: string,
  isTypeScript: boolean,
  inPublicMirror: boolean,
) => {
  const indexFileName = isTypeScript ? 'index.tsx' : 'index.js';
  return {
    [indexFileName]: {
      content: `/**
  This CodeSandbox has been automatically generated from the contents of ${getExampleUrl(
    groupId,
    packageId,
    exampleId,
    inPublicMirror,
  )}.

  This generator does not follow relative imports beyond those that reference the
  module root, and as such, other relative imports may fail to load.

  You can look up the relative imports from ${repoUrl(inPublicMirror)}

  If this fails in any other way, contact Ben Conolly (https://bitbucket.org/bconolly)
*/
import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import Example from './example';

ReactDOM.render(
  <Example />,
  document.getElementById('root')
);`,
    },
  };
};

/*
  The css packs use loaders, which are not needed in prod. This is incredibly not
  ideal. This handles these to create valid sandboxes.

  We only apply this creative solution because these examples are not recommended
  usages in any case.
*/
const cssLoaderExceptions = (
  pkgJSONName: string,
  groupId: string,
  packageId: string,
) => [
  ['!!style-loader!css-loader!../src/bundle.css', pkgJSONName],
  [`packages/${groupId}/${packageId}/src/index.less`, pkgJSONName],
  [
    '!!raw-loader!../src/icons-sprite.svg',
    `${pkgJSONName}/dist/icons-sprite.svg`,
  ],
];

const hasRelativeImport = (content: string): boolean => {
  const relativeImportRegex = /from '\./;
  return !!content.match(relativeImportRegex);
};

// TODO: Type correct once codesandbox is typed
export type Props = {
  deployButton: any;
  example: any;
  examples: any;
  groupId: any;
  loadingButton: any;
  packageId: any;
  pkgJSON: any;
  allPackageVersions: any;
  afterDeployError?: any;
};

export type State = {
  parameters: string;
};
export default class CodeSandbox extends React.Component<Props, State> {
  state = { parameters: '' };

  render() {
    const {
      deployButton,
      example,
      groupId,
      loadingButton,
      packageId,
      pkgJSON,
      afterDeployError,
      allPackageVersions,
    } = this.props;

    const extension = example.id.split('.').pop();
    const isTypeScript = extension === 'ts' || extension === 'tsx';

    const name = example.id.split('.').slice(0, -1).join('-');

    const { inPublicMirror } = pkgJSON.atlassian && pkgJSON.atlassian;

    const packagesPathStr = packagesPath(inPublicMirror);

    const gitInfo = {
      account: 'atlassian',
      repository: inPublicMirror
        ? 'design-system-mirror'
        : 'atlassian-frontend',
      branch: 'master',
      host: 'bitbucket',
    };

    return (
      <CodeSandboxer
        examplePath={getExamplePath(
          groupId,
          packageId,
          example.id,
          inPublicMirror,
        )}
        example={example.contents().then((content: any) => {
          const code = replaceSrc(content.default, pkgJSON.name);
          if (!inPublicMirror && hasRelativeImport(code)) {
            return;
          }
          return code;
        })}
        pkgJSON={{
          ...pkgJSON,
          devDependencies: {
            ...pkgJSON.devDependencies,
            ...allPackageVersions,
          },
        }}
        name={`${pkgJSON.name}-${name}`}
        afterDeployError={afterDeployError}
        gitInfo={gitInfo}
        importReplacements={[
          [`${packagesPathStr}${groupId}/${packageId}/src`, pkgJSON.name],
          [
            `${packagesPathStr}design-system/icon/glyph/*`,
            `${pkgJSON.name}/glyph/`,
          ],
          [
            `${packagesPathStr}design-system/icon-file-type/glyph/*`,
            `${pkgJSON.name}/glyph/`,
          ],
          [
            `${packagesPathStr}design-system/icon-object/glyph/*`,
            `${pkgJSON.name}/glyph/`,
          ],
          ...cssLoaderExceptions(pkgJSON.name, groupId, packageId),
        ]}
        dependencies={{
          '@atlaskit/css-reset': 'latest',
          'styled-components':
            pkgJSON.peerDependencies &&
            pkgJSON.peerDependencies['styled-components']
              ? pkgJSON.peerDependencies['styled-components']
              : 'latest',
          [pkgJSON.name]: pkgJSON.version,
        }}
        providedFiles={baseFiles(
          groupId,
          packageId,
          example.id,
          isTypeScript,
          inPublicMirror,
        )}
      >
        {({ isLoading, error }: { isLoading: boolean; error: Error }) =>
          isLoading ? loadingButton() : deployButton({ error })
        }
      </CodeSandboxer>
    );
  }
}
