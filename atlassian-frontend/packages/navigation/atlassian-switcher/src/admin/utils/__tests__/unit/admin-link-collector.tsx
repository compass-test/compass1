import { getProductLink } from '../../admin-link-collector';
import type { ProductConfigurationResponse } from '../../../../types';
import React from 'react';

const apsOtherLink = {
  linkType: 'OTHER',
  url: 'https://other.atlassian.com',
};

const apsAdminLink = {
  linkType: 'ADMINISTRATION',
  url: 'https://admin.atlassian.com',
};

const remoteProductConfigResponseWithoutOtherLink: ProductConfigurationResponse = {
  products: {} as any,
  links: {
    ADMINISTRATION: {
      label: <>Mock text</>,
      key: 'administration',
      Icon: () => null,
      href: 'https://admin-product-config.atlassian.com',
      ordinal: 1000,
      description: null,
    },
  },
};

const remoteProductConfigResponseWithOtherLink: ProductConfigurationResponse = {
  products: {} as any,
  links: {
    ADMINISTRATION: {
      label: <>Mock text</>,
      key: 'administration',
      Icon: () => null,
      href: 'https://admin-product-config.atlassian.com',
      ordinal: 1000,
      description: null,
    },
    OTHER: {
      label: <>Mock other text</>,
      key: 'other',
      Icon: () => null,
      href: '/other-remote',
      ordinal: 1000,
      description: null,
    },
  },
};

describe('getProductLink', () => {
  describe('when link type is NOT administration', () => {
    it('returns null if the link type was not found in the product config response', () => {
      expect.assertions(1);
      const productLink = getProductLink(
        apsOtherLink,
        remoteProductConfigResponseWithoutOtherLink,
      );
      expect(productLink).toBeNull();
    });

    it('takes url from the APS response if it is present', () => {
      expect.assertions(1);
      const productLink = getProductLink(
        apsOtherLink,
        remoteProductConfigResponseWithOtherLink,
      );
      expect(productLink!.href).toEqual(apsOtherLink.url);
    });

    it('takes href from the product config response as a fallback', () => {
      expect.assertions(3);
      expect(
        getProductLink(
          { ...apsOtherLink, url: null as any },
          remoteProductConfigResponseWithOtherLink,
        )!.href,
      ).toEqual(remoteProductConfigResponseWithOtherLink.links.OTHER.href);
      expect(
        getProductLink(
          { ...apsOtherLink, url: undefined as any },
          remoteProductConfigResponseWithOtherLink,
        )!.href,
      ).toEqual(remoteProductConfigResponseWithOtherLink.links.OTHER.href);
      expect(
        getProductLink(
          { ...apsOtherLink, url: '' },
          remoteProductConfigResponseWithOtherLink,
        )!.href,
      ).toEqual(remoteProductConfigResponseWithOtherLink.links.OTHER.href);
    });

    it('takes href from the APS response even if custom admin link argument is provided', () => {
      expect.assertions(2);
      expect(apsOtherLink.linkType).toEqual('OTHER');
      const productLink = getProductLink(
        apsOtherLink,
        remoteProductConfigResponseWithOtherLink,
        'https://custom-admin.atlassian.com',
      );
      expect(productLink!.href).toEqual(apsOtherLink.url);
    });
  });

  describe('when link type is ADMINISTRATION', () => {
    it('takes admin url from APS response if present', () => {
      expect.assertions(1);
      const productLink = getProductLink(
        apsAdminLink,
        remoteProductConfigResponseWithoutOtherLink,
      );
      expect(productLink!.href).toEqual(apsAdminLink.url);
    });

    it('takes admin url from product config response as a fallback if aps item link is null/undefined', () => {
      expect.assertions(3);
      expect(
        getProductLink(
          { ...apsAdminLink, url: null as any },
          remoteProductConfigResponseWithoutOtherLink,
        )!.href,
      ).toEqual(
        remoteProductConfigResponseWithoutOtherLink.links.ADMINISTRATION.href,
      );
      expect(
        getProductLink(
          { ...apsAdminLink, url: undefined as any },
          remoteProductConfigResponseWithoutOtherLink,
        )!.href,
      ).toEqual(
        remoteProductConfigResponseWithoutOtherLink.links.ADMINISTRATION.href,
      );
      expect(
        getProductLink(
          { ...apsAdminLink, url: '' },
          remoteProductConfigResponseWithoutOtherLink,
        )!.href,
      ).toEqual(
        remoteProductConfigResponseWithoutOtherLink.links.ADMINISTRATION.href,
      );
    });

    it('takes custom provided adminUrl if it is provided', () => {
      expect.assertions(2);
      expect(apsAdminLink.linkType).toEqual('ADMINISTRATION');
      const productLink = getProductLink(
        apsAdminLink,
        remoteProductConfigResponseWithoutOtherLink,
        'https://custom-admin.atlassian.com',
      );
      expect(productLink!.href).toEqual('https://custom-admin.atlassian.com');
    });
  });
});
