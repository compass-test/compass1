import bunyan from 'bunyan';

const logger = bunyan.createLogger({
  name: 'performance-portal',
  serializers: bunyan.stdSerializers,
});

export default logger;
