/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import styled from '@emotion/styled';
import { MDXProvider } from '@mdx-js/react';
import { Code, CodeBlock } from '@atlaskit/code';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { N300 } from '@atlaskit/theme/colors';
import Changelog from '../components/changelog';
import SectionLink from '../components/section-link';
import Props from '../components/props';

const Header = styled.th`
  font-weight: normal;
  color: ${N300};
`;

const changelogComponents = {
  h2: (props) => (
    <h3 css={{ marginBottom: '12px', marginTop: '16px' }} {...props}>
      {props.children}
    </h3>
  ),
  h3: (props) => (
    <h4 className="h5" {...props}>
      {props.children}
    </h4>
  ),
  li: (props) => (
    <li className="sm" {...props}>
      {props.children}
    </li>
  ),
  p: (props) => (
    <p className="sm" {...props}>
      {props.children}
    </p>
  ),
};

const components = {
  h3: (props) => (
    <SectionLink level={3} {...props}>
      {props.children}
    </SectionLink>
  ),
  h4: (props) => (
    <h4
      style={{
        marginTop:
          '24px' /* This is currently being overwritten. Can remove it when addressing vertical rhythm. */,
      }}
      {...props}
    >
      {props.children}
    </h4>
  ),
  h5: (props) => (
    <h5
      style={{
        marginTop:
          '16px' /* This is currently being overwritten. Can remove it when addressing vertical rhythm. */,
      }}
      {...props}
    >
      {props.children}
    </h5>
  ),
  code: ({ children }) => (
    <CodeBlock
      text={children}
      language="tsx"
      showLineNumbers={false}
    ></CodeBlock>
  ),
};

// this is used to generate the local nav headings on code pages
export const codeDocsHeadings = [
  {
    value: 'Installation',
    id: 'installation',
    depth: 2,
  },
  {
    value: 'Changelog',
    id: 'changelog',
    depth: 2,
  },
  {
    value: 'Props',
    id: 'props',
    depth: 2,
  },
];

type Props = {
  workspaceInfo: any;
  changelogEntry: any;
  changelog: Array<any>;
  sitePlugin: any;
  propsMdx?: any;
};

const CodeDocs = ({
  workspaceInfo,
  changelogEntry,
  changelog,
  sitePlugin,
  propsMdx,
}: Props) => {
  return (
    <Fragment>
      <SectionLink id="installation" level={2}>
        Installation
      </SectionLink>
      <table css={{ td: { verticalAlign: 'top' } }}>
        <tbody css={{ borderBottom: 'none' }}>
          <tr>
            <Header>Install</Header>
            <td>
              <Code>yarn add {workspaceInfo.name}</Code>
            </td>

            <Header>Source</Header>
            <td>
              <a
                href={`${sitePlugin.pluginOptions.repository}/src/master/packages/${workspaceInfo.group}/${workspaceInfo.slug}`}
                target="_blank"
              >
                Bitbucket.org
              </a>
            </td>
          </tr>
          <tr>
            <Header>npm</Header>
            <td>
              <a
                href={`https://www.npmjs.com/package/${workspaceInfo.name}`}
                target="_blank"
              >
                {workspaceInfo.name}
              </a>
            </td>

            <Header>Bundle</Header>
            <td>
              <a
                href={`https://unpkg.com/${workspaceInfo.name}/dist/`}
                target="_blank"
              >
                unpkg.com
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '48px',
        }}
      >
        <SectionLink id="changelog" level={2}>
          Changelog
        </SectionLink>
        <Changelog components={changelogComponents} changelog={changelog} />
      </div>

      <MDXProvider components={changelogComponents}>
        <MDXRenderer>{changelogEntry.childMdx.body}</MDXRenderer>
      </MDXProvider>

      <SectionLink id="props" level={2}>
        Props
      </SectionLink>

      {/* JSON.parsing JSON string input, ideally this payload should be a typed object in gql */}
      {propsMdx ? (
        <MDXProvider components={components}>
          <MDXRenderer>{propsMdx.body}</MDXRenderer>
        </MDXProvider>
      ) : (
        <Props heading="" props={JSON.parse(workspaceInfo.definition)} />
      )}
    </Fragment>
  );
};

export default CodeDocs;
