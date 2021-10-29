import { buildUrl } from '../../utils/buildUrl';
import resolveLocalisation from '../../utils/resolveLocalisation';

describe('Content Renderer', () => {
  it('buildUrl - should build the right URL with slugs', () => {
    let url = buildUrl(['content', 'messaging-guidelines']);
    expect(url).toEqual('/content/messaging-guidelines');

    url = buildUrl(['content', undefined, 'messaging-guidelines']);
    expect(url).toEqual('/content/messaging-guidelines');

    url = buildUrl(['content', '', 'messaging-guidelines']);
    expect(url).toEqual('/content/messaging-guidelines');

    url = buildUrl(['content', 'messaging-guidelines', 'error-messages']);
    expect(url).toEqual('/content/messaging-guidelines/error-messages');

    url = buildUrl(['content', 'messaging-guidelines', undefined]);
    expect(url).toEqual('/content/messaging-guidelines');

    url = buildUrl(['content', 'messaging-guidelines', '']);
    expect(url).toEqual('/content/messaging-guidelines');
  });

  it('should get the right entry hyperlink', () => {
    const slug = 'error-messages';
    const category = 'content';

    const parentWithLocale = {
      'en-US': {
        fields: {
          slug: {
            'en-US': 'messaging-guidelines',
          },
        },
      },
    };
    const parent = resolveLocalisation(parentWithLocale).fields.slug;
    const url = buildUrl([category, parent, slug]);
    expect(url).toEqual('/content/messaging-guidelines/error-messages');

    const parentWithoutLocale = {
      fields: {
        slug: {
          'en-US': 'messaging-guidelines',
        },
      },
    };
    const parent2 = resolveLocalisation(parentWithoutLocale).fields.slug;
    const url2 = buildUrl([category, parent2, slug]);
    expect(url2).toEqual('/content/messaging-guidelines/error-messages');
  });
});
