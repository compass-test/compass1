/**
 * External icon glyph typedef with all props.
 */
const DEFAULT_ICON_TYPEDEF = `import { PureComponent } from 'react';
import type { GlyphProps } from '@atlaskit/icon/types';

export default class extends PureComponent<GlyphProps> {}`;

/**
 * Builds the icon type def that omits props based on the passed in keys arg.
 */
const buildTypeDef = (keys: string[]) => {
  const omit = keys.map((key) => `'${key}'`).join(' | ');

  if (keys.length === 0) {
    return DEFAULT_ICON_TYPEDEF;
  }

  return `import { PureComponent } from 'react';
import type { GlyphProps } from '@atlaskit/icon/types';

export default class extends PureComponent<Omit<GlyphProps, ${omit}>> {}`;
};

interface GlyphTypeDefOptions {
  /**
   * Enables the `size` prop on the icon component.
   */
  isSizeDisabled?: boolean;

  /**
   * Enables the `primaryColor` and `secondaryColor` props on the icon component.
   */
  isColorsDisabled?: boolean;
}

/**
 * Returns the TypeScript type definition.
 *
 * @argument {boolean} preset Returns a different typedef depending on the configuration.
 */
export function createGlyphTypeDef(opts: GlyphTypeDefOptions) {
  const omit: string[] = [];

  if (opts.isColorsDisabled) {
    omit.push('primaryColor');
    omit.push('secondaryColor');
  }

  if (opts.isSizeDisabled) {
    omit.push('size');
  }

  return buildTypeDef(omit);
}
