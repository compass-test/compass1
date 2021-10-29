import React, { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import OpenIcon from '@atlaskit/icon/glyph/open';
import { AnalyticsButton } from '@atlassian/mpt-elements';

import { messages } from '../../../i18n';
import * as S from '../../styled';

type Props = {
  appAssessmentUrl: string;
};

const AppAssessmentIncomplete: FC<Props> = ({ appAssessmentUrl }: Props) => {
  return (
    <>
      <S.Description>
        <FormattedMessage {...messages.appAssessmentIncompleteDescription} />
      </S.Description>
      <AnalyticsButton
        analyticsId="completeAppAssessment"
        href={appAssessmentUrl}
        target="_blank"
        iconAfter={<OpenIcon label={'Complete app assessment '} />}
      >
        <FormattedMessage {...messages.appAssessmentIncompleteLabel} />
      </AnalyticsButton>
    </>
  );
};

export default AppAssessmentIncomplete;
