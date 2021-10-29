// source: https://atlaskit.atlassian.com/packages/core/button/docs/theming-guide
function extract(newTheme: any, props: any, appearance: any, state: any) {
  const { mode } = props;
  if (!newTheme[appearance]) {
    return;
  }
  const root = newTheme[appearance];
  return Object.keys(root).reduce((acc: { [index: string]: string }, val) => {
    let node = root;
    [val, state, mode].forEach((item) => {
      if (!node[item]) {
        return;
      }
      if (typeof node[item] !== 'object') {
        acc[val] = node[item];
        return;
      }
      node = node[item];
      return;
    });
    return acc;
  }, {});
}

export default function (buttonTheme: any) {
  return (adgTheme: any, { state, appearance, ...buttonProps }: any) => {
    const { buttonStyles, spinnerStyles, iconStyles } = adgTheme({
      ...buttonProps,
      appearance,
      state,
    });

    return {
      buttonStyles: {
        ...buttonStyles,
        ...extract(buttonTheme, buttonProps, appearance, state),
      },
      spinnerStyles,
      iconStyles,
    };
  };
}
