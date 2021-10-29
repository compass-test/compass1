import React, { useState, useEffect, useRef } from 'react';
import { createIframeBridge } from '@atlassian/bridge-core';
import { iframeResizer } from 'iframe-resizer';
import { ViewContext } from './iframe';
import { withMetrics } from './metrics';
import type { History } from 'history';
import { useMetrics } from '../metrics';

// Type of these methods could be shared with @forge/bridge

export type NavigatePayload =
  | {
      type: 'same-tab';
      url: string;
    }
  | {
      type: 'new-tab';
      url: string;
    };

interface FetchProductPayload {
  restPath: string;
  product: 'jira' | 'confluence';
  fetchRequestInit: any;
}

interface FetchProductResponse {
  body?: string;
  headers: { [key: string]: string };
  status: number;
  statusText: string;
}

interface BridgeProvider {
  api: {
    createHistory: () => Promise<History<any> | undefined>;
    onInvoke: (payload: {
      functionKey: string;
      payload: object;
    }) => Promise<
      | { type: 'ok'; response: object }
      | { type: '3lo'; authUrl: string }
      | { type: 'err'; message: string }
    >;
    onNavigate: (payload: NavigatePayload) => Promise<void>;
    onThreeLO: (authUrl: string, retry: () => Promise<void>) => Promise<void>;
    getContext: () => Promise<ViewContext>;
    openModal: (opts: any) => void;
    submit: (payload?: any) => void;
    close: (payload?: any) => void;
    fetchProduct: (
      payload: FetchProductPayload,
    ) => Promise<FetchProductResponse>;
  };
  origin: string;
  onLoad?: () => void;
  isResizable?: boolean;
  height?: string;
}

type Result = {
  loading: boolean;
  iframeProps: React.DetailedHTMLProps<
    React.IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement
  >;
};

// Copied from @types/iframe-resizer
interface IFrameObject {
  close(): void;
  moveToAnchor(anchor: string): void;
  resize(): void;
  removeListeners(): void;
  sendMessage(message: any, targetOrigin?: string): void;
}
interface IframeComponent extends HTMLIFrameElement {
  iFrameResizer?: IFrameObject;
}

export const useBridge = ({
  origin,
  api,
  onLoad,
  isResizable,
  height,
}: BridgeProvider): Result => {
  const [loading, setLoading] = useState(true);
  const [ref, setRef] = useState<IframeComponent | null>(null);
  const { submitMetric, page } = useMetrics();
  // This ref avoids the api object ending up in the dep array
  // of the effect that calls createIframeBridge. It means that
  // people can pass anonymous functions as the api without the
  // bridge being re-created every render.
  const apiRef = useRef(api);
  useEffect(() => {
    apiRef.current = api;
  }, [api]);

  useEffect(() => {
    if (ref && ref.contentWindow && !loading) {
      const { open } = createIframeBridge({
        withDomain: origin,
        withWindow: ref.contentWindow,
        features: withMetrics(
          {
            invoke: async ({ data }) => {
              const { onInvoke, onThreeLO } = apiRef.current;
              const result = await onInvoke(data);
              if (result.type === '3lo') {
                return new Promise((resolve, reject) => {
                  onThreeLO(result.authUrl, () =>
                    onInvoke(data).then((res) => {
                      if (res.type === 'ok') {
                        resolve(res.response);
                      }
                      // Unexpected case where 3LO consent requested again after consenting
                      reject();
                    }, reject),
                  );
                });
              }
              if (result.type === 'err') {
                throw new Error(result.message);
              }
              return result.response;
            },
            navigate: async ({ data }: { data: NavigatePayload }) => {
              return apiRef.current.onNavigate(data);
            },
            submit: async (payload?: any) => {
              return apiRef.current.submit(payload);
            },
            close: async (payload?: any) => {
              return apiRef.current.close(payload);
            },
            getContext: () => {
              return apiRef.current.getContext();
            },
            openModal: async (payload: any) => {
              return apiRef.current.openModal(payload);
            },
            createHistory: async () => {
              return apiRef.current.createHistory();
            },
            fetchProduct: async ({ data }): Promise<FetchProductResponse> => {
              return apiRef.current.fetchProduct(data);
            },
          },
          submitMetric,
          page,
        ),
      });

      if (isResizable) {
        iframeResizer(
          {
            heightCalculationMethod: 'bodyScroll',
            scrolling: true,
            // @ts-ignore minHeight can be a string
            minHeight: height,
          },
          ref,
        );
      }
      const close = open();

      return () => {
        close();
        ref?.iFrameResizer && ref?.iFrameResizer.removeListeners();
      };
    }
  }, [ref, origin, loading, submitMetric, page, isResizable, height]);

  return {
    loading,
    iframeProps: {
      ref: setRef,
      onLoad: () => {
        onLoad && onLoad();
        setLoading(false);
      },
    },
  };
};
