import React, { useCallback } from 'react';
import Toggle from '@atlaskit/toggle';
import { useDraftsToggle } from '../../controllers/drafts-toggle';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import messages from './messages';
import styled from '@emotion/styled';
import { gridSize } from '@atlaskit/theme/constants';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import { useConfluencePageTreeContext } from '../../controllers/page-tree';
import { TranslationsProvider } from '../translations-provider';

interface Props {
  locale: string;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: ${gridSize()}px;
`;

const DraftsToggle = injectIntl(
  ({ intl: { formatMessage } }: InjectedIntlProps) => {
    const [
      { isDraftsShown, isTreeUpdatedForDrafts },
      { setIsDraftsShown },
    ] = useDraftsToggle();
    const { accountId } = useConfluencePageTreeContext();
    const handleChange = useCallback(
      (_: React.ChangeEvent, analyticsEvent: UIAnalyticsEvent) => {
        setIsDraftsShown(accountId, !isDraftsShown);
        fireUIAnalytics(analyticsEvent, 'showDraftsToggle', {
          isDraftsShown: !isDraftsShown,
        });
      },
      [accountId, isDraftsShown, setIsDraftsShown],
    );

    return (
      <Wrapper>
        <Toggle
          id="show-drafts"
          isChecked={isDraftsShown || false}
          isDisabled={isDraftsShown === null || !isTreeUpdatedForDrafts}
          onChange={handleChange}
        />
        <label htmlFor="show-drafts">{formatMessage(messages.label)}</label>
      </Wrapper>
    );
  },
);

export default ({ locale }: Props) => (
  <TranslationsProvider locale={locale}>
    <DraftsToggle />
  </TranslationsProvider>
);
