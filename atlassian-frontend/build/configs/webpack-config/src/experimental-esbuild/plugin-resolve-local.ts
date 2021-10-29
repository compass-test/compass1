import type Esbuild from 'esbuild';

export interface PluginResolveLocalOptions {
  map: Record<string, string>;
}

export const pluginResolveLocal = (
  options: PluginResolveLocalOptions,
): Esbuild.Plugin => ({
  name: 'resolve-local',
  async setup(esbuild) {
    const mapping = Object.entries(options.map).map(
      ([key, value]) =>
        [new RegExp(`^${key.replace(/\/index$/, '')}$`), value] as [
          RegExp,
          string,
        ],
    );

    mapping.forEach(([filter, tsPath]) => {
      esbuild.onResolve({ filter }, () => ({
        path: tsPath,
      }));
    });
  },
});
