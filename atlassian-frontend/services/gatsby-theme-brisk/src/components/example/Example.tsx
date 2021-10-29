import React, { useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import CodeBlock from '@atlaskit/code/block';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import ChevronUpIcon from '@atlaskit/icon/glyph/chevron-up';

import { ExampleActionContainer } from './actions';
import CodeSandbox, { CodeSandboxProps } from './actions/CodeSandbox';
import Copy from './actions/Copy';

import CollapseButton from './CollapseButton';
import ExampleCode from './ExampleCode';
import ExampleShowcase, { Background } from './ExampleShowcase';

import ErrorBoundary from '../error-boundary';
import replaceSrc from '../../utilities/replaceSrc';

const EXAMPLE_HINT_HEIGHT = 200;
const LINE_TO_HEIGHT_FACTOR = 1.66667 * 12;

export interface ExampleProps {
  /** The component to render in the example  */
  Component: any;

  /** The source code for the component; if none is provided, will be generated
   * from the `Component` rendered.
   */
  source?: string;

  /** The language in which the code is written */
  language?: string;

  /** The name of the package demonstrated in the example. Used to replace relative references
   * in the example code
   */
  packageName?: string;

  /** Comma and hyphen-separated list of lines to highlight in the source view  */
  highlight?: string;

  /** Controls the visibility of the source section  */
  sourceVisible?: boolean;

  /** Height of the collapsed source view, in pixels */
  hintHeight?: number;

  /** Controls the background color of the example showcase */
  backgroundColor?: Background;

  /** Used for a11y labelling */
  exampleName?: string;

  /**
   * Manually provides the required information for CodeSandbox integration.
   *
   * If this is not provided and there are no meta attributes on the passed in `Component`
   * then CodeSandbox integration will be disabled.
   */
  sandboxInfo?: CodeSandboxProps;

  /**
   * Toggle to show the CodeSandbox action. Even if `sandboxInfo` is provided, if
   * `showCodeSandbox` is false, the button will be hidden. This enables consumers of
   * gatsby-theme-brisk to simply turn the action on or off via theme shadowing
   * without needing to know how the component works under the hood. See more:
   * https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/shadowing/#applying-new-props
   */
  showCodeSandbox?: boolean;
}

export interface ExamplePropsWithComponents extends ExampleProps {
  components?: any;
}

export const Example = (props: ExamplePropsWithComponents) => {
  const {
    Component,
    language = 'tsx',
    highlight = '',
    sourceVisible = true,
    hintHeight = EXAMPLE_HINT_HEIGHT,
    backgroundColor = 'checkered',
    showCodeSandbox = true,
    components,
  } = props;

  const [collapsed, setCollapsed] = useState(true);

  const packageName = props.packageName ?? Component?.__pkgJSON?.name;
  const source = props.source ?? Component?.__raw ?? '';
  const transformedSource = transformSource(source, packageName);

  const showCollapseUI =
    transformedSource.split(/\r\n|\r|\n/).length >
    hintHeight / LINE_TO_HEIGHT_FACTOR;

  const exampleName =
    props.exampleName ?? Component?.__path?.replace?.(/^([^/]*\/)+/, '') ?? '';
  const exampleNameSpoken = exampleName.replace(/\-/g, ' ');

  let sandboxInfo;
  if (showCodeSandbox) {
    sandboxInfo =
      props.sandboxInfo ?? inferSandboxInfo(Component, exampleName, components);
  }

  return (
    <ExampleWrapper>
      <ExampleShowcase
        backgroundColor={backgroundColor}
        aria-label={`${exampleNameSpoken} example showcase`}
        role="group"
      >
        <ErrorBoundary
          fallback={<h4>Something went wrong loading this example.</h4>}
        >
          <Component />
        </ErrorBoundary>
      </ExampleShowcase>
      {sourceVisible && (
        <>
          <ExampleCode
            collapsed={showCollapseUI ? collapsed : false}
            hintHeight={hintHeight}
            onMouseDown={() => setCollapsed(false)}
            aria-label={`${exampleNameSpoken} code example`}
            role="group"
          >
            <ExampleActionContainer>
              {showCodeSandbox && sandboxInfo && (
                <CodeSandbox {...sandboxInfo} />
              )}
              <Copy source={transformedSource} />
            </ExampleActionContainer>
            <div id={`example-${exampleName}`}>
              <CodeBlock
                text={transformedSource}
                language={language}
                showLineNumbers={false}
                highlight={highlight}
              />
            </div>
          </ExampleCode>
          {showCollapseUI && (
            <CollapseButton
              collapsed={collapsed}
              onClick={() => {
                setCollapsed(!collapsed);
              }}
              aria-expanded={!collapsed}
              aria-controls={`example-${exampleName}`}
            >
              {collapsed ? (
                <>
                  <span
                    aria-label={`Show more, ${exampleNameSpoken} code example`}
                  >
                    Show more
                  </span>
                  <ChevronDownIcon label="" />
                </>
              ) : (
                <>
                  <span
                    aria-label={`Show less, ${exampleNameSpoken} code example`}
                  >
                    Show less
                  </span>
                  <ChevronUpIcon label="" />
                </>
              )}
            </CollapseButton>
          )}
        </>
      )}
    </ExampleWrapper>
  );
};

const ExampleWrapper = styled.div`
  /*
  z-index added to ensure example is in front of border-top in section-link.tsx. This is used to
  resolve incorrect scrolling behaviour in the navbar. See DST-2344.
  */
  z-index: 1;
  border-radius: 4px 4px 4px 4px;
  box-shadow: 0 0 0 1.2px #ebecf0;
  width: 100%;
`;

const transformSource = (source: string, packageName: string): string => {
  let transformedSource = source;

  if (packageName) {
    transformedSource = replaceSrc(source, packageName);
  }

  transformedSource = transformedSource.trim();

  return transformedSource;
};

// '../../x/y/z' -> 'x/y/z'
const removeRelativePathInfo = (s: string) => s.replace(/^(\.+\/)*/, '');

const inferSandboxInfo = (
  Component,
  exampleName,
  components,
): CodeSandboxProps => {
  /**
   * Check for the existence of properties added by `gatsby-theme-brisk/plugins/remark/add-raw-to-imports`
   *
   * If these aren't there then we cannot infer the sandbox info.
   */
  if (!Component?.hasOwnProperty?.('__raw')) {
    return;
  }

  const pkgJSON = Component.__pkgJSON;

  const { groupId, packageId } = pkgJSON;
  const examplePath = `${groupId}/${packageId}/${removeRelativePathInfo(
    Component.__path,
  )}.tsx`;

  const importReplacements: Array<[string, string]> = [
    [`${groupId}/${packageId}/src`, pkgJSON.name],
  ];

  return {
    example: Component.__raw,
    examplePath,
    exampleName,
    importReplacements,
    pkgJSON: {
      ...pkgJSON,
      devDependencies: {
        ...Object.fromEntries(
          (components || []).map((component) => [
            component.name,
            component.version,
          ]),
        ),
        ...pkgJSON.devDependencies,
      },
    },
  };
};

export default (props: ExampleProps) => (
  <StaticQuery
    query={graphql`
      query {
        allWorkspaceInfo {
          nodes {
            name
            version
          }
        }
      }
    `}
    render={(data) => (
      <Example {...props} components={data.allWorkspaceInfo.nodes} />
    )}
  />
);
