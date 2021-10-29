import cluster from 'cluster';
import os from 'os';
import process from 'process';

import app from './app';
import logger from './logger';

const PORT = 8080;

const PROCESS_NO_OF_FORKS = process.env.PROCESS_NO_OF_FORKS;

const numCPUs = os.cpus().length;

if (process.env.NODE_ENV === 'production' && cluster.isMaster) {
  const noOfForks = PROCESS_NO_OF_FORKS ? Number(PROCESS_NO_OF_FORKS) : numCPUs;

  logger.info(`Forking into ${noOfForks} processes`);

  for (let i = 0; i < noOfForks; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    // TODO dead forks properly
    logger.warn(`worker ${worker.process.pid} died`);
  });
} else {
  app.listen(PORT, () => {
    logger.info(`Server started`);
  });
}
