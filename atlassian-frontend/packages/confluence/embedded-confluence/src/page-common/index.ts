import * as namedRoutesForExport from './routes';

export const namedRoutes: {
  [name: string]: { name: string; pattern: string };
} = namedRoutesForExport;

export const EMBEDDED_PARENT_PRODUCTS = {
  JSM: 'JSM',
};

export { Footer } from './Footer';
export type { PageCommonProps } from './PageCommonProps';
export { EMBEDDED_CONFLUENCE_MODE } from './EmbeddedConfluenceMode';
export { useUrl } from './useUrl';
