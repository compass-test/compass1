import StatsD from 'hot-shots';

import { initMicros, PRODUCTION } from './env';

const MICROS = initMicros();

const HOST = PRODUCTION ? 'platform-statsd' : 'localhost';

export const stats = new StatsD({
  host: HOST,
  port: 8125,
  prefix: 'af_service_dashboard.',
  globalTags: {
    micros_env: MICROS.ENV,
    micros_envtype: MICROS.ENVTYPE,
  },
});
