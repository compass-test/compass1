export const delayAsyncFunc = (delay: number) => (
  resolveValue: (...args: any[]) => Promise<any>,
) => {
  type ResolveValue = typeof resolveValue;
  const delayResolvedValue: ResolveValue = (...args) =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(resolveValue(...args));
      }, delay);
    });
  return delayResolvedValue;
};

const randomInt = (num: number) => Math.round(Math.random() * num);

export const getUsersAndGroupsStats = delayAsyncFunc(1000)(async () => ({
  numberOfUsers: randomInt(100),
  numberOfGroups: randomInt(100),
}));

export const getProductInstanceStats = delayAsyncFunc(3000)(async () => ({
  numberOfUsers: randomInt(100),
  numberOfGroups: randomInt(100),
  numberOfContainers: randomInt(10),
  numberOfObjects: randomInt(100),
  sizeOfAttachments: randomInt(100 * 1024 * 1024),
  totalMigrationTime: randomInt(100),
}));

export const getAppsStats = delayAsyncFunc(100)(async () => ({
  count: randomInt(100),
}));

export const getCustomersStats = delayAsyncFunc(100)(async () => ({
  numberOfCustomers: randomInt(300),
}));
