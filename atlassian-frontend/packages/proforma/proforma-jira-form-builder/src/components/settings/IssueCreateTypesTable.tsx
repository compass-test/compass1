import React, { useState } from 'react';

import { FormattedMessage } from 'react-intl';

import Avatar from '@atlaskit/avatar';
import Button from '@atlaskit/button';
import { useFlags } from '@atlaskit/flag';
import InfoIcon from '@atlaskit/icon/glyph/info';
import { B300 } from '@atlaskit/theme/colors';
import { AvatarOption } from '@atlassian/paginated-picker';

import { AddShortcutModalProps } from '../../model/AddShortcutModalProps';

import { messages } from './messages';
import {
  CreateTypesTable,
  FlexDiv,
  IssueCreateTypesTableCell,
  IssueCreateTypesTableHeaderCell,
  IssueCreateTypesTableTypeLabelDiv,
} from './styled';

interface IssueCreateTypesTableProps {
  isServiceProject: boolean;
  selectedIssueRequestTypeOptions: AvatarOption[];
  createIssueFormUrl: (issueTypeId: string, requestTypeId?: string) => string;
  projectKey: string;
  AddShortcutModal?: (props: AddShortcutModalProps) => JSX.Element;
}

export const IssueCreateTypesTable = ({
  isServiceProject,
  selectedIssueRequestTypeOptions,
  createIssueFormUrl,
  projectKey,
  AddShortcutModal,
}: IssueCreateTypesTableProps) => {
  const [addShortcutModalUrl, setAddShortcutModalUrl] = useState<string>();
  const { showFlag } = useFlags();

  const handleCopyLinkClick = (url: string) => {
    copyToClipboard(url);
    showFlag({
      title: (
        <FormattedMessage {...messages.issueCreateTypesTableCopiedLinkFlag} />
      ),
      icon: <InfoIcon primaryColor={B300} label="Info" />,
    });
  };

  return (
    <>
      <CreateTypesTable>
        <thead>
          <tr>
            <IssueCreateTypesTableHeaderCell>
              <FormattedMessage
                {...(isServiceProject
                  ? messages.issueCreateTypesTableTypeColumnHeaderJsm
                  : messages.issueCreateTypesTableTypeColumnHeaderNonJsm)}
              />
            </IssueCreateTypesTableHeaderCell>
            <IssueCreateTypesTableHeaderCell>
              <FormattedMessage
                {...messages.issueCreateTypesTableDirectLinkColumnHeader}
              />
            </IssueCreateTypesTableHeaderCell>
            {AddShortcutModal && (
              <IssueCreateTypesTableHeaderCell>
                <FormattedMessage
                  {...messages.issueCreateTypesTableAddShortcutColumnHeader}
                />
              </IssueCreateTypesTableHeaderCell>
            )}
          </tr>
        </thead>
        <tbody>
          {selectedIssueRequestTypeOptions.map(selectedOption => (
            <tr>
              <IssueCreateTypesTableCell>
                <FlexDiv>
                  {selectedOption.avatar && !selectedOption.hideAvatar && (
                    <Avatar
                      src={selectedOption.avatar}
                      size="xsmall"
                      appearance={selectedOption.square ? 'square' : 'circle'}
                    />
                  )}
                  <IssueCreateTypesTableTypeLabelDiv>
                    {selectedOption.label}
                  </IssueCreateTypesTableTypeLabelDiv>
                </FlexDiv>
              </IssueCreateTypesTableCell>
              <IssueCreateTypesTableCell>
                <Button
                  appearance="link"
                  spacing="none"
                  onClick={() =>
                    handleCopyLinkClick(
                      createIssueFormUrl(selectedOption.value),
                    )
                  }
                >
                  <FormattedMessage
                    {...messages.issueCreateTypesTableCopyLinkText}
                  />
                </Button>
              </IssueCreateTypesTableCell>
              {AddShortcutModal && (
                <IssueCreateTypesTableCell>
                  <Button
                    appearance="link"
                    spacing="none"
                    onClick={() =>
                      setAddShortcutModalUrl(
                        createIssueFormUrl(selectedOption.value),
                      )
                    }
                  >
                    <FormattedMessage
                      {...messages.issueCreateTypesTableAddShortcutText}
                    />
                  </Button>
                </IssueCreateTypesTableCell>
              )}
            </tr>
          ))}
        </tbody>
      </CreateTypesTable>
      {AddShortcutModal && addShortcutModalUrl && (
        <AddShortcutModal
          projectId={projectKey}
          projectKey={projectKey}
          baseUrl=""
          onCompleted={() => setAddShortcutModalUrl(undefined)}
        />
      )}
    </>
  );
};

function copyToClipboard(textToCopy: string): void {
  const el = document.createElement('textarea');
  el.value = textToCopy;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}
