/**
 * Original: https://github.com/remarkablemark/html-react-parser/blob/d299826fcaae7114f76d10ac6f40ae916f88db37/test/attributes-to-props.js
 * Modifications by Atlassian
 */

/**
 * The MIT License
 *
 * Copyright (c) 2016 Menglin "Mark" Xu <mark@remarkablemark.org>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
import { attributesToProps } from '../attributes-to-props';

describe('attributes-to-props', () => {
  it('should converts attributes to React props', function () {
    expect(
      attributesToProps({
        class: 'ic',
        for: 'tran',
        'http-equiv': 'refresh',
      }),
    ).toEqual({
      className: 'ic',
      htmlFor: 'tran',
      httpEquiv: 'refresh',
    });
  });

  it('should converts standard attributes to React props', function () {
    expect(
      attributesToProps({
        allowfullscreen: true,
        charset: 'utf-8',
        tabindex: 1,
      }),
    ).toEqual({
      allowFullScreen: true,
      charSet: 'utf-8',
      tabIndex: 1,
    });
  });

  it('should converts RDFa attributes to React props', () => {
    expect(
      attributesToProps({
        property: 'foo',
        typeof: 'bar',
      }),
    ).toEqual({
      property: 'foo',
      typeof: 'bar',
    });
  });

  it('should converts non-standard attributes to React props', () => {
    expect(
      attributesToProps({
        itemscope: true,
        itemid: 1337,
      }),
    ).toEqual({
      itemScope: true,
      itemID: 1337,
    });
  });

  it('should keeps `data-*` and `aria-*` attributes as is', () => {
    expect(
      attributesToProps({
        'data-foo': 'bar',
        'aria-live': 'polite',
      }),
    ).toEqual({
      'data-foo': 'bar',
      'aria-live': 'polite',
    });
  });

  it('should converts attributes with weird capitalization', () => {
    expect(
      attributesToProps({
        'ACCEPT-CHARSET': 'ISO-8859-1',
        formNOvalidate: true,
        sEcUrItY: 'restricted',
        'data-FOO': 'bar',
      }),
    ).toEqual({
      acceptCharset: 'ISO-8859-1',
      formNoValidate: true,
      security: 'restricted',
      'data-FOO': 'bar',
    });
  });

  it('should converts boolean attributes', () => {
    expect(
      attributesToProps({
        readonly: '',
      }),
    ).toEqual({
      readOnly: true,
    });

    expect(
      attributesToProps({
        disabled: 'disabled',
      }),
    ).toEqual({
      disabled: true,
    });
  });

  it('should converts overloaded boolean attributes', () => {
    expect(
      attributesToProps({
        download: '',
      }),
    ).toEqual({
      download: true,
    });

    expect(
      attributesToProps({
        download: 'filename',
      }),
    ).toEqual({
      download: 'filename',
    });
  });

  describe('style', () => {
    it('converts inline style to object', () => {
      expect(
        attributesToProps({
          style:
            'color: #f00; font-size: 42px; z-index: -1; -moz-border-radius-topright: 10px; background: url(data:image/png; base64,ivborw0kggoaaaansaaaabgdbtueaalgpc/xhbqaaaafzmuexurczmzpf399fx1+bm5mzy9avzxbesmgces5/p8/t9furvcrmu73jwlzosgsiizurcjo/ad+eqjjb4hv8bft+idpqocx1wjosbfhh2xssxeiyn3uli/6mnree07uiwjev8u8czwyuqdlkpg1bkb4nnm+veanfhqn1k4+gpt6ugqcvu2h2ovuif)',
        }),
      ).toEqual({
        style: {
          color: '#f00',
          fontSize: '42px',
          zIndex: '-1',
          MozBorderRadiusTopright: '10px',
          background:
            'url(data:image/png; base64,ivborw0kggoaaaansaaaabgdbtueaalgpc/xhbqaaaafzmuexurczmzpf399fx1+bm5mzy9avzxbesmgces5/p8/t9furvcrmu73jwlzosgsiizurcjo/ad+eqjjb4hv8bft+idpqocx1wjosbfhh2xssxeiyn3uli/6mnree07uiwjev8u8czwyuqdlkpg1bkb4nnm+veanfhqn1k4+gpt6ugqcvu2h2ovuif)',
        },
      });

      expect(
        attributesToProps({
          style:
            'border-bottom-left-radius:1em;border-right-style:solid;Z-Index:-1;-moz-border-radius-bottomleft:20px',
        }),
      ).toEqual({
        style: {
          borderBottomLeftRadius: '1em',
          borderRightStyle: 'solid',
          zIndex: '-1',
          MozBorderRadiusBottomleft: '20px',
        },
      });

      expect(
        attributesToProps({
          style: null,
        }),
      ).toEqual({
        style: null,
      });

      expect(
        attributesToProps({
          style: undefined,
        }),
      ).toEqual({
        style: undefined,
      });

      expect(
        attributesToProps({
          style: '',
        }),
      ).toEqual({
        style: {},
      });
    });

    [Object, Array, Number, Date, Function].forEach((type) => {
      it(`throws an error when attributes.style=${type.name}`, () => {
        expect(() => attributesToProps({ style: type })).toThrow(
          'First argument must be a string.',
        );
      });
    });
  });
});
