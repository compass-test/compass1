import React from 'react';

import { useIntl } from '@atlassian/dragonfruit-utils';

import groupCriteriasByCompleteness from '../../utils/group-criterias-by-completeness';
import { CriteriaRow } from '../criteria-row';
import { CriteriaFragment } from '../types';

import messages from './messages';
import { CriteriaList, Heading } from './styled';

const Criterias = ({
  criterias,
  showWeight = false,
  headingCase = 'sentenceCase',
  testId,
}: {
  criterias: CriteriaFragment[];
  showWeight?: boolean;
  headingCase?: 'sentenceCase' | 'upperCase';
  testId?: string;
}) => {
  criterias = criterias || [];

  const criteriasTestId = testId && `${testId}.criterias`;
  const { formatMessage } = useIntl();
  const { incomplete, complete } = groupCriteriasByCompleteness(criterias);

  return (
    <div data-testid={criteriasTestId}>
      {incomplete.length > 0 && (
        <>
          <Heading data-testid={`${criteriasTestId}.incomplete.header`}>
            {headingCase === 'upperCase'
              ? formatMessage(messages.notCompleted).toUpperCase()
              : formatMessage(messages.notCompleted)}
          </Heading>
          <CriteriaList>
            {incomplete.map((criteria: CriteriaFragment, index: number) => {
              return (
                <CriteriaRow
                  key={index}
                  criteria={criteria}
                  showWeight={showWeight}
                  testId={
                    criteriasTestId &&
                    `${criteriasTestId}.not-completed-row-${index}`
                  }
                />
              );
            })}
          </CriteriaList>
        </>
      )}

      {complete.length > 0 && (
        <>
          <Heading data-testid={`${criteriasTestId}.complete.header`}>
            {headingCase === 'upperCase'
              ? formatMessage(messages.completed).toUpperCase()
              : formatMessage(messages.completed)}
          </Heading>
          <CriteriaList>
            {complete.map((criteria: CriteriaFragment, index: number) => {
              return (
                <CriteriaRow
                  key={index}
                  criteria={criteria}
                  showWeight={showWeight}
                  testId={
                    criteriasTestId &&
                    `${criteriasTestId}.completed-row-${index}`
                  }
                />
              );
            })}
          </CriteriaList>
        </>
      )}
    </div>
  );
};

export default Criterias;
