/* eslint-disable no-console */

export const Logger = {
  info: function (message: string, metadata?: any) {
    console.log(message, metadata);
  },
  error: function (message: string, metadata?: any) {
    console.error(message, metadata);
  },
};
