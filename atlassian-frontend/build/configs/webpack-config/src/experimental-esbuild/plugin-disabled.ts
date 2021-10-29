import type Esbuild from 'esbuild';

const NOOP = {};

export interface PluginDisabledOptions {
  isEnabled(id: string): boolean;
  isRunning(id: string): boolean;
}

export const pluginDisabled = (
  options: PluginDisabledOptions,
): Esbuild.Plugin => ({
  name: 'disabled',
  async setup(esbuild) {
    const empty = require.resolve('../../assets/empty.js');
    const analyticsMock = require.resolve(
      '../../assets/analytics-web-client-mock.js',
    );

    const analytics: Record<string, string> = options.isEnabled('analytics')
      ? NOOP
      : {
          '@atlassiansox/analytics-web-client': analyticsMock,
          '@atlassiansox/analytics-web-client/dist/analytics-web-client.with-deps': analyticsMock,
        };

    const mediaEditor: Record<string, string> =
      options.isEnabled('media-editor') || options.isRunning('media')
        ? NOOP
        : {
            '@atlaskit/media-editor': empty,
          };

    const mediaViewer: Record<string, string> =
      options.isEnabled('media-viewer') || options.isRunning('media')
        ? NOOP
        : {
            '@atlaskit/media-viewer': empty,
          };

    const mapping = {
      ...analytics,
      ...mediaEditor,
      ...mediaViewer,
    };

    Object.entries(mapping).forEach(([id, tsPath]) => {
      esbuild.onResolve({ filter: new RegExp(`^${id}$`) }, () => {
        return {
          path: tsPath,
        };
      });
    });
  },
});
