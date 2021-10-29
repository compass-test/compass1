import React from 'react';

import ErrorIcon from '@atlaskit/icon/glyph/error';
import * as colors from '@atlaskit/theme/colors';

import { ErrorCard, Header } from './styled';

type Props = {
  errorMessage?: string;
};

const ErrorBanner: React.FC<Props> = ({ errorMessage }) => {
  return (
    <ErrorCard id="errorCard">
      <Header>
        <ErrorIcon label="Error" primaryColor={colors.R500} />
        <p>
          {errorMessage ||
            `Something went wrong. Wait a few minutes and try again`}
        </p>
      </Header>
    </ErrorCard>
  );
};

export default React.memo(ErrorBanner);
