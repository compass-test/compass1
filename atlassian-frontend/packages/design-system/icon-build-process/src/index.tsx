import { build } from './build';
import { tidy } from './tidy';
import { createIconDocs } from './create-icon-docs';
import type { IconBuildConfig } from './types';

/**
 * Generates processed SVGs,
 * React Glyphs,
 * and output metadata of generated assets.
 *
 * @param config
 */
export default function buildIconGlyphs(config: IconBuildConfig) {
  return tidy(config).then(() => build(config));
}

export { build, tidy, createIconDocs };

export type { CustomSVGOPlugin, IconBuildConfig, IconOutput } from './types';
