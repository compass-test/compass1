import express from 'express';
import { STATUS } from '../../constants';

const router = express.Router();

router.get('/healthcheck', (request, response) => {
  response.status(200).json({ status: STATUS.SUCCESS });
});

export default router;
