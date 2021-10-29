/**
 * TODO:
 * Ideally this wouldn't be needed and we would have
 * a server redirect.
 *
 * I couldn't get the service descriptor to do that though.
 */

import { useRouter } from 'next/router';

const Redirect = () => {
  const router = useRouter();
  if (typeof window !== 'undefined') {
    router.replace('/packages');
  }
  return null;
};

export default Redirect;
