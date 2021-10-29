module.exports = {
  reactStrictMode: true,
  webpack5: false,
  trailingSlash: true,
  webpack(config) {
    /* Seems to break on monorepo dependencies without this */
    config.module.rules.push({
      test: /\.(t|j)sx?$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel', '@emotion/babel-preset-css-prop'],
          },
        },
      ],
      exclude: /node_modules/,
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/packages',
        permanent: true,
      },
    ];
  },
};
