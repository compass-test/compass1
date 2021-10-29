/* eslint-disable no-console */

export const Logger = {
  info: function (message: string, metadata?: any) {
    console.log(message, metadata ? JSON.stringify(metadata) : '');
  },
  error: function (message: string, metadata?: any) {
    console.error(message, metadata ? JSON.stringify(metadata) : '');
  },
};
