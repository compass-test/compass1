import React from 'react';

import { UIAnalyticsEvent, useAnalyticsEvents } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';
import EditorSearchIcon from '@atlaskit/icon/glyph/editor/search';
import MediaServicesFilterIcon from '@atlaskit/icon/glyph/media-services/filter';
import TextField from '@atlaskit/textfield';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import { Container, SearchFieldWrapper, YourTeamsWrapper } from './styled';

type SearchFilteringProps = {
  yourTeamsEnabled: boolean;
  toggleYourTeamsEnabled: () => void;
  setSearchText: (text: string) => void;
  testId?: string;
};

export const SearchFiltering = ({
  testId,
  yourTeamsEnabled,
  toggleYourTeamsEnabled,
  setSearchText,
}: SearchFilteringProps) => {
  const { formatMessage } = useIntl();
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const dataTestId =
    testId || 'dragonfruit-page-teams-list.ui.search-filtering';

  const textFieldEvent = createAnalyticsEvent({
    action: 'clicked',
    actionSubject: 'textField',
  });

  const onYourTeamsClick = (buttonEvent: UIAnalyticsEvent) => {
    fireUIAnalytics(buttonEvent, 'yourTeams');
    toggleYourTeamsEnabled();
  };

  return (
    <Container data-testid={dataTestId}>
      <SearchFieldWrapper>
        <TextField
          testId={`${dataTestId}.search-terms-field`}
          isCompact={true}
          placeholder={formatMessage(messages.searchTeams)}
          elemAfterInput={
            <EditorSearchIcon label={formatMessage(messages.searchIcon)} />
          }
          isDisabled={yourTeamsEnabled}
          onChange={input => setSearchText(input.currentTarget.value)}
          value={yourTeamsEnabled ? '' : undefined}
          onClick={() => fireUIAnalytics(textFieldEvent, 'searchTeams')}
        />
      </SearchFieldWrapper>
      <YourTeamsWrapper>
        <Button
          testId={`${dataTestId}.your-teams-button`}
          isSelected={yourTeamsEnabled}
          iconBefore={
            <MediaServicesFilterIcon
              label={formatMessage(messages.yourTeamsIcon)}
            />
          }
          onClick={(
            e: React.MouseEvent<HTMLElement>,
            analyticsEvent: UIAnalyticsEvent,
          ) => onYourTeamsClick(analyticsEvent)}
        >
          {formatMessage(messages.yourTeams)}
        </Button>
      </YourTeamsWrapper>
    </Container>
  );
};
