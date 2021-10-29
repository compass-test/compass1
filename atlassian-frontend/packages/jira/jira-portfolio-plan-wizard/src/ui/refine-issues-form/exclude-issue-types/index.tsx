import React, { useEffect } from 'react';

import uniq from 'lodash/fp/uniq';

import { IssueType } from '../../../common/types';
import PopupMultiSelect from '../../../common/ui/popup-multi-slect';
import { useIntl } from '../../../common/utils/intl';
import { preloadImage } from '../../../common/utils/preload-image';

import msgs from './messages';
import { ListItem } from './styled';
import { Props } from './types';

const ExcludeIssueTypes = ({
  fieldProps,
  error,
  valid,
  loading,
  issueTypeMap,
}: Props) => {
  const { formatMessage } = useIntl();
  // For percieved performance start pre-caching the icons
  useEffect(() => {
    if (issueTypeMap) {
      const iconUrls = uniq(
        Object.values(issueTypeMap).map((issueType) => issueType.iconUrl),
      );

      iconUrls.forEach(preloadImage);
    }
  }, [issueTypeMap]);

  return (
    <PopupMultiSelect<IssueType>
      testId="exclude-issue-type"
      fieldProps={fieldProps}
      valid={valid}
      optionsMap={
        issueTypeMap && [{ label: '', options: Object.values(issueTypeMap) }]
      }
      loading={loading}
      loadingMessage={formatMessage(msgs.typesLoading)}
      noOptionsMessage={formatMessage(msgs.typesNoOptions)}
      noneExcludedMessage={formatMessage(msgs.noTypesExcluded)}
      renderSelectedOption={(issueType) => {
        if (!issueType) {
          return <></>;
        }
        return (
          <ListItem>
            <img src={issueType.iconUrl} /> &nbsp; {issueType.name}
          </ListItem>
        );
      }}
      searchPlaceholder={formatMessage(msgs.chooseTypePlaceholder)}
    >
      {(selectedExclusions) => {
        return `${formatMessage(msgs.type)}: ${selectedExclusions
          .map((issueType) => issueType.name)
          .join(', ')}`;
      }}
    </PopupMultiSelect>
  );
};

export default ExcludeIssueTypes;
