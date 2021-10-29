import React from 'react';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import { ChangesTaskIds } from '../../../../common/types';
import messages from './messages';
import { createTabContainer } from '../main';
import tabTitleMessages from '../../../../common/ui/tab-title/messages';

export const ChangesTabContainerName =
  'jsmGettingStartedPanelChecklistChangesTab';

const Description = ({ intl }: InjectedIntlProps) => (
  <FormattedMessage
    {...messages.tabDescription}
    values={{
      changes: (
        <strong>{intl.formatMessage(tabTitleMessages.checklistChanges)}</strong>
      ),
    }}
  />
);
const DescriptionWithIntl = injectIntl(Description);

export const ChangesTabContainer = createTabContainer(
  ChangesTabContainerName,
  ChangesTaskIds,
  <DescriptionWithIntl />,
);
