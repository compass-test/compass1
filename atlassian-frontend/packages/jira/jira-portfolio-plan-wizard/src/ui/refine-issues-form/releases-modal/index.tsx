import React, { useCallback, useState } from 'react';

import ModalDialog, { ModalHeader, ModalTitle } from '@atlaskit/modal-dialog';

import { ReleaseSelectionMode } from '../../../common/types';
import { useIntl } from '../../../common/utils/intl';

import msgs from './messages';
import ReleasesModalContent from './releases-modal-content';
import { FieldValue } from './releases-modal-content/types';
import ReleasesModalFooter from './releases-modal-footer';
import { ModalBodyContainer } from './styled';
import { Props } from './types';

const ModalBody: React.FunctionComponent<{}> = ({ children }) => (
  <ModalBodyContainer>{children}</ModalBodyContainer>
);

export const ReleasesModal = (props: Props) => {
  const { formatMessage } = useIntl();

  const [value, setValue] = useState<FieldValue>(
    (() => {
      if (props.defaultMode === ReleaseSelectionMode.REINCLUDE) {
        return {
          mode: ReleaseSelectionMode.REINCLUDE,
          selectedReleases: props.plan.excludedVersions || [],
        };
      }
      return {
        mode: ReleaseSelectionMode.EXCLUDE,
        selectedReleases: props.plan.excludedVersions,
      };
    })(),
  );

  const getExcludedReleaseIds = useCallback(
    (value: FieldValue) => {
      const { excludedVersions } = props.plan;
      const { selectedReleases, mode } = value;
      const { allReleases } = props;
      if (!allReleases || !selectedReleases) {
        return [];
      }

      const alreadyExcludedReleases = excludedVersions || [];
      if (mode === ReleaseSelectionMode.EXCLUDE) {
        return alreadyExcludedReleases.concat(selectedReleases);
      } else {
        return alreadyExcludedReleases.filter(
          (id) => !selectedReleases.includes(id),
        );
      }
    },
    [props],
  );

  const onChange = useCallback(
    (value: FieldValue) => {
      props.onChange && props.onChange(getExcludedReleaseIds(value));
      setValue(value);
    },
    [getExcludedReleaseIds, props],
  );

  const handleSubmit = useCallback(() => {
    const { onSubmit, onClose } = props;
    if (!onSubmit) {
      return;
    }
    onSubmit(getExcludedReleaseIds(value));
    onClose();
  }, [getExcludedReleaseIds, props, value]);

  const numSelectedReleases = (value.selectedReleases || []).length;

  return (
    <ModalDialog height="100%" width="large" onClose={props.onClose}>
      <ModalHeader>
        <ModalTitle>{formatMessage(msgs.modalHeading)}</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <ReleasesModalContent
          {...props}
          onChange={onChange}
          isSettingsMode={props.isSettingsMode}
        />
      </ModalBody>
      <ReleasesModalFooter
        onSubmit={handleSubmit}
        mode={value.mode}
        numSelectedReleases={numSelectedReleases}
      />
    </ModalDialog>
  );
};

export default ReleasesModal;
