import React, { useCallback } from 'react';
import {
  LinkComponent,
  ReturnIcon,
  useKeyboardNavigation,
} from '@atlassian/search-dialog';
import SearchIcon from '@atlaskit/icon/glyph/search';
import {
  getTrigger,
  isNewTab,
  onAdvancedSearchSelected,
  useAnalytics,
} from '../../common/analytics';
import { Trigger, LimitedGasPayload } from '../../common/analytics/events';
import {
  AdvancedSearchContent,
  AdvancedSearchLink,
  CenteredAdvancedSearchGroup,
} from '../../common/advanced-search-link';
import { useProductContext } from '../product-router';
import { useQuery } from '../query-context';
import { AdvancedSearchLinkWrapper } from './advanced-search.styled';

const onKeyDown = (
  e: KeyboardEvent,
  target: HTMLElement,
  actionSubjectId: string,
  fireAnalyticsEvent: (obj: LimitedGasPayload) => void,
) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    fireAnalyticsEvent(
      onAdvancedSearchSelected({
        trigger: Trigger.RETURN,
        actionSubjectId,
        isLoading: false,
        newTab: false,
      }),
    );
    // The ref here is the wrapper span however we simulate a click on the `ResultLinkComponent` that it wraps.
    (target.firstElementChild as HTMLElement)?.click?.();
  }
};

export type AdvancedSearchProps = {
  advancedSearchMessage?: string;
  advancedSearchUrl?: string;
  linkComponent?: LinkComponent;
};

export const AdvancedSearch = ({
  advancedSearchMessage,
  advancedSearchUrl,
  linkComponent,
}: AdvancedSearchProps) => {
  const { isLoading } = useQuery();
  const { fireAnalyticsEvent } = useAnalytics();
  const { getActiveProduct } = useProductContext();
  const productName = getActiveProduct()?.title;
  const actionSubjectId = `${productName}AdvancedSearchLink`;
  const onAdvancedSearchClicked = useCallback(
    (e: React.MouseEvent<HTMLElement>): any => {
      fireAnalyticsEvent(
        onAdvancedSearchSelected({
          trigger: getTrigger(e),
          actionSubjectId,
          isLoading,
          newTab: isNewTab(e),
        }),
      );
    },
    [fireAnalyticsEvent, actionSubjectId, isLoading],
  );

  const [isKeyboardHighlighted, ref] = useKeyboardNavigation<HTMLSpanElement>({
    onKeydownCallback: useCallback(
      (e, target) => onKeyDown(e, target, actionSubjectId, fireAnalyticsEvent),
      [actionSubjectId, fireAnalyticsEvent],
    ),
  });

  if (!advancedSearchUrl || !advancedSearchMessage) {
    return null;
  }

  return (
    <AdvancedSearchLinkWrapper
      ref={ref}
      onClick={onAdvancedSearchClicked}
      role="none"
    >
      <AdvancedSearchLink
        href={advancedSearchUrl}
        isKeyboardHighlighted={isKeyboardHighlighted}
        linkComponent={linkComponent}
      >
        <CenteredAdvancedSearchGroup>
          <SearchIcon size="small" label={advancedSearchMessage} />
          <AdvancedSearchContent>{advancedSearchMessage}</AdvancedSearchContent>
        </CenteredAdvancedSearchGroup>
        {isKeyboardHighlighted && (
          <ReturnIcon inverted={isKeyboardHighlighted} />
        )}
      </AdvancedSearchLink>
    </AdvancedSearchLinkWrapper>
  );
};
