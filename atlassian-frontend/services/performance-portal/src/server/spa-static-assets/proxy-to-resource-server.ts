import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const router = express.Router();

const serverUrl = process.env.STATIC_ASSETS_SERVER_URL;

router.use(
  createProxyMiddleware({
    target: serverUrl,
    changeOrigin: true,
  }),
);

export default router;
