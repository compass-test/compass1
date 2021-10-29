import { buildConfluenceNotification } from '../../../common/mocks/notifications-factory';
import {
  AnalyticsAttributes,
  AnalyticsContext,
  MarkRequestReadState,
  RequestCategory,
  RequestReadState,
} from '../../types';
import { AbortReason } from '../experience-tracking/types';

import { LinkType, SloFailureReason } from './types';
import { getCrossAttributes } from './utils';

import {
  triggerChangeboardingBannerStartFailed,
  triggerChangeboardingBannerStopFailed,
  triggerDocumentCollapsed,
  triggerDocumentExpanded,
  triggerErrorBoundaryRenderedEvent,
  triggerFailedToRetrieveNotificationsEvent,
  triggerMarkAllReadButtonClicked,
  triggerMarkOneReadButtonClicked,
  triggerNotificationFilterViewed,
  triggerNotificationLinkClicked,
  triggerNotificationsFailedToLoad,
  triggerNotificationsLoaded,
  triggerNotificationsRenderAborted,
  triggerNotificationsRenderFailed,
  triggerNotificationsRenderSucceeded,
  triggerNotificationViewedTrackEvent,
  triggerViewedAllNotificationsUIEvent,
} from './index';

describe('analytic utils', () => {
  const analyticsContext: AnalyticsContext = {
    readStateFilter: RequestReadState.UNREAD,
    requestCategory: RequestCategory.DIRECT,
    cloudId: 'test-cloud-id',
    product: 'uchi',
  };
  const confluenceAnalyticsContext: AnalyticsContext = {
    readStateFilter: RequestReadState.UNREAD,
    requestCategory: RequestCategory.DIRECT,
    cloudId: 'c89df6e4-6019-4a28-ae77-0e64b2789c7d',
    product: 'confluence',
  };
  const notificationAnalyticsAttributes: AnalyticsAttributes = {
    cloudId: 'c89df6e4-6019-4a28-ae77-0e64b2789c7d',
    registrationName: 'streamhub-confluence-page-create',
    registrationOwner: 'streamhub-confluence',
    registrationProduct: 'confluence',
  };
  const baseNotification = buildConfluenceNotification({
    id: 'abcdef',
    analyticsAttributes: notificationAnalyticsAttributes,
  });
  const baseNotificationNoSite = buildConfluenceNotification({
    id: 'abcdef',
    analyticsAttributes: {
      ...notificationAnalyticsAttributes,
      cloudId: undefined,
    },
  });
  const expectedNotificationAttributes = {
    listIndex: 1,
    notificationAgeInSeconds: 627106,
    notificationCategory: 'watching',
    notificationReadState: 'unread',
  };
  const expectedTenantAttributes = {
    tenantId: 'test-cloud-id',
    tenantIdType: 'cloudId',
  };
  const expectedNotificationContainer = {
    notification: {
      id: 'abcdef',
    },
  };
  const fireFn = jest.fn();
  const createAnalyticsFn = jest.fn().mockImplementation(() => ({
    fire: fireFn,
    clone: jest.fn(),
  }));
  beforeEach(() => {
    createAnalyticsFn.mockClear();
    fireFn.mockClear();
  });

  describe('tenant context', () => {
    test(`tenantIdType is 'cloudId' and tenantId is populated with cloudId exists`, () => {
      const trigger = triggerNotificationFilterViewed(
        createAnalyticsFn,
        analyticsContext,
      );
      trigger(true, true);
      expect(createAnalyticsFn).toHaveBeenCalledWith({
        eventType: 'screen',
        attributes: {
          product: 'uchi',
          readStateFilter: 'unread',
          categoryFilter: 'direct',
          firstRender: 'true',
          firstFilterView: 'true',
          userHourOfDay: expect.any(Number),
        },
        name: 'notificationList',
        ...expectedTenantAttributes,
      });
      expect(fireFn).toHaveBeenCalledTimes(1);
    });

    test(`tenantIdType is 'none' when cloudId is undefined`, () => {
      const trigger = triggerNotificationFilterViewed(createAnalyticsFn, {
        ...analyticsContext,
        cloudId: undefined,
      });
      trigger(true, true);
      expect(createAnalyticsFn).toHaveBeenCalledWith({
        eventType: 'screen',
        attributes: {
          product: 'uchi',
          readStateFilter: 'unread',
          categoryFilter: 'direct',
          firstRender: 'true',
          firstFilterView: 'true',
          userHourOfDay: expect.any(Number),
        },
        name: 'notificationList',
        tenantIdType: 'none',
      });
      expect(fireFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('screen events', () => {
    test(`triggerNotificationFilterViewed sends expected attributes`, () => {
      const trigger = triggerNotificationFilterViewed(
        createAnalyticsFn,
        analyticsContext,
      );
      trigger(true, true);
      expect(createAnalyticsFn).toHaveBeenCalledWith({
        eventType: 'screen',
        attributes: {
          product: 'uchi',
          readStateFilter: 'unread',
          categoryFilter: 'direct',
          firstRender: 'true',
          firstFilterView: 'true',
          userHourOfDay: expect.any(Number),
        },
        name: 'notificationList',
        ...expectedTenantAttributes,
      });
      expect(fireFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('ui events', () => {
    test(`triggerNotificationLinkClicked sends expected attributes`, () => {
      const trigger = triggerNotificationLinkClicked(
        createAnalyticsFn,
        analyticsContext,
      );
      trigger(baseNotification, 1, LinkType.MAIN_ACTION);
      expect(createAnalyticsFn.mock.calls[0][0]).toEqual({
        action: 'clicked',
        actionSubject: 'link',
        actionSubjectId: 'mainAction',
        attributes: {
          product: 'uchi',
          readStateFilter: 'unread',
          categoryFilter: 'direct',
          userHourOfDay: expect.any(Number),
          cloudId: 'c89df6e4-6019-4a28-ae77-0e64b2789c7d',
          registrationName: 'streamhub-confluence-page-create',
          registrationOwner: 'streamhub-confluence',
          registrationProduct: 'confluence',
          isCrossSite: 'true',
          isCrossProduct: 'true',
          ...expectedNotificationAttributes,
        },
        containers: expectedNotificationContainer,
        eventType: 'ui',
        ...expectedTenantAttributes,
      });
      expect(fireFn).toHaveBeenCalledTimes(1);
    });
    test(`triggerNotificationLinkClicked sends expected attributes on same site and product`, () => {
      const notCrossSiteOrProductAnalyticsContext: AnalyticsContext = {
        readStateFilter: RequestReadState.UNREAD,
        requestCategory: RequestCategory.DIRECT,
        cloudId: 'c89df6e4-6019-4a28-ae77-0e64b2789c7d',
        product: 'confluence',
      };
      const trigger = triggerNotificationLinkClicked(
        createAnalyticsFn,
        notCrossSiteOrProductAnalyticsContext,
      );
      trigger(baseNotification, 1, LinkType.MAIN_ACTION);
      expect(createAnalyticsFn.mock.calls[0][0]).toEqual({
        action: 'clicked',
        actionSubject: 'link',
        actionSubjectId: 'mainAction',
        attributes: {
          product: 'confluence',
          readStateFilter: 'unread',
          categoryFilter: 'direct',
          userHourOfDay: expect.any(Number),
          cloudId: 'c89df6e4-6019-4a28-ae77-0e64b2789c7d',
          registrationName: 'streamhub-confluence-page-create',
          registrationOwner: 'streamhub-confluence',
          registrationProduct: 'confluence',
          isCrossSite: 'false',
          isCrossProduct: 'false',
          ...expectedNotificationAttributes,
        },
        containers: expectedNotificationContainer,
        eventType: 'ui',
        tenantId: 'c89df6e4-6019-4a28-ae77-0e64b2789c7d',
        tenantIdType: 'cloudId',
      });
      expect(fireFn).toHaveBeenCalledTimes(1);
    });
    test('triggerDocumentCollapsed sends expected attributes', () => {
      const trigger = triggerDocumentCollapsed(
        createAnalyticsFn,
        analyticsContext,
      );
      trigger(baseNotification, 1);
      expect(createAnalyticsFn.mock.calls[0][0]).toEqual({
        action: 'collapsed',
        actionSubject: 'notification',
        actionSubjectId: 'document',
        attributes: {
          product: 'uchi',
          readStateFilter: 'unread',
          categoryFilter: 'direct',
          userHourOfDay: expect.any(Number),
          cloudId: 'c89df6e4-6019-4a28-ae77-0e64b2789c7d',
          registrationName: 'streamhub-confluence-page-create',
          registrationOwner: 'streamhub-confluence',
          registrationProduct: 'confluence',
          feature: 'expand',
          ...expectedNotificationAttributes,
        },
        containers: expectedNotificationContainer,
        eventType: 'ui',
        ...expectedTenantAttributes,
      });
      expect(fireFn).toHaveBeenCalledTimes(1);
    });
    test('triggerDocumentExpanded sends expected attributes', () => {
      const trigger = triggerDocumentExpanded(
        createAnalyticsFn,
        analyticsContext,
      );
      trigger(baseNotification, 1);
      expect(createAnalyticsFn.mock.calls[0][0]).toEqual({
        action: 'expanded',
        actionSubject: 'notification',
        actionSubjectId: 'document',
        attributes: {
          product: 'uchi',
          readStateFilter: 'unread',
          categoryFilter: 'direct',
          userHourOfDay: expect.any(Number),
          cloudId: 'c89df6e4-6019-4a28-ae77-0e64b2789c7d',
          registrationName: 'streamhub-confluence-page-create',
          registrationOwner: 'streamhub-confluence',
          registrationProduct: 'confluence',
          feature: 'expand',
          ...expectedNotificationAttributes,
        },
        containers: expectedNotificationContainer,
        eventType: 'ui',
        ...expectedTenantAttributes,
      });
      expect(fireFn).toHaveBeenCalledTimes(1);
    });
    test(`triggerViewedAllNotificationsUIEvent sends expected attributes`, () => {
      const trigger = triggerViewedAllNotificationsUIEvent(
        createAnalyticsFn,
        analyticsContext,
      );
      trigger(12);
      expect(createAnalyticsFn.mock.calls[0][0]).toEqual({
        action: 'viewed',
        actionSubject: 'message',
        actionSubjectId: 'allNotificationsViewed',
        attributes: {
          product: 'uchi',
          readStateFilter: 'unread',
          categoryFilter: 'direct',
          userHourOfDay: expect.any(Number),
          viewedCount: 12,
        },
        eventType: 'ui',
        ...expectedTenantAttributes,
      });
      expect(fireFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('track events', () => {
    test(`triggerNotificationViewedTrackEvent sends expected attributes`, () => {
      const trigger = triggerNotificationViewedTrackEvent(
        createAnalyticsFn,
        analyticsContext,
      );
      trigger(baseNotification, 1);
      expect(createAnalyticsFn.mock.calls[0][0]).toEqual({
        action: 'viewed',
        actionSubject: 'notification',
        actionSubjectId: 'abcdef',
        attributes: {
          product: 'uchi',
          readStateFilter: 'unread',
          categoryFilter: 'direct',
          userHourOfDay: expect.any(Number),
          cloudId: 'c89df6e4-6019-4a28-ae77-0e64b2789c7d',
          registrationName: 'streamhub-confluence-page-create',
          registrationOwner: 'streamhub-confluence',
          registrationProduct: 'confluence',
          ...expectedNotificationAttributes,
        },
        containers: expectedNotificationContainer,
        eventType: 'track',
        ...expectedTenantAttributes,
      });
      expect(fireFn).toHaveBeenCalledTimes(1);
    });

    test(`triggerMarkOneReadButtonClicked sends expected attributes`, () => {
      const trigger = triggerMarkOneReadButtonClicked(
        createAnalyticsFn,
        analyticsContext,
      );
      trigger(MarkRequestReadState.READ, baseNotification, 1);
      expect(createAnalyticsFn.mock.calls[0][0]).toEqual({
        action: 'marked',
        actionSubject: 'notification',
        actionSubjectId: 'abcdef',
        attributes: {
          product: 'uchi',
          readStateFilter: 'unread',
          categoryFilter: 'direct',
          userHourOfDay: expect.any(Number),
          cloudId: 'c89df6e4-6019-4a28-ae77-0e64b2789c7d',
          registrationName: 'streamhub-confluence-page-create',
          registrationOwner: 'streamhub-confluence',
          registrationProduct: 'confluence',
          toState: 'read',
          markType: 'single',
          ...expectedNotificationAttributes,
        },
        containers: expectedNotificationContainer,
        eventType: 'track',
        ...expectedTenantAttributes,
      });
      expect(fireFn).toHaveBeenCalledTimes(1);
    });
    test(`triggerMarkAllReadButtonClicked sends expected attributes`, () => {
      const trigger = triggerMarkAllReadButtonClicked(
        createAnalyticsFn,
        analyticsContext,
      );
      trigger();
      expect(createAnalyticsFn.mock.calls[0][0]).toEqual({
        action: 'marked',
        actionSubject: 'notification',
        attributes: {
          product: 'uchi',
          readStateFilter: 'unread',
          categoryFilter: 'direct',
          userHourOfDay: expect.any(Number),
          toState: 'read',
          markType: 'all',
        },
        eventType: 'track',
        ...expectedTenantAttributes,
      });
      expect(fireFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('operational event', () => {
    test(`triggerErrorBoundaryRenderedEvent sends expected attributes`, () => {
      const trigger = triggerErrorBoundaryRenderedEvent(
        createAnalyticsFn,
        analyticsContext,
      );
      trigger('adfError');
      expect(createAnalyticsFn.mock.calls[0][0]).toEqual({
        action: 'rendered',
        actionSubject: 'errorBoundary',
        actionSubjectId: 'adfError',
        attributes: {
          product: 'uchi',
          errorBoundaryType: 'adfError',
          isCritical: false,
          readStateFilter: 'unread',
          categoryFilter: 'direct',
          userHourOfDay: expect.any(Number),
        },
        eventType: 'operational',
        ...expectedTenantAttributes,
      });
      expect(fireFn).toHaveBeenCalledTimes(1);
    });

    test(`triggerErrorBoundaryRenderedEvent sends expected attributes with addition notification context`, () => {
      const trigger = triggerErrorBoundaryRenderedEvent(
        createAnalyticsFn,
        analyticsContext,
      );
      trigger('adfError', true, baseNotification, 0);
      expect(createAnalyticsFn.mock.calls[0][0]).toEqual({
        action: 'rendered',
        actionSubject: 'errorBoundary',
        actionSubjectId: 'adfError',
        attributes: {
          product: 'uchi',
          readStateFilter: 'unread',
          isCritical: true,
          categoryFilter: 'direct',
          userHourOfDay: expect.any(Number),
          cloudId: 'c89df6e4-6019-4a28-ae77-0e64b2789c7d',
          errorBoundaryType: 'adfError',
          registrationName: 'streamhub-confluence-page-create',
          registrationOwner: 'streamhub-confluence',
          registrationProduct: 'confluence',
          ...expectedNotificationAttributes,
          listIndex: 0,
        },
        containers: expectedNotificationContainer,
        eventType: 'operational',
        ...expectedTenantAttributes,
      });
      expect(fireFn).toHaveBeenCalledTimes(1);
    });

    test(`triggerFailedToRetrieveNotificationsEvent sends expected attributes`, () => {
      const trigger = triggerFailedToRetrieveNotificationsEvent(
        createAnalyticsFn,
        analyticsContext,
      );
      trigger(8);
      expect(createAnalyticsFn.mock.calls[0][0]).toEqual({
        action: 'rendered',
        actionSubject: 'errorBoundary',
        actionSubjectId: 'notificationRetrieval',
        attributes: {
          product: 'uchi',
          errorBoundaryType: 'notificationRetrieval',
          notificationsRendered: 8,
          readStateFilter: 'unread',
          categoryFilter: 'direct',
          userHourOfDay: expect.any(Number),
        },
        eventType: 'operational',
        ...expectedTenantAttributes,
      });
      expect(fireFn).toHaveBeenCalledTimes(1);
    });

    test(`triggerNotificationsLoaded sends expected attributes without content`, () => {
      const trigger = triggerNotificationsLoaded(
        createAnalyticsFn,
        analyticsContext,
      );
      trigger(true, false, 750, 8);
      expect(createAnalyticsFn.mock.calls[0][0]).toEqual({
        action: 'fetched',
        actionSubject: 'notificationsWithoutContent',
        attributes: {
          product: 'uchi',
          readStateFilter: 'unread',
          categoryFilter: 'direct',
          userHourOfDay: expect.any(Number),
          firstLoad: true,
          duration: 750,
          bucket: '1000',
          limit: 8,
        },
        eventType: 'operational',
        ...expectedTenantAttributes,
      });
      expect(fireFn).toHaveBeenCalledTimes(1);
    });

    test(`triggerNotificationsLoaded sends expected attributes with content`, () => {
      const trigger = triggerNotificationsLoaded(
        createAnalyticsFn,
        analyticsContext,
      );
      trigger(true, true, 750, 10);
      expect(createAnalyticsFn.mock.calls[0][0]).toEqual({
        action: 'fetched',
        actionSubject: 'notificationsWithContent',
        attributes: {
          product: 'uchi',
          readStateFilter: 'unread',
          categoryFilter: 'direct',
          userHourOfDay: expect.any(Number),
          firstLoad: true,
          duration: 750,
          bucket: '1000',
          limit: 10,
        },
        eventType: 'operational',
        ...expectedTenantAttributes,
      });
      expect(fireFn).toHaveBeenCalledTimes(1);
    });

    test(`triggerNotificationsFailedToLoad sends expected attributes`, () => {
      const trigger = triggerNotificationsFailedToLoad(
        createAnalyticsFn,
        analyticsContext,
      );
      trigger(false, false, 8, 503);
      expect(createAnalyticsFn.mock.calls[0][0]).toEqual({
        action: 'failedFetch',
        actionSubject: 'notificationsWithoutContent',
        attributes: {
          product: 'uchi',
          readStateFilter: 'unread',
          categoryFilter: 'direct',
          userHourOfDay: expect.any(Number),
          firstLoad: false,
          limit: 8,
          statusCode: 503,
        },
        eventType: 'operational',
        ...expectedTenantAttributes,
      });
      expect(fireFn).toHaveBeenCalledTimes(1);
    });

    test(`triggerNotificationsFailedToLoad sends expected attributes with content`, () => {
      const trigger = triggerNotificationsFailedToLoad(
        createAnalyticsFn,
        analyticsContext,
      );
      trigger(false, true, 10, 403);
      expect(createAnalyticsFn.mock.calls[0][0]).toEqual({
        action: 'failedFetch',
        actionSubject: 'notificationsWithContent',
        attributes: {
          product: 'uchi',
          readStateFilter: 'unread',
          categoryFilter: 'direct',
          userHourOfDay: expect.any(Number),
          firstLoad: false,
          limit: 10,
          statusCode: 403,
        },
        eventType: 'operational',
        ...expectedTenantAttributes,
      });
      expect(fireFn).toHaveBeenCalledTimes(1);
    });

    test(`triggerNotificationsRenderSucceeded sends expected attributes without content`, () => {
      [
        { duration: -1, bucket: null },
        { duration: 200, bucket: '500' },
        { duration: 700, bucket: '1000' },
        { duration: 1200, bucket: '2000' },
        { duration: 2100, bucket: '2500' },
        { duration: 2700, bucket: '3000' },
        { duration: 3100, bucket: '4000' },
        { duration: 5000, bucket: '6000' },
        { duration: 6500, bucket: '8000' },
        { duration: 8500, bucket: '+Inf' },
      ].forEach((scenario) => {
        createAnalyticsFn.mockClear();
        fireFn.mockClear();

        const trigger = triggerNotificationsRenderSucceeded(
          createAnalyticsFn,
          analyticsContext,
        );
        trigger(true, false, scenario.duration, true);
        expect(createAnalyticsFn.mock.calls[0][0]).toEqual({
          action: 'renderSucceeded',
          actionSubject: 'notificationsWithoutContent',
          attributes: {
            product: 'uchi',
            readStateFilter: 'unread',
            categoryFilter: 'direct',
            userHourOfDay: expect.any(Number),
            firstLoad: true,
            duration: scenario.duration,
            bucket: scenario.bucket,
            noNotificationsScreen: true,
          },
          eventType: 'operational',
          ...expectedTenantAttributes,
        });
        expect(fireFn).toHaveBeenCalledTimes(1);
      });
    });

    test(`triggerNotificationsRenderSucceeded sends expected attributes with content`, () => {
      [
        { duration: -1, bucket: null },
        { duration: 200, bucket: '1000' },
        { duration: 1500, bucket: '2000' },
        { duration: 3400, bucket: '4000' },
        { duration: 5000, bucket: '6000' },
        { duration: 6500, bucket: '8000' },
        { duration: 9000, bucket: '10000' },
        { duration: 12000, bucket: '15000' },
        { duration: 16000, bucket: '+Inf' },
      ].forEach((scenario) => {
        createAnalyticsFn.mockClear();
        fireFn.mockClear();

        const trigger = triggerNotificationsRenderSucceeded(
          createAnalyticsFn,
          analyticsContext,
        );
        trigger(true, true, scenario.duration, false);
        expect(createAnalyticsFn.mock.calls[0][0]).toEqual({
          action: 'renderSucceeded',
          actionSubject: 'notificationsWithContent',
          attributes: {
            product: 'uchi',
            readStateFilter: 'unread',
            categoryFilter: 'direct',
            userHourOfDay: expect.any(Number),
            firstLoad: true,
            duration: scenario.duration,
            bucket: scenario.bucket,
            noNotificationsScreen: false,
          },
          eventType: 'operational',
          ...expectedTenantAttributes,
        });
        expect(fireFn).toHaveBeenCalledTimes(1);
      });
    });

    test(`triggerNotificationsRenderFailed sends expected attributes without content`, () => {
      const trigger = triggerNotificationsRenderFailed(
        createAnalyticsFn,
        analyticsContext,
      );
      trigger(true, false, 500, SloFailureReason.FETCH_FAILED, {
        statusCode: 500,
      });
      expect(createAnalyticsFn.mock.calls[0][0]).toEqual({
        action: 'renderFailed',
        actionSubject: 'notificationsWithoutContent',
        attributes: {
          product: 'uchi',
          readStateFilter: 'unread',
          categoryFilter: 'direct',
          userHourOfDay: expect.any(Number),
          firstLoad: true,
          duration: 500,
          bucket: '500',
          failureReason: 'fetch-failed',
          statusCode: 500,
        },
        eventType: 'operational',
        ...expectedTenantAttributes,
      });
      expect(fireFn).toHaveBeenCalledTimes(1);
    });

    test(`triggerNotificationsRenderFailed sends expected attributes with content`, () => {
      const trigger = triggerNotificationsRenderFailed(
        createAnalyticsFn,
        analyticsContext,
      );
      trigger(true, true, 500, SloFailureReason.ADF_RENDER_FAILED, {
        statusCode: 403,
      });
      expect(createAnalyticsFn.mock.calls[0][0]).toEqual({
        action: 'renderFailed',
        actionSubject: 'notificationsWithContent',
        attributes: {
          product: 'uchi',
          readStateFilter: 'unread',
          categoryFilter: 'direct',
          userHourOfDay: expect.any(Number),
          firstLoad: true,
          duration: 500,
          bucket: '1000',
          failureReason: 'adf-render-failed',
          statusCode: 403,
        },
        eventType: 'operational',
        ...expectedTenantAttributes,
      });
      expect(fireFn).toHaveBeenCalledTimes(1);
    });

    test(`triggerNotificationsRenderAborted sends expected attributes without content`, () => {
      const trigger = triggerNotificationsRenderAborted(
        createAnalyticsFn,
        analyticsContext,
      );
      trigger(true, false, 500, AbortReason.CHANGE_FILTER, { statusCode: 403 });
      expect(createAnalyticsFn.mock.calls[0][0]).toEqual({
        action: 'renderAborted',
        actionSubject: 'notificationsWithoutContent',
        attributes: {
          product: 'uchi',
          readStateFilter: 'unread',
          categoryFilter: 'direct',
          userHourOfDay: expect.any(Number),
          firstLoad: true,
          duration: 500,
          bucket: '500',
          abortReason: 'change-filter',
          statusCode: 403,
        },
        eventType: 'operational',
        ...expectedTenantAttributes,
      });
      expect(fireFn).toHaveBeenCalledTimes(1);
    });

    test(`triggerNotificationsRenderAborted sends expected attributes with content`, () => {
      const trigger = triggerNotificationsRenderAborted(
        createAnalyticsFn,
        analyticsContext,
      );
      trigger(true, true, 500, AbortReason.NO_DOCUMENTS, { statusCode: 403 });
      expect(createAnalyticsFn.mock.calls[0][0]).toEqual({
        action: 'renderAborted',
        actionSubject: 'notificationsWithContent',
        attributes: {
          product: 'uchi',
          readStateFilter: 'unread',
          categoryFilter: 'direct',
          userHourOfDay: expect.any(Number),
          firstLoad: true,
          duration: 500,
          bucket: '1000',
          abortReason: 'no-adf-documents',
          statusCode: 403,
        },
        eventType: 'operational',
        ...expectedTenantAttributes,
      });
      expect(fireFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('changeBoardingMessage', () => {
    test(`triggerChangeboardingBannerStartFailed sends expected attributes without content`, () => {
      const trigger = triggerChangeboardingBannerStartFailed(
        createAnalyticsFn,
        analyticsContext,
      );
      trigger('TypeError');
      expect(createAnalyticsFn.mock.calls[0][0]).toEqual({
        action: 'failedToStart',
        actionSubject: 'changeBoardingBanner',
        attributes: {
          product: 'uchi',
          errorName: 'TypeError',
          readStateFilter: 'unread',
          categoryFilter: 'direct',
          userHourOfDay: expect.any(Number),
        },
        eventType: 'operational',
        ...expectedTenantAttributes,
      });
      expect(fireFn).toHaveBeenCalledTimes(1);
    });

    test(`triggerChangeboardingBannerStopFailed sends expected attributes with content`, () => {
      const trigger = triggerChangeboardingBannerStopFailed(
        createAnalyticsFn,
        analyticsContext,
      );
      trigger('TypeError');
      expect(createAnalyticsFn.mock.calls[0][0]).toEqual({
        action: 'failedToStop',
        actionSubject: 'changeBoardingBanner',
        attributes: {
          product: 'uchi',
          errorName: 'TypeError',
          readStateFilter: 'unread',
          categoryFilter: 'direct',
          userHourOfDay: expect.any(Number),
        },
        eventType: 'operational',
        ...expectedTenantAttributes,
      });
      expect(fireFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCrossAttributes', () => {
    test('getCrossAttributes returns expected attributes if cross-site and cross-product', () => {
      const crossAttributes = getCrossAttributes(
        baseNotification,
        analyticsContext,
      );
      expect(crossAttributes).toEqual({
        isCrossSite: 'true',
        isCrossProduct: 'true',
      });
    });

    test('getCrossAttributes returns expected attributes if not cross-site or cross-product', () => {
      const crossAttributes = getCrossAttributes(
        baseNotification,
        confluenceAnalyticsContext,
      );
      expect(crossAttributes).toEqual({
        isCrossSite: 'false',
        isCrossProduct: 'false',
      });
    });

    test('getCrossAttributes returns expected attributes if cloudID not supplied', () => {
      const noCloudIdContext: AnalyticsContext = {
        readStateFilter: RequestReadState.UNREAD,
        requestCategory: RequestCategory.DIRECT,
        product: 'uchi',
      };
      const crossAttributes = getCrossAttributes(
        baseNotification,
        noCloudIdContext,
      );
      expect(crossAttributes).toEqual({
        isCrossSite: 'unknown',
        isCrossProduct: 'true',
      });
    });

    test('getCrossAttributes returns expected attributes if product not supplied', () => {
      const noProductContext: AnalyticsContext = {
        readStateFilter: RequestReadState.UNREAD,
        requestCategory: RequestCategory.DIRECT,
        cloudId: 'test',
      };
      const crossAttributes = getCrossAttributes(
        baseNotification,
        noProductContext,
      );
      expect(crossAttributes).toEqual({
        isCrossSite: 'true',
        isCrossProduct: 'unknown',
      });
    });

    test('getCrossAttributes returns expected attributes if cloudID not in notification analytics attributes', () => {
      const crossAttributes = getCrossAttributes(
        baseNotificationNoSite,
        analyticsContext,
      );
      expect(crossAttributes).toEqual({
        isCrossSite: 'unknown',
        isCrossProduct: 'true',
      });
    });
  });
});
