import React, { FunctionComponent, useEffect, useRef } from 'react';
import {
  ConfluenceSearchInput,
  Props as ConfluenceInputProps,
} from '../confluence/confluence-search-input';
import {
  JiraSearchInput,
  Props as JiraInputProps,
} from '../jira/jira-search-input';
import {
  Products,
  useActiveProduct,
  usePrimaryProduct,
} from '../common/product-context';
import { mergeRefCallback } from '../utils/merge-ref-callback';

type InputProps = JiraInputProps & ConfluenceInputProps;
export type Prop = InputProps & {
  value: string;
  disableDefaultNavigationOnInput?: boolean;
};

const onNavigateDefault = (href: string) => {
  window.location.assign(href);
};

export const CrossProductSearchInput: FunctionComponent<Prop> = ({
  onNavigate,
  disableDefaultNavigationOnInput,
  forwardRef,
  value,
  ...rest
}) => {
  const primaryProduct = usePrimaryProduct();
  const activeProduct = useActiveProduct();

  const inputRef = useRef<HTMLInputElement>(null);
  const { isExpanded } = rest;

  useEffect(() => {
    if (isExpanded) {
      inputRef?.current?.focus();
    }
  }, [activeProduct, isExpanded]);

  const onNav =
    activeProduct === primaryProduct || disableDefaultNavigationOnInput
      ? onNavigate
      : onNavigateDefault;
  const ref = mergeRefCallback(forwardRef, inputRef);

  switch (activeProduct) {
    case Products.confluence:
      return (
        <ConfluenceSearchInput
          {...rest}
          onNavigate={onNav}
          forwardRef={ref}
          value={value}
        />
      );
    case Products.jira:
      return (
        <JiraSearchInput
          {...rest}
          onNavigate={onNav}
          forwardRef={ref}
          value={value}
        />
      );
    default:
      throw new Error(`Product is not supported ${activeProduct}`);
  }
};
