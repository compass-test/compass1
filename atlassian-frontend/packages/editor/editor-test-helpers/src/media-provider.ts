import { defaultCollectionName } from '@atlaskit/media-test-helpers/collectionNames';
import { fakeMediaClient } from '@atlaskit/media-test-helpers/fakeMediaClient';
import { userAuthProvider } from '@atlaskit/media-test-helpers/userAuthProvider';
import {
  mediaPickerAuthProvider,
  defaultMediaPickerAuthProvider,
} from '@atlaskit/media-test-helpers/mediaPickerAuthProvider';
import { getAuthFromContextProvider } from '@atlaskit/media-test-helpers/getAuthFromContextProvider';
import type { MediaClientConfig } from '@atlaskit/media-core';
import type { MediaProvider } from '@atlaskit/editor-core';

export interface MediaProviderFactoryConfig {
  collectionName?: string;
  dropzoneContainer?: HTMLElement;
  includeUploadMediaClientConfig?: boolean;
  includeUserAuthProvider?: boolean;
  useMediaPickerAuthProvider?: boolean;
  stargateBaseUrl?: string;
}

/**
 * Add "import * as mediaTestHelpers from '@atlaskit/media-test-helpers'"
 * at the beginning of your file and pass "mediaTestHelpers" into this function
 */
export function storyMediaProviderFactory(
  mediaProviderFactoryConfig: MediaProviderFactoryConfig = {},
) {
  const {
    collectionName,
    includeUploadMediaClientConfig,
    includeUserAuthProvider,
    useMediaPickerAuthProvider = false,
    stargateBaseUrl,
  } = mediaProviderFactoryConfig;
  const collection = collectionName || defaultCollectionName;
  const mediaClientConfig: MediaClientConfig = {
    authProvider: useMediaPickerAuthProvider
      ? mediaPickerAuthProvider()
      : defaultMediaPickerAuthProvider,
    userAuthProvider:
      includeUserAuthProvider === false ? undefined : userAuthProvider,
    getAuthFromContext: getAuthFromContextProvider,
    stargateBaseUrl,
  };

  return Promise.resolve<MediaProvider>({
    uploadParams: { collection },
    viewMediaClientConfig: mediaClientConfig,
    uploadMediaClientConfig:
      includeUploadMediaClientConfig === false ? undefined : mediaClientConfig,
  });
}

// This method returns an instance of MediaProvider ready to use in tests and side effect free
// We should migrate unit tests to this method and stop using storyMediaProviderFactory
export const fakeMediaProvider = (
  mediaProviderFactoryConfig: MediaProviderFactoryConfig = {},
): Promise<MediaProvider> => {
  const { collectionName } = mediaProviderFactoryConfig;
  const collection = collectionName || defaultCollectionName;
  const mediaClientConfig = fakeMediaClient().config;
  return Promise.resolve<MediaProvider>({
    uploadParams: { collection },
    viewMediaClientConfig: mediaClientConfig,
    uploadMediaClientConfig: mediaClientConfig,
  });
};

export type promisedString = Promise<string>;
export type resolveFn = (...v: any) => any;
export type thumbnailStore = { [id: string]: promisedString | resolveFn };

export function fileToBase64(blob: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new (window as any).FileReader();
    reader.onloadend = function () {
      resolve(reader.result);
    };
    reader.onabort = function () {
      reject('abort');
    };
    reader.onerror = function (err: ErrorEvent) {
      reject(err);
    };
    reader.readAsDataURL(blob);
  });
}

export function isImage(type: string) {
  return ['image/jpeg', 'image/png'].indexOf(type) > -1;
}
