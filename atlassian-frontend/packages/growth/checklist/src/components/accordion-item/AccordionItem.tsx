// eslint-disable-next-line import/no-extraneous-dependencies
import React, { MouseEvent, useCallback, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { accordionDescriptionWrapper, AccordionWrapper } from './styled';

export const TRANSITION_DURATION_MS = 100;
export const ANIMATION_DURATION = 200;
export const ACCORDION_CLASS_NAME = 'accordion-wrapper';

export const AccordionDescriptionWrapper = accordionDescriptionWrapper(
  ANIMATION_DURATION,
);

export interface AccordionItemProps {
  id: string;
  expanded: boolean;
  children: JSX.Element;
  onClick: (id: string) => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  expanded,
  children,
  onClick,
}: AccordionItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      // Filter out portal click events
      if (ref.current?.contains(event.target as Node)) {
        onClick(expanded ? '' : id);
      }
    },
    [expanded, onClick, id],
  );

  return (
    <CSSTransition
      timeout={TRANSITION_DURATION_MS}
      in={expanded}
      appear
      classNames={ACCORDION_CLASS_NAME}
      key={id}
    >
      <AccordionWrapper
        innerRef={ref}
        aria-expanded={expanded}
        onClick={handleClick}
        data-testid={`checklist-accordion-item-${id}`}
      >
        {children}
      </AccordionWrapper>
    </CSSTransition>
  );
};

export default AccordionItem;
