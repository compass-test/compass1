import React, { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import ErrorIcon from '@atlaskit/icon/glyph/error';
import { R300 } from '@atlaskit/theme/colors';

import { messages } from '../../../i18n';

import * as S from './styled';

type Props = {
  count: number;
};

const ErrorSummary: FC<Props> = ({ count }) => {
  return (
    <S.Wrapper>
      {count > 0 ? <ErrorIcon label="Error" primaryColor={R300} /> : null}
      <S.Message data-testid="error-message">
        {count > 0 ? (
          <FormattedMessage {...messages.errorSummary} values={{ count }} />
        ) : (
          <FormattedMessage {...messages.errorSummarySuccess} />
        )}
      </S.Message>
    </S.Wrapper>
  );
};

export default React.memo(ErrorSummary);
