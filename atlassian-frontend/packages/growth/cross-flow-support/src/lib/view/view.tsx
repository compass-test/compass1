import React, { ComponentType, useCallback, useState } from 'react';
import { DrawerProps } from '@atlaskit/drawer';
import {
  CompletionStatus,
  Journeys,
  JourneyTargetProductDefinition,
  TargetType,
} from '@atlassiansox/cross-flow-api-internals';
import CrossFlowIntegration from '@atlassiansox/cross-flow-react';
import ProductStoreIntegration, {
  ProductKeys,
  productKeysToRoutes,
  Routes as ProductStoreRoute,
} from '@atlassiansox/product-store-react';

import { IntegrationViewProps } from './types';
import { getDrawerStyleOverrides } from './styles';
import { toCrossFlowTarget } from './utils/toCrossFlowTarget';
import { toCrossFlowOrigin } from './utils/toCrossFlowOrigin';

// todo: replace productStoreVisible and crossFlowVisible with a single prop
interface ProductStoreHomeViewState {
  productStoreVisible: true;
  crossFlowVisible: false;
  route: ProductStoreRoute;
}

interface ProductStoreProductViewState {
  productStoreVisible: true;
  crossFlowVisible: false;
  targetProduct: TargetType;
  route: ProductStoreRoute;
}

interface CrossFlowViewState {
  crossFlowVisible: true;
  productStoreVisible: false;
  targetProduct: TargetType;
  route: ProductStoreRoute;
}

type ViewState =
  | ProductStoreHomeViewState
  | ProductStoreProductViewState
  | CrossFlowViewState;

interface Injectables {
  ProductStoreComponent: typeof ProductStoreIntegration;
  CrossFlowComponent: typeof CrossFlowIntegration;
  DrawerComponent: ComponentType<DrawerProps>;
}

const getInitialState = (data: JourneyTargetProductDefinition): ViewState => {
  switch (data.journey) {
    case Journeys.GET_STARTED: {
      return {
        productStoreVisible: false,
        crossFlowVisible: true,
        targetProduct: data.targetProduct,
        route: productKeysToRoutes(toCrossFlowTarget(data.targetProduct)),
      };
    }
    case Journeys.DECIDE: {
      return {
        productStoreVisible: true,
        crossFlowVisible: false,
        targetProduct: data.targetProduct,
        route: productKeysToRoutes(toCrossFlowTarget(data.targetProduct)),
      };
    }
    case Journeys.DISCOVER:
    default: {
      return {
        productStoreVisible: true,
        crossFlowVisible: false,
        route: ProductStoreRoute.DISCOVERY_PRODUCTS,
      };
    }
  }
};

export const IntegrationView: ComponentType<
  IntegrationViewProps & Injectables
> = (props) => {
  const {
    journey,
    locale,
    sourceComponent,
    sourceContext,
    DrawerComponent,
    ProductStoreComponent,
    CrossFlowComponent,
    experimentalOptions,
    extensions,
    onClose,
    onAnalyticsEvent,
    originProduct,
    onHandShake,
    plugins,
    edgePrefix,
    redirectToWac,
    env,
    cloudId,
  } = props;

  const isStandaloneProductPage = props.journey === Journeys.DECIDE;

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [completionStatus, setCompletionStatus] = useState<CompletionStatus>(
    {},
  );
  const [viewState, setViewState] = useState<ViewState>(getInitialState(props));

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  const productStoreOnTryClicked = useCallback((product: ProductKeys) => {
    setViewState((prevState) => ({
      ...prevState,
      crossFlowVisible: true,
      productStoreVisible: false,
      targetProduct: product,
    }));
  }, []);

  const productStoreOnChangeRoute = useCallback((route: ProductStoreRoute) => {
    setViewState((prevState) => ({
      ...prevState,
      route,
    }));
  }, []);

  const crossFlowOnClose = useCallback(() => {
    if (journey === Journeys.GET_STARTED) {
      /**
       * User has completed Get Started journey.
       * Cross Flow Frontend does not provide status, but only invokes the callback
       * when activation was complete
       */
      setCompletionStatus({
        success: true,
      });
    }

    closeDrawer();
  }, [closeDrawer, journey]);

  const drawerOnCloseComplete = useCallback(() => {
    onClose(completionStatus);
  }, [onClose, completionStatus]);

  const onProductStoreHandshake = useCallback(() => {
    onHandShake('productStoreSpa');
  }, [onHandShake]);

  const onCrossFlowHandshake = useCallback(() => {
    onHandShake('crossFlowSpa');
  }, [onHandShake]);

  return (
    <DrawerComponent
      isOpen={isDrawerOpen}
      width="full"
      onClose={closeDrawer}
      onCloseComplete={drawerOnCloseComplete}
      overrides={getDrawerStyleOverrides()}
    >
      {viewState.productStoreVisible && (
        <ProductStoreComponent
          edgePrefix={edgePrefix}
          cloudId={cloudId}
          locale={locale}
          route={viewState.route}
          originProduct={originProduct}
          experimentalOptions={experimentalOptions}
          extensions={extensions}
          onClose={closeDrawer}
          onTryClicked={productStoreOnTryClicked}
          onAnalyticsEvent={onAnalyticsEvent}
          onChangeRoute={productStoreOnChangeRoute}
          plugins={plugins}
          onHandShake={onProductStoreHandshake}
          isStandaloneProductPage={isStandaloneProductPage}
          isLinkExpansion={redirectToWac}
          env={env}
          sourceContext={sourceContext}
          sourceComponent={sourceComponent}
          journey={journey}
        />
      )}
      {viewState.crossFlowVisible && (
        <CrossFlowComponent
          edgePrefix={edgePrefix}
          onClose={crossFlowOnClose}
          cloudId={cloudId}
          locale={locale}
          sourceContext={sourceContext}
          sourceComponent={sourceComponent}
          targetProduct={toCrossFlowTarget(viewState.targetProduct)}
          originProduct={toCrossFlowOrigin(originProduct)}
          experimentalOptions={experimentalOptions}
          extensions={extensions}
          onAnalyticsEvent={onAnalyticsEvent}
          onHandShake={onCrossFlowHandshake}
          plugins={plugins}
          env={env}
          journey={journey}
        />
      )}
    </DrawerComponent>
  );
};
