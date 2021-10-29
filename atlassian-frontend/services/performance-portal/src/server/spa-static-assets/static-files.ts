import path from 'path';
import express from 'express';
import { ServerResponse } from 'http';

const staticAssetsPath = path.join(__dirname, '../static');

const router = express.Router();
// serve static assets normally
router.use(
  express.static(staticAssetsPath, {
    maxAge: '1d',
    setHeaders: (response: ServerResponse, urlPath: string) => {
      if (urlPath === 'index.html') {
        // Custom Cache-Control for HTML files
        response.setHeader(
          'Cache-Control',
          'public, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0',
        );
      }
    },
  }),
);

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
router.get('*', (request, response) => {
  response.sendFile(path.resolve(staticAssetsPath, 'index.html'));
  response.setHeader(
    'Cache-Control',
    'public, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0',
  );
});

export default router;
