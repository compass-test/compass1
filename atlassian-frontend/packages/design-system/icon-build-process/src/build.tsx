/* eslint-disable no-console */
import { transformAsync } from '@babel/core';
import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';
import { createSVGCleaner } from './svgo/clean';
import { createSVGCustomiser } from './svgo/customise';
import { createGlyph } from './templates/glyph.template';
import { createGlyphTypeDef } from './templates/typescript.template';
import type { IconBuildConfig, IconOutput } from './types';

/**
 * Transforms raw SVGs into processed SVGs and React Components.
 *
 * @param config
 */
export function build(config: IconBuildConfig): Promise<IconOutput[]> {
  const cleanSVG = createSVGCleaner(config);
  const customiseSVG = createSVGCustomiser();
  console.log('Processing icon glyphs.');

  // Read the contents of the source directory
  const files = glob.sync(config.glob, { cwd: config.srcDir });

  return (
    Promise.all(
      files.map((filepath) => {
        const wayHome =
          config.baseIconEntryPoint ||
          filepath
            .split('/')
            .map(() => '..')
            .concat('cjs/components/Icon')
            .join('/');
        const fileKey = filepath.replace(/\.svg$/, '');
        const displayName = fileKey
          .split(/\W/)
          .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
          .join('')
          .concat('Icon');

        // Read the contents of the SVG file
        return (
          fs
            .readFile(path.join(config.srcDir, filepath), 'UTF-8')
            // Optimise the SVG
            .then((rawSVG) => cleanSVG(filepath, rawSVG))
            .then(({ data: optimisedSVG }) => {
              // saved the optimised SVGs to disk for reduced-ui-pack
              return (
                fs
                  .outputFile(
                    path.join(config.processedDir, filepath),
                    optimisedSVG,
                  )
                  // customise the SVG to make it JSX ready
                  .then(() => customiseSVG(filepath, optimisedSVG))

                  // wrap the optimised SVGs in the JS module
                  .then(({ data: customisedSVG }) =>
                    createGlyph(
                      customisedSVG,
                      displayName,
                      wayHome,
                      config.size,
                      config.width,
                      config.height,
                    ),
                  )
              );
            })
            // Transpile the component code
            .then((componentCode) =>
              transformAsync(componentCode, {
                presets: [
                  '@babel/env',
                  ['@babel/react', { useBuiltIns: true }],
                ],
              }),
            )
            .then((result) => {
              if (!result || !result.code) {
                throw new Error('No code was returned from Babel!');
              }

              fs.outputFile(
                path.join(config.destDir, `${fileKey}.js`),
                result.code,
              );
            })
            // Write the TypeScript file
            .then(() => {
              return fs.outputFile(
                path.join(config.destDir, `${fileKey}.d.ts`),
                createGlyphTypeDef({
                  // This build has a hardcoded size, so we don't need it on the typedef.
                  isSizeDisabled:
                    !!config.size || !!(config.width && config.height),
                  isColorsDisabled: config.isColorsDisabled,
                }),
              );
            })
            // Return the filename and display name
            .then(() => ({ fileKey, displayName }))
        );
      }),
    )
      // Generate icon documentation data
      .then((icons) => {
        console.log('\n 📦  Icons sorted.');
        return icons;
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      })
  );
}
