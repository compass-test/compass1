import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const router = express.Router();

const graphQLTarget = process.env.GQL_SERVER_URL;

router.use(
  '/graphql',
  createProxyMiddleware({
    target: graphQLTarget,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      if (process.env.MICROS_ENV === 'local' && process.env.USER) {
        proxyReq.setHeader('x-slauth-subject', process.env.USER);
      }
    },
  }),
);

export default router;
