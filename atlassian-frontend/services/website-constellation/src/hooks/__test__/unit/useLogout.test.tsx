import React from 'react';
import { useCookies } from 'react-cookie';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { useLogout } from '../../';

// Hack to get around any `Property 'container' does not exist on type 'Global'`
const globalAny: any = global;

describe('useLogout', () => {
  // clone and freeze process.env
  const OLD_ENV = process.env;
  beforeEach(() => {
    // clone process.env
    // reset process.env beforeEach test
    process.env = { ...OLD_ENV };
    // make the cookie object on window.document writable
    // mock a cookie value here
    globalAny.container = document.createElement('div');
    document.body.appendChild(globalAny.container);
  });

  afterEach(() => {
    document.body.removeChild(globalAny.container);
    globalAny.container = null;
    // reset the process.env object
    process.env = OLD_ENV;
  });

  it('should log the user out', () => {
    let cookie;
    process.env.GATSBY_CONSTELLATION_COOKIE = 'test-token';
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: `${process.env.GATSBY_CONSTELLATION_COOKIE}=some-hash`,
    });

    const LogoutComponent = () => {
      const [cookies] = useCookies();
      cookie = cookies[process.env.GATSBY_CONSTELLATION_COOKIE!];
      const { logout } = useLogout();
      const handleClick = () => {
        logout();
        cookie = cookies[process.env.GATSBY_CONSTELLATION_COOKIE!];
      };

      return <button onClick={handleClick}>{'logout'}</button>;
    };
    act(() => {
      ReactDOM.render(<LogoutComponent />, globalAny.container);
    });

    expect(cookie).toBe('some-hash');
    const button = globalAny.container.querySelector('button');

    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    // @ts-ignore (ts is telling us it might be undefined - we want it to be!)
    expect(cookie[process.env.GATSBY_CONSTELLATION_TOKEN!]).toBe(undefined);
  });
});
