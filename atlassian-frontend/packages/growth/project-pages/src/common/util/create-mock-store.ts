import noop from 'lodash/noop';

export default (data: any) => () => {
  let store = data;
  const subscriptions: any[] = [];

  return {
    getState: () => ({ ...store }),
    setContext: (newContext: any) => {
      store = { ...store, ...newContext };
      subscriptions.forEach((callback) => {
        callback(store);
      });
    },
    dispatch: noop,
    subscribe: (callback: any) => {
      subscriptions.push(callback);
      setTimeout(() => {
        callback(store);
      });
      return () => {
        const index = subscriptions.indexOf(callback);
        subscriptions.splice(index, 1);
      };
    },
  };
};
