// cheap version of lodash once to avoid imports
export const once = (func: () => void) => {
  let alreadyCalled = false;
  return () => {
    if (alreadyCalled) {
      return;
    }
    alreadyCalled = true;
    func();
  };
};
