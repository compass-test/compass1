import path from 'path';
import express from 'express';

const STATIC_PATH = path.join(__dirname, '../../../static');

export default () => {
  const router = express.Router();

  // serve static assets normally
  router.use(
    express.static(STATIC_PATH, {
      maxAge: '1d',
      setHeaders: (res: express.Response, path: string) => {
        if (path === 'index.html') {
          // Custom Cache-Control for HTML files
          res.setHeader(
            'Cache-Control',
            'public, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0',
          );
        }
      },
    }),
  );

  // handle every other route with index.html, which will contain
  // a script tag to your application's JavaScript file(s).
  router.get('*', (req, res) => {
    res.sendFile(path.resolve(STATIC_PATH, 'index.html'));
    res.setHeader(
      'Cache-Control',
      'public, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0',
    );
    res.cookie('staffid', req.get('x-slauth-subject'));
  });

  return router;
};
