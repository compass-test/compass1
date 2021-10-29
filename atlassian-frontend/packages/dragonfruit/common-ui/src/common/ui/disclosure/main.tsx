import React, { useCallback, useState } from 'react';

import { withContext } from '@atlassian/dragonfruit-utils';

import { ExpandingCard } from './expanding-card';
import {
  DisclosureControllerProps,
  DisclosureControllerReturnType,
  DisclosureProps,
  DisclosurePropsType,
  TogglePropsType,
} from './types';

function Disclosure({
  id,
  label,
  testId,
  expanded = false,
  children,
}: DisclosureProps) {
  return (
    <SharedStateProvider hookArgs={[{ id, label, testId, expanded }]}>
      {children}
    </SharedStateProvider>
  );
}

Disclosure.ExpandingCard = ExpandingCard;

function useDisclosureController({
  id,
  label,
  testId,
  expanded = false,
}: DisclosureControllerProps): DisclosureControllerReturnType {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const show = useCallback(() => setIsExpanded(true), [setIsExpanded]);
  const hide = useCallback(() => setIsExpanded(false), [setIsExpanded]);
  const toggle = useCallback(() => setIsExpanded((current) => !current), [
    setIsExpanded,
  ]);

  // These are derived properties that are intended to be used on the disclosure
  // element itself, whatever the consumer deems that to be. The ID is relevant
  // for ARIA purposes to link the disclosure element to the button that
  // expands it. The testId is just for testing convenience.
  const disclosureProps: DisclosurePropsType = {
    ...(id != null && {
      id,
    }),
    ...(testId != null && {
      'data-testid': testId,
    }),
  };

  // These are derived properties that are intended for the element used to show
  // and hide the expanded content within the disclosure. The ARIA values are
  // referencing:
  //
  //   https://w3c.github.io/aria-practices/examples/disclosure/disclosure-faq.html
  //
  // The testId value is derived from the disclosure's testId and is intended
  // as a more targeted UI element for triggering events without dealing with
  // selector nonsense.
  const toggleProps: TogglePropsType = {
    'aria-expanded': isExpanded,
    ...(id != null && {
      'aria-controls': id,
    }),
    ...(label != null && {
      'aria-label': label,
    }),
    ...(testId != null && {
      'data-testid': `${testId}.toggle`,
    }),
  };

  return [
    {
      disclosureProps,
      toggleProps,
      isExpanded,
    },
    {
      show,
      hide,
      toggle,
    },
  ];
}

const { useSharedStateHook, SharedStateProvider } = withContext(
  useDisclosureController,
  {
    hook: 'useDisclosureController',
  },
);

export { Disclosure, useSharedStateHook as useDisclosureController };
