import type { NextRouter } from 'next/router';

export const handleRouteBack = (router: NextRouter) => () => {
  return window.history.length > 2 ? router.back() : router.push('/');
};
