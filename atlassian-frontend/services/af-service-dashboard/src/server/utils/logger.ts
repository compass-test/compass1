import bunyan from 'bunyan';

export const logger = bunyan.createLogger({
  name: 'af-service-dashboard',
  serializers: bunyan.stdSerializers,
});
