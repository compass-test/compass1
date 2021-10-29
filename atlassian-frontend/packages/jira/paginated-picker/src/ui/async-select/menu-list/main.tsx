import React, { useCallback, useState } from 'react';

import { components, MenuListComponentProps } from '@atlaskit/select';
import Spinner from '@atlaskit/spinner';
// TODO: FORM-629 Analytics:
// import { useAnalyticsEvents } from '@atlassian/jira-product-analytics-bridge';

import type { BaseSelectProps, SingleOption } from '../../../common/types';
// import { sendAnalytics } from '../../../common/utils';

import ErrorMessage from './error-message';
import LoadingMessage from './loading-message';
import ShowMoreButton from './show-more-button';
import { LoadingWrapper } from './styled';

interface Props extends MenuListComponentProps<SingleOption, true> {
  selectProps: BaseSelectProps;
}

export const MenuList = (props: Props) => {
  // const { createAnalyticsEvent } = useAnalyticsEvents();
  const [clickCount, setClickCount] = useState(1);

  const {
    selectProps: {
      menuListProps: {
        error: { isError, onRetry },
        handleShowMore,
        isLoading,
        isPaginationLoading,
        showShowMoreButton,
        // type,
      },
    },
  } = props;

  const handleOnShowMore = useCallback(() => {
    setClickCount(clickCount + 1);

    // sendAnalytics({
    //   actionSubjectId: 'filterSearchShowMore',
    //   createAnalyticsEvent,
    //   type,
    //   clickCount,
    // });

    handleShowMore();
  }, [clickCount, handleShowMore]);

  if (isLoading && clickCount > 1) {
    setClickCount(1);
  }

  return (
    <components.MenuList {...props}>
      {isLoading ? (
        <LoadingMessage />
      ) : isError ? (
        <ErrorMessage onRetry={onRetry} />
      ) : (
        <>
          {props.children}
          {isPaginationLoading ? (
            <LoadingWrapper>
              <Spinner />
            </LoadingWrapper>
          ) : (
            showShowMoreButton && (
              <ShowMoreButton onShowMore={handleOnShowMore} />
            )
          )}
        </>
      )}
    </components.MenuList>
  );
};

export default MenuList;
