import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

import testEpic from '../../common/util/test-epic';
import createMockStore from '../../common/util/create-mock-store';
import {
  checkProductsLicenceState,
  checkConfluenceUserPermissions,
  getProjectSpaceLink,
  updateConfluenceState,
  updateConfluenceEdition,
  updateJswEdition,
} from '../actions';
import {
  CONFLUENCE_ACTIVE,
  CONFLUENCE_ERROR,
  CONFLUENCE_INACTIVE,
  ProductKeys,
} from '../context/types';
import checkProductsLicenceEpic from './check-products-licence';
import * as fetchRequestAnalytics from '../../common/fetch-request-analytics';
import * as requests from './requests';

const sampleCloudId = 'some-cloud-id';

const mockStoreFactory = (key: string, cloudId: string) =>
  createMockStore({
    project: {
      key,
    },
    context: {
      cloudId,
    },
  });

jest.mock('../../common/fetch-request-analytics', () => ({
  __esModule: true,
  fetchFailed: jest.fn(),
  fetchSuccess: jest.fn(),
}));

jest.mock('./requests', () => ({
  __esModule: true,
  requestProductLicenceState$: jest.fn(),
}));

describe('check confluence epic', () => {
  let requestProductLicenceState$Mock = requests.requestProductLicenceState$ as jest.Mock;
  let fetchFailedMock = fetchRequestAnalytics.fetchFailed as jest.Mock;
  let fetchSuccessMock = fetchRequestAnalytics.fetchSuccess as jest.Mock;

  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should emit updateConfluenceState, updateConfluenceEdition, updateJswEdition and getProjectSpaceLink actions with expected payload when ACTIVE license is fetched', () =>
    testEpic({
      arrange: (input$: any) => {
        requestProductLicenceState$Mock.mockReturnValue(
          of({
            products: {
              [ProductKeys.CONFLUENCE]: { state: 'ACTIVE', edition: 'free' },
              [ProductKeys.JIRA_SOFTWARE]: {
                edition: 'enterprise',
              },
            },
          }),
        );
        return checkProductsLicenceEpic(
          input$,
          mockStoreFactory('TEST', sampleCloudId)(),
        );
      },
      act: (input$: any) => {
        input$.next(checkProductsLicenceState());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([
          updateConfluenceState(CONFLUENCE_ACTIVE),
          updateConfluenceEdition('free'),
          updateJswEdition('enterprise'),
          checkConfluenceUserPermissions(),
          getProjectSpaceLink('TEST'),
        ]);
        expect(fetchSuccessMock).toHaveBeenCalledTimes(1);
        expect(fetchSuccessMock.mock.calls[0][0]).toBe('confluence.license');
      },
    }));

  test('should emit updateConfluenceState, updateConfluenceEdition, updateJswEdition action with expected payload when INACTIVE license is fetched', () =>
    testEpic({
      arrange: (input$: any) => {
        requestProductLicenceState$Mock.mockReturnValue(
          of({
            products: {
              [ProductKeys.CONFLUENCE]: { state: 'INACTIVE', edition: 'free' },
              [ProductKeys.JIRA_SOFTWARE]: {
                edition: 'enterprise',
              },
            },
          }),
        );
        return checkProductsLicenceEpic(
          input$,
          mockStoreFactory('TEST', sampleCloudId)(),
        );
      },
      act: (input$: any) => {
        input$.next(checkProductsLicenceState());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([
          updateConfluenceState(CONFLUENCE_INACTIVE),
          updateConfluenceEdition('free'),
          updateJswEdition('enterprise'),
        ]);
        expect(fetchSuccessMock).toHaveBeenCalledTimes(1);
        expect(fetchSuccessMock.mock.calls[0][0]).toBe('confluence.license');
      },
    }));

  test('should emit updateConfluenceState action with error when cloudId fails to be resolved', () =>
    testEpic({
      arrange: (input$: any) =>
        checkProductsLicenceEpic(input$, mockStoreFactory('TEST', '')()),
      act: (input$: any) => {
        input$.next(checkProductsLicenceState());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([updateConfluenceState(CONFLUENCE_ERROR)]);
        expect(fetchFailedMock).toHaveBeenCalledTimes(1);
        expect(fetchFailedMock.mock.calls[0][0]).toBe('confluence.license');
        expect(fetchFailedMock.mock.calls[0][1]).toMatchObject(
          new Error('missing cloudId in project-pages state'),
        );
      },
    }));

  test('should emit updateConfluenceState action with error when projectKey fails to be resolved', () =>
    testEpic({
      arrange: (input$: any) =>
        checkProductsLicenceEpic(input$, mockStoreFactory('', sampleCloudId)()),
      act: (input$: any) => {
        input$.next(checkProductsLicenceState());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([updateConfluenceState(CONFLUENCE_ERROR)]);
        expect(fetchFailedMock).toHaveBeenCalledTimes(1);
        expect(fetchFailedMock.mock.calls[0][0]).toBe('confluence.license');
        expect(fetchFailedMock.mock.calls[0][1]).toMatchObject(
          new Error('missing projectKey in project-pages state'),
        );
      },
    }));

  test('should emit updateConfluenceState action with error when license fails to be fetched', () =>
    testEpic({
      arrange: (input$: any) => {
        requestProductLicenceState$Mock.mockReturnValue(
          _throw({ message: 'it all went wrong' }),
        );
        return checkProductsLicenceEpic(
          input$,
          mockStoreFactory('TEST', sampleCloudId)(),
        );
      },
      act: (input$: any) => {
        input$.next(checkProductsLicenceState());
        input$.complete();
      },
      assert: (actions: any) => {
        expect(actions).toEqual([updateConfluenceState('CONFLUENCE_ERROR')]);
        expect(fetchFailedMock).toHaveBeenCalledTimes(1);
        expect(fetchFailedMock.mock.calls[0][0]).toBe('confluence.license');
        expect(fetchFailedMock.mock.calls[0][1]).toMatchObject({
          message: 'it all went wrong',
        });
      },
    }));

  test('should emit updateConfluenceState INACTIVE and an undefined edition if confluence is not in the license information', () =>
    testEpic({
      arrange: (input$) => {
        requestProductLicenceState$Mock.mockReturnValue(
          of({
            products: {
              [ProductKeys.JIRA_SOFTWARE]: {
                edition: 'enterprise',
              },
            },
          }),
        );
        return checkProductsLicenceEpic(
          input$,
          mockStoreFactory('TEST', sampleCloudId)(),
        );
      },
      act: (input$) => {
        input$.next(checkProductsLicenceState());
        input$.complete();
      },
      assert: (actions) => {
        expect(actions).toEqual([
          updateConfluenceState(CONFLUENCE_INACTIVE),
          updateConfluenceEdition(undefined),
          updateJswEdition('enterprise'),
        ]);
      },
    }));
});
