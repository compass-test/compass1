import { useState, useEffect, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import JWTModule from 'jsonwebtoken';
// polyfilled abort controller so gatsby runtime doesn't shit the bed
// also IE
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';
import featureFlags, { FeatureFlag } from '../../feature-flags';

/* To know if the component has hydrated on the browser vs rendered on the server */
export function useMounted() {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return isMounted;
}

export function useData(url: string) {
  // TODO: tidy this up to deal with multiple requests and dynamic references

  // we use AbortController to clean up pending requests on unmount
  // so we don't have unresolved promises leaking everywhere.
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    fetch(url, {
      signal: abortController.signal,
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        // if the promise isn't cancelled due to an abort,
        // assume its a real error and set it in state.
        setLoading(false);
        if (!abortController.signal.aborted) {
          setError(err);
        }
      });
    // call abortController.abort() on unmount
    return () => abortController.abort();
  }, [url]);
  return { data, error, isLoading };
}

function hasExpired(token: string) {
  if (!token) {
    return true;
  }
  const decoded = JWTModule.decode(token, { complete: true });
  const current_time = new Date().getTime() / 1000;

  if (decoded?.payload?.exp && current_time > decoded.payload.exp) {
    return true;
  }
  return false;
}

export function useProfile() {
  const [cookies] = useCookies();
  const token = cookies[process.env.GATSBY_CONSTELLATION_COOKIE!];
  if (!token || hasExpired(token)) {
    return null;
  }
  return JWTModule.decode(token, { complete: true })?.payload;
}

export function useSession() {
  const isMounted = useMounted();
  const [cookies] = useCookies();

  const token = cookies[process.env.GATSBY_CONSTELLATION_COOKIE!];
  if (isMounted && token && !hasExpired(token)) {
    return true;
  }
  return false;
}

export function useLogout() {
  const [cookies, removeCookie] = useCookies();
  const logout = () => {
    if (cookies[process.env.GATSBY_CONSTELLATION_COOKIE!]) {
      removeCookie(process.env.GATSBY_CONSTELLATION_COOKIE!, {
        path: '/',
        domain: process.env.GATSBY_CONSTELLATION_COOKIE_DOMAIN,
      });
    }
  };
  return { logout };
}

export function useFeature(flag: FeatureFlag): boolean {
  // If the passed in arg is a real feature flag, we'll use the default flag
  // state. This provides the right default/initial experience in scenarios where
  // localStorage isn't available.
  const [hasFeature, setHasFeature] = useState(featureFlags[flag] ?? false);

  const checkFeatureFlag = useCallback(() => {
    try {
      const flagState = localStorage.getItem(`ff-${flag}`);
      if (flagState) {
        setHasFeature(JSON.parse(flagState));
      }
    } catch (err) {
      // We'll stick with the initial state set if we have any issues with localStorage.
      console.error(err);
    }
  }, [flag]);

  useEffect(() => {
    checkFeatureFlag();

    function handleStorageEvent(event: StorageEvent) {
      // We ignore anything that is not a feature flag event.
      if (event?.key?.startsWith('ff-')) {
        checkFeatureFlag();
      }
    }

    window.addEventListener('storage', handleStorageEvent);
    // One limitation of this listener is that these events only fire when there
    // is more than one tab or window open. Easiest to just have two tabs open,
    // but if you change a feature flag in localstorage with only one tab open,
    // you can force an update by dispatching an event in the console.
    // We can smooth this over if we ever want to prioritise building a small
    // feature flag UI with user-friendly toggles, maybe in a ShipIt.
    return () => {
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, [checkFeatureFlag]);

  return hasFeature;
}
