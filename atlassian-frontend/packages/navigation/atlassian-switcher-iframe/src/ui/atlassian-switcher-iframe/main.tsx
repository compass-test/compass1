import React from 'react';

import { defaultAvailableProductsFetch } from '@atlassian/switcher';
import {
  AvailableProductsResponse,
  JoinableSitesResponse,
} from '@atlassian/switcher/types';

import type { GenericIframeContainerProps, Response } from '../../common/types';

import SwitcherIframe from './iframe';

function createResponse<T>(data: T): Response<T> {
  return {
    status: 'COMPLETE',
    data,
    error: null,
  };
}

function createErrorResponse<T>(error: any): Response<T> {
  return {
    status: 'ERROR',
    data: null,
    error,
  };
}

export const AtlassianSwitcherIframeContainer: React.FC<GenericIframeContainerProps> = props => {
  const {
    availableProductsPromise,
    joinableSitesPromise,
    bridgeProps,
    ...iframeProps
  } = props;

  const [joinableSites, setJoinableSites] = React.useState<
    Response<JoinableSitesResponse>
  >();
  const [availableProducts, setAvailableProducts] = React.useState<
    Response<AvailableProductsResponse>
  >();

  const onShouldStartPreloading = React.useCallback(() => {
    if (availableProductsPromise) {
      availableProductsPromise()
        .then(data => setAvailableProducts(createResponse(data)))
        .catch(error => setAvailableProducts(createErrorResponse(error)));
    } else {
      defaultAvailableProductsFetch()()
        .then(data => setAvailableProducts(createResponse(data)))
        .catch(error => setAvailableProducts(createErrorResponse(error)));
    }
    if (joinableSitesPromise) {
      joinableSitesPromise()
        .then(data => setJoinableSites(createResponse(data)))
        .catch(error => setJoinableSites(createErrorResponse(error)));
    } else {
      setJoinableSites(createResponse({ sites: [] }));
    }
  }, [availableProductsPromise, joinableSitesPromise]);

  // TODO: This will be replace with a MouseProximityObserver trigger
  React.useLayoutEffect(() => {
    onShouldStartPreloading();
  }, [onShouldStartPreloading]);

  return (
    <SwitcherIframe
      joinableSites={joinableSites}
      availableProducts={availableProducts}
      bridgeProps={bridgeProps}
      {...iframeProps}
    />
  );
};
