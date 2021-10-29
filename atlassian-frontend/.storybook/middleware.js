/**
 * This a stargate middleware config.
 * This stargate feature is not properly document.
 * To read more please see the PR https://github.com/storybookjs/storybook/pull/435
 *
 * It is used to proxy request to stargate staging.
 */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = router => {
  if (!process.env.STORYBOOK_SESSION_TOKEN) return;

  router.use(
    '/gateway/api',
    createProxyMiddleware({
      target: 'https://api-private.stg.atlassian.com',
      pathRewrite: { '^/gateway/api': '' },
      changeOrigin: true,
      secure: false,
      headers: {
        origin: 'https://api-private.stg.atlassian.com',
        cookie: `cloud.session.token.stg=${process.env.STORYBOOK_SESSION_TOKEN}`,
      },
    }),
  );
};
