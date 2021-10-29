import webpack from 'webpack';
import path from 'path';

export interface GetModuleRulesOptions {
  globs: string[];
  isEnabled: (id: string) => boolean;
  isFile?: boolean;
  forceTranspilation: string[];
  projectRoot: string;
}

export function getModuleRules(
  opts: GetModuleRulesOptions,
): webpack.RuleSetRule[] {
  const rules: webpack.RuleSetRule[] = [
    {
      test: /SITE_DATA$/,
      loader: require.resolve('bolt-fs-loader'),
      options: {
        include: opts.globs.filter(Boolean),
        exclude: ['**/node_modules/**', 'packages/build/website/docs/**'],
      },
    },
    {
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: {
        test: new RegExp(
          'node_modules|^packages/media/media-editor/src/engine/core/binaries/mediaEditor.js$',
        ),
        not: opts.forceTranspilation.map(name => new RegExp(name)),
      },
      use: [
        {
          loader: 'thread-loader',
          options: {
            name: 'babel-pool',
          },
        },
        {
          loader: 'babel-loader',
          options: {
            babelrc: true,
            rootMode: 'upward',
            envName: 'website',
            cacheDirectory: path.resolve(
              opts.projectRoot,
              'node_modules/.cache/babel',
            ),
          },
        },
      ],
    },
    // Some libraries can come configured with a .mjs file in the
    // "module" field (indicating that it's an ECMAScript module)
    //
    // However, in this config have modified resolveOptions.extensions to be:
    // ['.js', '.ts', '.tsx'] and as a result .mjs files won’t be resolved.
    //
    // Adding .mjs back to this array (inline with the default
    // https://webpack.js.org/configuration/resolve/#resolveextensions)
    // is possible, but dangerous to change. This rule allows .mjs files
    // to be resolved without having to add the extension.
    {
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: require.resolve('style-loader'),
        },
        {
          loader: require.resolve('css-loader'),
          options: {
            camelCase: true,
            importLoaders: 1,
            mergeRules: false,
            modules: true,
          },
        },
      ],
    },
    {
      test: /\.(gif|jpe?g|png|ico|woff|woff2)$/,
      loader: require.resolve('url-loader'),
      options: {
        limit: 10000,
      },
    },
    {
      test: /\.svg/,
      use: {
        loader: require.resolve('svg-url-loader'),
        options: {
          limit: 512,
        },
      },
    },
  ];

  if (opts.isEnabled('website') || !opts.isFile) {
    rules.push(
      {
        test: /NAV_DATA$/,
        loader: require.resolve('nav-info-loader'),
        options: {
          include: opts.globs
            .filter(p => p.includes('package.json'))
            .map(p => p.replace('/package.json', '')),
          exclude: ['**/node_modules/**', 'packages/build/website/docs/**'],
          configProps: [
            'name',
            'version',
            'description',
            'atlaskit',
            'atlassian',
            'maintainers',
            'peerDependencies',
            'devDependencies',
            'dependencies',
          ],
        },
      },
      {
        test: /CHANGELOG\.md$/,
        exclude: /node_modules/,
        loader: require.resolve('changelog-md-loader'),
      },
      {
        test: /\.md$/,
        exclude: /node_modules|docs/,
        loader: require.resolve('raw-loader'),
      },
      {
        test: /\.md$/,
        include: /docs/,
        exclude: /node_modules/,
        loader: require.resolve('gray-matter-loader'),
      },
    );
  }

  return rules;
}
