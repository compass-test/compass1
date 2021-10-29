/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { N40, N20, N800 } from '@atlaskit/theme/colors';
import DownloadIcon from '@atlaskit/icon/glyph/download';

const Content = styled.div`
  padding: 16px;
  background-color: ${N20};
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 4px 4px;
  transition: background-color 0.2s ease-in;
  img {
    margin: 0;
    max-height: 100%;
    max-width: 100%;
  }
`;

const Card = styled.a`
  grid-column: span 6;
  text-decoration: none;
  display: block;
  &:hover {
    text-decoration: none;
    ${Content} {
      background-color: ${N40};
    }
  }
`;

const Header = styled.div`
  padding: 16px;
  background-color: ${N40};
  height: 70px;
  overflow: hidden;
  color: ${N800};
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 18px;
  border-radius: 4px 4px 0 0;
`;

export default ({ title, link, fileSize, thumbnail }) => {
  const KB = fileSize / 1024;
  let text = `${title} (${KB.toFixed(2)}KB)`;
  if (KB > 1000) {
    text = `${title} (${(KB / 1024).toFixed(2)}MB)`;
  }

  return (
    <Card href={link} title={`${title} (${fileSize})`}>
      <Header>
        {text.length > 50 ? text.slice(0, 48) + ' ...' : text}
        <span css={text.length > 30 && { alignSelf: 'flex-start' }}>
          <DownloadIcon label="Download" size="medium" />
        </span>
      </Header>
      <Content>
        <img src={thumbnail} alt="" />
      </Content>
    </Card>
  );
};
