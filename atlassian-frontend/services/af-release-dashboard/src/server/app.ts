import express from 'express';
import compression from 'compression';

import healthcheckRouter from './routes/healthcheck';
import releasesRouter from './routes/releases';
import pullRequestsRouter from './routes/pull-requests';
import jira from './routes/jira';
import spaStaticAssetsRouter from './routes/spa-static-assets';
import developmentRouter from './routes/deployment-history';
import integratorHistoryRouter from './routes/integrator-history';
import errorsMiddleware from './middleware/errors';
import { BASE_API } from './constants';

const app = express();

app.use(compression());
app.use(express.json());
app.use(healthcheckRouter);
app.use(BASE_API, releasesRouter);
app.use(BASE_API, pullRequestsRouter);
app.use(BASE_API, jira);
app.use(BASE_API, developmentRouter);
app.use(BASE_API, integratorHistoryRouter);
app.use(spaStaticAssetsRouter);
app.use(errorsMiddleware);

export default app;
