import React, { useRef, useEffect } from 'react';
import {
  ResultTitleContainer,
  ResultLabel,
  ResultDetail,
  IconContainer,
  ResultLink,
  CollapsedResultDetailDefault,
  CollapsedResultDetailOwner,
  DetailsSeparator,
  CollapsedResultDetailWrapper,
  ReturnIconContainer,
  ResultStyledDiv,
  ResultDetailOwner,
} from './search-result.styled';
import {
  ReturnIcon,
  useKeyboardNavigation,
  SearchResultProps,
} from '@atlassian/search-dialog';

export interface Props extends SearchResultProps {
  owner?: string;
}

const onKeyDown = (e: KeyboardEvent, target: HTMLElement) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();

    // The ref here is the wrapper div however we simulate a click on the `ResultLinkComponent` that it wraps.
    (target.firstElementChild as HTMLElement)?.click?.();
  }
};

export const SearchResult: React.FunctionComponent<Props> = ({
  href,
  linkComponent,
  icon,
  label,
  title,
  containerDetail,
  owner,
  timeDetail,
  onSelect,
  isCollapsed,
  onHighlighted,
  ...rest
}) => {
  const [isKeyboardHighlighted, ref] = useKeyboardNavigation<HTMLDivElement>({
    onKeydownCallback: onKeyDown,
  });

  const previousHighlight = useRef(false);

  // Callback for when the component is highlighted
  useEffect(() => {
    if (!previousHighlight.current && isKeyboardHighlighted) {
      onHighlighted?.();
    }

    previousHighlight.current = isKeyboardHighlighted;
  }, [isKeyboardHighlighted, previousHighlight, onHighlighted]);

  const getResultContent = () => (
    <>
      {isCollapsed ? (
        <ResultStyledDiv>
          <ResultTitleContainer
            isCollapsed
            containerDetail={containerDetail ?? null}
          >
            {typeof label === 'string' ? (
              <ResultLabel title={title}>{label}</ResultLabel>
            ) : (
              label
            )}
            <span className={'search-result-title'} title={title}>
              {title}
            </span>
            {containerDetail && (
              <CollapsedResultDetailDefault
                className={'search-result-description'}
                title={containerDetail}
              >
                {containerDetail}
              </CollapsedResultDetailDefault>
            )}
          </ResultTitleContainer>
          <CollapsedResultDetailWrapper>
            {timeDetail && (
              <>
                <DetailsSeparator>{'•'}</DetailsSeparator>
                <CollapsedResultDetailDefault>
                  {timeDetail}
                </CollapsedResultDetailDefault>
              </>
            )}
            {owner && (
              <CollapsedResultDetailOwner className={'search-result-owner'}>
                {owner}
              </CollapsedResultDetailOwner>
            )}
          </CollapsedResultDetailWrapper>
        </ResultStyledDiv>
      ) : (
        <>
          <ResultTitleContainer containerDetail={containerDetail ?? null}>
            {typeof label === 'string' ? (
              <ResultLabel title={title}>{label}</ResultLabel>
            ) : (
              label
            )}
            <span title={title}>{title}</span>
            {containerDetail && (
              <ResultDetail title={containerDetail}>
                {containerDetail}
              </ResultDetail>
            )}
          </ResultTitleContainer>
          {timeDetail && <ResultDetail>{timeDetail}</ResultDetail>}
          {owner && <ResultDetailOwner>{owner}</ResultDetailOwner>}
        </>
      )}
    </>
  );

  return (
    <div
      ref={ref}
      onClick={onSelect}
      role="none"
      className={'search-result-item'}
    >
      <ResultLink
        linkComponent={linkComponent}
        href={href}
        isKeyboardHighlighted={isKeyboardHighlighted}
        isCollapsed={isCollapsed}
        {...rest}
      >
        <IconContainer>{icon}</IconContainer>
        {getResultContent()}
        {isKeyboardHighlighted ? (
          <ReturnIconContainer isCollapsed={isCollapsed}>
            <ReturnIcon inverted />
          </ReturnIconContainer>
        ) : null}
      </ResultLink>
    </div>
  );
};
