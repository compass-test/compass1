import React, { ReactNode, useRef, useEffect } from 'react';
import {
  ResultTitleContainer,
  ResultLabel,
  ResultDetail,
  IconContainer,
  ResultLink,
  CollapsedResultDetail,
  DetailsSeparator,
  CollapsedResultDetailWrapper,
  ReturnIconContainer,
} from './search-result.styled';
import { useKeyboardNavigation } from '../search-keyboard';
import { ReturnIcon } from '../icons';
import { LinkComponent } from '../search-link-component';

// todo - set a default value for "icon" and change to required
export interface Props {
  /**
   * Link the result
   */
  href: string;
  /**
   * Display text (and tooltip) for the result item.
   */
  title: string;
  /**
   * Toggle for whether to show the search results in a collapsed mode.
   * The collapsed mode is used when width is restricted (e.g. mobile view). This mode will take up more vertical width in exchange for less horizontal width.
   */
  isCollapsed?: boolean;
  /**
   * This will replace all links with the given component. This will be used to ensure that results provided will be properly SPA transitioned.
   * Do not use this for styling.
   */
  linkComponent?: LinkComponent;
  /**
   * An icon for the search result.
   */
  icon?: JSX.Element;
  /**
   * An label that will be shown before the title. You can use this to display the id of the item, e.g. issue key.
   */
  label?: ReactNode;
  /**
   * Display text (and tooltip) for the result item container.
   */
  containerDetail?: string;
  /**
   * Displays any relevant date time information of the result item, e.g. last updated time.
   */
  timeDetail?: JSX.Element;
  /**
   * Callback that is called when the result item is either left clicked or the user pressed enter while focusing on the element.
   */
  onSelect?: (e: React.MouseEvent | KeyboardEvent) => void;
  /**
   * Callback that is called when the element is highlighted via keyboard navigation (this will not trigger on focus).
   */
  onHighlighted?: () => void;
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
        <div style={{ display: 'block', minWidth: 0 }}>
          <ResultTitleContainer isCollapsed>
            {typeof label === 'string' ? (
              <ResultLabel title={title}>{label}</ResultLabel>
            ) : (
              label
            )}
            <span title={title}>{title}</span>
          </ResultTitleContainer>
          <CollapsedResultDetailWrapper>
            <CollapsedResultDetail title={containerDetail}>
              {containerDetail}
            </CollapsedResultDetail>
            {timeDetail && (
              <>
                <DetailsSeparator>{'•'}</DetailsSeparator>
                <CollapsedResultDetail>{timeDetail}</CollapsedResultDetail>
              </>
            )}
          </CollapsedResultDetailWrapper>
        </div>
      ) : (
        <>
          <ResultTitleContainer>
            {typeof label === 'string' ? (
              <ResultLabel title={title}>{label}</ResultLabel>
            ) : (
              label
            )}
            <span title={title}>{title}</span>
          </ResultTitleContainer>
          <ResultDetail title={containerDetail}>{containerDetail}</ResultDetail>
          {timeDetail ? <ResultDetail>{timeDetail}</ResultDetail> : null}
        </>
      )}
    </>
  );

  return (
    <div ref={ref} onClick={onSelect} role="none">
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
