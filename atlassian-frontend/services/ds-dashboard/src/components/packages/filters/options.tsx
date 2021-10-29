import React, { ReactChild } from 'react';

import Lozenge from '@atlaskit/lozenge';
import { Code } from '@atlaskit/code';
import { gridSize as getGridSize } from '@atlaskit/theme/constants';

import { css } from '@emotion/core';

import Check from '../../check';
import * as table from '../../../utils/table';
import Label from '../../primitives/label';
import { N40 } from '@atlaskit/theme/colors';

export type FilterOptions<T extends table.Col<any, any>> = {
  label?: ReactChild;
  value: T['value'];
}[];

type FilterOptionData = {
  [filterName: string]: {
    label: string;
    info?: ReactChild;
    options: FilterOptions<table.Col<any, any>>;
  };
};

const gridSize = getGridSize();

const infoStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: gridSize * 2,
});

const Info: React.FC<{}> = ({ children }) => (
  <div css={infoStyles}>{children}</div>
);

const sectionStyles = css({
  '> p:first-of-type': {
    marginTop: 0,
  },
});

const Description: React.FC<{}> = ({ children }) => (
  <section css={sectionStyles}>
    <Label>Description</Label>
    {children}
  </section>
);

const Example: React.FC<{}> = ({ children }) => (
  <section css={sectionStyles}>
    <Label>Example</Label>
    {children}
  </section>
);

type ValueProps = {
  value: ReactChild;
};

const valueStyles = css({ display: 'flex', marginBottom: 0.5 * gridSize });

const Value: React.FC<ValueProps> = ({ children, value }) => (
  <div css={[sectionStyles]}>
    <div css={valueStyles}>{value}</div>
    <small>{children}</small>
  </div>
);

const valueContainerStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 1.5 * gridSize,
  paddingLeft: gridSize,
  borderLeft: `2px solid ${N40}`,
});

const Values: React.FC<{}> = ({ children }) => (
  <section>
    <Label>Values</Label>
    <div css={valueContainerStyles}>{children}</div>
  </section>
);

const completedLabelStyles = css({
  display: 'flex',
  gap: '4px',
  alignItems: 'center',
});

export const optionData: FilterOptionData = {
  liteMode: {
    label: 'Lite mode',
    info: (
      <Info>
        <Description>
          <p>
            {/* TODO: get rules automatically? */}
            This indicates whether or not the package is using the{' '}
            <Code>lite-mode</Code> techstack rule. This rule applies the
            following <Code>eslint</Code> rules:
          </p>
          <ul>
            <li>
              <Code>@repo/internal/react/no-class-components</Code>
            </li>
            <li>
              <Code>react/no-did-mount-set-state</Code>
            </li>
            <li>
              <Code>react/no-did-update-set-state</Code>
            </li>
            <li>
              <Code>@repo/internal/react/no-set-state-inside-render</Code>
            </li>
          </ul>
        </Description>
      </Info>
    ),
    options: [
      {
        label: (
          <div css={completedLabelStyles}>
            Completed <Check />
          </div>
        ),
        value: true,
      },
      { label: 'None', value: false },
    ] as FilterOptions<table.LiteMode>,
  },
  styling: {
    label: 'Styling',
    info: (
      <Info>
        <Description>
          <p>
            This value corresponds to the styling library currently being used
            by the package. If a package uses more than one styling library, the
            'least desirable' will take precedence.
          </p>
        </Description>
        <Example>
          <p>
            If a package uses both{' '}
            <Lozenge appearance="success">@emotion/core</Lozenge> and{' '}
            <Lozenge appearance="moved">@emotion/styled</Lozenge> then the
            styling value will be reported as{' '}
            <Lozenge appearance="moved">@emotion/styled</Lozenge>.
          </p>
        </Example>
        <Values>
          <Value value={<Lozenge appearance="new">@compiled/react</Lozenge>} />
          <Value value={<Lozenge appearance="success">@emotion/core</Lozenge>}>
            <p>
              Likely ready for migration to <Code>compiled</Code>.
            </p>
          </Value>
          <Value value={<Lozenge appearance="moved">@emotion/styled</Lozenge>}>
            <p>
              No longer using <Code>styled-components</Code>, but not ready for
              migration to <Code>compiled</Code>.
            </p>
          </Value>
          <Value
            value={<Lozenge appearance="default">styled-components</Lozenge>}
          />
        </Values>
      </Info>
    ),
    options: [
      {
        label: <Lozenge appearance="new">@compiled/react</Lozenge>,
        value: '@compiled/react',
      },
      {
        label: <Lozenge appearance="success">@emotion/core</Lozenge>,
        value: '@emotion/core',
      },
      {
        label: <Lozenge appearance="moved">@emotion/styled</Lozenge>,
        value: '@emotion/styled',
      },
      {
        label: <Lozenge appearance="default">styled-components</Lozenge>,
        value: 'styled-components',
      },
      { label: 'None', value: null },
    ] as FilterOptions<table.Styling>,
  },
  theming: {
    label: 'Theming',
    info: (
      <Info>
        <Description>
          <p>
            This value corresponds to the theming system currently being used by
            the package.
          </p>
        </Description>
        <Values>
          <Value value={<Lozenge appearance="success">tokens</Lozenge>}>
            <p>
              Using semantic colors from <Code>@atlaskit/tokens</Code>.
            </p>
          </Value>
          <Value
            value={<Lozenge appearance="default">new-theming-api</Lozenge>}
          >
            <p>
              Using the global theming API from <Code>@atlaskit/theme</Code>.
            </p>
          </Value>
        </Values>
      </Info>
    ),
    options: [
      {
        label: <Lozenge appearance="success">tokens</Lozenge>,
        value: 'tokens',
      },
      {
        label: <Lozenge appearance="default">new-theming-api</Lozenge>,
        value: 'new-theming-api',
      },
      { label: 'None', value: null },
    ] as FilterOptions<table.Theming>,
  },
  documentation: {
    label: 'Documentation',
    info: (
      <Info>
        <Description>
          <p>
            This value indicates where <strong>public</strong> documentation is
            available for the component.
          </p>
        </Description>
        <Values>
          <Value value={<Lozenge appearance="success">constellation</Lozenge>}>
            <p>
              Documentation is available on{' '}
              <a href="https://atlassian.design">atlassian.design</a>.
            </p>
          </Value>
          <Value value={<Lozenge appearance="default">atlaskit</Lozenge>}>
            <p>
              Documentation is available on{' '}
              <a href="https://atlaskit.atlassian.com">
                atlaskit.atlassian.com
              </a>
              .
            </p>
          </Value>
        </Values>
      </Info>
    ),
    options: [
      {
        label: <Lozenge appearance="success">constellation</Lozenge>,
        value: 'constellation',
      },
      {
        label: <Lozenge appearance="default">Atlaskit</Lozenge>,
        value: 'atlaskit',
      },
      { label: 'None', value: null },
    ] as FilterOptions<table.Documentation>,
  },
  deprecated: {
    label: 'Deprecated',
    info: (
      <Info>
        <Description>
          <p>Whether or not the package is deprecated. </p>
          <p>
            Deprecated packages are (manually){' '}
            <a href="https://hello.atlassian.net/wiki/spaces/DST/pages/974856715/Task+Deprecating+a+package">
              deleted from the monorepo after 12 weeks
            </a>
            .
          </p>
        </Description>
      </Info>
    ),
    options: [
      {
        label: <Lozenge appearance="removed">Deprecated</Lozenge>,
        value: true,
      },
      {
        label: 'None',
        value: false,
      },
    ] as FilterOptions<table.Deprecated>,
  },
};
