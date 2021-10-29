import type { App } from '../../common/types';

import { refineApp } from './utils';

export const searchApp = async (
  appKey: string,
  params: URLSearchParams,
  ctrl: AbortController,
): Promise<App> => {
  // Request API
  const response = await fetch(
    `https://marketplace.atlassian.com/rest/2/addons/${appKey}?${params}`,
    {
      signal: ctrl.signal,
    },
  );

  // API error handling
  if (!response.ok) {
    throw new Error(
      `Marketplace API error ${response.status}:${response.statusText}`,
    );
  }

  // Resolve JSON
  const json = await response.json();

  // Type guard
  return refineApp(json);
};

export const searchApps = async (
  params: URLSearchParams,
  ctrl: AbortController,
): Promise<App[]> => {
  // Request API
  const response = await fetch(
    `https://marketplace.atlassian.com/rest/2/addons?${params}`,
    {
      signal: ctrl.signal,
    },
  );

  // API error handling
  if (!response.ok) {
    throw new Error(
      `Marketplace API error ${response.status}:${response.statusText}`,
    );
  }

  // Resolve JSON
  const json = await response.json();

  // Type guard
  return json._embedded.addons.map(refineApp);
};
