/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
// eslint-disable-next-line import/no-extraneous-dependencies
import { N10, N400 } from '@atlaskit/theme/colors';

type Props = {
  headline: string;
  description?: string;
  className?: string;
  imageSrc?: string;
};

const Container = styled.div`
  padding-left: 80px;
  display: flex;
  background-color: ${N10};
`;

const Content = styled.div`
  height: 100%;
`;

const Hero = ({ headline, description, imageSrc, ...rest }: Props) => {
  return (
    <Container
      className={rest.className}
      css={{ height: imageSrc ? '320px' : '224px' }}
    >
      <Content
        css={{
          paddingTop: imageSrc ? '96px' : '48px',
          maxWidth: imageSrc ? '480px' : '640px',
        }}
      >
        <h1 className="headline1" css={{ marginTop: 0 }}>
          {headline}
        </h1>
        {description && (
          <p className="lg" css={{ color: N400 }}>
            {description}
          </p>
        )}
      </Content>

      {imageSrc && (
        // image is decorative, hence empty alt
        <img css={{ maxWidth: '384px' }} src={imageSrc} alt="" />
      )}
    </Container>
  );
};

export default Hero;
