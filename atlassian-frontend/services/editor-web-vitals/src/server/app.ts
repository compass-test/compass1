import express from 'express';
import compression from 'compression';

import healthcheckRouter from './routes/healthcheck';
import spaStaticAssetsRouter from './routes/spa-static-assets';
import errorsMiddleware from './middleware/errors';

const app = express();

app.use(compression());
app.use(express.json());
app.use(healthcheckRouter);
app.use(spaStaticAssetsRouter);
app.use(errorsMiddleware);

export default app;
