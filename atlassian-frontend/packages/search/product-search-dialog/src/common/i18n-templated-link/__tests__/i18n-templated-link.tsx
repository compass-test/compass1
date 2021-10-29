import React from 'react';
import { shallow } from 'enzyme';
import { I18nTemplatedLink } from '../../../common/i18n-templated-link/i18n-templated-link';

describe('<I18nTemplatedLink />', () => {
  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterAll(() => {
    // eslint-disable-next-line
    (console.warn as any).mockRestore();
  });

  const commonProps = {
    href: '#',
    linkComponent: ({ children }: any) => (
      /* eslint-disable-next-line */
      <>{children}</>
    ),
  };

  it('should render a single a tag', () => {
    const wrapper = shallow(
      <I18nTemplatedLink
        {...commonProps}
        i18nTemplateString="test with <a>link</a> tag"
      />,
    );

    expect(wrapper.html()).toEqual('test with link tag');
  });

  it('should handle no link tags', () => {
    const wrapper = shallow(
      <I18nTemplatedLink
        {...commonProps}
        i18nTemplateString="test with link tag"
      />,
    );

    expect(wrapper.html()).toEqual('test with link tag');
  });

  it('should remove an unmatched tag', () => {
    const wrapper = shallow(
      <I18nTemplatedLink
        {...commonProps}
        i18nTemplateString="test with <a>link tag"
      />,
    );

    expect(wrapper.html()).toEqual('test with link tag');
  });

  it('should inject the html tag correctly', () => {
    const wrapper = shallow(
      <I18nTemplatedLink
        href="#"
        linkComponent={({ children, href }: any) => (
          /* eslint-disable-next-line */
          <a href={href}>{children}</a>
        )}
        i18nTemplateString="test with <a>link</a> tag"
      />,
    );

    expect(wrapper.html()).toEqual('test with <a href="#">link</a> tag');
  });
});
