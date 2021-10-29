import styled from '@emotion/styled';

type WrapperProps = {
  maxColumnCount: number;
};

export const Wrapper = styled.div<WrapperProps>`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => `${Math.min(props.maxColumnCount, 5)}, 1fr`}
  );
  column-gap: 12px;
  row-gap: 12px;

  @media (min-width: 2340px) {
    a:nth-child(${(props) => Math.min(props.maxColumnCount, 5)}n) {
      .link-tooltip {
        left: unset;
        right: 0;
      }
    }
  }

  @media (max-width: 2340px) and (min-width: 1881px) {
    grid-template-columns: repeat(
      ${(props) => `${Math.min(props.maxColumnCount, 4)}, 1fr`}
    );
    a:nth-child(${(props) => Math.min(props.maxColumnCount, 4)}n) {
      .link-tooltip {
        left: unset;
        right: 0;
      }
    }
  }

  @media (max-width: 1880px) and (min-width: 1421px) {
    grid-template-columns: repeat(
      ${(props) => `${Math.min(props.maxColumnCount, 3)}, 1fr`}
    );
    a:nth-child(${(props) => Math.min(props.maxColumnCount, 3)}n) {
      .link-tooltip {
        left: unset;
        right: 0;
      }
    }
  }

  @media (max-width: 1420px) and (min-width: 921px) {
    grid-template-columns: repeat(
      ${(props) => `${Math.min(props.maxColumnCount, 2)}, 1fr`}
    );

    a:nth-child(${(props) => Math.min(props.maxColumnCount, 2)}n) {
      .link-tooltip {
        left: unset;
        right: 0;
      }
    }
  }

  @media (max-width: 920px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
