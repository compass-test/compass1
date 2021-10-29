/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Spinner from '@atlaskit/spinner';

export const Loader = () => {
  return (
    <div
      css={css`
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
        width: 100%;
        overflow: hidden;
      `}
    >
      <Spinner testId="forge-app-loading-spinner" size="large" />
    </div>
  );
};
