import React, { useEffect, useState } from 'react';

import compose from 'lodash/fp/compose';
import isEmpty from 'lodash/fp/isEmpty';
import isEqual from 'lodash/fp/isEqual';
import last from 'lodash/fp/last';
import { FormattedMessage } from 'react-intl';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/custom-theme-button';
import AddIcon from '@atlaskit/icon/glyph/editor/add';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';

import { IssueSource } from '../../../common/types';
import { Row } from '../../../common/ui/form';
import genHash from '../../../common/utils/gen-hash';
import { useFeatureFlags } from '../../../controllers/feature-flags';

import IssueSourceField, { initialIssueSource } from './issue-source-field';
import messages from './messages';
import { AddAnotherContainer, RemoveModalTitle } from './styled';
import { IssueSourceRow, Props, RemoveModal } from './types';

const makeRow = (issueSource: IssueSource): IssueSourceRow => ({
  ...issueSource,
  rowId: genHash(),
});

const IssueSourcesField: React.FC<Props> = ({
  id = 'issue-source',
  value,
  onChange,
  errorMessage,
  hint,
  isDisabled,
  showTeams = true,
  confirmOnRemove,
}) => {
  const { getNewPlanWizardIssueOverLimit } = useFeatureFlags();
  const [removeDialog, setRemoveDialog] = useState<RemoveModal | null>(null);
  const [rows, setRows] = useState<IssueSourceRow[]>(
    isEmpty(value) ? [makeRow(initialIssueSource)] : value.map(makeRow),
  );
  const canRemoveIssueSource = rows.filter(({ value }) => !!value).length > 1;

  useEffect(
    () => {
      const realIssueSourcesOnly = rows.filter(({ value }) => !!value);
      if (
        !isEqual(realIssueSourcesOnly, value) ||
        // Seems like this check here is a mistake, it forces onChange in initial render
        (getNewPlanWizardIssueOverLimit()
          ? false
          : !isEqual(realIssueSourcesOnly, rows))
      ) {
        onChange(realIssueSourcesOnly);
      }
    },
    // We only want to run this when rows change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rows],
  );

  const addIssueSource = () => {
    setRows(rows.concat(makeRow(initialIssueSource)));
  };

  const handleIssueSourceChange = (index: number) => (next: IssueSource) => {
    setRows(
      rows.map((issueSourceRow, idx) => {
        return idx === index
          ? { ...next, rowId: issueSourceRow.rowId }
          : issueSourceRow;
      }),
    );
  };

  const closeRemoveDialog = () => setRemoveDialog(null);

  const openConfirmDialog = (executeRemoval: () => void) => (
    issueSourceName: string = '',
  ) => {
    closeRemoveDialog();
    setRemoveDialog({
      issueSourceName,
      submit: compose(closeRemoveDialog, executeRemoval),
      cancel: closeRemoveDialog,
    });
  };

  const handleIssueSourceRequestRemove = (index: number) => () => {
    setRows(rows.slice(0, index).concat(rows.slice(index + 1)));
  };

  return (
    <div>
      {rows.map((issueSource, index) => {
        const handleRemoval = handleIssueSourceRequestRemove(index);
        // We don't show the modal if it's the only row because it is impossible to disconnect the resource
        // We also dont show when they change source type, this is for accidental pressing on the x
        // Theoretically all issues sources should have a title
        const onRequestRemove =
          confirmOnRemove && canRemoveIssueSource
            ? openConfirmDialog(handleRemoval)
            : handleRemoval;

        return (
          <Row key={`row-${issueSource.rowId}`}>
            <IssueSourceField
              id={`${id}_${index}`}
              rowIndex={index}
              value={issueSource}
              showTeam={showTeams}
              onChange={handleIssueSourceChange(index)}
              onRequestRemove={onRequestRemove}
              removable={canRemoveIssueSource}
              isDisabled={isDisabled}
              optionsFilter={(option) => {
                // Allow it to select itself
                if (String(issueSource.value) === String(option.value)) {
                  return true;
                }
                // Filter out options already selected
                return !rows.some(
                  ({ value, type }) =>
                    type === issueSource.type &&
                    String(value) === String(option.value),
                );
              }}
              teamsFilter={(option) => {
                // Allow it to select itself
                if (String(issueSource.team?.id) === String(option.value)) {
                  return true;
                }

                return !rows.some(
                  ({ team }) => String(team?.id) === String(option.value),
                );
              }}
            />
          </Row>
        );
      })}
      {hint}
      <div>{errorMessage}</div>
      <Row>
        <ButtonGroup>
          <AddAnotherContainer>
            <Button
              testId="add-another"
              appearance="link"
              onClick={addIssueSource}
              iconBefore={<AddIcon label="add" />}
              isDisabled={isDisabled || !last(rows)?.value}
            >
              <FormattedMessage {...messages.addAnother} />
            </Button>
          </AddAnotherContainer>
        </ButtonGroup>
      </Row>
      {removeDialog && <RemoveIssueSourceModal {...removeDialog} />}
    </div>
  );
};

const RemoveIssueSourceModal = ({
  issueSourceName,
  cancel,
  submit,
}: {
  issueSourceName: string;
  cancel: () => void;
  submit: () => void;
}) => (
  <Modal onClose={cancel}>
    <ModalHeader>
      <ModalTitle appearance="warning">
        <RemoveModalTitle>
          <FormattedMessage
            {...messages.removeDialogHeading}
            values={{ issueSourceName }}
          />
        </RemoveModalTitle>
      </ModalTitle>
    </ModalHeader>

    <ModalBody>
      <FormattedMessage
        {...messages.removeDialogDescription}
        values={{ issueSourceName: <strong>{issueSourceName}</strong> }}
      />
    </ModalBody>

    <ModalFooter>
      <Button appearance="subtle" onClick={cancel} testId="cancel-modal">
        <FormattedMessage {...messages.cancel} />
      </Button>
      <Button appearance="warning" onClick={submit} testId="submit-modal">
        <FormattedMessage {...messages.remove} />
      </Button>
    </ModalFooter>
  </Modal>
);

export default IssueSourcesField;
