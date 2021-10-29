import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Lozenge from '@atlaskit/lozenge';
import messages from '../messages';
import { TryLozenge, TitleWrapper } from './styled';
const ProjectPagesImprovementTitle = ({
  intl,
  isPreExpand,
}: { isPreExpand: boolean } & InjectedIntlProps) => {
  return (
    <TitleWrapper>
      {intl.formatMessage(messages.title)}
      {isPreExpand && (
        <TryLozenge>
          <Lozenge appearance="inprogress">
            {intl.formatMessage(messages.tryLozenge)}
          </Lozenge>
        </TryLozenge>
      )}
    </TitleWrapper>
  );
};

export default injectIntl(ProjectPagesImprovementTitle);
