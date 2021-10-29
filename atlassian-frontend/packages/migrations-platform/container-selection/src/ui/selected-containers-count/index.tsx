import React, { FC } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import { ContainerUnit } from '../../common/types';

import messages from './messages';
import { Label } from './styled';

export type Props = {
  // This is the type of container e.g. projects, spaces, plans
  containerUnit: ContainerUnit;

  // This is the total number of e.g. plans
  total: number;

  // This is the number of selected e.g. plans
  selected: number;
};

const messageForContainerUnit: Record<
  ContainerUnit,
  FormattedMessage.MessageDescriptor
> = {
  project: messages.projectsCountString,
  space: messages.spacesCountString,
  plan: messages.plansCountString,
};

const SelectedContainersCount: FC<Props & InjectedIntlProps> = ({
  containerUnit,
  total,
  selected,
  intl,
}) => {
  return (
    <span>
      <Label>{intl.formatMessage(messages.selectedLabel)}</Label>&nbsp;
      <strong>
        {intl.formatMessage(messageForContainerUnit[containerUnit], {
          selectedCount: selected,
          totalCount: total,
        })}
      </strong>
    </span>
  );
};
export default injectIntl(SelectedContainersCount);
