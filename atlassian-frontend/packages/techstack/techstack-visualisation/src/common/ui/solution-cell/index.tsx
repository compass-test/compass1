import React, { FC, MouseEvent, useState } from 'react';

import Avatar from '@atlaskit/avatar';
import InlineDialog from '@atlaskit/inline-dialog';
import Tooltip from '@atlaskit/tooltip';

import { useSelectionAction } from '../../../controllers/use-case-selector';
import { Solution, UseCase, UsedStack } from '../../types';
import { StatusLozenge } from '../status-lozenge';

// @ts-ignore
import eslintLogoUrl from './assets/eslint.png';
import { ChecksFlyout } from './checks-flyout';
import { AvatarPanel, ContentWrapper, Description, Wrapper } from './styled';

export const SolutionCell: FC<{
  useCase: UseCase;
  solution: Solution;
  usedStack: UsedStack | string;
}> = ({ useCase, solution, usedStack }) => {
  const [, setSelectionAction] = useSelectionAction();
  const [rulesFlyoutExpanded, setRulesFlyoutExpanded] = useState(false);
  const onChecksFlyoutClose = () => setRulesFlyoutExpanded(false);
  const onChecksAvatarClick = (event: MouseEvent<HTMLDivElement>) => {
    setRulesFlyoutExpanded(true);
    event.stopPropagation();
  };
  if (!solution) {
    return null;
  }
  let isSolutionUsed = false;
  if (typeof usedStack === 'string' && usedStack === 'all') {
    isSolutionUsed = true;
  } else {
    const usedStackObj = usedStack as UsedStack;
    isSolutionUsed = Boolean(
      (Array.isArray(usedStackObj[useCase.id]) &&
        usedStackObj[useCase.id] &&
        usedStackObj[useCase.id].find(sol => sol === solution.id)) ||
        String(usedStackObj[useCase.id]) === solution.id,
    );
  }

  return (
    <Wrapper
      onClick={() => setSelectionAction.setSelection(useCase, solution)}
      isSolutionUsed={isSolutionUsed}
    >
      <ContentWrapper>
        <div>{solution ? solution.caption : ''}</div>
        {solution.description !== undefined ? (
          <Description>{solution.description}</Description>
        ) : null}
        <AvatarPanel>
          {(solution.checks && solution.checks.length > 0) ||
          (solution.antiChecks && solution.antiChecks.length > 0) ? (
            <InlineDialog
              content={<ChecksFlyout solution={solution} />}
              isOpen={rulesFlyoutExpanded}
              onClose={onChecksFlyoutClose}
            >
              <div onClick={onChecksAvatarClick}>
                <Tooltip content="Checks">
                  <Avatar size="xsmall" name="Checks" src={eslintLogoUrl} />
                </Tooltip>
              </div>
            </InlineDialog>
          ) : null}
        </AvatarPanel>
      </ContentWrapper>
      <div>{solution.status && <StatusLozenge status={solution.status} />}</div>
    </Wrapper>
  );
};
