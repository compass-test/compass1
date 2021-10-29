/* eslint-disable no-console */
import SVGO from 'svgo';
import type { Options } from 'svgo';
import { addRoleAttribute } from './plugins/add-role-attribute';
import { callbackOnDefinedFill } from './plugins/callback-on-defined-fill';
import { callbackOnStyleElement } from './plugins/callback-on-style-element';
import { replaceIDs } from './plugins/replace-ids';
import type { OptimizedSvg } from '../types';

export function createSVGCustomiser() {
  const initialiseCustomSVGO = (filename: string) => {
    const callbackOnDefinedFillPlugin = Object.assign(
      {},
      callbackOnDefinedFill,
      {
        params: Object.assign({}, callbackOnDefinedFill.params, {
          callback: (fill: string) => {
            // file-types and objects are colored icons (16/24/48)
            if (
              fill.startsWith('#') &&
              !(
                filename.includes('16') ||
                filename.includes('24') ||
                filename.includes('48')
              )
            ) {
              console.warn(`"${filename}": has a fill of "${fill}"`);
            }
          },
        }),
      },
    );

    return new SVGO({
      full: true,
      plugins: [
        { removeViewBox: false },
        { removeStyleElement: true },
        { addRoleAttribute },
        { replaceIDs },
        { callbackOnDefinedFillPlugin },
        { callbackOnStyleElement },
      ] as Options['plugins'],
    });
  };

  const optimiseSVG = (
    filename: string,
    svg: string,
  ): Promise<OptimizedSvg> => {
    const customSVGO = initialiseCustomSVGO(filename);

    // Run the default optimiser on the SVG
    return customSVGO.optimize(svg);
  };

  return optimiseSVG;
}
