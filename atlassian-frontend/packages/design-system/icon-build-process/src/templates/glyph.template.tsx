import type { Size } from '../types';

/**
 * Will return code for a React Component glyph.
 */
export function createGlyph(
  svgGlyph: string,
  displayName: string,
  iconEntrypoint: string,
  size?: Size,
  width?: number,
  height?: number,
) {
  const maybeSizeProp = size ? `size="${size}"` : '';
  const maybeWidth = width ? `width={${width}}` : '';
  const maybeHeight = height ? `height={${height}}` : '';

  return `import React from 'react';
import { Icon } from '${iconEntrypoint}';

const ${displayName} = props => (
  <Icon
    dangerouslySetGlyph={\`${svgGlyph}\`}
    {...props}
    ${maybeSizeProp}
    ${maybeWidth}
    ${maybeHeight}
  />
);

${displayName}.displayName = '${displayName}';

export default ${displayName};
`;
}
