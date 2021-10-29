import express from 'express';

const router: express.Router = process.env.STATIC_ASSETS_SERVER_URL
  ? require('./proxy-to-resource-server').default
  : require('./static-files').default;

export default router;
