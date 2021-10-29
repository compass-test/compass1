import path from 'path';
import express, { Response } from 'express';
import { STATIC_ASSETS_PATH } from '../../constants';

const router = express.Router();
router.use(
  express.static(STATIC_ASSETS_PATH, {
    maxAge: '1d',
    setHeaders: (response: Response, urlPath: string) => {
      if (urlPath === 'index.html') {
        response.setHeader(
          'Cache-Control',
          'public, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0',
        );
      }
    },
  }),
);

router.get('*', (request, response) => {
  response.sendFile(path.resolve(STATIC_ASSETS_PATH, 'index.html'));
  response.setHeader(
    'Cache-Control',
    'public, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0',
  );
});

export default router;
