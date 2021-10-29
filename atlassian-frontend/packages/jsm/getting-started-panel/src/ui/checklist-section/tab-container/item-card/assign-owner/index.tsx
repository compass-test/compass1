import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { useUrlData } from '../../../../../common/ui/url-data';
import { ItemCardContent } from '../index';
import { makeInstruction } from '../instruction';
import { Product, TaskId } from '../../../../../common/types';
import { CrossProductLink } from '../../../../link-utility/cross-product-link';

import messages from './messages';

const actionSubjectIds = {
  services: 'jsmGettingStartedPanelAssignOwnerServices',
};

const AssignOwnerItemCardContentBase = ({ intl }: InjectedIntlProps) => {
  const { opsgenieBaseUrl } = useUrlData();
  // Note, Opsgenie is not translated, so these strings copied from
  // Opsgenie elements are also not translated.
  const keyElements = {
    services: (
      <strong>
        <CrossProductLink
          linkProduct={Product.Opsgenie}
          url={`${opsgenieBaseUrl}/service/list`}
          subjectId={actionSubjectIds.services}
        >
          Services
        </CrossProductLink>
      </strong>
    ),
    addService: <strong>Add service</strong>,
    serviceName: <strong>Service name</strong>,
    ownerTeam: <strong>Owner team</strong>,
    addServiceSubmit: <strong>Add service</strong>,
  };
  return (
    <ItemCardContent
      description={intl.formatMessage(messages.assignOwnerDescription)}
      learnMore={{
        url: 'https://docs.opsgenie.com/docs/internal-services',
        text: intl.formatMessage(messages.assignOwnerLearnMore),
        taskId: TaskId.AssignOwnerTeamToServices,
      }}
      instructions={[
        makeInstruction(messages.assignOwnerStep1, keyElements),
        makeInstruction(messages.assignOwnerStep2, keyElements),
        makeInstruction(messages.assignOwnerStep3, keyElements),
        makeInstruction(messages.assignOwnerStep4, keyElements),
        makeInstruction(messages.assignOwnerStep5, keyElements),
      ]}
      noteText={intl.formatMessage(messages.assignOwnerDescriptionNote)}
    />
  );
};

export const AssignOwnerItemCardContent = injectIntl(
  AssignOwnerItemCardContentBase,
);
