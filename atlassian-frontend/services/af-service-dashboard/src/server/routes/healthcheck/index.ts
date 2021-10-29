import express from 'express';

export default () => {
  const router = express.Router();

  router.get('/healthcheck', (_, res) => {
    res.status(200).json({ status: 'OK' });
  });

  return router;
};
