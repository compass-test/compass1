import { Experiment } from './types';

export async function experimentFromPathName(
  pathname: string,
): Promise<Experiment | string[]> {
  switch (pathname) {
    case 'rendering-dom':
      return import(
        /* webpackChunkName: "@atlaskit-internal_rendering-dom" */ './rendering-dom'
      );
    case 'rendering-react-three':
      return import(
        /* webpackChunkName: "@atlaskit-internal_rendering-react-three" */ './rendering-react-three'
      );
    // case '/rendering-skia':
    //   return import(/* webpackChunkName: "@atlaskit-internal_rendering-skia" */ './rendering-skia');
    default:
      return ['rendering-dom', 'rendering-react-three'];
  }
}
