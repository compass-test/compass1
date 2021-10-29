import React from 'react';
import {
  MetaContextProvider,
  KeyboardWrapper,
  ProductTabs,
  MetaContextProviderProps,
} from '../..';
import { SearchDialog } from '@atlassian/search-dialog';
import {
  ExternalProps as KeyboardWrapperProps,
  KeyboardWrapperExternalChildren,
} from '../../focus-and-keyboard-wrapper/focus-and-keyboard-wrapper';
import { AggregatorClientFeatures } from '../../aggregator-client-context';
import {
  ActiveProductSearchInput,
  ExternalProps,
} from '../../active-product-search-input';
import { ProductInputSearchSkeletonFeatures } from '../../../common/product-search-input-skeleton';

export type DialogFeatures = AggregatorClientFeatures &
  ProductInputSearchSkeletonFeatures;
export interface MultiProductDialogProps {
  children: (
    args: KeyboardWrapperExternalChildren,
  ) => React.ReactElement | null;
  dialogFeatures?: DialogFeatures;
}

export const MultiProductDialog: React.FC<
  MetaContextProviderProps &
    KeyboardWrapperProps &
    ExternalProps &
    MultiProductDialogProps
> = ({
  children,
  theme,
  isExpanded,
  setIsExpanded,
  abTestCloudId,
  aggregatorUrl,
  dialogFeatures,
  user,
  forwardRef,
  onNavigateGeneric,
  keepExpandedInTab,
}) => {
  return (
    <MetaContextProvider
      theme={theme}
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
      abTestCloudId={abTestCloudId}
      aggregatorUrl={aggregatorUrl}
      clientProviderFeatures={dialogFeatures}
      user={user}
    >
      <KeyboardWrapper
        forwardRef={forwardRef}
        keepExpandedInTab={keepExpandedInTab}
      >
        {({ ref, onRetry }) => {
          return (
            <>
              <ActiveProductSearchInput
                forwardRef={ref}
                onNavigateGeneric={onNavigateGeneric}
                features={dialogFeatures}
              />
              <SearchDialog>
                <ProductTabs />
                {children({ ref, onRetry })}
              </SearchDialog>
            </>
          );
        }}
      </KeyboardWrapper>
    </MetaContextProvider>
  );
};
