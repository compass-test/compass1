/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { N50A, N60A } from '@atlaskit/theme/colors';
import { Link } from 'gatsby';
import loadable from '@loadable/component';
import { N900 } from '@atlaskit/theme/colors';
import { AtlassianIcon } from '@atlaskit/logo';
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import Figma24Icon from '@atlaskit/icon-file-type/glyph/figma/24';
import Sketch24Icon from '@atlaskit/icon-file-type/glyph/sketch/24';

export const CardBase = styled(Link)`
  padding: 24px;
  border-radius: 4px;
  box-shadow: 0 1px 1px ${N50A}, 0 0 1px 0 ${N60A};
  overflow: hidden;
  background-color: #fff;
  &:hover {
    box-shadow: 0 8px 16px -4px ${N50A}, 0 0 1px ${N60A};
    text-decoration: none;
  }
  p {
    margin-top: 8px;
    overflow-wrap: break-word;
  }
  h2 {
    margin-top: 16px;
    overflow-wrap: break-word;
    hyphens: auto;
  }
`;

type Props = {
  title: string;
  description: string;
  variant?: 'half' | 'third';
  to: string;
  iconGlyph?: string;
  children?: any;
  tileColor?: string;
  headingLevel?: number;
};

const IconTile = styled.div<{ background: string }>`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.background};
`;

const LazyIcon = loadable(({ glyph }) => {
  return import(
    /* webpackChunkName: "@atlaskit/icon/glyph/[request]" */ `@atlaskit/icon/glyph/${glyph}`
  ).catch(() => ({
    default: QuestionCircleIcon,
  }));
});

const Card = ({
  to,
  description,
  title,
  variant,
  iconGlyph,
  tileColor,
  headingLevel = 2,
  ...rest
}: Props) => {
  const columns = variant === 'half' ? 6 : 4;
  let minHeight = variant === 'half' ? 160 : 208;

  if (iconGlyph) {
    minHeight = variant === 'half' ? 224 : 272;
  }

  const Icon = ({ glyph, secondaryColor }) => {
    if (glyph === 'logo') {
      return <AtlassianIcon iconColor={'white'} size={'small'} />;
    } else if (glyph === 'sketch') {
      return (
        <span css={{ fontSize: 0, path: { fill: '#FFF' } }}>
          <Sketch24Icon label="" />
        </span>
      );
    } else if (glyph === 'figma') {
      return (
        <span css={{ fontSize: 0, path: { fill: '#FFF' } }}>
          <Figma24Icon label="" />
        </span>
      );
    } else {
      return (
        <LazyIcon
          glyph={glyph}
          primaryColor="white"
          secondaryColor={secondaryColor}
        />
      );
    }
  };

  return (
    <CardBase
      to={to}
      css={{
        gridColumn: `span ${columns}`,
        minHeight: minHeight,
      }}
      {...rest}
    >
      <IconTile background={tileColor || N900}>
        <Icon glyph={iconGlyph} secondaryColor={tileColor || N900} />
      </IconTile>

      <h2 aria-level={headingLevel} className="headline2">
        {title}
      </h2>
      <p>
        {description.length > 140
          ? description.slice(0, 110) + ' ...'
          : description}
      </p>
    </CardBase>
  );
};

export default Card;
