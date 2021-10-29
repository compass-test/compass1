export const mapCompiledEnvironmentVariables = () => {
  process.env = {
    ...process.env,
  };
};

export const safeLowerTrim = (str: any) => {
  if (typeof str === 'string') {
    return str.toLowerCase().trim();
  }
  return '';
};
