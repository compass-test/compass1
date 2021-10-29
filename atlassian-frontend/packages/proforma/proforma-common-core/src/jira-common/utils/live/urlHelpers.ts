export const urlParam = (
  name: string,
  value?: string,
  joiner: string = '&',
): string => {
  return value === undefined ? '' : `${joiner}${name}=${value}`;
};
