import React from 'react';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import { IncidentsTaskIds } from '../../../../common/types';
import messages from './messages';
import { createTabContainer } from '../main';
import tabTitleMessages from '../../../../common/ui/tab-title/messages';

export const IncidentsTabContainerName =
  'jsmGettingStartedPanelChecklistIncidentsTab';

const Description = ({ intl }: InjectedIntlProps) => (
  <FormattedMessage
    {...messages.tabDescription}
    values={{
      incidents: (
        <strong>
          {intl.formatMessage(tabTitleMessages.checklistIncidents)}
        </strong>
      ),
    }}
  />
);
const DescriptionWithIntl = injectIntl(Description);

export const IncidentsTabContainer = createTabContainer(
  IncidentsTabContainerName,
  IncidentsTaskIds,
  <DescriptionWithIntl />,
);
