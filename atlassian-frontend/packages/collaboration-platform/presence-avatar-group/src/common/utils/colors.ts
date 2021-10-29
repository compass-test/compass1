import * as namedColors from 'css-color-names'; // eslint-disable-line import/extensions

import * as themeColors from '@atlaskit/theme/colors';

export function isRgb(color: string): boolean {
  return /rgba?\(/.test(color);
}

export function isHex(color: string): boolean {
  return /^#([A-Fa-f0-9]{3}){1,2}$/.test(color);
}

/**
 * @return String with HEX-coded color
 */
export function normalizeHexColor(
  color: string | null,
  defaultColor?: string,
): string | null {
  if (!color) {
    return null;
  }

  // Normalize to hex
  color = color.trim().toLowerCase();
  if (isHex(color)) {
    // Normalize 3-hex to 6-hex colours
    if (color.length === 4) {
      color = color
        .split('')
        .map(c => (c === '#' ? '#' : `${c}${c}`))
        .join('');
    }
  } else if (isRgb(color)) {
    return rgbToHex(color);
  } else {
    // http://dev.w3.org/csswg/css-color/#named-colors
    if (color === 'default') {
      return null;
    } else if (namedColors.default && (namedColors as any).default[color]) {
      color = (namedColors as any).default[color];
    } else if (namedColors && namedColors[color]) {
      color = namedColors[color];
    } else {
      return null;
    }
  }

  if (color === defaultColor) {
    return null;
  }

  return color;
}

/**
 * Converts hex color format to rgb.
 * Works well with full hex color format and shortcut as well.
 *
 * @param hex - hex color string (#xxx, or #xxxxxx)
 */
export function hexToRgb(color: string): string | null {
  if (!isHex(color)) {
    return null;
  }

  let colorBits = color.substring(1).split('');
  if (colorBits.length === 3) {
    colorBits = [
      colorBits[0],
      colorBits[0],
      colorBits[1],
      colorBits[1],
      colorBits[2],
      colorBits[2],
    ];
  }

  const rgb = Number(`0x${colorBits.join('')}`);
  // eslint-disable-next-line no-bitwise
  return `rgb(${(rgb >> 16) & 255},${(rgb >> 8) & 255},${rgb & 255})`;
}

/**
 * Converts hex color format to rgba.
 *
 * @param hex - hex color string (#xxx, or #xxxxxx)
 */
export function hexToRgba(rawColor: string, alpha: number) {
  let color = normalizeHexColor(rawColor);
  if (!color) {
    return null;
  }
  const hex2rgb = (color: string) =>
    color.match(/[a-z0-9]{2}/gi)!.map(hex => parseInt(hex, 16));
  return `rgba(${hex2rgb(color).concat(alpha).join(',')})`;
}

export function rgbToHex(value: string): string | null {
  const matches = value.match(/(0?\.?\d{1,3})%?\b/g);

  if (matches && matches.length >= 3) {
    const [red, green, blue] = matches.map(Number);
    return (
      '#' +
      (blue | (green << 8) | (red << 16) | (1 << 24)).toString(16).slice(1) // eslint-disable-line no-bitwise
    );
  }

  return null;
}

export interface Color {
  solid: string;
  selection: string;
}

export const colors: Color[] = [
  themeColors.R100,
  themeColors.R300,
  themeColors.R500,
  themeColors.Y100,
  themeColors.Y300,
  themeColors.Y500,
  themeColors.G100,
  themeColors.G300,
  themeColors.G500,
  themeColors.T100,
  themeColors.T300,
  themeColors.T500,
  themeColors.B100,
  themeColors.B300,
  themeColors.B500,
  themeColors.P100,
  themeColors.P300,
  themeColors.P500,
  themeColors.N70,
  themeColors.N200,
  themeColors.N800,
].map(solid => ({
  solid,
  selection: hexToRgba(solid, 0.2)!,
}));

export const getPresenceColor = (str: string) => {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    /* eslint-disable no-bitwise */
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash = hash & hash;
    /* eslint-enable no-bitwise */
  }

  const index = Math.abs(hash) % colors.length;

  return { index, color: colors[index] };
};
