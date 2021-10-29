const getSimplePackageName = (packageName: string) =>
  packageName.replace('@', '').replace('/', '_');

export { getSimplePackageName };
