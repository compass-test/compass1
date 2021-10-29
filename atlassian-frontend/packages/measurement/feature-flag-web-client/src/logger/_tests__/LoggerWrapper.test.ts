import generateChance from '../../testUtil/chance';
import LoggerWrapper, { MESSAGE_PREFIX } from '../LoggerWrapper';
import { LoggerType, LogLevel } from '../types';

const chance = generateChance('LoggerWrapper');

describe('LoggerWrapper', () => {
  let mockLogger: LoggerType = {
    debug: jest.fn(),
    info: jest.fn(),
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };

  beforeEach(() => {});

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should use console by default', () => {
    const spy = jest.spyOn(console, 'log');
    const logger = new LoggerWrapper();
    const message = chance.word();
    logger.log(message);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(MESSAGE_PREFIX, message);
  });

  test('should use provided logger', () => {
    const logger = new LoggerWrapper({
      logger: mockLogger,
    });
    const message = chance.word();
    logger.warn(message);
    expect(mockLogger.warn).toHaveBeenCalledTimes(1);
    expect(mockLogger.warn).toHaveBeenCalledWith(MESSAGE_PREFIX, message);
  });

  test('should allow info level by default', () => {
    const logger = new LoggerWrapper({
      logger: mockLogger,
    });
    const infoMessage = chance.word();
    const debugMessage = chance.word();
    logger.warn(infoMessage);
    logger.debug(debugMessage);
    expect(mockLogger.warn).toHaveBeenCalledTimes(1);
    expect(mockLogger.warn).toHaveBeenCalledWith(MESSAGE_PREFIX, infoMessage);
    expect(mockLogger.debug).not.toHaveBeenCalled();
  });

  test('should not log if disabled', () => {
    const logger = new LoggerWrapper({
      logger: mockLogger,
      enabled: false,
    });
    const message = chance.word();
    logger.debug(message);
    logger.info(message);
    logger.log(message);
    logger.warn(message);
    logger.error(message);
    expect(mockLogger.debug).not.toHaveBeenCalled();
    expect(mockLogger.info).not.toHaveBeenCalled();
    expect(mockLogger.log).not.toHaveBeenCalled();
    expect(mockLogger.warn).not.toHaveBeenCalled();
    expect(mockLogger.error).not.toHaveBeenCalled();
  });

  test('should not log if disabled', () => {
    const logger = new LoggerWrapper({
      logger: mockLogger,
      enabled: false,
    });
    const message = chance.word();
    logger.debug(message);
    logger.info(message);
    logger.log(message);
    logger.warn(message);
    logger.error(message);
    expect(mockLogger.debug).not.toHaveBeenCalled();
    expect(mockLogger.info).not.toHaveBeenCalled();
    expect(mockLogger.log).not.toHaveBeenCalled();
    expect(mockLogger.warn).not.toHaveBeenCalled();
    expect(mockLogger.error).not.toHaveBeenCalled();
  });

  test('should only log level provided or higher', () => {
    const logger = new LoggerWrapper({
      logger: mockLogger,
      level: LogLevel.WARN,
    });
    const message = chance.word();
    logger.debug(message);
    logger.info(message);
    logger.log(message);
    logger.warn(message);
    logger.error(message);
    expect(mockLogger.debug).not.toHaveBeenCalled();
    expect(mockLogger.info).not.toHaveBeenCalled();
    expect(mockLogger.log).not.toHaveBeenCalled();
    expect(mockLogger.warn).toHaveBeenCalledTimes(1);
    expect(mockLogger.warn).toHaveBeenCalledWith(MESSAGE_PREFIX, message);
    expect(mockLogger.error).toHaveBeenCalledTimes(1);
    expect(mockLogger.error).toHaveBeenCalledWith(MESSAGE_PREFIX, message);
  });

  test('should pass through all args after message prefix', () => {
    const logger = new LoggerWrapper({
      logger: mockLogger,
    });
    const arg1 = chance.word();
    const arg2 = chance.word();
    const arg3 = chance.word();
    const arg4 = chance.word();
    const arg5 = chance.word();
    logger.error(arg1, arg2, arg3, arg4, arg5);
    expect(mockLogger.error).toHaveBeenCalledTimes(1);
    expect(mockLogger.error).toHaveBeenCalledWith(
      MESSAGE_PREFIX,
      arg1,
      arg2,
      arg3,
      arg4,
      arg5,
    );
  });
});
