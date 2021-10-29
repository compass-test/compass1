import fetchMock from 'fetch-mock/cjs/client';

import {
  CompassComponent,
  CompassComponentType,
  QueryError,
} from '@atlassian/dragonfruit-graphql';

import { RecentlyViewedComponent } from '../compass-recents-client';

import * as utilities from './index';

describe('utilities', () => {
  describe('bulkFetchComponents', () => {
    it('should return components on success', async () => {
      const componentIds = ['hello', 'world'];
      let requestBody = {};

      const mock = fetchMock.post(
        {
          functionMatcher: (url: string, options: any) => {
            requestBody = JSON.parse(options.body);

            return url === '/gateway/api/graphql';
          },
        },
        {
          status: 200,
          body: JSON.stringify({
            data: {
              compass: {
                component0: {
                  __typename: 'CompassComponent',
                  id: 'hello',
                  name: 'name-hello',
                },
                component1: {
                  __typename: 'CompassComponent',
                  id: 'world',
                  name: 'name-world',
                },
              },
            },
          }),
        },
        {
          repeat: 1,
          overwriteRoutes: false,
        },
      );

      const components = await utilities.bulkFetchComponents(componentIds);

      // Every component is not null and is found in componentIds above.
      expect(
        Object.entries(components).every(
          ([id, component]: [
            string,
            RecentlyViewedComponent | QueryError | null,
          ]) =>
            componentIds.includes(id) &&
            !!component &&
            component.__typename === 'CompassComponent' &&
            (component as CompassComponent).id === id,
        ),
      );

      expect(requestBody).toMatchSnapshot('combined components query');
      expect(mock.done()).toBeTruthy();
      expect(mock.calls().length).toEqual(1);
    });

    it('can handle mixed results', async () => {
      const componentIds = ['hello', 'world'];
      let requestBody = {};

      const mock = fetchMock.post(
        {
          functionMatcher: (url: string, options: any) => {
            requestBody = JSON.parse(options.body);

            return url === '/gateway/api/graphql';
          },
        },
        {
          status: 200,
          body: JSON.stringify({
            data: {
              compass: {
                component0: {
                  __typename: 'CompassComponent',
                  id: 'hello',
                  name: 'name-hello',
                },
                component1: {
                  __typename: 'QueryError',
                  message: 'Component not found',
                },
              },
            },
          }),
        },
        {
          repeat: 1,
          overwriteRoutes: false,
        },
      );

      const components = await utilities.bulkFetchComponents(componentIds);

      expect(requestBody).toMatchSnapshot('combined components query');
      expect(components).toMatchSnapshot('ids to values');
      expect(mock.done()).toBeTruthy();
    });

    it('can survive server 5xx', async () => {
      const mock = fetchMock.post(
        {
          url: '/gateway/api/graphql',
        },
        {
          status: 500,
        },
        { repeat: 1, overwriteRoutes: false },
      );

      const components = await utilities.bulkFetchComponents([
        'hello',
        'world',
      ]);

      expect(Object.entries(components).length).toEqual(0);
      expect(mock.done()).toBeTruthy();
    });
  });

  describe('componentNotFound', () => {
    it('should return true if the component matches the Not Found Query Error', () => {
      const component: QueryError = {
        __typename: 'QueryError',
        message: 'Component not found',
        extensions: [{ statusCode: 404, errorType: 'COMPONENT_NOT_FOUND' }],
      };
      expect(utilities.componentNotFound(component)).toBeTruthy();
    });

    it('should return false for any other type', () => {
      const component: RecentlyViewedComponent = {
        __typename: 'CompassComponent',
        id: 'test',
        name: 'test-name',
        type: CompassComponentType.SERVICE,
        ownerId: 'test-owner-id',
      };
      expect(utilities.componentNotFound(component)).toBeFalsy();
      expect(utilities.componentNotFound(null)).toBeFalsy();
    });
  });
});
