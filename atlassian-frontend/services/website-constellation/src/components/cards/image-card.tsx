/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { N20 } from '@atlaskit/theme/colors';
import { CardBase } from './card';

const CardImage = styled('img')`
  border-radius: 4px;
  background-color: ${N20};
  margin-top: 0;
  width: 100%;
  display: block;
`;

type Props = {
  imageSrc?: string;
  title: string;
  description: string;
  to: string;
  children?: any;
  headingLevel?: number;
};

const ImageCard = (props: Props) => {
  const { imageSrc, title, description, to, headingLevel } = props;
  return (
    <CardBase
      to={to}
      css={{
        gridColumn: 'span 4',
      }}
    >
      <div css={{ borderRadius: '4px', backgroundColor: N20, height: '144px' }}>
        {imageSrc && <CardImage src={imageSrc} alt="" />}
      </div>

      <h2
        aria-level={headingLevel}
        className="headline2"
        css={{
          marginTop: 24,
        }}
      >
        {title}
      </h2>
      <p>
        {description.length > 120
          ? description.slice(0, 110) + ' ...'
          : description}
      </p>
    </CardBase>
  );
};

export default ImageCard;
