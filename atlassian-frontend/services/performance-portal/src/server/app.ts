import express from 'express';
import compression from 'compression';

import userInfoToCookieMiddleware from './aaid-to-cookie-middleware';
import healthcheckRouter from './healthcheck';
import graphQLProxyRouter from './gql-proxy';
import spaStaticAssetsRouter from './spa-static-assets';

const app = express();

app.use(compression());
app.use(userInfoToCookieMiddleware);
app.use(healthcheckRouter);
app.use(graphQLProxyRouter);
app.use(spaStaticAssetsRouter);

export default app;
