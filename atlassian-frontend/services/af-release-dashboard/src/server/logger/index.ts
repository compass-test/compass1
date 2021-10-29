import bunyan from 'bunyan';

const logger = bunyan.createLogger({
  name: 'af-release-dashboard',
  serializers: bunyan.stdSerializers,
});

export default logger;
