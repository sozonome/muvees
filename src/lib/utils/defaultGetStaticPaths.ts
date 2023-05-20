import type { GetStaticPaths } from 'next';

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
