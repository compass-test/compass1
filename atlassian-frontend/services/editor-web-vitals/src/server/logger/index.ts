import bunyan from 'bunyan';

const logger = bunyan.createLogger({
  name: 'editor-web-vitals',
  serializers: bunyan.stdSerializers,
});

export default logger;
