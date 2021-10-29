/**
 * Convert a hex colour code to RGB.
 * @param {String} hex Hex colour code.
 */
export function hex2rgb(hex: string) {
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    let colorArr = hex.substring(1).split('');

    if (colorArr.length === 3) {
      colorArr = [
        colorArr[0],
        colorArr[0],
        colorArr[1],
        colorArr[1],
        colorArr[2],
        colorArr[2],
      ];
    }

    const color = `0x${colorArr.join('')}`;

    // FIXME: `>>` operand can validly take a string value
    const r = ((color as any) >> 16) & 255;
    const g = ((color as any) >> 8) & 255;
    const b = (color as any) & 255;

    return [r, g, b].join(', ');
  }

  throw new Error('Bad Hex');
}

export function luminance(str: string) {
  const [r, g, b] = str.split(', ');
  var a = [r, g, b].map(function (v) {
    let color = parseInt(v);
    color /= 255;
    return color <= 0.03928
      ? color / 12.92
      : Math.pow((color + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function contrastRatio(
  color1luminance: number,
  color2luminance: number,
) {
  const ratio =
    color1luminance > color2luminance
      ? (color2luminance + 0.05) / (color1luminance + 0.05)
      : (color1luminance + 0.05) / (color2luminance + 0.05);

  return ratio;
}

export function isAAAPassing(ratio: number, textSize = 'small') {
  if (textSize === 'large') {
    return ratio < 1 / 4.5;
  }
  return ratio < 1 / 7;
}

export function isAAPassing(ratio: number, textSize = 'small') {
  if (textSize === 'large') {
    return ratio < 1 / 3;
  }
  return ratio < 1 / 4.5;
}
