import React, { useState, useEffect } from 'react';
import { SearchCSS } from '@atlaskit/atlassian-navigation';
import {
  SearchAnchor,
  ThemeProvider,
  KeyboardHighlightProvider,
} from '@atlassian/search-dialog';
import MessagesIntlProvider from '../../common/message-intl-provider/messages-intl-provider';
import { ExperimentExposureHandler } from '../experiment-exposure-handler';
import { SearchSessionProvider } from '../../common/search-session-provider';
import { BuildVersionAnalyticContext } from '../../common/build-version-analytic-context';
import { Products, ProductProvider } from '../../common/product-context';
import { fetchPermissions } from './utils/fetch-permissions';
import { ABTestProvider } from '../ab-test-provider';
import { SharedClient } from '../clients';
import { ProductSearchInputSkeleton } from '../product-search-input-skeleton';

export interface Props {
  onClose: () => void;
  isExpanded: boolean;
  sharedClient: SharedClient;
  theme?: SearchCSS;
  children?: (
    setRef: (ref: HTMLInputElement | null) => void,
  ) => React.ReactElement | null;
  products: Products[];
  selectedTabIndex: number;
  primaryProduct?: string;
  doProductPermissionsCheck: boolean;
}

interface State {
  ref: HTMLElement | null;
}

export class ProductSearchDialogBase extends React.Component<Props, State> {
  state = {
    ref: null as HTMLElement | null,
  };

  /**
   * Hold a timeout id for the onBlur and onFocus handlers
   */
  timeout: number | undefined = undefined;

  handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      event.key === 'Escape' &&
      !event.defaultPrevented &&
      this.props.isExpanded
    ) {
      event.preventDefault();
      this.close();
    }
  };

  onBlurHandler = () => {
    this.timeout = setTimeout(() => {
      this.close();
    });
  };

  onFocusHandler = () => {
    clearTimeout(this.timeout);
  };

  setRef = (ref: HTMLInputElement | null) => {
    if (this.state.ref !== ref) {
      this.setState({
        ref,
      });
    }
  };

  close = () => {
    const { ref } = this.state;
    ref && ref.blur();
    this.props.onClose();
  };

  render() {
    const {
      isExpanded,
      theme,
      children,
      sharedClient,
      selectedTabIndex,
      products,
      primaryProduct = '',
    } = this.props;

    if (products.length === 0) {
      return <ProductSearchInputSkeleton />;
    }

    return (
      <ProductProvider
        products={products}
        activeIndex={selectedTabIndex}
        primaryProduct={primaryProduct}
      >
        <MessagesIntlProvider>
          <BuildVersionAnalyticContext>
            <ThemeProvider partialSearchCSS={theme}>
              <SearchAnchor
                onBlur={this.onBlurHandler}
                onFocus={this.onFocusHandler}
                onKeyDown={this.handleKeyDown}
                isExpanded={isExpanded}
              >
                <KeyboardHighlightProvider listenerNode={this.state.ref}>
                  <ABTestProvider
                    searchClient={sharedClient}
                    isMultiProduct={products.length > 1}
                  >
                    <SearchSessionProvider
                      sessionKey={`ssid_provider_${isExpanded}`}
                    >
                      {isExpanded ? <ExperimentExposureHandler /> : null}
                      {children ? children(this.setRef) : null}
                    </SearchSessionProvider>
                  </ABTestProvider>
                </KeyboardHighlightProvider>
              </SearchAnchor>
            </ThemeProvider>
          </BuildVersionAnalyticContext>
        </MessagesIntlProvider>
      </ProductProvider>
    );
  }
}

export const ProductSearchDialog = (props: Props) => {
  const [permissibleProducts, setPermissibleProducts] = useState<Products[]>(
    props.products.length === 1 || !props.doProductPermissionsCheck
      ? props.products
      : [],
  );

  useEffect(() => {
    let cancelled = false;
    if (props.doProductPermissionsCheck && props.products.length !== 1) {
      fetchPermissions(props.sharedClient, props.products).then((products) => {
        !cancelled && setPermissibleProducts(products);
      });
    }

    return () => {
      cancelled = true;
    };
  }, [props.products, props.sharedClient, props.doProductPermissionsCheck]);

  return <ProductSearchDialogBase {...props} products={permissibleProducts} />;
};
