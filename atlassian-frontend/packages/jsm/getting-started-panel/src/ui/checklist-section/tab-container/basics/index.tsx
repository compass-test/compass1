import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { BasicsTaskIds } from '../../../../common/types';
import messages from './messages';
import { createTabContainer } from '../main';

export const BasicsTabContainerName =
  'jsmGettingStartedPanelChecklistBasicsTab';

const Description = ({ intl }: InjectedIntlProps) => (
  <>{intl.formatMessage(messages.tabDescription)}</>
);
const DescriptionWithIntl = injectIntl(Description);

export const BasicsTabContainer = createTabContainer(
  BasicsTabContainerName,
  BasicsTaskIds,
  <DescriptionWithIntl />,
);
