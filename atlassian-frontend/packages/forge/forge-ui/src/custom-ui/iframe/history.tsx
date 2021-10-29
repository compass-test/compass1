import type { History, Location, LocationDescriptorObject } from 'history';

export interface HistoryApiProvider {
  history?: History;
  extensionBasePath?: string;
}

export const createExtensionPathParsers = (extensionBasePath: string) => {
  return {
    extensionRouteToFullPath: (extensionRoute: string) =>
      `${extensionBasePath}${extensionRoute ?? ''}`,
    fullPathToExtensionRoute: (fullLocation: string) => {
      const extensionRoute = fullLocation.split(extensionBasePath).pop();
      return extensionRoute ? extensionRoute : '/';
    },
  };
};

export const createHistory = ({
  history,
  extensionBasePath,
}: HistoryApiProvider): History | undefined => {
  if (!history || !extensionBasePath) {
    throw new Error('History API is not available within this module.');
  }

  const {
    extensionRouteToFullPath,
    fullPathToExtensionRoute,
  } = createExtensionPathParsers(extensionBasePath);

  const parseLocation = (
    location: Location<any>,
    parser: typeof extensionRouteToFullPath | typeof fullPathToExtensionRoute,
  ): Location<any> => ({
    ...location,
    pathname: parser(location.pathname),
  });

  return {
    ...history,
    location: parseLocation(history.location, fullPathToExtensionRoute),
    push(pathOrLocation: string | LocationDescriptorObject<any>, state?: any) {
      if (typeof pathOrLocation === 'string') {
        return history.push(extensionRouteToFullPath(pathOrLocation), state);
      }

      return history.push(
        parseLocation(
          pathOrLocation as Location<any>,
          extensionRouteToFullPath,
        ),
      );
    },
    replace(
      pathOrLocation: string | LocationDescriptorObject<any>,
      state?: any,
    ) {
      if (typeof pathOrLocation === 'string') {
        return history.replace(extensionRouteToFullPath(pathOrLocation), state);
      }

      return history.replace(
        parseLocation(
          pathOrLocation as Location<any>,
          extensionRouteToFullPath,
        ),
      );
    },
    listen(listener) {
      const unlisten = history.listen((location, action) => {
        listener(parseLocation(location, fullPathToExtensionRoute), action);
      });

      return unlisten;
    },
  };
};
