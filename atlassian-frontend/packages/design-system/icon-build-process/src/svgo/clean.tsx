/* eslint-disable no-console */
import SVGO from 'svgo';
import type { Options } from 'svgo';
import { removeNamespacedAttributes } from './plugins/remove-namespaced-attributes';
import { replaceSketchHexColors } from './plugins/replace-sketch-hex-colors';
import type { IconBuildConfig } from '../types';

export function createSVGCleaner(config: IconBuildConfig) {
  const initialiseDefaultSVGO = () => {
    return new SVGO({
      multipass: true,
      plugins: [
        { removeTitle: true },
        { removeDesc: { removeAny: true } },
        { removeViewBox: false },
        { cleanupIDs: true },
        { collapseGroups: true },
        { removeXMLNS: true },
        { removeNamespacedAttributes },
        { replaceSketchHexColors },
      ] as Options['plugins'],
    });
  };

  const defaultSVGO = initialiseDefaultSVGO();

  const cleanSVGO = (filename: string, rawSVG: string) => {
    // Run the default optimiser on the SVG
    return (
      defaultSVGO
        .optimize(rawSVG)
        // Check width and height
        .then(({ info, data }) => {
          if (Number(info.width) > config.maxWidth) {
            console.warn(
              `"${filename}" too wide: ${info.width} > ${config.maxWidth}`,
            );
          }

          if (Number(info.height) > config.maxHeight) {
            console.warn(
              `"${filename}" too wide: ${info.height} > ${config.maxHeight}`,
            );
          }
          return { info, data };
        })
    );
  };
  return cleanSVGO;
}
