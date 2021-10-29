import express from 'express';

const router = express.Router();

router.get('/healthcheck', (request, response) => {
  response.status(200).json({ status: 'OK' });
});

export default router;
