import uuid from 'uuid/v4';

let uniqueId = 0;
export const createLocalIdByCount = (): string => {
  return `${uniqueId++}`;
};

export const createLocalId = (): string => {
  if (process.env.NODE_ENV !== 'production') {
    return createLocalIdByCount();
  }
  return uuid();
};
