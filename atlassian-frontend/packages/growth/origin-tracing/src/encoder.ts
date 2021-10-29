import { base64ToBase64Url, base64UrlToBase64 } from './util/base64url';
import { getEnv } from './env';
import { OriginData, OriginJSONData } from './types';

const productShorthands = {
  confluence: 'c',
  jira: 'j',
  stride: 's',
  bitbucket: 'b',
  trello: 't',
};

export function encode(originData: OriginData) {
  const json = JSON.stringify(toJSONObject(originData));
  const base64 = getEnv().btoa(json);
  return base64ToBase64Url(base64);
}

export function decode(encodedOriginString: string): OriginData {
  const base64 = base64UrlToBase64(encodedOriginString);
  const json = getEnv().atob(base64);
  return fromJSONObject(JSON.parse(json));
}

export function toJSONObject({ id, product }: OriginData): OriginJSONData {
  return {
    i: id,
    p:
      product && product in productShorthands
        ? (productShorthands as { [fullProductName: string]: string })[product]
        : product,
  };
}

export function fromJSONObject(originJSONObject: OriginJSONData): OriginData {
  const originData: OriginData = {};
  if (originJSONObject.i) {
    originData.id = originJSONObject.i;
  }
  if (originJSONObject.p) {
    originData.product = expandProductShorthand(originJSONObject.p);
  }
  return originData;
}

function expandProductShorthand(maybeShorthand: string): string {
  const products = Object.keys(productShorthands);
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const shorthand: string | undefined = (productShorthands as {
      [fullProductName: string]: string;
    })[product];
    if (maybeShorthand === shorthand) {
      return product;
    }
  }
  return maybeShorthand;
}
