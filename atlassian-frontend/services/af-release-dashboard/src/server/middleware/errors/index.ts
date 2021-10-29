import { ErrorRequestHandler } from 'express';
import {
  isClassValidatorException,
  logClassValidatorExceptions,
  BadRequestException,
  NotFoundException,
} from './exceptions';
import logger from '../../logger';
import { STATUS } from '../../constants';

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (isClassValidatorException(error)) {
    logClassValidatorExceptions(error);
    return response.status(400).json({ status: STATUS.ERROR, errors: error });
  }

  if (error instanceof BadRequestException) {
    logger.error(error);
    return response.status(400).json({
      status: STATUS.ERROR,
      message: error.message,
    });
  }

  if (error instanceof NotFoundException) {
    logger.error(error);
    return response.status(404).json({
      status: STATUS.ERROR,
      message: error.message,
    });
  }

  logger.error(error);
  return response.status(500).json({
    status: STATUS.ERROR,
    error: error,
  });
};

export default errorHandler;
