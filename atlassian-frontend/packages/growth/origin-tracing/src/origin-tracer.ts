import uuid from 'uuid/v4';

import { encode, decode } from './encoder';
import { getEnv } from './env';
import {
  OriginAnalyticsAttributes,
  OriginConstructorOptions,
  OriginVersioningAnalyticsAttributes,
  ToAnalyticsAttributesOptions,
} from './types';

const packageVersion = process.env._PACKAGE_VERSION_;

const originParamName = 'atlOrigin';

const originVersioningAttributes: OriginVersioningAnalyticsAttributes = {
  originLibrary: `origin-tracing.js@${packageVersion}`,
};

export default class OriginTracer {
  public readonly id?: string | null;
  public readonly product?: string | null;

  constructor({
    id = OriginTracer.generateId(),
    product,
    dangerouslySkipValidation = false,
  }: OriginConstructorOptions) {
    this.id = id;
    this.product = product;
    if (!dangerouslySkipValidation) {
      this.validate();
    }
  }

  static isValidId(value: any) {
    return typeof value === 'string' && /^[-_a-zA-Z0-9]{1,36}$/.test(value);
  }

  static isValidProduct(value: any) {
    return typeof value === 'string' && /^[-_a-zA-Z0-9]{1,20}$/.test(value);
  }

  static generateId(): string {
    const id = uuid();

    // Dash positions are fixed so they don't add to uniqueness.
    // Remove them to save space in the encoded form.
    return id.replace(/-/g, '');
  }

  static createEmpty(): OriginTracer {
    return new EmptyOriginTracer();
  }

  static createMalformed(): OriginTracer {
    return new MalformedOriginTracer();
  }

  static fromUrl(url: string | Location): OriginTracer {
    let params = new (getEnv().URLSearchParams)();
    replaceQuery(url, (queryString) => {
      params = new (getEnv().URLSearchParams)(queryString);
    });
    return OriginTracer.fromEncoded(params.get(originParamName));
  }

  static fromEncoded(encoded: string | null): OriginTracer {
    if (!encoded) {
      return OriginTracer.createEmpty();
    }
    try {
      return OriginTracer.decode(encoded);
    } catch (e) {
      return OriginTracer.createMalformed();
    }
  }

  static removeFromUrl(url: string | Location): string {
    return replaceQuery(url, (queryString) => {
      const params = new (getEnv().URLSearchParams)(queryString);
      params.delete(originParamName);
      return params.toString();
    });
  }

  static decode(encodedOrigin: string): OriginTracer {
    const originData = decode(encodedOrigin);
    return new OriginTracer(originData);
  }

  encode(): string {
    return encode({ id: this.id, product: this.product });
  }

  addToUrl(url: string | Location): string {
    return replaceQuery(url, (originalQueryString) => {
      const params = new (getEnv().URLSearchParams)(originalQueryString);
      params.set(originParamName, this.encode());
      return params.toString();
    });
  }

  isEmpty(): boolean {
    return false;
  }

  isMalformed(): boolean {
    return !this.isEmpty() && !this.isValid();
  }

  isValid(): boolean {
    return true;
  }

  toAnalyticsAttributes({
    transformValue = (v) => (v === null ? undefined : v),
    hasGeneratedId = false,
  }: ToAnalyticsAttributesOptions = {}): OriginAnalyticsAttributes {
    // `originIdGenerated` should be used in analytic events that generated this originId.
    // Subsequent events should use `originId`.
    // No two events should have the same value of originIdGenerated.
    const originIdProp = hasGeneratedId ? 'originIdGenerated' : 'originId';

    return {
      [originIdProp]: transformValue(this.id),
      originProduct: transformValue(this.product),
      ...originVersioningAttributes,
    };
  }

  validate(): void {
    if (!OriginTracer.isValidId(this.id)) {
      throw new TypeError('Invalid Origin id');
    }
    if (!OriginTracer.isValidProduct(this.product)) {
      throw new TypeError('Missing/invalid Origin product');
    }
  }
}

class EmptyOriginTracer extends OriginTracer {
  constructor() {
    super({ id: null, product: null, dangerouslySkipValidation: true });
  }

  isValid() {
    return false;
  }

  isEmpty() {
    return true;
  }

  toAnalyticsAttributes() {
    return {
      ...originVersioningAttributes,
    };
  }
}

class MalformedOriginTracer extends OriginTracer {
  constructor() {
    super({ id: null, product: null, dangerouslySkipValidation: true });
  }

  isValid() {
    return false;
  }

  isEmpty() {
    return false;
  }

  toAnalyticsAttributes() {
    return {
      originMalformed: true,
      ...originVersioningAttributes,
    };
  }
}

function replaceQuery(
  url: string | Location,
  replacer: (queryString: string) => string | void,
) {
  const urlWithQueryStringRegex = /(^[^?#]*)(?:\?)?([^#]*?)(#.*|$)$/;

  // If we get passed window.location, we don't want to call window.location.replace()
  const urlString = String(url);

  return urlString.replace(
    urlWithQueryStringRegex,
    (wholeMatch, beforeQuery, queryString, afterQuery) => {
      let newQueryString = replacer(queryString);
      if (newQueryString) {
        newQueryString = `?${newQueryString}`;
      }
      return `${beforeQuery}${newQueryString}${afterQuery}`;
    },
  );
}
