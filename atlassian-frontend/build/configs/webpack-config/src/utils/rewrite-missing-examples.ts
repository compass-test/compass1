/**
 * TODO: give webdriver-runner, website, webpack-config, editor-common dedicated examples
 * Remap packages without examples to a package they intend to leverage within their tests.
 * @deprecated This is a hack in lieu of having dedicated examples for some packages
 */
export function rewriteMissingExamples(globs: string[]): string[] {
  return globs.map(glob => {
    return glob
      .replace(
        'build/test-utils/webdriver-runner',
        'packages/design-system/button',
      )
      .replace('website', 'packages/design-system/button')
      .replace('build/configs/webpack-config', 'packages/design-system/button')
      .replace('packages/editor/editor-common', 'packages/editor/editor-core');
  });
}
