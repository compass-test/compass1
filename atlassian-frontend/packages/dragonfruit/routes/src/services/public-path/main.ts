declare const COMPASS_PUBLIC_PATH: string;

export function getPublicPath() {
  // Default to /compass if the var doesn't exits
  // It will only exist when defined in the Webpack config with DefinePlugin
  if (typeof COMPASS_PUBLIC_PATH === 'undefined') {
    return '/compass';
  }

  return COMPASS_PUBLIC_PATH;
}
