import * as bolt from 'bolt';

const getChangedPackages = async () => {
  const { CHANGED_PACKAGES } = process.env;

  const changedPackages = CHANGED_PACKAGES?.split(',') || [];

  const allPackages = await bolt.getWorkspaces();

  return allPackages.filter((p) => changedPackages.includes(p.name));
};

export { getChangedPackages };
