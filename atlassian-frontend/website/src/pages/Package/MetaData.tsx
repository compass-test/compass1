import React from 'react';
import styled from 'styled-components';
import { colors, gridSize } from '@atlaskit/theme';

export type MetaItemProps = {
  href?: string;
  label: React.ReactNode;
  summary: React.ReactNode;
};

const MetaItem = (props: MetaItemProps) => (
  <DI>
    <DT>{props.label}</DT>
    <DD>
      {props.href ? (
        <a href={props.href} target="_new">
          {props.summary}
        </a>
      ) : (
        props.summary
      )}
    </DD>
  </DI>
);

export type MetaDataProps = {
  packageSrc: string;
  packageName: string;
};

export default class MetaData extends React.Component<MetaDataProps> {
  render() {
    const { packageSrc, packageName } = this.props;

    return (
      <Meta>
        <MetaItem
          label="Install"
          summary={<code>yarn add {packageName}</code>}
        />
        <MetaItem
          href={`https://www.npmjs.com/package/${packageName}`}
          label="npm"
          summary={packageName}
        />
        <MetaItem href={packageSrc} label="Source" summary="Bitbucket" />
        <MetaItem
          href={`https://unpkg.com/${packageName}/dist/`}
          label="Bundle"
          summary="unpkg.com"
        />
      </Meta>
    );
  }
}

const Meta = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: ${gridSize() * 3}px;
  padding-top: ${gridSize() * 1.5}px;

  @media (min-width: 780px) {
    padding-top: ${gridSize() * 3}px;
  }
`;

const DI = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  padding: 0.4em 0;

  @media (min-width: 780px) {
    flex-direction: row;
  }
`;

const DT = styled.div`
  color: ${colors.subtleText};
  flex-basis: 25%;
`;

const DD = styled.div`
  flex: 1 0 auto;
`;
