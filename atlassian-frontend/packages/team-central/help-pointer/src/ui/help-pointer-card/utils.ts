export const resolveLinkInputToAbsoluteUrl = (linkInput: string) => {
  try {
    const url = new URL(linkInput);
    return url.toString();
  } catch (e) {
    return linkInput.length > 0 ? '//' + linkInput : '';
  }
};
