import React from 'react';

import { observer } from 'mobx-react';

import { RenderForm } from '@atlassian/proforma-common-core/form-system';
import {
  CommonMessage,
  IntlCommonMessages,
  Loader,
} from '@atlassian/proforma-common-core/jira-common';

import { PortalCreateStore } from '../stores/PortalCreateStore';

interface PortalCreateProps {
  portalCreateStore: PortalCreateStore;
}

export const PortalCreate: React.FC<PortalCreateProps> = observer(
  ({ portalCreateStore }) => {
    // This class name is used to uniquely identify forms so customers can write CSS to target the forms, but ProForma does not provide styles for it.
    const serviceDeskClassName = `proforma-create-sd-${portalCreateStore.serviceDeskId} proforma-create-rt-${portalCreateStore.requestTypeId}`;

    return (
      <div>
        <div className={serviceDeskClassName}>
          {portalCreateStore.loadingForm && (
            <Loader
              message={IntlCommonMessages[CommonMessage.LoadingFormDetails]}
            />
          )}
          {portalCreateStore.formStore && (
            <RenderForm
              formStore={portalCreateStore.formStore}
              revisionToken={portalCreateStore.formStore.revisionToken}
            />
          )}
        </div>
      </div>
    );
  },
);
