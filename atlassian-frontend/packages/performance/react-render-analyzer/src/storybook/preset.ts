export function managerWebpack(config: any): object {
  return injectGlobal(config, 'manager');
}

export function webpack(config: any): object {
  return injectGlobal(config, 'preview');
}

function injectGlobal(config: any, key: string): object {
  let { entry } = config;

  if (Array.isArray(entry)) {
    entry = {
      rra: '@atlassian/react-render-analyzer',
      [key]: entry,
    };
  } else if (typeof entry === 'object' && entry) {
    entry = {
      rra: '@atlassian/react-render-analyzer',
      ...entry,
    };
  }

  return {
    ...config,
    entry,
  };
}
